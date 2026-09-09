import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const extensionRoot = path.join(repoRoot, "extensions", "mcp-superassistant-local-fixed");

test("local fixed MCP extension loads the Grok automation sidecar after its input integration", async () => {
  const manifest = JSON.parse(await fs.readFile(path.join(extensionRoot, "manifest.json"), "utf8"));
  const grokScripts = manifest.content_scripts.filter((entry) =>
    entry.js.includes("content/index-main.iife.js")
      && entry.matches.some((match) => /grok\.com|x\.com|twitter\.com/.test(match))
  );

  assert.ok(grokScripts.length >= 2);
  for (const entry of grokScripts) {
    assert.deepEqual(entry.js, [
      "content/index-main.iife.js",
      "content/local-automation-bridge.js",
      "content/grok-zh-localization.js",
    ]);
  }
  const enhancer = manifest.content_scripts.find((entry) => entry.js.includes("content/web-agent-result-enhancer.js"));
  assert.deepEqual(enhancer.js, ["content/web-agent-result-enhancer.js", "content/web-agent-insert-fallback.js"]);
  const deepSeek = manifest.content_scripts.find((entry) => entry.matches.includes("*://*.chat.deepseek.com/*"));
  const doubao = manifest.content_scripts.find((entry) => entry.matches.includes("*://*.doubao.com/*"));
  assert.deepEqual(deepSeek.js, ["content/index-main.iife.js"]);
  assert.deepEqual(doubao.js, ["content/index-main.iife.js"]);
  assert.ok(manifest.host_permissions.includes("http://127.0.0.1:3006/*"));
  assert.ok(manifest.host_permissions.includes("http://127.0.0.1:3017/*"));
  assert.ok(manifest.host_permissions.includes("*://*.doubao.com/*"));
  assert.equal(manifest.default_locale, "zh_CN");
  assert.equal(manifest.name, "web_Agent");
  assert.equal(manifest.version, "1.0.2");
});

test("Grok automation sidecar uses the typed gateway without adding a replacement overlay", async () => {
  const source = await fs.readFile(path.join(extensionRoot, "content", "local-automation-bridge.js"), "utf8");

  assert.match(source, /\/automation\/next/);
  assert.match(source, /\/save-gpt-image/);
  assert.match(source, /\/automation\/tasks\/.*\/result/);
  assert.match(source, /provider/);
  assert.match(source, /sessionId/);
  assert.doesNotMatch(source, /createElement\(["'](?:aside|iframe)["']\)/);
});

test("Grok localization is scoped to MCP-owned UI and observes late-rendered controls", async () => {
  const source = await fs.readFile(path.join(extensionRoot, "content", "grok-zh-localization.js"), "utf8");

  assert.match(source, /MutationObserver/);
  assert.match(source, /mcp-/);
  assert.match(source, /MCP 设置/);
  assert.match(source, /自动插入/);
  assert.match(source, /使用说明/);
  assert.doesNotMatch(source, /createElement\(["'](?:aside|iframe)["']\)/);
});

test("background migrates the legacy localhost MCP endpoint", async () => {
  const background = await fs.readFile(path.join(extensionRoot, "background.js"), "utf8");

  assert.doesNotMatch(background, /localhost:3006/);
  assert.match(background, /http:\/\/127\.0\.0\.1:3006\/sse/);
  assert.match(background, /hostname === "localhost"/);
  assert.match(background, /chrome\.storage\.local\.set\(\{\s*mcpServerUrl:/);
});

test("main model entry preserves the readable GitHub prompt injection", async () => {
  const source = await fs.readFile(path.join(extensionRoot, "content", "index-main.iife.js"), "utf8");
  assert.match(source, /\[web_Agent 使用说明\]\[重要\]/);
  assert.match(source, /你正在网页中通过 web_Agent 使用本地 MCP 工具/);
  assert.match(source, /所有工具调用必须放在独立的/);
  assert.match(source, /## web_Agent 可用工具/);
  assert.doesNotMatch(source, /浣跨敤璇存槑|鏆傛棤鍙敤宸ュ叿|宸ュ叿璋冪敤/);
  assert.match(source, /DeepSeekAdapter/);
  assert.match(source, /web_Agent/);
});

test("main model instructions keep multi-step tool work queued until one final report", async () => {
  const mainEntry = await fs.readFile(path.join(extensionRoot, "content/index-main.iife.js"), "utf8");

  assert.match(mainEntry, /多步骤任务必须维护待办队列/);
  assert.match(mainEntry, /全部步骤完成后再统一汇报/);
  assert.match(mainEntry, /收到每个工具结果后继续执行队列中的下一项/);
});

test("provider-specific model instructions expose safe single-file deletion", async () => {
  const mainEntry = await fs.readFile(path.join(extensionRoot, "content/index-main.iife.js"), "utf8");

  assert.match(mainEntry, /delete_file：path（仅删除单个文件）/);
  assert.match(mainEntry, /read_multiple_files、write_file、delete_file、list_directory/);
});

test("model instructions treat user-entered absolute paths as explicit authorization", async () => {
  const mainEntry = await fs.readFile(path.join(extensionRoot, "content/index-main.iife.js"), "utf8");

  assert.match(mainEntry, /视为对该路径的主动操作授权/);
  assert.match(mainEntry, /不要先调用 list_allowed_directories/);
  assert.match(mainEntry, /插件会核对用户输入并自动保存目录授权/);
});

test("delete_file is migrated into existing saved tool selections", async () => {
  const mainEntry = await fs.readFile(path.join(extensionRoot, "content/index-main.iife.js"), "utf8");

  assert.match(mainEntry, /availableTools\.some\([^)]*name==="delete_file"/);
  assert.match(mainEntry, /s\.add\("delete_file"\),await qh\(s\)/);
});
