import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const backgroundSource = fs.readFileSync(
  path.join(testDir, "../../../extensions/mcp-superassistant-local-fixed/background.js"),
  "utf8",
);

test("active background keeps permission request payloads for approve-and-retry", () => {
  assert.ok(backgroundSource.includes("WEB_AGENT_PERMISSION_PENDING_CALLS_KEY"));
  assert.ok(backgroundSource.includes("chrome.storage.local.set({ [WEB_AGENT_PERMISSION_PENDING_CALLS_KEY]: e })"));
  assert.ok(backgroundSource.includes("findWebAgentPermissionMarker(s)"));
  assert.ok(backgroundSource.includes("rememberWebAgentPermissionCall(m, { toolName: c, args: l || {}, adapterName: d })"));
  assert.ok(backgroundSource.includes('o._webAgentPermission = { requestId: t.requestId, token: n.token }'));
  assert.ok(backgroundSource.includes('e.payload.approvalMode === "directory" ? "directory" : "once"'));
  assert.ok(backgroundSource.includes('e.command === "webAgentManualToolCall"'));
  assert.ok(backgroundSource.includes('throw new Error("MANUAL_TOOL_NOT_ALLOWED")'));
  assert.ok(backgroundSource.includes("findWebAgentPermissionMarker(s)"));
  assert.ok(backgroundSource.includes("rememberWebAgentPermissionCall(i, { toolName: r, args: n || {}, adapterName: o })"));
  assert.ok(backgroundSource.includes('e.command === "webAgentPermissionApprove"'));
  assert.ok(backgroundSource.includes('e.command === "webAgentPermissionReject"'));
  assert.ok(backgroundSource.includes('e.command === "webAgentPermissionGetLatest"'));
  assert.ok(backgroundSource.includes('e.command === "webAgentRecordExplicitPathIntent"'));
  assert.ok(backgroundSource.includes("WEB_AGENT_EXPLICIT_PATH_INTENTS_KEY"));
  assert.ok(backgroundSource.includes("webAgentIntentCoversPermission"));
  assert.ok(backgroundSource.includes("hasWebAgentExplicitPathIntent"));
  assert.ok(backgroundSource.includes('approvalMode: "directory"'));
  assert.ok(backgroundSource.includes("isWebAgentPermissionSender"));
  assert.ok(backgroundSource.includes('error: "PERMISSION_LOOKUP_DENIED"'));
});
