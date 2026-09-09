(function () {
  "use strict";

  const saveEndpoint = "http://127.0.0.1:3017/save-tool-result";
  const autoSaveLength = 2000;
  const autoSaveLines = 40;
  const autoRunFallbackDelay = 1600;
  const autoRunWarmupDelay = 2000;
  const explicitPathIntentCommand = "webAgentRecordExplicitPathIntent";
  const dismissedPermissionMarkerKeys = new Set();
  const observedAutoRunCards = new WeakSet();
  const pendingAutoRunCards = new WeakSet();
  let autoRunArmed = false;
  let activeAutoRunCard = null;
  let autoRunInFlight = false;
  let permissionLookupPromise = null;
  let lastPermissionLookupAt = 0;
  const actionLabels = new Set([
    "显示原始信息",
    "运行",
    "插入",
    "附加 File",
    "附加文件",
    "附加最多20张图片到 GPT",
    "Attach File",
    "Run",
    "Insert",
    "Show raw",
    "Copy",
    "复制",
    "保存到本地",
    "展开完整结果",
    "收起结果",
  ]);
  const stableResultMarker = "web_Agent 稳定结果";

  function normalizeLine(line) {
    return String(line || "").replace(/\u00a0/g, " ").trim();
  }

  function hasWindowsAbsolutePath(text) {
    return /(?:^|[\s"'`(\[])\b[A-Za-z]:[\\/]/u.test(String(text || ""));
  }

  function editableText(node) {
    if (!node) return "";
    if (typeof node.value === "string") return node.value;
    if (node.isContentEditable || node.getAttribute?.("contenteditable") === "true") {
      return node.innerText || node.textContent || "";
    }
    const editable = node.closest?.('textarea, input[type="text"], [contenteditable="true"], [role="textbox"]');
    if (!editable || editable === node) return "";
    return editableText(editable);
  }

  function recordExplicitPathIntent(text) {
    const value = String(text || "").trim();
    if (!value || value.length > 20000 || !hasWindowsAbsolutePath(value)) return false;
    if (typeof chrome === "undefined" || !chrome.runtime || !chrome.runtime.sendMessage) return false;
    chrome.runtime.sendMessage({
      command: explicitPathIntentCommand,
      payload: { text: value, recordedAt: Date.now() },
    }, () => void chrome.runtime.lastError);
    return true;
  }

  function captureExplicitPathIntent(event) {
    if (event.type === "keydown") {
      if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
      recordExplicitPathIntent(editableText(event.target));
      return;
    }
    const target = event.target?.closest?.("button, [role=button]");
    if (!target) return;
    recordExplicitPathIntent(editableText(document.activeElement));
  }

  function trimBlankEdges(lines) {
    const result = [...lines];
    while (result.length && !result[0].trim()) {
      result.shift();
    }
    while (result.length && !result[result.length - 1].trim()) {
      result.pop();
    }
    return result;
  }

  function isKimiPermissionBridgeHost(hostname) {
    const host = String(hostname || "").toLowerCase();
    return host === "kimi.com" || host.endsWith(".kimi.com");
  }

  function normalizeGrokJsonlText(text) {
    const source = String(text || "");
    const lines = source.replace(/\r\n/g, "\n").split("\n");
    const converted = [];
    const startedCalls = new Map();
    const endedCalls = new Map();
    let eventCount = 0;

    function countCall(calls, callId) {
      const key = String(callId);
      calls.set(key, (calls.get(key) || 0) + 1);
    }

    for (const line of lines) {
      if (!line.trim()) {
        converted.push(line);
        continue;
      }

      let event;
      try {
        event = JSON.parse(line);
      } catch {
        return source;
      }

      if (!event || Array.isArray(event) || typeof event !== "object") {
        return source;
      }
      const keys = Object.keys(event);
      if (keys.length !== 1 || !["start", "description", "parameter", "end"].includes(keys[0])) {
        return source;
      }

      const kind = keys[0];
      const payload = event[kind];
      if (!payload || Array.isArray(payload) || typeof payload !== "object") {
        return source;
      }

      let type;
      if (kind === "start") {
        if (typeof payload.name !== "string" || !payload.name.trim() || payload.call_id == null) {
          return source;
        }
        type = "function_call_start";
        countCall(startedCalls, payload.call_id);
      } else if (kind === "description") {
        if (typeof payload.text !== "string") {
          return source;
        }
        type = "description";
      } else if (kind === "parameter") {
        if (typeof payload.key !== "string" || !payload.key.trim() || !("value" in payload)) {
          return source;
        }
        type = "parameter";
      } else {
        if (payload.call_id == null) {
          return source;
        }
        type = "function_call_end";
        countCall(endedCalls, payload.call_id);
      }

      eventCount += 1;
      converted.push(JSON.stringify({ type, ...payload }));
    }

    if (!eventCount || !startedCalls.size || startedCalls.size !== endedCalls.size) {
      return source;
    }
    for (const [callId, count] of startedCalls) {
      if (endedCalls.get(callId) !== count) {
        return source;
      }
    }
    return converted.join("\n");
  }

  function normalizeGrokJsonlBlocks() {
    if (typeof document === "undefined" || typeof location === "undefined") {
      return;
    }
    if (location.hostname !== "grok.com" && !location.hostname.endsWith(".grok.com")) {
      return;
    }

    for (const code of document.querySelectorAll("pre code, code")) {
      const source = code.textContent || "";
      const normalized = normalizeGrokJsonlText(source);
      if (normalized !== source) {
        code.textContent = normalized;
      }
    }
  }

  function extractToolResultText(cardText) {
    const rawLines = String(cardText || "").replace(/\r/g, "").split("\n");
    const normalized = rawLines.map(normalizeLine);

    let start = normalized.findIndex((line) => line === "运行" || line === "Run");
    if (start < 0) {
      return "";
    }
    start += 1;

    let end = normalized.findIndex((line, index) => index > start && (
      line === "执行历史" ||
      line === "Execution history" ||
      line === stableResultMarker
    ));
    if (end < 0) {
      end = normalized.length;
    }

    const lines = trimBlankEdges(
      rawLines.slice(start, end).filter((line) => !actionLabels.has(normalizeLine(line)))
    );
    return lines.join("\n").trim();
  }

  function getCardTextWithoutStableOutput(card) {
    if (!card || !card.cloneNode) {
      return card && card.innerText ? card.innerText : "";
    }
    const clone = card.cloneNode(true);
    clone.querySelectorAll(".web-agent-stable-output").forEach((node) => node.remove());
    return clone.innerText || clone.textContent || "";
  }

  function shouldAutoSaveToolResult(text) {
    const value = String(text || "");
    if (!value.trim()) {
      return false;
    }
    if (value.includes(stableResultMarker)) {
      return false;
    }
    return value.length > autoSaveLength || value.split(/\r?\n/).length > autoSaveLines;
  }

  function hashText(text) {
    let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16);
  }

  function parsePermissionMarkers(text) {
    const value = String(text || "");
    const startMarker = "WEB_AGENT_PERMISSION_REQUEST";
    const endMarker = "END_WEB_AGENT_PERMISSION_REQUEST";
    const markers = [];
    let searchFrom = 0;
    while (searchFrom < value.length) {
      const start = value.indexOf(startMarker, searchFrom);
      if (start < 0) {
        break;
      }
      const end = value.indexOf(endMarker, start + startMarker.length);
      if (end < 0) {
        break;
      }
      const jsonText = value.slice(start + startMarker.length, end).trim();
      try {
        const marker = JSON.parse(jsonText);
        if (marker && marker.kind === "web_agent_permission_request" && marker.requestId && marker.argsHash) {
          markers.push(marker);
        }
      } catch {
        // Ignore malformed markers from partially rendered model output.
      }
      searchFrom = end + endMarker.length;
    }
    return markers;
  }

  function parsePermissionMarker(text) {
    return parsePermissionMarkers(text)[0] || null;
  }

  function getPermissionMarkerKey(marker) {
    return `${marker && marker.requestId ? marker.requestId : ""}:${marker && marker.argsHash ? marker.argsHash : ""}`;
  }

  function formatPermissionMarkerSummary(marker) {
    const toolName = marker && (marker.toolName || marker.operation) ? (marker.toolName || marker.operation) : "write_file";
    const targets = Array.isArray(marker && marker.targetPaths) ? marker.targetPaths.join("\n") : "";
    const directories = Array.isArray(marker && marker.directoriesToApprove) ? marker.directoriesToApprove.join("\n") : "";
    return [`工具: ${toolName}`, targets ? `目标路径:\n${targets}` : "", directories ? `授权目录:\n${directories}` : ""]
      .filter(Boolean)
      .join("\n");
  }

  function stripWrappingQuotes(value) {
    return String(value || "")
      .trim()
      .replace(/^[\s"'`\u201c\u201d\u2018\u2019\u300c\u300d\u300e\u300f]+/u, "")
      .replace(/[\s"'`\u201c\u201d\u2018\u2019\u300c\u300d\u300e\u300f]+$/u, "")
      .trim();
  }

  function detectManualWriteRequest(text) {
    const value = String(text || "");
    if (!value.includes("write_file")) {
      return null;
    }

    const hasRefusalSignal = [
      "allowedDirectories",
      "\u4e0d\u80fd",
      "\u65e0\u6cd5",
      "\u62d2\u7edd",
      "\u767d\u540d\u5355",
      "\u6743\u9650",
      "\u8def\u5f84\u7a7f\u8d8a",
      "\u76ee\u5f55\u9650\u5236",
    ].some((indicator) => value.includes(indicator));
    if (!hasRefusalSignal) {
      return null;
    }

    const pathMatch =
      value.match(/[A-Za-z]:\\[^\r\n"'`<>|\uFF0C,\u3002\uFF1B;]*?\.[A-Za-z0-9]{1,16}/u) ||
      value.match(/[A-Za-z]:\\[^\s"'`<>|\uFF0C,\u3002\uFF1B;]+/u);
    if (!pathMatch) {
      return null;
    }

    const contentMatch = value.match(/(?:\u5185\u5bb9|content|text)\s*[\uFF1A:]\s*([^\r\n]+)/iu);
    if (!contentMatch) {
      return null;
    }

    const path = stripWrappingQuotes(pathMatch[0]).replace(/[\uFF0C,\u3002\uFF1B;]+$/u, "");
    const content = stripWrappingQuotes(contentMatch[1]);
    if (!path || !content) {
      return null;
    }

    return { toolName: "write_file", path, content };
  }

  function toolResultToText(result) {
    if (result == null) {
      return "";
    }
    if (typeof result === "string") {
      return result;
    }
    if (result && Object.prototype.hasOwnProperty.call(result, "result") && !Array.isArray(result.content)) {
      return toolResultToText(result.result);
    }
    if (Array.isArray(result.content)) {
      const textItems = result.content.map((item) => {
        if (typeof item === "string") {
          return item;
        }
        if (item && typeof item.text === "string") {
          return item.text;
        }
        return JSON.stringify(item);
      });
      return textItems.join("\n").trim();
    }
    if (typeof result.text === "string") {
      return result.text;
    }
    return JSON.stringify(result, null, 2);
  }

  function getToolName(card) {
    const text = card && card.innerText ? card.innerText : "";
    const historyMatch = text.match(/工具:\s*([^\n]+)/);
    if (historyMatch) {
      return historyMatch[1].trim();
    }
    const firstLine = text.split(/\r?\n/).map(normalizeLine).find(Boolean);
    return firstLine || "tool-result";
  }

  function injectStyles() {
    if (document.getElementById("web-agent-result-enhancer-styles")) {
      return;
    }
    const style = document.createElement("style");
    style.id = "web-agent-result-enhancer-styles";
    style.textContent = `
.web-agent-result-card {
  white-space: pre-wrap !important;
}
.web-agent-result-card button,
.web-agent-result-card [role="button"] {
  white-space: nowrap !important;
}
.web-agent-stable-output {
  margin: 12px 0 8px 0 !important;
  padding: 12px !important;
  border: 1px solid rgba(148, 163, 184, 0.45) !important;
  border-radius: 8px !important;
  background: rgba(15, 23, 42, 0.20) !important;
  color: inherit !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace !important;
  font-size: 13px !important;
  line-height: 1.6 !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
}
.web-agent-stable-output[data-collapsed="true"] .web-agent-stable-text {
  max-height: 220px !important;
  overflow: auto !important;
}
.web-agent-stable-title {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 8px !important;
  margin-bottom: 8px !important;
  font-family: ui-sans-serif, system-ui, sans-serif !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  color: #93c5fd !important;
}
.web-agent-stable-actions {
  display: flex !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 8px !important;
  margin-top: 10px !important;
  font-family: ui-sans-serif, system-ui, sans-serif !important;
}
.web-agent-stable-actions button {
  border: 1px solid rgba(147, 197, 253, 0.55) !important;
  border-radius: 7px !important;
  padding: 6px 10px !important;
  background: rgba(96, 165, 250, 0.16) !important;
  color: #bfdbfe !important;
  cursor: pointer !important;
  font-size: 12px !important;
}
.web-agent-stable-status {
  font-family: ui-sans-serif, system-ui, sans-serif !important;
  font-size: 12px !important;
  color: #cbd5e1 !important;
}
.web-agent-manual-write {
  border-color: rgba(251, 191, 36, 0.65) !important;
  background: rgba(120, 53, 15, 0.24) !important;
}
.web-agent-manual-write-summary {
  margin-top: 8px !important;
  color: inherit !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace !important;
  font-size: 12px !important;
  line-height: 1.55 !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
}
.web-agent-permission-dock {
  position: fixed !important;
  left: 96px !important;
  bottom: 82px !important;
  z-index: 2147483647 !important;
  width: min(360px, calc(100vw - 120px)) !important;
  padding: 12px !important;
  border: 1px solid rgba(96, 165, 250, 0.45) !important;
  border-radius: 12px !important;
  background: #1f2937 !important;
  color: #e5e7eb !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.36), 0 6px 16px rgba(0, 0, 0, 0.22) !important;
  font-family: ui-sans-serif, system-ui, sans-serif !important;
  font-size: 13px !important;
}
.web-agent-permission-dock-title {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 8px !important;
  margin-bottom: 8px !important;
  font-weight: 700 !important;
  color: #bfdbfe !important;
}
.web-agent-permission-dock-close {
  border: 0 !important;
  background: transparent !important;
  color: #cbd5e1 !important;
  cursor: pointer !important;
  font-size: 16px !important;
  line-height: 1 !important;
}
.web-agent-permission-dock-summary {
  max-height: 150px !important;
  overflow: auto !important;
  padding: 8px !important;
  border-radius: 8px !important;
  background: rgba(15, 23, 42, 0.42) !important;
  color: #e5e7eb !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace !important;
  font-size: 12px !important;
  line-height: 1.55 !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
}
.web-agent-permission-dock-actions {
  display: flex !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 8px !important;
  margin-top: 10px !important;
}
.web-agent-permission-dock-actions button {
  border-radius: 8px !important;
  padding: 7px 10px !important;
  cursor: pointer !important;
  font-size: 12px !important;
  font-weight: 600 !important;
}
.web-agent-permission-allow {
  border: 1px solid rgba(59, 130, 246, 0.7) !important;
  background: #2563eb !important;
  color: #ffffff !important;
}
.web-agent-permission-reject {
  border: 1px solid rgba(148, 163, 184, 0.55) !important;
  background: rgba(51, 65, 85, 0.9) !important;
  color: #e5e7eb !important;
}
.web-agent-permission-dock-status {
  color: #cbd5e1 !important;
  font-size: 12px !important;
}
.web-agent-permission-hover-button {
  position: relative !important;
}
.web-agent-permission-hover-button::after {
  content: "" !important;
  position: absolute !important;
  top: 8px !important;
  right: 8px !important;
  width: 7px !important;
  height: 7px !important;
  border-radius: 999px !important;
  background: #f59e0b !important;
}
@media (max-width: 640px) {
  .web-agent-permission-dock {
    left: 12px !important;
    right: 12px !important;
    bottom: 72px !important;
    width: auto !important;
  }
}
`;
    document.documentElement.appendChild(style);
  }

  function copyText(text, status) {
    return navigator.clipboard.writeText(text).then(
      () => {
        status.textContent = "已复制";
      },
      () => {
        status.textContent = "复制失败";
      }
    );
  }

  function downloadFallback(text, toolName) {
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${toolName || "tool-result"}-${Date.now()}.md`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  async function saveToolResult(text, toolName) {
    const response = await fetch(saveEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolName, text }),
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  }

  function createButton(label, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      void onClick();
    });
    return button;
  }

  function sendPermissionMessage(command, marker) {
    return new Promise((resolve, reject) => {
      if (typeof chrome === "undefined" || !chrome.runtime || !chrome.runtime.sendMessage) {
        reject(new Error("EXTENSION_RUNTIME_UNAVAILABLE"));
        return;
      }
      chrome.runtime.sendMessage({ command, payload: marker }, (response) => {
        const error = chrome.runtime.lastError;
        if (error) {
          reject(new Error(error.message || String(error)));
          return;
        }
        if (!response || response.success === false) {
          reject(new Error(response && response.error ? response.error : "PERMISSION_REQUEST_FAILED"));
          return;
        }
        resolve(response);
      });
    });
  }

  function sendManualToolCall(request) {
    return new Promise((resolve, reject) => {
      if (typeof chrome === "undefined" || !chrome.runtime || !chrome.runtime.sendMessage) {
        reject(new Error("EXTENSION_RUNTIME_UNAVAILABLE"));
        return;
      }
      chrome.runtime.sendMessage({
        command: "webAgentManualToolCall",
        payload: {
          toolName: "write_file",
          args: {
            path: request.path,
            content: request.content,
          },
        },
      }, (response) => {
        const error = chrome.runtime.lastError;
        if (error) {
          reject(new Error(error.message || String(error)));
          return;
        }
        if (!response || response.success === false) {
          reject(new Error(response && response.error ? response.error : "MANUAL_TOOL_CALL_FAILED"));
          return;
        }
        resolve(response);
      });
    });
  }

  function createStableOutput(card, resultText, toolName) {
    const panel = document.createElement("div");
    panel.className = "web-agent-stable-output";
    panel.dataset.collapsed = shouldAutoSaveToolResult(resultText) ? "true" : "false";

    const title = document.createElement("div");
    title.className = "web-agent-stable-title";
    title.textContent = "web_Agent 稳定结果";

    const text = document.createElement("div");
    text.className = "web-agent-stable-text";
    text.textContent = resultText;

    const actions = document.createElement("div");
    actions.className = "web-agent-stable-actions";

    const status = document.createElement("span");
    status.className = "web-agent-stable-status";

    actions.appendChild(createButton("复制结果", () => copyText(resultText, status)));
    actions.appendChild(createButton("保存到本地", async () => {
      status.textContent = "保存中...";
      try {
        const result = await saveToolResult(resultText, toolName);
        status.textContent = result && result.filePath ? `已保存: ${result.filePath}` : "已保存";
      } catch {
        downloadFallback(resultText, toolName);
        status.textContent = "本地服务不可用，已走浏览器下载";
      }
    }));

    const permissionMarker = parsePermissionMarker(resultText);
    if (permissionMarker) {
      actions.appendChild(createButton("仅本次批准并重试", async () => {
        status.textContent = "正在批准...";
        try {
          const response = await sendPermissionMessage("webAgentPermissionApprove", { ...permissionMarker, approvalMode: "once" });
          status.textContent = response && response.result && response.result.retry ? "已批准，重试完成" : "已批准，正在重试";
        } catch (error) {
          status.textContent = `批准失败: ${error instanceof Error ? error.message : String(error)}`;
        }
      }));
      actions.appendChild(createButton("始终允许此目录", async () => {
        status.textContent = "正在保存目录授权...";
        try {
          const response = await sendPermissionMessage("webAgentPermissionApprove", { ...permissionMarker, approvalMode: "directory" });
          status.textContent = response && response.result && response.result.retry ? "目录已授权，重试完成" : "目录已授权，正在重试";
        } catch (error) {
          status.textContent = `授权失败: ${error instanceof Error ? error.message : String(error)}`;
        }
      }));
      actions.appendChild(createButton("拒绝", async () => {
        status.textContent = "正在拒绝...";
        try {
          await sendPermissionMessage("webAgentPermissionReject", permissionMarker);
          status.textContent = "已拒绝";
        } catch (error) {
          status.textContent = `拒绝失败: ${error instanceof Error ? error.message : String(error)}`;
        }
      }));
    }

    if (shouldAutoSaveToolResult(resultText)) {
      const toggleButton = createButton("展开完整结果", () => {
        const collapsed = panel.dataset.collapsed === "true";
        panel.dataset.collapsed = collapsed ? "false" : "true";
        toggleButton.textContent = collapsed ? "收起结果" : "展开完整结果";
      });
      actions.appendChild(toggleButton);
    }

    actions.appendChild(status);
    panel.appendChild(title);
    panel.appendChild(text);
    panel.appendChild(actions);

    const historyNode = findHistoryNode(card);
    if (historyNode && historyNode.parentElement) {
      historyNode.parentElement.insertBefore(panel, historyNode);
    } else {
      card.appendChild(panel);
    }

    if (shouldAutoSaveToolResult(resultText)) {
      void saveToolResult(resultText, toolName).then(
        (result) => {
          status.textContent = result && result.filePath ? `已自动保存: ${result.filePath}` : "已自动保存";
        },
        () => {
          status.textContent = "长结果未自动保存，可手动保存";
        }
      );
    }

    return panel;
  }

  function setManualButtonsDisabled(buttons, disabled) {
    for (const button of buttons) {
      button.disabled = disabled;
    }
  }

  function createManualWritePanel(host, request) {
    const panel = document.createElement("div");
    panel.className = "web-agent-stable-output web-agent-manual-write";

    const title = document.createElement("div");
    title.className = "web-agent-stable-title";
    title.textContent = "web_Agent \u68c0\u6d4b\u5230\u6a21\u578b\u62d2\u7edd write_file";

    const summary = document.createElement("div");
    summary.className = "web-agent-manual-write-summary";
    summary.textContent = `path: ${request.path}\ncontent: ${request.content}`;

    const actions = document.createElement("div");
    actions.className = "web-agent-stable-actions";

    const status = document.createElement("span");
    status.className = "web-agent-stable-status";

    const buttons = [];
    const rejectButton = createButton("\u62d2\u7edd", () => {
      setManualButtonsDisabled(buttons, true);
      status.textContent = "\u5df2\u62d2\u7edd";
    });
    const allowButton = createButton("\u5141\u8bb8\u6267\u884c", async () => {
      setManualButtonsDisabled(buttons, true);
      status.textContent = "\u6b63\u5728\u53d1\u9001\u5230\u672c\u5730\u540e\u7aef...";
      try {
        const response = await sendManualToolCall(request);
        const resultText = toolResultToText(response && response.result);
        status.textContent = "\u672c\u5730\u540e\u7aef\u5df2\u8fd4\u56de\u7ed3\u679c";
        createStableOutput(panel, resultText || JSON.stringify(response, null, 2), "write_file");
      } catch (error) {
        setManualButtonsDisabled(buttons, false);
        status.textContent = `\u6267\u884c\u5931\u8d25: ${error instanceof Error ? error.message : String(error)}`;
      }
    });
    buttons.push(rejectButton, allowButton);

    actions.appendChild(rejectButton);
    actions.appendChild(allowButton);
    actions.appendChild(status);
    panel.appendChild(title);
    panel.appendChild(summary);
    panel.appendChild(actions);
    host.appendChild(panel);
    return panel;
  }

  function findLatestPagePermissionMarker() {
    if (typeof document === "undefined") {
      return null;
    }
    const selector = [
      '[data-message-author-role="assistant"]',
      "article",
      '[class*="message"]',
      '[class*="tool"]',
      "pre",
      "code",
    ].join(",");
    const candidates = Array.from(document.querySelectorAll(selector));
    let latest = null;
    for (const node of candidates) {
      if (!node || node.closest(".web-agent-permission-dock")) {
        continue;
      }
      const text = node.innerText || node.textContent || "";
      if (!text.includes("WEB_AGENT_PERMISSION_REQUEST")) {
        continue;
      }
      const markers = parsePermissionMarkers(text);
      if (markers.length) {
        latest = markers[markers.length - 1];
      }
    }
    return latest;
  }

  function setPermissionDockButtonsDisabled(buttons, disabled) {
    for (const button of buttons) {
      button.disabled = disabled;
    }
  }

  function ensurePermissionDock(marker, options = {}) {
    if (typeof document === "undefined" || !marker) {
      return null;
    }
    let dock = document.getElementById("web-agent-permission-dock");
    const markerKey = getPermissionMarkerKey(marker);
    if (!options.force && dismissedPermissionMarkerKeys.has(markerKey)) {
      return dock;
    }
    if (dock && dock.dataset.markerKey === markerKey) {
      return dock;
    }
    if (!dock) {
      dock = document.createElement("div");
      dock.id = "web-agent-permission-dock";
      dock.className = "web-agent-permission-dock";
      document.body.appendChild(dock);
    }
    dock.dataset.markerKey = markerKey;
    dock.textContent = "";

    const title = document.createElement("div");
    title.className = "web-agent-permission-dock-title";
    title.textContent = "\u5f85\u6388\u6743\u672c\u5730\u64cd\u4f5c";

    const close = document.createElement("button");
    close.type = "button";
    close.className = "web-agent-permission-dock-close";
    close.textContent = "\u00d7";
    close.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      dismissedPermissionMarkerKeys.add(markerKey);
      dock.remove();
    });
    title.appendChild(close);

    const summary = document.createElement("div");
    summary.className = "web-agent-permission-dock-summary";
    summary.textContent = formatPermissionMarkerSummary(marker);

    const actions = document.createElement("div");
    actions.className = "web-agent-permission-dock-actions";
    const status = document.createElement("span");
    status.className = "web-agent-permission-dock-status";

    const buttons = [];
    const rejectButton = document.createElement("button");
    rejectButton.type = "button";
    rejectButton.className = "web-agent-permission-reject";
    rejectButton.textContent = "\u62d2\u7edd";
    rejectButton.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      setPermissionDockButtonsDisabled(buttons, true);
      status.textContent = "\u6b63\u5728\u62d2\u7edd...";
      try {
        await sendPermissionMessage("webAgentPermissionReject", marker);
        status.textContent = "\u5df2\u62d2\u7edd";
      } catch (error) {
        setPermissionDockButtonsDisabled(buttons, false);
        status.textContent = `\u62d2\u7edd\u5931\u8d25: ${error instanceof Error ? error.message : String(error)}`;
      }
    });

    function createPermissionAllowButton(label, approvalMode) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "web-agent-permission-allow";
      button.textContent = label;
      button.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setPermissionDockButtonsDisabled(buttons, true);
        status.textContent = approvalMode === "directory" ? "\u6b63\u5728\u4fdd\u5b58\u76ee\u5f55\u6388\u6743..." : "\u6b63\u5728\u6388\u6743\u5e76\u91cd\u8bd5...";
        try {
          const response = await sendPermissionMessage("webAgentPermissionApprove", { ...marker, approvalMode });
          status.textContent = approvalMode === "directory" ? "\u5df2\u6c38\u4e45\u6388\u6743\u5e76\u6267\u884c" : "\u5df2\u5141\u8bb8\u672c\u6b21\u6267\u884c";
          const retryResult = response && response.result && response.result.retry ? response.result.retry : response && response.result;
          const resultText = toolResultToText(retryResult);
          if (resultText) {
            createStableOutput(dock, resultText, marker.toolName || marker.operation || "write_file");
          }
        } catch (error) {
          setPermissionDockButtonsDisabled(buttons, false);
          status.textContent = `\u6388\u6743\u5931\u8d25: ${error instanceof Error ? error.message : String(error)}`;
        }
      });
      return button;
    }
    const allowOnceButton = createPermissionAllowButton("\u4ec5\u672c\u6b21", "once");
    const allowDirectoryButton = createPermissionAllowButton("\u59cb\u7ec8\u5141\u8bb8\u6b64\u76ee\u5f55", "directory");
    buttons.push(rejectButton, allowOnceButton, allowDirectoryButton);

    actions.appendChild(rejectButton);
    actions.appendChild(allowOnceButton);
    actions.appendChild(allowDirectoryButton);
    actions.appendChild(status);
    dock.appendChild(title);
    dock.appendChild(summary);
    dock.appendChild(actions);
    return dock;
  }

  function syncPermissionMenuButton(marker) {
    if (typeof document === "undefined") {
      return;
    }
    const overlays = Array.from(document.querySelectorAll(".mcp-hover-overlay"));
    for (const overlay of overlays) {
      let button = overlay.querySelector(".web-agent-permission-hover-button");
      if (!marker) {
        if (button) {
          button.remove();
        }
        continue;
      }
      if (!button) {
        button = document.createElement("button");
        button.type = "button";
        button.className = "mcp-hover-button web-agent-permission-hover-button";
        button.title = "\u6253\u5f00\u6388\u6743\u8bf7\u6c42";
        button.textContent = "\u6388\u6743\u8bf7\u6c42";
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const latest = findLatestPagePermissionMarker() || marker;
          dismissedPermissionMarkerKeys.delete(getPermissionMarkerKey(latest));
          ensurePermissionDock(latest, { force: true });
        });
        overlay.appendChild(button);
      }
      button.dataset.markerKey = getPermissionMarkerKey(marker);
    }
  }

  function syncPermissionFromBackground() {
    if (
      permissionLookupPromise ||
      Date.now() - lastPermissionLookupAt < 1000
    ) {
      return permissionLookupPromise;
    }
    lastPermissionLookupAt = Date.now();
    permissionLookupPromise = sendPermissionMessage("webAgentPermissionGetLatest", {})
      .then((response) => {
        const marker = response && response.result ? response.result.marker : null;
        if (marker) {
          syncPermissionMenuButton(marker);
          ensurePermissionDock(marker);
        }
        return marker;
      })
      .catch(() => null)
      .finally(() => {
        permissionLookupPromise = null;
      });
    return permissionLookupPromise;
  }

  function enhancePermissionRequests() {
    const marker = findLatestPagePermissionMarker();
    syncPermissionMenuButton(marker);
    if (marker) {
      ensurePermissionDock(marker);
    } else {
      void syncPermissionFromBackground();
    }
  }

  function findHistoryNode(card) {
    const elements = Array.from(card.querySelectorAll("div, section, aside"));
    return elements.find((element) => {
      const text = normalizeLine(element.textContent || "");
      return text.startsWith("执行历史") || text.startsWith("Execution history");
    });
  }

  function findToolCard(runButton) {
    const functionCard = runButton?.closest?.(".function-block");
    if (
      functionCard &&
      !functionCard.classList?.contains("function-result-container") &&
      functionCard.querySelector?.(".function-name-text") &&
      functionCard.querySelector?.(".call-id")
    ) {
      return functionCard;
    }

    let node = runButton.parentElement;
    for (let depth = 0; node && depth < 10; depth += 1, node = node.parentElement) {
      const text = node.innerText || "";
      if ((text.includes("执行历史") || text.includes("Execution history")) && extractToolResultText(text)) {
        return node;
      }
    }
    return null;
  }

  function getAutomationState() {
    return typeof window !== "undefined" ? window.__mcpAutomationState : undefined;
  }

  function isPlaceholderToolCard(card, hostname = typeof location !== "undefined" ? location.hostname : "") {
    const name = normalizeLine(card?.querySelector?.(".function-name-text")?.textContent).toLowerCase();
    if (new Set(["function_name", "function name", "tool_name", "tool name"]).has(name)) {
      return true;
    }
    const host = String(hostname || "").toLowerCase();
    if (name !== "write_file" || (host !== "doubao.com" && !host.endsWith(".doubao.com"))) {
      return false;
    }
    const text = card?.innerText || card?.textContent || "";
    return /F:\\+web_agents\\+hello\.md/i.test(text) && text.includes("你好，来自 web_Agent");
  }

  function removePlaceholderToolCards() {
    if (typeof document === "undefined") {
      return;
    }
    for (const card of document.querySelectorAll(".function-block")) {
      if (isPlaceholderToolCard(card)) {
        card.remove();
      }
    }
  }

  function shouldAutoClickRunButton(button, automationState = getAutomationState()) {
    if (automationState?.autoExecute !== true) {
      return false;
    }
    const label = normalizeLine(button?.textContent);
    if (label !== "运行" && label !== "Run") {
      return false;
    }
    if (
      button.disabled ||
      button.isConnected === false ||
      !button.classList?.contains("execute-button") ||
      button.closest?.(".web-agent-stable-output")
    ) {
      return false;
    }
    const card = findToolCard(button);
    if (
      !card ||
      card.isConnected === false ||
      !card.matches?.(".function-block") ||
      !card.classList?.contains("function-complete") ||
      card.dataset?.webAgentStableResultHash ||
      card.querySelector?.(".function-reexecute-button")
    ) {
      return false;
    }
    return !extractToolResultText(getCardTextWithoutStableOutput(card));
  }

  function rememberVisibleAutoRunCards() {
    for (const button of document.querySelectorAll("button.execute-button")) {
      const card = findToolCard(button);
      if (card) {
        observedAutoRunCards.add(card);
      }
    }
  }

  function selectNextAutoRunButton(buttons, automationState = getAutomationState(), isBusy = autoRunInFlight) {
    if (isBusy || automationState?.autoExecute !== true) {
      return null;
    }
    for (const button of buttons) {
      const card = findToolCard(button);
      if (
        card &&
        !observedAutoRunCards.has(card) &&
        !pendingAutoRunCards.has(card) &&
        shouldAutoClickRunButton(button, automationState)
      ) {
        return button;
      }
    }
    return null;
  }

  function releaseCompletedAutoRun() {
    if (!autoRunInFlight) {
      return;
    }
    const card = activeAutoRunCard;
    const completed = !card || card.isConnected === false || Boolean(
      card.dataset?.webAgentStableResultHash ||
      card.querySelector?.(".function-reexecute-button") ||
      extractToolResultText(getCardTextWithoutStableOutput(card))
    );
    if (completed) {
      activeAutoRunCard = null;
      autoRunInFlight = false;
    }
  }

  function autoClickRunButtons() {
    if (!autoRunArmed) {
      rememberVisibleAutoRunCards();
      return;
    }

    releaseCompletedAutoRun();
    const automationState = getAutomationState();
    const buttons = Array.from(document.querySelectorAll("button.execute-button"));
    if (automationState?.autoExecute === false) {
      for (const button of buttons) {
        const card = findToolCard(button);
        if (card) {
          observedAutoRunCards.add(card);
        }
      }
      return;
    }

    const button = selectNextAutoRunButton(buttons, automationState);
    if (!button) {
      return;
    }
    const card = findToolCard(button);
    if (!card) {
      return;
    }

    pendingAutoRunCards.add(card);
    activeAutoRunCard = card;
    autoRunInFlight = true;
    window.setTimeout(() => {
      pendingAutoRunCards.delete(card);
      const currentButton = card.querySelector?.("button.execute-button");
      observedAutoRunCards.add(card);
      if (shouldAutoClickRunButton(currentButton, getAutomationState())) {
        currentButton.click();
        return;
      }
      activeAutoRunCard = null;
      autoRunInFlight = false;
      autoClickRunButtons();
    }, autoRunFallbackDelay);
  }

  function enhanceCard(card) {
    const existing = card.querySelector(":scope > .web-agent-stable-output");
    const resultText = extractToolResultText(getCardTextWithoutStableOutput(card));
    if (!resultText) {
      return;
    }

    const resultHash = hashText(resultText);
    if (card.dataset.webAgentStableResultHash === resultHash) {
      return;
    }
    card.dataset.webAgentStableResultHash = resultHash;
    card.classList.add("web-agent-result-card");

    if (existing) {
      existing.remove();
    }

    createStableOutput(card, resultText, getToolName(card));
  }

  function hasManualWriteHashInAncestors(node, hash) {
    for (let parent = node.parentElement; parent; parent = parent.parentElement) {
      if (parent.dataset && parent.dataset.webAgentManualWriteHash === hash) {
        return true;
      }
    }
    return false;
  }

  function enhanceManualWriteRequests() {
    if (typeof document === "undefined") {
      return;
    }
    const selector = [
      '[data-message-author-role="assistant"]',
      "article",
      '[class*="assistant"]',
      '[class*="message"]',
    ].join(",");
    const candidates = Array.from(document.querySelectorAll(selector));
    const seen = new Set();
    for (const host of candidates) {
      if (!host || seen.has(host) || host.closest(".web-agent-manual-write")) {
        continue;
      }
      seen.add(host);
      const text = host.innerText || host.textContent || "";
      if (text.length < 20 || text.length > 20000) {
        continue;
      }
      const request = detectManualWriteRequest(text);
      if (!request) {
        continue;
      }
      const hash = hashText(`${request.path}\n${request.content}`);
      if (
        host.dataset.webAgentManualWriteHash === hash ||
        hasManualWriteHashInAncestors(host, hash) ||
        host.querySelector(`[data-web-agent-manual-write-hash="${hash}"]`)
      ) {
        continue;
      }
      host.dataset.webAgentManualWriteHash = hash;
      const panel = createManualWritePanel(host, request);
      panel.dataset.webAgentManualWriteHash = hash;
    }
  }

  function enhanceAllCards() {
    injectStyles();
    const buttons = Array.from(document.querySelectorAll("button"));
    for (const button of buttons) {
      if (normalizeLine(button.textContent) !== "运行" && normalizeLine(button.textContent) !== "Run") {
        continue;
      }
      const card = findToolCard(button);
      if (card) {
        enhanceCard(card);
      }
    }
  }

  function enhanceAll() {
    injectStyles();
    normalizeGrokJsonlBlocks();
    removePlaceholderToolCards();
    autoClickRunButtons();
    enhanceAllCards();
    enhanceManualWriteRequests();
    enhancePermissionRequests();
  }

  function install() {
    if (typeof document === "undefined" || !document.documentElement) {
      return;
    }
    enhanceAll();
    const observer = new MutationObserver(() => {
      window.clearTimeout(install.pendingTimer);
      install.pendingTimer = window.setTimeout(enhanceAll, 250);
    });
    observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
    document.addEventListener("keydown", captureExplicitPathIntent, true);
    document.addEventListener("pointerdown", captureExplicitPathIntent, true);
    window.setTimeout(() => {
      autoRunArmed = true;
      autoClickRunButtons();
    }, autoRunWarmupDelay);
    window.addEventListener("beforeunload", () => {
      observer.disconnect();
      document.removeEventListener("keydown", captureExplicitPathIntent, true);
      document.removeEventListener("pointerdown", captureExplicitPathIntent, true);
    }, { once: true });
  }

  const api = {
    extractToolResultText,
    shouldAutoSaveToolResult,
    hashText,
    getCardTextWithoutStableOutput,
    parsePermissionMarker,
    parsePermissionMarkers,
    detectManualWriteRequest,
    toolResultToText,
    formatPermissionMarkerSummary,
    shouldAutoClickRunButton,
    selectNextAutoRunButton,
    isPlaceholderToolCard,
    normalizeGrokJsonlText,
    isKimiPermissionBridgeHost,
    hasWindowsAbsolutePath,
    recordExplicitPathIntent,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    window.webAgentResultEnhancer = api;
    install();
  }
})();
