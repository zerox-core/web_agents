import assert from "node:assert/strict";
import test from "node:test";

import {
  hasWebAgentWindowsAbsolutePath,
  normalizeWebAgentIntentText,
  webAgentIntentCoversPermission,
} from "../../../extensions/mcp-superassistant-local-fixed/permission-intent.js";

test("permission intent recognizes Windows paths and normalizes separators", () => {
  assert.equal(hasWebAgentWindowsAbsolutePath("写入 C:\\Users\\Lenovo\\Desktop\\作品集"), true);
  assert.equal(hasWebAgentWindowsAbsolutePath("写入 F:/projects/demo"), true);
  assert.equal(hasWebAgentWindowsAbsolutePath("删除这个文件"), false);
  assert.equal(normalizeWebAgentIntentText("F:/Projects/Demo"), "f:\\projects\\demo");
});

test("permission intent covers only directories present in the user submission", () => {
  const intent = { text: "请在 C:\\Users\\Lenovo\\Desktop\\作品集 目录创建中文文件" };

  assert.equal(webAgentIntentCoversPermission(intent, {
    directoriesToApprove: ["C:\\Users\\Lenovo\\Desktop\\作品集"],
  }), true);
  assert.equal(webAgentIntentCoversPermission(intent, {
    directoriesToApprove: ["C:\\Users\\Lenovo\\Documents"],
  }), false);
  assert.equal(webAgentIntentCoversPermission(intent, {
    directoriesToApprove: ["C:\\Users\\Lenovo\\Desktop\\作品集", "D:\\other"],
  }), false);
});
