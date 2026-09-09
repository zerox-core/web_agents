import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const extensionRoot = path.join(testDir, "../../../extensions/mcp-superassistant-local-fixed");

test("Grok uses the unified localized entry while retaining its adapter", async () => {
  const manifest = JSON.parse(await fs.readFile(path.join(extensionRoot, "manifest.json"), "utf8"));
  const grokEntries = manifest.content_scripts.filter((entry) =>
    entry.matches.some((match) => /grok\.com|x\.com|twitter\.com/.test(match))
      && entry.js.some((file) => file.includes("content/index")),
  );

  assert.equal(grokEntries.length, 2);
  for (const entry of grokEntries) {
    assert.deepEqual(entry.js, [
      "content/index-main.iife.js",
      "content/local-automation-bridge.js",
      "content/grok-zh-localization.js",
    ]);
  }

  const mainBundle = await fs.readFile(path.join(extensionRoot, "content/index-main.iife.js"), "utf8");
  assert.match(mainBundle, /GrokAdapter/);
  assert.match(mainBundle, /name:"grok-adapter"/);

  const registryStart = mainBundle.indexOf("async registerBuiltInAdapters(){");
  assert.ok(registryStart >= 0, "built-in adapter registry should exist");
  const registrySection = mainBundle.slice(registryStart, registryStart + 30000);
  assert.match(
    registrySection,
    /name:"deepseek-adapter"[\s\S]{0,2500}name:"grok-adapter"[\s\S]{0,2500}name:"doubao-adapter"/,
  );
  assert.doesNotMatch(mainBundle, /#mthis\.registerAdapterFactory/);
});

test("Grok adapter recognizes the current localized composer controls", async () => {
  const mainBundle = await fs.readFile(path.join(extensionRoot, "content/index-main.iife.js"), "utf8");

  assert.match(mainBundle, /button\[aria-label\*="语音模式"\]/);
  assert.match(mainBundle, /\.ms-auto\.flex\.flex-row\.items-end\.gap-1/);
  assert.match(mainBundle, /div\[contenteditable="true"\]/);
});

test("Grok uses a non-invasive bridge prompt without executable placeholder examples", async () => {
  const mainBundle = await fs.readFile(path.join(extensionRoot, "content/index-main.iife.js"), "utf8");

  assert.match(mainBundle, /web_Agent Grok 工具桥接说明/);
  assert.match(mainBundle, /不得使用 function_name 等示例占位符/);
});

test("Grok localization covers the unified panel and traverses shadow roots", async () => {
  const source = await fs.readFile(path.join(extensionRoot, "content/grok-zh-localization.js"), "utf8");

  for (const label of [
    "MCP SuperAssistant",
    "Available Tools",
    "Push Content Mode",
    "Enable All",
    "Disable All",
    "Individual Tools",
  ]) {
    assert.match(source, new RegExp(`\\[\\"${label.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}\\"`));
  }
  assert.match(source, /shadowRoot/);
});

test("the unified panel contains no remaining English connection labels", async () => {
  const mainBundle = await fs.readFile(path.join(extensionRoot, "content/index-main.iife.js"), "utf8");

  for (const label of [
    "Server connection lost. Click the refresh button to reconnect.",
    "Server connection error. Check your configuration and try again.",
    "Connecting to extension services...",
    "Connection Type",
    "Server URI",
    "Available transports:",
    "Last updated:",
    "Last reconnect:",
  ]) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.doesNotMatch(mainBundle, new RegExp(`"${escaped}"`));
  }

  assert.match(mainBundle, /服务器连接错误，请检查配置后重试。/);
  assert.match(mainBundle, /连接类型/);
  assert.match(mainBundle, /服务器地址/);
});
