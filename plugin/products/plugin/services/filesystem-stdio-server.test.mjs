import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  approvePermissionRequest,
} from "./permission-store-adapter.mjs";
import {
  buildPermissionRequiredResult,
  callTool,
  CONTROLLER_TOOL_CAPABILITY,
  getAllowedDirectories,
  getWritablePermissionCheck,
} from "./filesystem-stdio-server.mjs";

const serverPath = fileURLToPath(new URL("./filesystem-stdio-server.mjs", import.meta.url));

function parsePermissionMarker(result) {
  const match = result.content[0].text.match(
    /WEB_AGENT_PERMISSION_REQUEST\s*([\s\S]*?)\s*END_WEB_AGENT_PERMISSION_REQUEST/
  );
  assert.ok(match, "permission result should include a structured marker");
  return JSON.parse(match[1]);
}

test("reloads writable whitelist without restarting the process", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-fs-"));
  const repoRoot = path.join(tempRoot, "repo");
  const extraRoot = path.join(tempRoot, "extra");
  const configFile = path.join(tempRoot, "allowed.txt");

  await fs.mkdir(repoRoot, { recursive: true });
  await fs.mkdir(extraRoot, { recursive: true });
  await fs.writeFile(configFile, `${repoRoot}\n`, "utf8");

  const first = await getAllowedDirectories({ repoRoot, configFile });
  assert.deepEqual(first, [path.resolve(repoRoot)]);

  await fs.appendFile(configFile, `${extraRoot}\n`, "utf8");

  const second = await getAllowedDirectories({ repoRoot, configFile });
  assert.deepEqual(second, [path.resolve(repoRoot), path.resolve(extraRoot)]);
});

test("write outside whitelist returns scoped browser approval guidance", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-fs-"));
  const repoRoot = path.join(tempRoot, "repo");
  const outsideRoot = path.join(tempRoot, "outside");
  const targetFile = path.join(outsideRoot, "note.md");
  const configFile = path.join(tempRoot, "allowed.txt");

  await fs.mkdir(repoRoot, { recursive: true });
  await fs.mkdir(outsideRoot, { recursive: true });
  await fs.writeFile(configFile, `${repoRoot}\n`, "utf8");

  const allowedDirectories = await getAllowedDirectories({ repoRoot, configFile });
  const permission = await getWritablePermissionCheck(targetFile, allowedDirectories);

  assert.equal(permission.allowed, false);
  assert.deepEqual(permission.directoriesToApprove, [path.resolve(outsideRoot)]);

  const result = buildPermissionRequiredResult({
    operation: "write_file",
    targetPaths: [targetFile],
    directoriesToApprove: permission.directoriesToApprove,
  });

  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /需要授权/);
  assert.match(result.content[0].text, /仅本次/);
  assert.match(result.content[0].text, /始终允许此目录/);
  assert.match(result.content[0].text, /无需重启/);
  assert.doesNotMatch(result.content[0].text, /F:\\web_agents/);
});

test("all mutating tools reject targets outside the writable whitelist", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-fs-"));
  const repoRoot = path.join(tempRoot, "repo");
  const outsideRoot = path.join(tempRoot, "outside");
  const configFile = path.join(tempRoot, "allowed.txt");
  const permissionStoreDir = path.join(tempRoot, "permissions");
  const editTarget = path.join(outsideRoot, "edit.md");
  const moveSource = path.join(outsideRoot, "move-source.md");
  const moveDestination = path.join(outsideRoot, "move-destination.md");
  const deleteTarget = path.join(outsideRoot, "delete-target.md");

  await fs.mkdir(repoRoot, { recursive: true });
  await fs.mkdir(outsideRoot, { recursive: true });
  await fs.writeFile(editTarget, "before edit", "utf8");
  await fs.writeFile(moveSource, "before move", "utf8");
  await fs.writeFile(deleteTarget, "before delete", "utf8");
  await fs.writeFile(configFile, `${repoRoot}\n`, "utf8");
  const context = { repoRoot, configFile, permissionStoreDir };

  const cases = [
    {
      name: "write_file",
      args: { path: path.join(outsideRoot, "write.md"), content: "blocked write" },
    },
    {
      name: "edit_file",
      args: { path: editTarget, oldText: "before", newText: "after" },
    },
    {
      name: "create_directory",
      args: { path: path.join(outsideRoot, "created-directory") },
    },
    {
      name: "delete_file",
      args: { path: deleteTarget },
    },
    {
      name: "move_file",
      args: { source: moveSource, destination: moveDestination },
    },
  ];

  const results = [];
  for (const { name, args } of cases) {
    results.push(await callTool(name, args, context));
  }
  assert.deepEqual(
    results.map((result) => result.isError),
    cases.map(() => true),
    "every mutating tool should require permission"
  );
  for (const [{ name }, result] of cases.map((item, index) => [item, results[index]])) {
    assert.match(result.content[0].text, new RegExp(`工具: ${name}`));
    assert.match(result.content[0].text, /WEB_AGENT_PERMISSION_REQUEST/);
  }

  await assert.rejects(fs.access(path.join(outsideRoot, "write.md")), /ENOENT/);
  assert.equal(await fs.readFile(editTarget, "utf8"), "before edit");
  await assert.rejects(fs.access(path.join(outsideRoot, "created-directory")), /ENOENT/);
  assert.equal(await fs.readFile(moveSource, "utf8"), "before move");
  assert.equal(await fs.readFile(deleteTarget, "utf8"), "before delete");
  await assert.rejects(fs.access(moveDestination), /ENOENT/);
});

test("allowed mutating tools keep working without permission tokens", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-fs-"));
  const repoRoot = path.join(tempRoot, "repo");
  const targetFile = path.join(repoRoot, "note.md");
  const movedFile = path.join(repoRoot, "moved.md");
  const createdDirectory = path.join(repoRoot, "created");
  const configFile = path.join(tempRoot, "allowed.txt");
  const context = { repoRoot, configFile };

  await fs.mkdir(repoRoot, { recursive: true });
  await fs.writeFile(configFile, `${repoRoot}\n`, "utf8");

  const first = await callTool(
    "write_file",
    { path: targetFile, content: "version 1" },
    context
  );
  assert.equal(first.isError, undefined);
  assert.match(first.content[0].text, /Successfully wrote/);
  assert.equal(await fs.readFile(targetFile, "utf8"), "version 1");

  const edited = await callTool(
    "edit_file",
    { path: targetFile, oldText: "version 1", newText: "version 2" },
    context
  );
  assert.equal(edited.isError, undefined);
  assert.equal(await fs.readFile(targetFile, "utf8"), "version 2");

  const created = await callTool("create_directory", { path: createdDirectory }, context);
  assert.equal(created.isError, undefined);
  assert.equal((await fs.stat(createdDirectory)).isDirectory(), true);

  const moved = await callTool(
    "move_file",
    { source: targetFile, destination: movedFile },
    context
  );
  assert.equal(moved.isError, undefined);
  assert.equal(await fs.readFile(movedFile, "utf8"), "version 2");

  const deleted = await callTool("delete_file", { path: movedFile }, context);
  assert.equal(deleted.isError, undefined);
  await assert.rejects(fs.access(movedFile), /ENOENT/);
});

test("controller capability bypasses only the legacy whitelist after controller authorization", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-fs-controller-capability-"));
  const repoRoot = path.join(tempRoot, "repo");
  const outsideRoot = path.join(tempRoot, "outside");
  const targetFile = path.join(outsideRoot, "controller-approved.md");
  const configFile = path.join(tempRoot, "allowed.txt");
  await Promise.all([
    fs.mkdir(repoRoot, { recursive: true }),
    fs.mkdir(outsideRoot, { recursive: true }),
    fs.writeFile(configFile, `${repoRoot}\n`, "utf8"),
  ]);

  const denied = await callTool("write_file", { path: targetFile, content: "denied" }, { repoRoot, configFile });
  assert.equal(denied.isError, true);
  const approved = await callTool(
    "write_file",
    { path: targetFile, content: "controller-approved" },
    { repoRoot, configFile, controllerCapability: CONTROLLER_TOOL_CAPABILITY },
  );
  assert.equal(approved.isError, undefined);
  assert.equal(await fs.readFile(targetFile, "utf8"), "controller-approved");
});

test("legacy plugin one-time permission token authorizes exactly one outside write", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-fs-"));
  const repoRoot = path.join(tempRoot, "repo");
  const outsideRoot = path.join(tempRoot, "outside");
  const targetFile = path.join(outsideRoot, "approved.md");
  const configFile = path.join(tempRoot, "allowed.txt");
  const permissionStoreDir = path.join(tempRoot, "permissions");
  const context = { repoRoot, configFile, permissionStoreDir };
  const args = { path: targetFile, content: "approved once" };

  await fs.mkdir(repoRoot, { recursive: true });
  await fs.mkdir(outsideRoot, { recursive: true });
  await fs.writeFile(configFile, `${repoRoot}\n`, "utf8");

  const denied = await callTool("write_file", args, context);
  assert.equal(denied.isError, true);
  const marker = parsePermissionMarker(denied);
  const approval = await approvePermissionRequest({
    storeDir: permissionStoreDir,
    requestId: marker.requestId,
    argsHash: marker.argsHash,
    mode: "once",
  });

  const permission = { requestId: marker.requestId, token: approval.token };
  const approved = await callTool("write_file", { ...args, _webAgentPermission: permission }, context);
  assert.equal(approved.isError, undefined);
  assert.equal(await fs.readFile(targetFile, "utf8"), "approved once");

  const reused = await callTool("write_file", { ...args, _webAgentPermission: permission }, context);
  assert.equal(reused.isError, true);
  assert.match(reused.content[0].text, /WEB_AGENT_PERMISSION_REQUEST/);
});

test("legacy filesystem writes cannot escape an allowed root through a junction", async (t) => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-fs-junction-"));
  const repoRoot = path.join(tempRoot, "repo");
  const outsideRoot = path.join(tempRoot, "outside");
  const junction = path.join(repoRoot, "linked-outside");
  const configFile = path.join(tempRoot, "allowed.txt");
  await Promise.all([
    fs.mkdir(repoRoot, { recursive: true }),
    fs.mkdir(outsideRoot, { recursive: true }),
  ]);
  try {
    await fs.symlink(outsideRoot, junction, process.platform === "win32" ? "junction" : "dir");
  } catch (error) {
    t.skip(`junction unavailable: ${error.code || error.message}`);
    return;
  }
  t.after(() => fs.rm(tempRoot, { recursive: true, force: true }));
  await fs.writeFile(configFile, `${repoRoot}\n`, "utf8");
  const target = path.join(junction, "escaped.txt");

  const result = await callTool(
    "write_file",
    { path: target, content: "must not escape" },
    { repoRoot, configFile, permissionStoreDir: path.join(tempRoot, "permissions") },
  );
  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /REPARSE_PATH_WRITE_DENIED/);
  assert.doesNotMatch(result.content[0].text, /WEB_AGENT_PERMISSION_REQUEST/);
  await assert.rejects(fs.access(path.join(outsideRoot, "escaped.txt")), /ENOENT/);
});

test("write_file handles JSON-decoded Windows control escapes in paths", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-fs-"));
  const repoRoot = path.join(tempRoot, "repo");
  const outsideRoot = path.join(repoRoot, "reverse");
  const targetFile = path.join(outsideRoot, "hello.md");
  const brokenTargetFile = path.join(repoRoot, "r").replace(/r$/, "\r") + "everse\\hello.md";
  const brokenContent = "line1\r\nline2";
  const configFile = path.join(tempRoot, "allowed.txt");
  const context = { repoRoot, configFile };

  await fs.mkdir(repoRoot, { recursive: true });
  await fs.mkdir(outsideRoot, { recursive: true });
  await fs.writeFile(configFile, `${repoRoot}\n`, "utf8");

  const result = await callTool(
    "write_file",
    { path: brokenTargetFile, content: brokenContent },
    context
  );

  assert.equal(result.isError, undefined);
  assert.match(result.content[0].text, /Successfully wrote/);
  assert.equal(await fs.readFile(targetFile, "utf8"), brokenContent);
});

test("stdio server flushes async tool calls before stdin closes", async () => {
  const child = spawn(process.execPath, [serverPath], {
    cwd: path.resolve(serverPath, "..", ".."),
    stdio: ["pipe", "pipe", "pipe"],
  });

  let stdout = "";
  let stderr = "";
  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");
  child.stdout.on("data", (chunk) => {
    stdout += chunk;
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk;
  });

  child.stdin.write(
    [
      JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: { protocolVersion: "2025-11-25", capabilities: {} },
      }),
      JSON.stringify({
        jsonrpc: "2.0",
        id: 2,
        method: "tools/list",
        params: {},
      }),
      JSON.stringify({
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: { name: "list_allowed_directories", arguments: {} },
      }),
    ].join("\n") + "\n"
  );
  child.stdin.end();

  const exitCode = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error("stdio server timed out"));
    }, 5000);
    child.on("error", reject);
    child.on("close", (code) => {
      clearTimeout(timeout);
      resolve(code);
    });
  });

  assert.equal(exitCode, 0, stderr);
  assert.match(stdout, /"id":1/);
  assert.match(stdout, /"id":2/);
  assert.match(stdout, /"id":3/);
  assert.doesNotMatch(stdout, /can target any local path/);
});
