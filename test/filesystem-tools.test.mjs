import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

import {
  createFilesystemTools,
  getWritablePermissionCheck,
} from "../src/filesystem-tools.mjs";

test("filesystem tools require product-owned paths", () => {
  assert.throws(() => createFilesystemTools({}), /FILESYSTEM_TOOL_PATHS_REQUIRED/);
});

test("filesystem tools use only paths supplied by the product adapter", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-filesystem-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const runtime = createFilesystemTools({
    repoRoot: root,
    configFile: path.join(root, "config", "allowed.txt"),
    permissionStoreDir: path.join(root, "permissions"),
    auditFile: path.join(root, "audit", "writes.jsonl"),
  });
  const target = path.join(root, "result.txt");

  const result = await runtime.call("write_file", { path: target, content: "ready" });

  assert.equal(result.isError, undefined);
  assert.equal(await fs.readFile(target, "utf8"), "ready");
  assert.match(await fs.readFile(path.join(root, "audit", "writes.jsonl"), "utf8"), /write_file/);
  assert.equal(runtime.definitions.some((tool) => tool.name === "write_file"), true);
});

test("permission suggestions keep the exact target directory even when it does not exist", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-permission-root-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const targetDirectory = path.join(root, "new-workspace");
  const allowedDirectory = path.join(root, "allowed");
  await fs.mkdir(allowedDirectory);

  const decision = await getWritablePermissionCheck(
    path.join(targetDirectory, "note.txt"),
    [allowedDirectory]
  );

  assert.equal(decision.allowed, false);
  assert.deepEqual(decision.directoriesToApprove, [path.resolve(targetDirectory)]);
});

test("delete_file removes only files in allowed directories and records an audit entry", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-delete-file-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const auditFile = path.join(root, "audit", "writes.jsonl");
  const runtime = createFilesystemTools({
    repoRoot: root,
    configFile: path.join(root, "config", "allowed.txt"),
    permissionStoreDir: path.join(root, "permissions"),
    auditFile,
  });
  const target = path.join(root, "remove-me.txt");
  const directory = path.join(root, "keep-directory");
  await fs.writeFile(target, "remove", "utf8");
  await fs.mkdir(directory);

  const result = await runtime.call("delete_file", { path: target });

  assert.equal(result.isError, undefined);
  await assert.rejects(fs.access(target));
  assert.match(await fs.readFile(auditFile, "utf8"), /delete_file/);
  await assert.rejects(runtime.call("delete_file", { path: directory }), /directories cannot be deleted/);
});

test("search_content returns file:line matches and respects include filters", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-search-content-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const runtime = createFilesystemTools({
    repoRoot: root,
    configFile: path.join(root, "config", "allowed.txt"),
    permissionStoreDir: path.join(root, "permissions"),
    auditFile: path.join(root, "audit", "writes.jsonl"),
  });
  await fs.mkdir(path.join(root, "sub"), { recursive: true });
  await fs.writeFile(path.join(root, "sub", "a.mjs"), "alpha needle\nnothing here\nneedle again\n", "utf8");
  await fs.writeFile(path.join(root, "b.md"), "no matches in this file\n", "utf8");
  await fs.mkdir(path.join(root, "node_modules", "pkg"), { recursive: true });
  await fs.writeFile(path.join(root, "node_modules", "pkg", "c.mjs"), "needle in node_modules\n", "utf8");

  const result = await runtime.call("search_content", { path: root, pattern: "needle" });

  assert.equal(result.isError, undefined);
  const text = result.content[0].text;
  assert.match(text, /Found 2 match\(es\)/);
  assert.match(text, new RegExp(`a\.mjs:1: alpha needle`.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(text, /a\.mjs:3: needle again/);
  assert.doesNotMatch(text, /node_modules/);

  const filtered = await runtime.call("search_content", { path: root, pattern: "needle", include: "*.txt" });
  assert.match(filtered.content[0].text, /No matches found\./);

  await assert.rejects(
    runtime.call("search_content", { path: root, pattern: "needle(" }),
    /Invalid regex pattern/
  );
});

test("compare_files reports identical files and line differences", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-compare-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const runtime = createFilesystemTools({
    repoRoot: root,
    configFile: path.join(root, "config", "allowed.txt"),
    permissionStoreDir: path.join(root, "permissions"),
    auditFile: path.join(root, "audit", "writes.jsonl"),
  });
  const fileA = path.join(root, "a.md");
  const fileB = path.join(root, "b.md");
  await fs.writeFile(fileA, "one\ntwo\nthree\n", "utf8");
  await fs.writeFile(fileB, "one\nTWO CHANGED\nthree\nfour\n", "utf8");

  const identical = await runtime.call("compare_files", { path_a: fileA, path_b: fileA });
  assert.equal(identical.isError, undefined);
  assert.match(identical.content[0].text, /Files are identical\./);

  const diff = await runtime.call("compare_files", { path_a: fileA, path_b: fileB });
  const text = diff.content[0].text;
  assert.match(text, /\+2 added \/ -1 removed/);
  assert.match(text, /\+ TWO CHANGED/);
  assert.match(text, /- two/);
  assert.match(text, /\+ four/);
});

test("apply_patch creates, updates, and deletes files atomically with audit entries", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-apply-patch-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const auditFile = path.join(root, "audit", "writes.jsonl");
  const runtime = createFilesystemTools({
    repoRoot: root,
    configFile: path.join(root, "config", "allowed.txt"),
    permissionStoreDir: path.join(root, "permissions"),
    auditFile,
  });
  const existing = path.join(root, "existing.txt");
  const created = path.join(root, "created.txt");
  await fs.writeFile(existing, "hello world\n", "utf8");

  const dry = await runtime.call("apply_patch", {
    ops: [
      { action: "create", path: created, content: "new file\n" },
      { action: "update", path: existing, edits: [{ oldText: "hello", newText: "goodbye" }] },
    ],
    dryRun: true,
  });
  assert.match(dry.content[0].text, /Dry run: would apply 2 op\(s\)/);
  assert.equal(await fs.readFile(existing, "utf8"), "hello world\n");

  const applied = await runtime.call("apply_patch", {
    ops: [
      { action: "create", path: created, content: "new file\n" },
      { action: "update", path: existing, edits: [{ oldText: "hello", newText: "goodbye" }] },
    ],
  });
  assert.equal(applied.isError, undefined);
  assert.match(applied.content[0].text, /Successfully applied 2 op\(s\)/);
  assert.equal(await fs.readFile(created, "utf8"), "new file\n");
  assert.equal(await fs.readFile(existing, "utf8"), "goodbye world\n");
  assert.match(await fs.readFile(auditFile, "utf8"), /apply_patch/);

  const cleanup = await runtime.call("apply_patch", { ops: [{ action: "delete", path: created }] });
  assert.equal(cleanup.isError, undefined);
  await assert.rejects(fs.access(created));

  await assert.rejects(
    runtime.call("apply_patch", { ops: [{ action: "update", path: existing, edits: [{ oldText: "missing", newText: "x" }] }] }),
    /Could not find oldText/
  );
  await assert.rejects(
    runtime.call("apply_patch", { ops: [{ action: "create", path: existing, content: "dup" }] }),
    /already exists/
  );
  await assert.rejects(
    runtime.call("apply_patch", { ops: [] }),
    /non-empty ops array/
  );
});


test("git_status and git_diff report branch, changes, and diffs", async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-git-"));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  const runtime = createFilesystemTools({
    repoRoot: dir,
    configFile: path.join(dir, "config", "allowed.txt"),
    permissionStoreDir: path.join(dir, "permissions"),
    auditFile: path.join(dir, "audit", "writes.jsonl"),
  });
  const runGit = (args) => execFileAsync("git", args, { cwd: dir });
  await runGit(["init", "-q"]);
  await runGit(["config", "user.email", "test@example.com"]);
  await runGit(["config", "user.name", "Test"]);
  await fs.writeFile(path.join(dir, ".gitignore"), "config/\npermissions/\naudit/\n");
  await fs.writeFile(path.join(dir, "a.md"), "one\n");
  await runGit(["add", ".gitignore", "a.md"]);
  await runGit(["commit", "-q", "-m", "init"]);

  const clean = await runtime.call("git_status", { path: dir });
  assert.match(clean.content[0].text, /No changes \(working tree clean\)/);

  await fs.writeFile(path.join(dir, "b.md"), "hello\n");
  await fs.writeFile(path.join(dir, "a.md"), "one changed\n");

  const status = await runtime.call("git_status", { path: dir });
  const statusText = status.content[0].text;
  assert.match(statusText, /\?\? b\.md/);
  assert.match(statusText, /M {1,2}a\.md/);

  const diff = await runtime.call("git_diff", { path: dir, file: "a.md" });
  const diffText = diff.content[0].text;
  if (/Falling back/.test(diffText)) {
    assert.match(diffText, /a\.md/);
  } else {
    assert.match(diffText, /-one/);
    assert.match(diffText, /\+one changed/);
  }

  await runGit(["add", "a.md"]);
  const staged = await runtime.call("git_diff", { path: dir, staged: true });
  assert.match(staged.content[0].text, /one changed|a\.md/);
  const unstaged = await runtime.call("git_diff", { path: dir });
  assert.match(unstaged.content[0].text, /No differences\./);
});

test("execute_command runs whitelisted commands and gates others with a permission request", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-exec-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const runtime = createFilesystemTools({
    repoRoot: root,
    configFile: path.join(root, "config", "allowed.txt"),
    permissionStoreDir: path.join(root, "permissions"),
    auditFile: path.join(root, "audit", "writes.jsonl"),
  });
  const ok = await runtime.call("execute_command", { command: "echo hello-exec" });
  assert.match(ok.content[0].text, /hello-exec/);

  const gated = await runtime.call("execute_command", { command: "definitely-not-whitelisted-xyz --do-stuff" });
  assert.match(gated.content[0].text, /WEB_AGENT_PERMISSION_REQUEST/);

  await assert.rejects(
    runtime.call("execute_command", { command: "git push origin main" }),
    /git_push/
  );
});

test("git_commit stages and commits; git_push always requires approval", async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-gitcommit-"));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  const runtime = createFilesystemTools({
    repoRoot: dir,
    configFile: path.join(dir, "config", "allowed.txt"),
    permissionStoreDir: path.join(dir, "permissions"),
    auditFile: path.join(dir, "audit", "writes.jsonl"),
  });
  const runGit = (args) => execFileAsync("git", args, { cwd: dir });
  await runGit(["init", "-q"]);
  await runGit(["config", "user.email", "test@example.com"]);
  await runGit(["config", "user.name", "Test"]);
  await fs.writeFile(path.join(dir, ".gitignore"), "config/\npermissions/\naudit/\n");
  await runGit(["add", ".gitignore"]);
  await runGit(["commit", "-q", "-m", "init"]);

  await fs.writeFile(path.join(dir, "new.md"), "fresh\n");
  const committed = await runtime.call("git_commit", { path: dir, message: "add new.md" });
  assert.match(committed.content[0].text, /Committed [0-9a-f]{7}/);
  const log = await runGit(["--no-pager", "log", "--oneline"]);
  assert.match(log.stdout, /add new\.md/);

  const clean = await runtime.call("git_commit", { path: dir, message: "noop" });
  assert.match(clean.content[0].text, /Nothing to commit/);

  const pushed = await runtime.call("git_push", { path: dir });
  assert.match(pushed.content[0].text, /WEB_AGENT_PERMISSION_REQUEST/);
});


test("ping, workspace_context, list_local_workspaces, inspect_development_environment report state", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-batch3-info-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const runtime = createFilesystemTools({
    repoRoot: root,
    configFile: path.join(root, "config", "allowed.txt"),
    permissionStoreDir: path.join(root, "permissions"),
    auditFile: path.join(root, "audit", "writes.jsonl"),
  });

  const ping = await runtime.call("ping", {});
  assert.equal(ping.isError, undefined);
  const pingData = JSON.parse(ping.content[0].text);
  assert.equal(pingData.ok, true);
  assert.equal(pingData.service, "web-agents-local-core");

  const context = await runtime.call("workspace_context", {});
  const contextData = JSON.parse(context.content[0].text);
  assert.equal(contextData.repoRoot, path.resolve(root));
  assert.ok(Array.isArray(contextData.allowedDirectories));

  const workspaces = await runtime.call("list_local_workspaces", {});
  assert.match(workspaces.content[0].text, /Allowed directories:/);
  assert.match(workspaces.content[0].text, /（无登记项目）|Registered development projects/);

  const env = await runtime.call("inspect_development_environment", {});
  assert.match(env.content[0].text, /platform:/);
  assert.match(env.content[0].text, /node:/);
});

test("todo_write and todo_read roundtrip with validation", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-todo-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const runtime = createFilesystemTools({
    repoRoot: root,
    configFile: path.join(root, "config", "allowed.txt"),
    permissionStoreDir: path.join(root, "permissions"),
    auditFile: path.join(root, "audit", "writes.jsonl"),
  });

  const empty = await runtime.call("todo_read", {});
  assert.match(empty.content[0].text, /todo 列表为空/);

  const saved = await runtime.call("todo_write", {
    todos: [
      { content: "第一步", status: "pending" },
      { id: "custom-2", content: "第二步", status: "in_progress" },
    ],
  });
  assert.match(saved.content[0].text, /已保存 2 条 todo/);

  const read = await runtime.call("todo_read", {});
  const data = JSON.parse(read.content[0].text);
  assert.equal(data.todos.length, 2);
  assert.equal(data.todos[0].id, "todo-1");
  assert.equal(data.todos[1].id, "custom-2");
  assert.equal(data.todos[1].status, "in_progress");

  await assert.rejects(
    runtime.call("todo_write", { todos: [{ content: "", status: "pending" }] }),
    /content 不能为空/
  );
  await assert.rejects(
    runtime.call("todo_write", { todos: [{ content: "x", status: "bogus" }] }),
    /status/
  );
});

test("web_fetch gates unknown origins with a permission request", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-webfetch-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const runtime = createFilesystemTools({
    repoRoot: root,
    configFile: path.join(root, "config", "allowed.txt"),
    permissionStoreDir: path.join(root, "permissions"),
    auditFile: path.join(root, "audit", "writes.jsonl"),
  });

  const gated = await runtime.call("web_fetch", { url: "https://example-not-allowed-xyz.test/" });
  assert.match(gated.content[0].text, /WEB_AGENT_PERMISSION_REQUEST/);

  await assert.rejects(
    runtime.call("web_fetch", { url: "ftp://example.com/" }),
    /不支持的协议/
  );
});

test("manage_text_transfer begin/append/commit writes the exact bytes and cleans up", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-transfer-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const auditFile = path.join(root, "audit", "writes.jsonl");
  const runtime = createFilesystemTools({
    repoRoot: root,
    configFile: path.join(root, "config", "allowed.txt"),
    permissionStoreDir: path.join(root, "permissions"),
    auditFile,
  });
  const target = path.join(root, "incoming", "note.txt");
  const payload = "hello transfer\nsecond line\n";
  const { createHash } = await import("node:crypto");
  const expectedSha256 = createHash("sha256").update(Buffer.from(payload, "utf8")).digest("hex");

  const begin = await runtime.call("manage_text_transfer", {
    action: "begin",
    path: target,
    expectedBytes: Buffer.byteLength(payload, "utf8"),
    expectedSha256,
  });
  assert.equal(begin.isError, undefined);
  const sessionId = JSON.parse(begin.content[0].text).transfer.sessionId;

  const appended = await runtime.call("manage_text_transfer", {
    action: "append",
    sessionId,
    chunkIndex: 0,
    content: payload,
  });
  assert.match(appended.content[0].text, /"writtenBytes": 27/);

  const committed = await runtime.call("manage_text_transfer", { action: "commit", sessionId });
  const commitData = JSON.parse(committed.content[0].text);
  assert.equal(commitData.ok, true);
  assert.equal(commitData.committed.sha256, expectedSha256);
  assert.equal(await fs.readFile(target, "utf8"), payload);
  assert.match(await fs.readFile(auditFile, "utf8"), /manage_text_transfer/);

  const transfersDir = path.join(root, "config", "transfers");
  const leftovers = await fs.readdir(transfersDir);
  assert.equal(leftovers.length, 0);
});

test("manage_text_transfer rejects out-of-order chunks and size mismatch", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-transfer-bad-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const runtime = createFilesystemTools({
    repoRoot: root,
    configFile: path.join(root, "config", "allowed.txt"),
    permissionStoreDir: path.join(root, "permissions"),
    auditFile: path.join(root, "audit", "writes.jsonl"),
  });
  const target = path.join(root, "bad.txt");
  const { createHash } = await import("node:crypto");
  const sha = createHash("sha256").update(Buffer.from("abc", "utf8")).digest("hex");

  const begin = await runtime.call("manage_text_transfer", {
    action: "begin",
    path: target,
    expectedBytes: 3,
    expectedSha256: sha,
  });
  const sessionId = JSON.parse(begin.content[0].text).transfer.sessionId;

  const outOfOrder = await runtime.call("manage_text_transfer", {
    action: "append",
    sessionId,
    chunkIndex: 5,
    content: "abc",
  });
  assert.match(outOfOrder.content[0].text, /CHUNK_OUT_OF_ORDER/);

  await runtime.call("manage_text_transfer", { action: "append", sessionId, chunkIndex: 0, content: "abcd" });
  const mismatch = await runtime.call("manage_text_transfer", { action: "commit", sessionId });
  assert.match(mismatch.content[0].text, /SIZE_MISMATCH/);

  const cancelled = await runtime.call("manage_text_transfer", { action: "cancel", sessionId });
  assert.match(cancelled.content[0].text, /"ok": true/);
});

test("manage_development_project add/list/remove roundtrip", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-projects-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const runtime = createFilesystemTools({
    repoRoot: root,
    configFile: path.join(root, "config", "allowed.txt"),
    permissionStoreDir: path.join(root, "permissions"),
    auditFile: path.join(root, "audit", "writes.jsonl"),
  });
  const workspace = path.join(root, "workspace");
  await fs.mkdir(workspace);

  const empty = await runtime.call("manage_development_project", { action: "list" });
  assert.match(empty.content[0].text, /（无登记项目）/);

  await runtime.call("manage_development_project", { action: "add", name: "demo", path: workspace });
  const listed = await runtime.call("manage_development_project", { action: "list" });
  assert.match(listed.content[0].text, /- demo: /);

  const missing = await runtime.call("manage_development_project", {
    action: "add",
    name: "ghost",
    path: path.join(root, "does-not-exist"),
  });
  assert.match(missing.content[0].text, /目录不存在/);

  const removed = await runtime.call("manage_development_project", { action: "remove", name: "demo" });
  assert.match(removed.content[0].text, /已移除项目 demo/);
});

test("git_workflow status/log/add_files work and push is gated", async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-gitworkflow-"));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  const runtime = createFilesystemTools({
    repoRoot: dir,
    configFile: path.join(dir, "config", "allowed.txt"),
    permissionStoreDir: path.join(dir, "permissions"),
    auditFile: path.join(dir, "audit", "writes.jsonl"),
  });
  const runGit = (args) => execFileAsync("git", args, { cwd: dir });
  await runGit(["init", "-q"]);
  await runGit(["config", "user.email", "test@example.com"]);
  await runGit(["config", "user.name", "Test"]);
  await fs.writeFile(path.join(dir, ".gitignore"), "config/\npermissions/\naudit/\n");
  await runGit(["add", ".gitignore"]);
  await runGit(["commit", "-q", "-m", "init"]);

  const status = await runtime.call("git_workflow", { action: "status", path: dir });
  assert.match(status.content[0].text, /## main|## master/);

  await fs.writeFile(path.join(dir, "extra.md"), "extra\n");
  const staged = await runtime.call("git_workflow", { action: "add_files", path: dir, files: ["extra.md"] });
  assert.match(staged.content[0].text, /已暂存 1 个文件/);

  const log = await runtime.call("git_workflow", { action: "log", path: dir, limit: 5 });
  assert.match(log.content[0].text, /init/);

  const pushed = await runtime.call("git_workflow", { action: "push", path: dir });
  assert.match(pushed.content[0].text, /WEB_AGENT_PERMISSION_REQUEST/);
});

test("node_development version is readable and npm_run is gated", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-nodedev-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const runtime = createFilesystemTools({
    repoRoot: root,
    configFile: path.join(root, "config", "allowed.txt"),
    permissionStoreDir: path.join(root, "permissions"),
    auditFile: path.join(root, "audit", "writes.jsonl"),
  });

  const version = await runtime.call("node_development", { action: "version" });
  assert.match(version.content[0].text, /node: v?\d/);

  const gated = await runtime.call("node_development", { action: "npm_run", script: "build" });
  assert.match(gated.content[0].text, /WEB_AGENT_PERMISSION_REQUEST/);
});

test("run_local_workflow is gated and logs a registered task after approval flow", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "local-core-workflow-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const runtime = createFilesystemTools({
    repoRoot: root,
    configFile: path.join(root, "config", "allowed.txt"),
    permissionStoreDir: path.join(root, "permissions"),
    auditFile: path.join(root, "audit", "writes.jsonl"),
  });

  const gated = await runtime.call("run_local_workflow", { command: "echo hi" });
  assert.match(gated.content[0].text, /WEB_AGENT_PERMISSION_REQUEST/);

  const tasks = await runtime.call("list_development_tasks", {});
  assert.match(tasks.content[0].text, /（无开发任务）/);

  const missing = await runtime.call("read_development_task_logs", { taskId: "dev-nonexistent" });
  assert.match(missing.content[0].text, /未找到任务/);
});
