import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { once } from "node:events";

import { createFilesystemHttpServer } from "./filesystem-http-server.mjs";
import { createAsyncRequestLimiter } from "./async-request-limiter.mjs";

async function startFilesystemServer(t, prefix) {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), prefix));
  const repoRoot = path.join(tempRoot, "repo");
  const configFile = path.join(tempRoot, "allowed-directories.txt");
  const permissionStoreDir = path.join(tempRoot, "permissions");
  await fs.mkdir(repoRoot, { recursive: true });
  await fs.writeFile(configFile, `${repoRoot}\n`, "utf8");

  const server = createFilesystemHttpServer({
    repoRoot,
    configFile,
    permissionStoreDir,
    port: 0,
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    server.closeAllSessions();
    server.close();
    await once(server, "close");
    await fs.rm(tempRoot, { recursive: true, force: true });
  });

  return {
    baseUrl: `http://127.0.0.1:${server.address().port}`,
    repoRoot,
    tempRoot,
  };
}

async function callMcp(baseUrl, id, name, args, headers = {}) {
  const response = await fetch(`${baseUrl}/mcp`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id,
      method: "tools/call",
      params: { name, arguments: args },
    }),
  });
  return { response, payload: await response.json() };
}

test("filesystem MCP exposes verifiable health and streamable HTTP tools", async (t) => {
  const repoRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agents-fs-http-"));
  const server = createFilesystemHttpServer({ repoRoot, port: 0 });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    server.closeAllSessions();
    server.close();
    await once(server, "close");
    await fs.rm(repoRoot, { recursive: true, force: true });
  });
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const health = await fetch(`${baseUrl}/health`).then((response) => response.json());
  assert.equal(health.service, "web-agents-filesystem-mcp");
  assert.equal(health.pid, process.pid);
  assert.ok(health.tools > 5);

  const listed = await fetch(`${baseUrl}/mcp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list", params: {} }),
  }).then((response) => response.json());
  assert.equal(listed.id, 1);
  assert.ok(listed.result.tools.some((tool) => tool.name === "read_text_file"));

  const source = path.join(repoRoot, "sample.txt");
  await fs.writeFile(source, "UTF-8 测试", "utf8");
  const read = await fetch(`${baseUrl}/mcp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "read_text_file", arguments: { path: source } } }),
  }).then((response) => response.json());
  assert.match(read.result.content[0].text, /UTF-8 测试/);
});

test("filesystem MCP SSE announces a session-specific message endpoint", async (t) => {
  const repoRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agents-fs-sse-"));
  const server = createFilesystemHttpServer({ repoRoot });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    server.closeAllSessions();
    server.close();
    await once(server, "close");
    await fs.rm(repoRoot, { recursive: true, force: true });
  });
  const response = await fetch(`http://127.0.0.1:${server.address().port}/sse`);
  const reader = response.body.getReader();
  const { value } = await reader.read();
  const chunk = new TextDecoder().decode(value);
  assert.match(chunk, /event: endpoint/);
  assert.match(chunk, /\/message\?sessionId=/);
  await reader.cancel();
});

test("streamable HTTP blocks unapproved writes to an external absolute path", async (t) => {
  const { baseUrl, tempRoot } = await startFilesystemServer(t, "web-agents-fs-http-permission-");
  const targetFile = path.join(tempRoot, "outside", "owned.txt");

  const { response, payload } = await callMcp(baseUrl, 10, "write_file", {
    path: targetFile,
    content: "written without permission",
  });

  assert.equal(response.status, 200);
  assert.equal(payload.result.isError, true);
  assert.match(payload.result.content[0].text, /WEB_AGENT_PERMISSION_REQUEST/);
  await assert.rejects(fs.access(targetFile), /ENOENT/);
});

test("HTTP MCP rejects a malicious localhost Origin before an allowed write", async (t) => {
  const { baseUrl, repoRoot } = await startFilesystemServer(t, "web-agents-fs-http-origin-");
  const targetFile = path.join(repoRoot, "origin-owned.txt");
  const maliciousOrigin = "http://127.0.0.1:4444";

  const sseResponse = await fetch(`${baseUrl}/sse`, { headers: { Origin: maliciousOrigin } });
  assert.equal(sseResponse.status, 403);
  assert.equal(sseResponse.headers.get("access-control-allow-origin"), null);
  assert.equal((await sseResponse.json()).error, "LOCAL_ORIGIN_REQUIRED");

  const { response, payload } = await callMcp(
    baseUrl,
    11,
    "write_file",
    { path: targetFile, content: "written by another localhost page" },
    { Origin: maliciousOrigin }
  );

  assert.equal(response.status, 403);
  assert.equal(response.headers.get("access-control-allow-origin"), null);
  assert.equal(payload.error, "LOCAL_ORIGIN_REQUIRED");
  await assert.rejects(fs.access(targetFile), /ENOENT/);
});

test("HTTP MCP requires JSON before dispatching a mutating tool", async (t) => {
  const { baseUrl, repoRoot } = await startFilesystemServer(t, "web-agents-fs-http-content-type-");
  const targetFile = path.join(repoRoot, "simple-request-write.txt");
  const response = await fetch(`${baseUrl}/mcp`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 12,
      method: "tools/call",
      params: {
        name: "write_file",
        arguments: { path: targetFile, content: "simple request write" },
      },
    }),
  });

  assert.equal(response.status, 415);
  assert.equal((await response.json()).error, "APPLICATION_JSON_REQUIRED");
  await assert.rejects(fs.access(targetFile), /ENOENT/);
});

test("HTTP MCP preserves allowed writes from the legacy browser extension without wildcard CORS", async (t) => {
  const { baseUrl, repoRoot } = await startFilesystemServer(t, "web-agents-fs-http-extension-");
  const targetFile = path.join(repoRoot, "extension-write.txt");
  const extensionOrigin = "chrome-extension://aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

  const { response, payload } = await callMcp(
    baseUrl,
    12,
    "write_file",
    { path: targetFile, content: "allowed extension write" },
    { Origin: extensionOrigin }
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("access-control-allow-origin"), extensionOrigin);
  assert.equal(payload.result.isError, undefined);
  assert.equal(await fs.readFile(targetFile, "utf8"), "allowed extension write");
});

test("streamable HTTP resolves filesystem tools from session workspace headers", async (t) => {
  const calls = [];
  const sessionTools = {
    definitions: [],
    async call() {
      return { content: [{ type: "text", text: "session-a tools" }] };
    },
  };
  const sessionRegistry = {
    async get(input) {
      calls.push(input);
      return sessionTools;
    },
    clear() {},
  };
  const defaultTools = {
    definitions: [],
    async call() {
      return { content: [{ type: "text", text: "default tools" }] };
    },
  };
  const server = createFilesystemHttpServer({ filesystemTools: defaultTools, sessionRegistry, port: 0 });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    server.closeAllSessions();
    server.close();
    await once(server, "close");
  });

  const response = await fetch(`http://127.0.0.1:${server.address().port}/mcp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Web-Agents-Session": "session-a",
      "X-Web-Agents-Workspace": "F:/project-a",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 21,
      method: "tools/call",
      params: { name: "read_text_file", arguments: { path: "note.md" } },
    }),
  });
  const payload = await response.json();

  assert.deepEqual(calls, [{ sessionId: "session-a", workspaceRoot: "F:/project-a" }]);
  assert.equal(payload.result.content[0].text, "session-a tools");
});

test("SSE retains the session filesystem tools selected when the stream opens", async (t) => {
  const sessionTools = {
    definitions: [],
    async call() {
      return { content: [{ type: "text", text: "sse session tools" }] };
    },
  };
  const sessionRegistry = {
    async get() {
      return sessionTools;
    },
    clear() {},
  };
  const defaultTools = {
    definitions: [],
    async call() {
      return { content: [{ type: "text", text: "default tools" }] };
    },
  };
  const server = createFilesystemHttpServer({ filesystemTools: defaultTools, sessionRegistry, port: 0 });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    server.closeAllSessions();
    server.close();
    await once(server, "close");
  });

  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const streamResponse = await fetch(`${baseUrl}/sse`, {
    headers: {
      "X-Web-Agents-Session": "session-sse",
      "X-Web-Agents-Workspace": "F:/project-sse",
    },
  });
  const reader = streamResponse.body.getReader();
  const decoder = new TextDecoder();
  const firstChunk = decoder.decode((await reader.read()).value);
  const endpoint = firstChunk.match(/data: (\/message\?sessionId=[^\n]+)/)?.[1];
  assert.ok(endpoint);

  const posted = await fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 22,
      method: "tools/call",
      params: { name: "read_text_file", arguments: { path: "note.md" } },
    }),
  });
  assert.equal(posted.status, 202);
  const messageChunk = decoder.decode((await reader.read()).value);
  assert.match(messageChunk, /sse session tools/);
  await reader.cancel();
});

test("filesystem HTTP returns 429 at capacity and recovers after active work", async (t) => {
  let release;
  let startedResolve;
  const started = new Promise((resolve) => { startedResolve = resolve; });
  const gate = new Promise((resolve) => { release = resolve; });
  const filesystemTools = {
    definitions: [],
    async call() {
      startedResolve();
      await gate;
      return { content: [{ type: "text", text: "released" }] };
    },
  };
  const requestLimiter = createAsyncRequestLimiter({ concurrency: 1, maxQueue: 0 });
  const server = createFilesystemHttpServer({ filesystemTools, requestLimiter, port: 0 });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    release();
    server.closeAllSessions();
    server.close();
    await once(server, "close");
  });
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const body = JSON.stringify({
    jsonrpc: "2.0",
    id: 30,
    method: "tools/call",
    params: { name: "read_text_file", arguments: { path: "note.md" } },
  });
  const first = fetch(`${baseUrl}/mcp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  await started;

  const saturated = await fetch(`${baseUrl}/mcp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  assert.equal(saturated.status, 429);
  assert.equal((await saturated.json()).error, "REQUEST_QUEUE_FULL");

  release();
  assert.equal((await first).status, 200);
  const recovered = await fetch(`${baseUrl}/mcp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  assert.equal(recovered.status, 200);
  const health = await fetch(`${baseUrl}/health`).then((response) => response.json());
  assert.deepEqual(health.concurrency, { active: 0, waiting: 0, rejected: 1 });
});
