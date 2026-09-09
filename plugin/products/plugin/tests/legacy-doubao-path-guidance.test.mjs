import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const bundlePath = path.join(
  testDir,
  "../../../extensions/mcp-superassistant-local-fixed/content/index-main.iife.js",
);

test("Doubao instructions require absolute paths and contain no executable example", async () => {
  const source = await fs.readFile(bundlePath, "utf8");
  const start = source.indexOf("[web_Agent 豆包简版说明]");
  assert.ok(start >= 0, "Doubao-specific instructions should exist");

  const section = source.slice(start, start + 2500);
  assert.match(section, /path、source、destination 参数必须使用用户明确提供的 Windows 绝对路径/);
  assert.match(section, /用户没有提供绝对路径时，只询问路径，不要调用工具/);
  assert.match(section, /工具返回失败后，根据错误修正参数或询问用户，不得原样重复调用/);
  assert.match(section, /插件会自动核对并授权该目录/);
  assert.match(section, /不要先查询白名单，也不要改写路径/);
  assert.doesNotMatch(section, /```jsonl/);
  assert.doesNotMatch(section, /function_call_start/);
});
