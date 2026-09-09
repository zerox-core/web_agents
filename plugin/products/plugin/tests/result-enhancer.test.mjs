import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import test from "node:test";
import { fileURLToPath } from "node:url";

function loadContentScriptExports(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, console }, { filename: filePath });
  return module.exports;
}

const testDir = path.dirname(fileURLToPath(import.meta.url));
const enhancer = loadContentScriptExports(path.join(
  testDir,
  "../../../extensions/mcp-superassistant-local-fixed/content/web-agent-result-enhancer.js"
));
const activeEnhancer = loadContentScriptExports(path.join(
  testDir,
  "../../../extensions/mcp-superassistant-local-fixed/content/web-agent-result-enhancer.js",
));
const enhancerSource = fs.readFileSync(path.join(
  testDir,
  "../../../extensions/mcp-superassistant-local-fixed/content/web-agent-result-enhancer.js"
), "utf8");

test("permission panel distinguishes one-time and persistent directory approval", () => {
  assert.match(enhancerSource, /仅本次批准并重试/);
  assert.match(enhancerSource, /始终允许此目录/);
  assert.match(enhancerSource, /approvalMode: "directory"/);
  assert.match(enhancerSource, /待授权本地操作|\\u5f85\\u6388\\u6743\\u672c\\u5730\\u64cd\\u4f5c/);
});

test("extractToolResultText returns text between Run and execution history", () => {
  const cardText = [
    "list_directory",
    "显示原始信息",
    "运行",
    "[FILE] a.txt",
    "[DIR] docs",
    "插入",
    "附加最多20张图片到 GPT",
    "附加 File",
    "执行历史",
    "工具: list_directory",
    "上次执行: 2026/7/1 02:50:57",
    "重新运行",
  ].join("\n");

  assert.equal(enhancer.extractToolResultText(cardText), "[FILE] a.txt\n[DIR] docs");
});

test("extractToolResultText keeps browser permission instructions intact", () => {
  const cardText = [
    "write_file",
    "显示原始信息",
    "运行",
    "需要授权后才能执行本次本地文件修改操作。",
    "",
    "工具: write_file",
    "请在网页授权面板中选择“仅本次”或“始终允许此目录”。",
    "插入",
    "执行历史",
    "工具: write_file",
  ].join("\n");

  const result = enhancer.extractToolResultText(cardText);
  assert.match(result, /需要授权/);
  assert.match(result, /仅本次/);
  assert.match(result, /始终允许此目录/);
});

test("parsePermissionMarker extracts structured approval details from tool output", () => {
  const marker = {
    version: 1,
    kind: "web_agent_permission_request",
    requestId: "wapr_123",
    operation: "write_file",
    toolName: "write_file",
    targetPaths: ["C:\\Users\\Lenovo\\Desktop\\note.md"],
    directoriesToApprove: ["C:\\Users\\Lenovo\\Desktop"],
    suggestedApprovalRoot: "C:\\Users\\Lenovo\\Desktop",
    argsHash: "a".repeat(64),
    expiresAt: "2026-07-01T00:00:00.000Z",
    metadata: { nested: { note: "brace } inside string" } },
  };
  const text = [
    "permission required",
    "WEB_AGENT_PERMISSION_REQUEST",
    JSON.stringify(marker),
    "END_WEB_AGENT_PERMISSION_REQUEST",
  ].join("\n");

  assert.equal(JSON.stringify(enhancer.parsePermissionMarker(text)), JSON.stringify(marker));
});

test("parsePermissionMarkers extracts all markers in page order", () => {
  const first = {
    kind: "web_agent_permission_request",
    requestId: "wapr_first",
    argsHash: "a".repeat(64),
  };
  const second = {
    kind: "web_agent_permission_request",
    requestId: "wapr_second",
    argsHash: "b".repeat(64),
  };
  const text = [
    "WEB_AGENT_PERMISSION_REQUEST",
    JSON.stringify(first),
    "END_WEB_AGENT_PERMISSION_REQUEST",
    "middle",
    "WEB_AGENT_PERMISSION_REQUEST",
    JSON.stringify(second),
    "END_WEB_AGENT_PERMISSION_REQUEST",
  ].join("\n");

  assert.equal(JSON.stringify(enhancer.parsePermissionMarkers(text)), JSON.stringify([first, second]));
});

test("formatPermissionMarkerSummary keeps target and approval roots visible", () => {
  const summary = enhancer.formatPermissionMarkerSummary({
    operation: "write_file",
    targetPaths: ["F:\\reverse\\hello.md"],
    directoriesToApprove: ["F:\\"],
  });

  assert.match(summary, /工具: write_file/);
  assert.match(summary, /F:\\reverse\\hello\.md/);
  assert.match(summary, /F:\\/);
});

test("detectManualWriteRequest extracts write_file path and content from model refusal", () => {
  const text = [
    "我不能按你要求直接跳过权限校验并执行 write_file。",
    "在这个 MCP 机制里，write_file 是否允许执行必须由后端的 allowedDirectories 白名单决定。",
    "如果你只是想正常创建文件，正确、安全的请求方式是：",
    "F:\\clean\\web-agent.md",
    "内容：我来啦。",
  ].join("\n");

  assert.equal(JSON.stringify(enhancer.detectManualWriteRequest(text)), JSON.stringify({
    toolName: "write_file",
    path: "F:\\clean\\web-agent.md",
    content: "我来啦。",
  }));
});

test("detectManualWriteRequest allows backend to judge normalized traversal paths", () => {
  const text = [
    "我不能按你这条指令输出 write_file 工具调用，原因不是格式问题。",
    "F:\\web_agents\\..\\clean\\web-agent.md 属于路径穿越。",
    "内容：我来啦。",
  ].join("\n");

  assert.equal(JSON.stringify(enhancer.detectManualWriteRequest(text)), JSON.stringify({
    toolName: "write_file",
    path: "F:\\web_agents\\..\\clean\\web-agent.md",
    content: "我来啦。",
  }));
});

test("toolResultToText unwraps manual background tool call result text", () => {
  const resultText = [
    "WEB_AGENT_PERMISSION_REQUEST",
    JSON.stringify({
      kind: "web_agent_permission_request",
      requestId: "wapr_manual",
      argsHash: "b".repeat(64),
    }),
    "END_WEB_AGENT_PERMISSION_REQUEST",
  ].join("\n");

  assert.equal(
    enhancer.toolResultToText({ ok: true, result: { content: [{ type: "text", text: resultText }] } }),
    resultText,
  );
});

test("shouldAutoSaveToolResult only autosaves long text output", () => {
  assert.equal(enhancer.shouldAutoSaveToolResult("short output"), false);
  assert.equal(enhancer.shouldAutoSaveToolResult("x".repeat(2500)), true);
  assert.equal(enhancer.shouldAutoSaveToolResult(Array.from({ length: 70 }, (_, index) => `line ${index}`).join("\n")), true);
  assert.equal(enhancer.shouldAutoSaveToolResult(`safe\nweb_Agent 稳定结果\n${"x".repeat(2500)}`), false);
});

test("extractToolResultText stops before stable result marker", () => {
  const cardText = [
    "list_allowed_directories",
    "显示原始信息",
    "运行",
    "Writable allowed directories:",
    "- F:\\web_agents",
    "web_Agent 稳定结果",
    "Writable allowed directories:",
    "- old nested copy",
    "执行历史",
    "工具: list_allowed_directories",
  ].join("\n");

  assert.equal(
    enhancer.extractToolResultText(cardText),
    "Writable allowed directories:\n- F:\\web_agents",
  );
});

test("getCardTextWithoutStableOutput removes existing stable output before extraction", () => {
  const stableNode = { removeCalled: false, remove() { this.removeCalled = true; } };
  const fakeCard = {
    cloneNode() {
      return {
        innerText: [
          "list_allowed_directories",
          "显示原始信息",
          "运行",
          "Writable allowed directories:",
          "- F:\\web_agents",
          "执行历史",
          "工具: list_allowed_directories",
        ].join("\n"),
        querySelectorAll(selector) {
          assert.equal(selector, ".web-agent-stable-output");
          return [stableNode];
        },
      };
    },
  };

  assert.equal(
    enhancer.extractToolResultText(enhancer.getCardTextWithoutStableOutput(fakeCard)),
    "Writable allowed directories:\n- F:\\web_agents",
  );
  assert.equal(stableNode.removeCalled, true);
});

test("auto-run clicks only a recognized MCP tool card", () => {
  const toolName = { textContent: "write_file" };
  const callId = { textContent: "1" };
  const toolCard = {
    innerText: [
      "write_file",
      "1",
      "显示原始信息",
      "运行",
    ].join("\n"),
    dataset: {},
    isConnected: true,
    classList: { contains: (name) => name === "function-complete" },
    matches: (selector) => selector === ".function-block",
    querySelector(selector) {
      if (selector === ".function-name-text") return toolName;
      if (selector === ".call-id") return callId;
      if (selector === ".function-reexecute-button") return null;
      return null;
    },
    parentElement: null,
  };
  const toolButton = {
    textContent: "运行",
    disabled: false,
    isConnected: true,
    classList: { contains: (name) => name === "execute-button" },
    parentElement: toolCard,
    closest(selector) { return selector === ".function-block" ? toolCard : null; },
  };
  const unrelatedParent = { innerText: "Run the build", dataset: {}, parentElement: null };
  const unrelatedButton = {
    textContent: "Run",
    disabled: false,
    parentElement: unrelatedParent,
    closest() { return null; },
  };

  const automationState = { autoExecute: true };
  assert.equal(enhancer.shouldAutoClickRunButton(toolButton, automationState), true);
  assert.equal(enhancer.shouldAutoClickRunButton(unrelatedButton, automationState), false);
  toolCard.dataset.webAgentStableResultHash = "already-finished";
  assert.equal(enhancer.shouldAutoClickRunButton(toolButton, automationState), false);
});

test("active extension auto-run requires the automatic execution preference", () => {
  const toolName = { textContent: "write_file" };
  const callId = { textContent: "3" };
  const toolCard = {
    innerText: ["write_file", "3", "显示原始信息", "运行"].join("\n"),
    dataset: {},
    classList: { contains: (name) => name === "function-complete" },
    matches: (selector) => selector === ".function-block",
    querySelector(selector) {
      if (selector === ".function-name-text") return toolName;
      if (selector === ".call-id") return callId;
      if (selector === ".function-reexecute-button") return null;
      return null;
    },
  };
  const toolButton = {
    textContent: "运行",
    disabled: false,
    classList: { contains: (name) => name === "execute-button" },
    closest(selector) {
      if (selector === ".web-agent-stable-output") return null;
      if (selector === ".function-block") return toolCard;
      return null;
    },
  };

  assert.equal(activeEnhancer.shouldAutoClickRunButton(toolButton, { autoExecute: false }), false);
  assert.equal(activeEnhancer.shouldAutoClickRunButton(toolButton, { autoExecute: true }), true);
  toolCard.querySelector = (selector) => selector === ".function-reexecute-button" ? {} : null;
  assert.equal(activeEnhancer.shouldAutoClickRunButton(toolButton, { autoExecute: true }), false);
});

test("active extension queues tool cards and selects only the next runnable card", () => {
  function createRunnableCard(toolName, callId) {
    const nameNode = { textContent: toolName };
    const callIdNode = { textContent: callId };
    const card = {
      innerText: [toolName, callId, "显示原始信息", "运行"].join("\n"),
      dataset: {},
      classList: { contains: (name) => name === "function-complete" },
      matches: (selector) => selector === ".function-block",
      querySelector(selector) {
        if (selector === ".function-name-text") return nameNode;
        if (selector === ".call-id") return callIdNode;
        if (selector === ".function-reexecute-button") return null;
        return null;
      },
    };
    const button = {
      textContent: "运行",
      disabled: false,
      classList: { contains: (name) => name === "execute-button" },
      closest(selector) {
        if (selector === ".web-agent-stable-output") return null;
        if (selector === ".function-block") return card;
        return null;
      },
    };
    return { card, button };
  }

  const first = createRunnableCard("read_text_file", "1");
  const second = createRunnableCard("read_text_file", "2");
  const state = { autoExecute: true };

  assert.equal(
    activeEnhancer.selectNextAutoRunButton([first.button, second.button], state, false),
    first.button,
  );
  assert.equal(
    activeEnhancer.selectNextAutoRunButton([first.button, second.button], state, true),
    null,
  );

  first.card.dataset.webAgentStableResultHash = "finished";
  assert.equal(
    activeEnhancer.selectNextAutoRunButton([first.button, second.button], state, false),
    second.button,
  );
});

test("placeholder function cards from instruction examples are ignored", () => {
  const placeholderCard = {
    querySelector(selector) {
      if (selector === ".function-name-text") return { textContent: "function_name" };
      return null;
    },
  };
  const realCard = {
    querySelector(selector) {
      if (selector === ".function-name-text") return { textContent: "write_file" };
      return null;
    },
  };

  assert.equal(activeEnhancer.isPlaceholderToolCard(placeholderCard), true);
  assert.equal(activeEnhancer.isPlaceholderToolCard(realCard), false);
});

test("the retired Doubao write example is removed only on Doubao", () => {
  const exampleCard = {
    innerText: [
      "write_file",
      "path",
      "F:\\web_agents\\hello.md",
      "content",
      "你好，来自 web_Agent",
    ].join("\n"),
    querySelector(selector) {
      if (selector === ".function-name-text") return { textContent: "write_file" };
      return null;
    },
  };

  assert.equal(activeEnhancer.isPlaceholderToolCard(exampleCard, "www.doubao.com"), true);
  assert.equal(activeEnhancer.isPlaceholderToolCard(exampleCard, "chatgpt.com"), false);
});

test("Grok nested JSONL events are normalized to the extension protocol", () => {
  const grokJsonl = [
    JSON.stringify({ start: { name: "write_file", call_id: "3" } }),
    JSON.stringify({ description: { text: "None" } }),
    JSON.stringify({ parameter: { key: "path", value: "F:\\Feishu\\hello.txt" } }),
    JSON.stringify({ parameter: { key: "content", value: "网页grok到此一游" } }),
    JSON.stringify({ end: { call_id: "3" } }),
  ].join("\n");

  assert.equal(
    activeEnhancer.normalizeGrokJsonlText(grokJsonl),
    [
      JSON.stringify({ type: "function_call_start", name: "write_file", call_id: "3" }),
      JSON.stringify({ type: "description", text: "None" }),
      JSON.stringify({ type: "parameter", key: "path", value: "F:\\Feishu\\hello.txt" }),
      JSON.stringify({ type: "parameter", key: "content", value: "网页grok到此一游" }),
      JSON.stringify({ type: "function_call_end", call_id: "3" }),
    ].join("\n"),
  );
});

test("canonical JSONL and unrelated JSON remain unchanged", () => {
  const canonical = JSON.stringify({ type: "function_call_start", name: "write_file", call_id: "1" });
  const unrelated = JSON.stringify({ start: { arbitrary: true } });

  assert.equal(activeEnhancer.normalizeGrokJsonlText(canonical), canonical);
  assert.equal(activeEnhancer.normalizeGrokJsonlText(unrelated), unrelated);
});

test("explicit path intent recognizes Windows absolute paths only", () => {
  assert.equal(activeEnhancer.hasWindowsAbsolutePath("写入 C:\\Users\\Lenovo\\Desktop\\作品集"), true);
  assert.equal(activeEnhancer.hasWindowsAbsolutePath("删除 F:/project/note.md"), true);
  assert.equal(activeEnhancer.hasWindowsAbsolutePath("只说删除这个文件"), false);
  assert.equal(activeEnhancer.hasWindowsAbsolutePath("读取 ./relative.md"), false);
});

test("permission fallback polls the background on every supported provider", () => {
  assert.match(enhancerSource, /function syncPermissionFromBackground\(\)/);
  assert.doesNotMatch(enhancerSource, /!isKimiPermissionBridgeHost\(location\.hostname\)/);
  assert.match(enhancerSource, /webAgentPermissionGetLatest/);
});
