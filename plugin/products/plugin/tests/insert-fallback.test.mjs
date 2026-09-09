import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

function loadContentScriptExports(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, console }, { filename: filePath });
  return module.exports;
}

const testDir = path.dirname(fileURLToPath(import.meta.url));
const insertFallback = loadContentScriptExports(path.join(
  testDir,
  "../../../extensions/mcp-superassistant-local-fixed/content/web-agent-insert-fallback.js"
));
const activeInsertFallback = loadContentScriptExports(path.join(
  testDir,
  "../../../extensions/mcp-superassistant-local-fixed/content/web-agent-insert-fallback.js",
));

test("isInsertButtonText recognizes exact insert labels with leading icon text", () => {
  assert.equal(insertFallback.isInsertButtonText("插入"), true);
  assert.equal(insertFallback.isInsertButtonText("➜ 插入"), true);
  assert.equal(insertFallback.isInsertButtonText("Insert"), true);
  assert.equal(insertFallback.isInsertButtonText("插入说明"), false);
});

test("extractToolResultText returns stable tool output for insert fallback", () => {
  const cardText = [
    "list_allowed_directories",
    "显示原始信息",
    "运行",
    "Writable allowed directories:",
    "- F:\\web_agents",
    "- C:\\Users\\Lenovo\\Desktop",
    "插入",
    "附加 File",
    "执行历史",
    "工具: list_allowed_directories",
  ].join("\n");

  assert.equal(
    insertFallback.extractToolResultText(cardText),
    "Writable allowed directories:\n- F:\\web_agents\n- C:\\Users\\Lenovo\\Desktop",
  );
});

test("extractToolResultText stops before nested stable result marker", () => {
  const cardText = [
    "list_allowed_directories",
    "显示原始信息",
    "运行",
    "Writable allowed directories:",
    "- F:\\web_agents",
    "web_Agent 稳定结果",
    "nested text that must not be inserted",
    "执行历史",
    "工具: list_allowed_directories",
  ].join("\n");

  assert.equal(
    insertFallback.extractToolResultText(cardText),
    "Writable allowed directories:\n- F:\\web_agents",
  );
});

test("active DeepSeek submit fallback requires an automatic function result", () => {
  const result = [
    '<function_result call_id="5">',
    "Successfully wrote 22 bytes",
    "</function_result>",
  ].join("\n");

  assert.equal(activeInsertFallback.shouldAutoSubmitText(result, { autoSubmit: true }), true);
  assert.equal(activeInsertFallback.shouldAutoSubmitText(result, { autoSubmit: false }), false);
  assert.equal(activeInsertFallback.shouldAutoSubmitText("ordinary user text", { autoSubmit: true }), false);
  assert.equal(
    activeInsertFallback.shouldAutoSubmitText(`${result}\nextra user text`, { autoSubmit: true }),
    false,
  );
});
