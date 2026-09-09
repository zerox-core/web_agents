import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  approvePermissionRequest,
  consumePermissionToken,
  createPermissionRequest,
  rejectPermissionRequest,
} from "./permission-store-adapter.mjs";

test("permission store issues a one-time token and consumes it only for matching request details", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-perm-"));
  const storeDir = path.join(tempRoot, "permissions");
  const targetPath = path.join(tempRoot, "outside", "note.md");
  await fs.mkdir(path.dirname(targetPath), { recursive: true });

  const request = await createPermissionRequest({
    storeDir,
    operation: "write_file",
    targetPaths: [targetPath],
    directoriesToApprove: [path.dirname(targetPath)],
    args: { path: targetPath, content: "secret content" },
    ttlMs: 60_000,
  });

  assert.match(request.requestId, /^wapr_/);
  assert.match(request.argsHash, /^[a-f0-9]{64}$/);
  assert.equal(request.status, "pending");

  const approval = await approvePermissionRequest({
    storeDir,
    requestId: request.requestId,
    argsHash: request.argsHash,
    mode: "once",
  });

  assert.equal(approval.status, "approved");
  assert.match(approval.token, /^wapt_/);

  const consumed = await consumePermissionToken({
    storeDir,
    requestId: request.requestId,
    token: approval.token,
    operation: "write_file",
    targetPaths: [targetPath],
    argsHash: request.argsHash,
  });
  assert.equal(consumed.allowed, true);

  const reused = await consumePermissionToken({
    storeDir,
    requestId: request.requestId,
    token: approval.token,
    operation: "write_file",
    targetPaths: [targetPath],
    argsHash: request.argsHash,
  });
  assert.equal(reused.allowed, false);
  assert.equal(reused.reason, "TOKEN_ALREADY_USED");
});

test("permission store rejects pending requests and refuses later approval", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-perm-"));
  const storeDir = path.join(tempRoot, "permissions");
  const targetPath = path.join(tempRoot, "outside", "note.md");

  const request = await createPermissionRequest({
    storeDir,
    operation: "write_file",
    targetPaths: [targetPath],
    directoriesToApprove: [path.dirname(targetPath)],
    args: { path: targetPath, content: "secret content" },
    ttlMs: 60_000,
  });

  const rejected = await rejectPermissionRequest({ storeDir, requestId: request.requestId });
  assert.equal(rejected.status, "rejected");

  await assert.rejects(
    () => approvePermissionRequest({ storeDir, requestId: request.requestId, argsHash: request.argsHash }),
    /REQUEST_NOT_PENDING/
  );
});
