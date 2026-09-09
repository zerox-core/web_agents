import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { createSessionFilesystemRegistry } from "./session-filesystem-registry.mjs";

async function createFixture(t) {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-session-registry-"));
  const repoRoot = path.join(tempRoot, "plugin");
  const allowedRoot = path.join(tempRoot, "project");
  const outsideRoot = path.join(tempRoot, "outside");
  const configFile = path.join(tempRoot, "allowed-directories.local.txt");
  const permissionStoreDir = path.join(tempRoot, "permissions");
  const auditFile = path.join(tempRoot, "audit", "writes.jsonl");
  await Promise.all([
    fs.mkdir(repoRoot, { recursive: true }),
    fs.mkdir(allowedRoot, { recursive: true }),
    fs.mkdir(outsideRoot, { recursive: true }),
  ]);
  await fs.writeFile(configFile, `${allowedRoot}\n`, "utf8");
  t.after(() => fs.rm(tempRoot, { recursive: true, force: true }));
  return { repoRoot, allowedRoot, outsideRoot, configFile, permissionStoreDir, auditFile };
}

test("session registry validates workspaces and injects all local-core paths", async (t) => {
  const fixture = await createFixture(t);
  const calls = [];
  const toolFactory = (options) => {
    calls.push(options);
    return { definitions: [], call() {} };
  };
  const registry = createSessionFilesystemRegistry({ ...fixture, toolFactory });

  const tools = await registry.get({ sessionId: "session-a", workspaceRoot: fixture.allowedRoot });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].repoRoot, path.resolve(fixture.allowedRoot));
  assert.equal(calls[0].configFile, path.resolve(fixture.configFile));
  assert.equal(calls[0].permissionStoreDir, path.resolve(fixture.permissionStoreDir));
  assert.equal(calls[0].auditFile, path.resolve(fixture.auditFile));
  assert.strictEqual(
    await registry.get({ sessionId: "session-a", workspaceRoot: fixture.allowedRoot }),
    tools
  );
  assert.equal(calls.length, 1);
});

test("session registry rejects a workspace outside configured roots", async (t) => {
  const fixture = await createFixture(t);
  const registry = createSessionFilesystemRegistry({
    ...fixture,
    toolFactory: () => ({ definitions: [], call() {} }),
  });

  await assert.rejects(
    () => registry.get({ sessionId: "session-b", workspaceRoot: fixture.outsideRoot }),
    (error) => error?.code === "WORKSPACE_NOT_ALLOWED"
  );
});
