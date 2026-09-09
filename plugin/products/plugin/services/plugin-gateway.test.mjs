import assert from "node:assert/strict";
import { once } from "node:events";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  approvePermissionViaGateway,
  createPluginGatewayServer,
  persistAllowedDirectories,
  rejectPermissionViaGateway,
  saveToolResult,
  sanitizeToolName,
} from "./plugin-gateway.mjs";
import { createAutomationTaskQueue } from "./automation-task-queue.mjs";
import { callTool } from "./filesystem-stdio-server.mjs";
import { createPermissionRequest } from "./permission-store-adapter.mjs";

function parsePermissionMarker(result) {
  const match = result.content[0].text.match(
    /WEB_AGENT_PERMISSION_REQUEST\s*([\s\S]*?)\s*END_WEB_AGENT_PERMISSION_REQUEST/
  );
  assert.ok(match, "permission result should include a structured marker");
  return JSON.parse(match[1]);
}

test("sanitizeToolName produces a filesystem-safe name", () => {
  assert.equal(sanitizeToolName("list directory:*?"), "list-directory");
  assert.equal(sanitizeToolName("   "), "tool-result");
});

test("saveToolResult writes markdown under plugin-owned data", async () => {
  const result = await saveToolResult({
    toolName: "list_directory",
    fileName: `test-tool-result-${Date.now()}.md`,
    text: "[FILE] demo.txt\n[DIR] docs",
  });

  try {
    assert.match(result.filePath, /products[\\/]plugin[\\/]data[\\/]tool-results[\\/]/);
    const saved = await fs.readFile(result.filePath, "utf8");
    assert.match(saved, /# web_Agent 工具结果/);
    assert.match(saved, /Tool: list_directory/);
    assert.match(saved, /\[FILE\] demo\.txt/);
    assert.equal(path.extname(result.filePath), ".md");
  } finally {
    await fs.rm(result.filePath, { force: true });
  }
});

test("gateway permission approval returns a one-time token and rejects duplicate approvals", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-gateway-"));
  const storeDir = path.join(tempRoot, "permissions");
  const targetPath = path.join(tempRoot, "outside", "note.md");

  const request = await createPermissionRequest({
    storeDir,
    operation: "write_file",
    targetPaths: [targetPath],
    directoriesToApprove: [path.dirname(targetPath)],
    args: { path: targetPath, content: "pending" },
    ttlMs: 60_000,
  });

  const approved = await approvePermissionViaGateway({
    storeDir,
    requestId: request.requestId,
    argsHash: request.argsHash,
    mode: "once",
  });

  assert.equal(approved.ok, true);
  assert.match(approved.token, /^wapt_/);

  await assert.rejects(
    () => approvePermissionViaGateway({ storeDir, requestId: request.requestId, argsHash: request.argsHash, mode: "once" }),
    /REQUEST_NOT_PENDING/
  );
});

test("gateway permission rejection updates pending request status", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-gateway-"));
  const storeDir = path.join(tempRoot, "permissions");
  const targetPath = path.join(tempRoot, "outside", "note.md");

  const request = await createPermissionRequest({
    storeDir,
    operation: "write_file",
    targetPaths: [targetPath],
    directoriesToApprove: [path.dirname(targetPath)],
    args: { path: targetPath, content: "pending" },
    ttlMs: 60_000,
  });

  const rejected = await rejectPermissionViaGateway({ storeDir, requestId: request.requestId });
  assert.equal(rejected.ok, true);
  assert.equal(rejected.status, "rejected");
});

test("directory approval persists only the requested directory without widening to a drive root", async (t) => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-gateway-persistent-"));
  t.after(() => fs.rm(tempRoot, { recursive: true, force: true }));
  const productRoot = path.join(tempRoot, "plugin");
  const configDir = path.join(productRoot, "config");
  const dataDir = path.join(productRoot, "data");
  const configFile = path.join(configDir, "allowed-directories.local.txt");
  const targetDirectory = path.join(tempRoot, "new-workspace");
  const targetPath = path.join(targetDirectory, "note.md");
  const storeDir = path.join(dataDir, "permissions");
  await fs.mkdir(configDir, { recursive: true });

  const request = await createPermissionRequest({
    storeDir,
    operation: "write_file",
    targetPaths: [targetPath],
    directoriesToApprove: [targetDirectory],
    args: { path: targetPath, content: "pending" },
    ttlMs: 60_000,
  });
  const approved = await approvePermissionViaGateway({
    requestId: request.requestId,
    argsHash: request.argsHash,
    mode: "directory",
  }, { productRoot, configDir, configFile, dataDir, permissionStoreDir: storeDir });

  assert.equal(approved.approvalMode, "directory");
  assert.deepEqual(approved.persistedDirectories, [path.resolve(targetDirectory)]);
  const config = await fs.readFile(configFile, "utf8");
  assert.equal(config.trim(), path.resolve(targetDirectory));
});

test("persistAllowedDirectories deduplicates existing roots", async (t) => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-allowed-roots-"));
  t.after(() => fs.rm(tempRoot, { recursive: true, force: true }));
  const configFile = path.join(tempRoot, "config", "allowed-directories.local.txt");
  const root = path.join(tempRoot, "workspace");

  assert.deepEqual(await persistAllowedDirectories(configFile, [root, root]), [path.resolve(root)]);
  assert.deepEqual(await persistAllowedDirectories(configFile, [root]), []);
});

test("concurrent persistent approvals retain every directory", async (t) => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-concurrent-roots-"));
  t.after(() => fs.rm(tempRoot, { recursive: true, force: true }));
  const configFile = path.join(tempRoot, "config", "allowed-directories.local.txt");
  const firstRoot = path.join(tempRoot, "workspace-a");
  const secondRoot = path.join(tempRoot, "workspace-b");

  await Promise.all([
    persistAllowedDirectories(configFile, [firstRoot]),
    persistAllowedDirectories(configFile, [secondRoot]),
  ]);

  const roots = (await fs.readFile(configFile, "utf8")).trim().split(/\r?\n/);
  assert.deepEqual(new Set(roots), new Set([path.resolve(firstRoot), path.resolve(secondRoot)]));
});

test("persistent directory approval authorizes later writes and delete_file without another prompt", async (t) => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-persistent-flow-"));
  t.after(() => fs.rm(tempRoot, { recursive: true, force: true }));
  const productRoot = path.join(tempRoot, "plugin");
  const configDir = path.join(productRoot, "config");
  const dataDir = path.join(productRoot, "data");
  const configFile = path.join(configDir, "allowed-directories.local.txt");
  const permissionStoreDir = path.join(dataDir, "permissions");
  const auditFile = path.join(dataDir, "audit", "writes.jsonl");
  const outsideRoot = path.join(tempRoot, "external-workspace");
  const firstTarget = path.join(outsideRoot, "first.txt");
  const secondTarget = path.join(outsideRoot, "second.txt");
  await fs.mkdir(productRoot, { recursive: true });
  const context = { repoRoot: productRoot, configFile, permissionStoreDir, auditFile };
  const firstArgs = { path: firstTarget, content: "first" };

  const pending = await callTool("write_file", firstArgs, context);
  const marker = parsePermissionMarker(pending);
  assert.deepEqual(marker.directoriesToApprove, [path.resolve(outsideRoot)]);

  const approved = await approvePermissionViaGateway({
    requestId: marker.requestId,
    argsHash: marker.argsHash,
    mode: "directory",
  }, { productRoot, configDir, configFile, dataDir, permissionStoreDir });
  const retry = await callTool("write_file", {
    ...firstArgs,
    _webAgentPermission: { requestId: marker.requestId, token: approved.token },
  }, context);
  assert.equal(retry.isError, undefined);

  const laterWrite = await callTool("write_file", { path: secondTarget, content: "second" }, context);
  assert.equal(laterWrite.isError, undefined);
  const deletion = await callTool("delete_file", { path: secondTarget }, context);
  assert.equal(deletion.isError, undefined);
  await assert.rejects(fs.access(secondTarget), /ENOENT/);
});

function automationTask(clientRequestId) {
  return {
    version: 1,
    type: "provider.generate_image",
    clientRequestId,
    sessionId: `session-${clientRequestId}`,
    provider: "grok",
    workspaceRoot: "F:/project",
    payload: {
      prompt: "Generate an image",
      targetDirectory: "F:/project/assets",
      fileName: "image.png",
    },
  };
}

async function postJson(baseUrl, pathname, body) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { response, payload: await response.json() };
}

test("plugin gateway exposes the minimal typed automation task flow", async (t) => {
  const taskQueue = createAutomationTaskQueue({ capacity: 4 });
  const server = createPluginGatewayServer({ taskQueue });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    taskQueue.close();
    server.close();
    await once(server, "close");
  });
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  const submitted = await postJson(baseUrl, "/automation/tasks", automationTask("gateway-1"));
  assert.equal(submitted.response.status, 202);
  assert.match(submitted.payload.taskId, /\S+/);

  const nextResponse = await fetch(`${baseUrl}/automation/next?waitMs=10`);
  const next = await nextResponse.json();
  assert.equal(next.task.taskId, submitted.payload.taskId);

  const completed = await postJson(baseUrl, `/automation/tasks/${submitted.payload.taskId}/result`, {
    ok: true,
    filePath: "F:/project/assets/image.png",
  });
  assert.equal(completed.response.status, 200);

  const status = await fetch(`${baseUrl}/automation/tasks/${submitted.payload.taskId}`).then((response) => response.json());
  assert.equal(status.task.state, "done");
  assert.equal(status.task.result.filePath, "F:/project/assets/image.png");
});

test("plugin gateway filters reverse tasks by provider and session", async (t) => {
  const taskQueue = createAutomationTaskQueue({ capacity: 4 });
  const server = createPluginGatewayServer({ taskQueue });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    taskQueue.close();
    server.close();
    await once(server, "close");
  });
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  const submitted = await postJson(baseUrl, "/automation/tasks", automationTask("grok-session-a"));
  const mismatch = await fetch(`${baseUrl}/automation/next?provider=grok&sessionId=session-other&waitMs=5`).then((response) => response.json());
  assert.equal(mismatch.task, null);

  const match = await fetch(`${baseUrl}/automation/next?provider=grok&sessionId=session-grok-session-a&waitMs=5`).then((response) => response.json());
  assert.equal(match.task.taskId, submitted.payload.taskId);
});

test("plugin gateway validates automation tasks and reports queue saturation", async (t) => {
  const taskQueue = createAutomationTaskQueue({ capacity: 1 });
  const server = createPluginGatewayServer({ taskQueue });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    taskQueue.close();
    server.close();
    await once(server, "close");
  });
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  const invalid = await postJson(baseUrl, "/automation/tasks", { version: 1 });
  assert.equal(invalid.response.status, 400);
  assert.equal(invalid.payload.error, "INVALID_AUTOMATION_TASK");

  assert.equal((await postJson(baseUrl, "/automation/tasks", automationTask("capacity-1"))).response.status, 202);
  const saturated = await postJson(baseUrl, "/automation/tasks", automationTask("capacity-2"));
  assert.equal(saturated.response.status, 429);
  assert.equal(saturated.payload.error, "AUTOMATION_QUEUE_FULL");
});

test("plugin gateway saves images atomically inside a configured project workspace", async (t) => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-image-gateway-"));
  const productRoot = path.join(tempRoot, "plugin");
  const configDir = path.join(productRoot, "config");
  const dataDir = path.join(productRoot, "data");
  const projectRoot = path.join(tempRoot, "project");
  const outsideRoot = path.join(tempRoot, "outside");
  await Promise.all([
    fs.mkdir(configDir, { recursive: true }),
    fs.mkdir(projectRoot, { recursive: true }),
    fs.mkdir(outsideRoot, { recursive: true }),
  ]);
  await fs.writeFile(path.join(configDir, "allowed-directories.local.txt"), `${projectRoot}\n`, "utf8");
  const server = createPluginGatewayServer({ productRoot, configDir, dataDir });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    server.closeAllSessions();
    server.close();
    await once(server, "close");
    await fs.rm(tempRoot, { recursive: true, force: true });
  });
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const targetDirectory = path.join(projectRoot, "assets");
  const firstBytes = Buffer.from("complete-image-one");
  const secondBytes = Buffer.from("complete-image-two-with-more-bytes");

  const [first, second] = await Promise.all([
    postJson(baseUrl, "/save-gpt-image", {
      mimeType: "image/png",
      base64: firstBytes.toString("base64"),
      targetDirectory,
      fileName: "generated.png",
    }),
    postJson(baseUrl, "/save-gpt-image", {
      mimeType: "image/png",
      base64: secondBytes.toString("base64"),
      targetDirectory,
      fileName: "generated.png",
    }),
  ]);

  assert.equal(first.response.status, 200);
  assert.equal(second.response.status, 200);
  const saved = await fs.readFile(path.join(targetDirectory, "generated.png"));
  assert.ok(saved.equals(firstBytes) || saved.equals(secondBytes));

  const rejected = await postJson(baseUrl, "/save-gpt-image", {
    mimeType: "image/png",
    base64: firstBytes.toString("base64"),
    targetDirectory: outsideRoot,
    fileName: "rejected.png",
  });
  assert.equal(rejected.response.status, 403);
  assert.equal(rejected.payload.error, "OUTPUT_PATH_NOT_ALLOWED");
  await assert.rejects(fs.access(path.join(outsideRoot, "rejected.png")), /ENOENT/);
});
