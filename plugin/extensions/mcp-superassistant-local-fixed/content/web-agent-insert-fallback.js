(function () {
  "use strict";

  const insertLabels = new Set(["插入", "Insert"]);
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
  const deepSeekHost = "chat.deepseek.com";
  const autoSubmitFallbackDelay = 1800;
  let pendingAutoSubmitTimer = null;
  let pendingAutoSubmitText = "";

  const composerSelectors = [
    "#prompt-textarea",
    "[data-testid='composer'] [contenteditable='true']",
    "[data-testid='composer'] textarea",
    "form textarea",
    "form [contenteditable='true']",
    "textarea:not([readonly]):not([disabled])",
    "div[role='textbox'][contenteditable='true']",
    "div[contenteditable='true']",
  ];

  function normalizeLine(line) {
    return String(line || "").replace(/\u00a0/g, " ").trim();
  }

  function isInsertButtonText(text) {
    const value = normalizeLine(text).replace(/^[^\p{L}\p{N}]+/u, "").trim();
    return insertLabels.has(value);
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

  function extractToolResultText(cardText) {
    if (
      typeof window !== "undefined" &&
      window.webAgentResultEnhancer &&
      typeof window.webAgentResultEnhancer.extractToolResultText === "function"
    ) {
      return window.webAgentResultEnhancer.extractToolResultText(cardText);
    }

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

  function getCardText(card) {
    if (!card) {
      return "";
    }
    const clone = card.cloneNode(true);
    clone.querySelectorAll(".web-agent-stable-output").forEach((node) => node.remove());
    return clone.innerText || clone.textContent || "";
  }

  function findToolCard(element) {
    let node = element && element.parentElement;
    for (let depth = 0; node && depth < 12; depth += 1, node = node.parentElement) {
      const text = node.innerText || node.textContent || "";
      if ((text.includes("执行历史") || text.includes("Execution history")) && extractToolResultText(getCardText(node))) {
        return node;
      }
    }
    return null;
  }

  function isVisible(element) {
    if (!element || element.closest(".web-agent-result-card")) {
      return false;
    }
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    return rect.width > 8 && rect.height > 8 && style.visibility !== "hidden" && style.display !== "none";
  }

  function findComposer() {
    const candidates = [];
    for (const selector of composerSelectors) {
      document.querySelectorAll(selector).forEach((element) => {
        if (isVisible(element) && !candidates.includes(element)) {
          candidates.push(element);
        }
      });
    }
    candidates.sort((left, right) => right.getBoundingClientRect().bottom - left.getBoundingClientRect().bottom);
    return candidates[0] || null;
  }

  function getElementText(element) {
    if (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement) {
      return element.value || "";
    }
    return element.innerText || element.textContent || "";
  }

  function getAutomationState() {
    return typeof window !== "undefined" ? window.__mcpAutomationState : undefined;
  }

  function shouldAutoSubmitText(text, automationState = getAutomationState()) {
    if (automationState?.autoSubmit !== true) {
      return false;
    }
    const value = String(text || "").trim();
    return /^<function_result\b[^>]*>[\s\S]*<\/function_result>$/u.test(value);
  }

  function findDeepSeekSubmitControl(composer) {
    let scope = composer;
    for (let depth = 0; scope && depth < 8; depth += 1, scope = scope.parentElement) {
      const control = scope.querySelector?.(
        '[role="button"].ds-button--primary.ds-button--circle, button[aria-label*="Send"], button[aria-label*="发送"], button[data-testid="send-button"], button[type="submit"]',
      );
      if (control) {
        return control;
      }
    }
    return null;
  }

  function isUsableSubmitControl(control) {
    if (!control || control.isConnected === false || control.disabled) {
      return false;
    }
    if (control.getAttribute?.("aria-disabled") === "true" || control.classList?.contains("disabled")) {
      return false;
    }
    const rect = control.getBoundingClientRect?.();
    return Boolean(rect && rect.width > 8 && rect.height > 8);
  }

  function clearPendingAutoSubmit() {
    if (pendingAutoSubmitTimer !== null) {
      window.clearTimeout(pendingAutoSubmitTimer);
      pendingAutoSubmitTimer = null;
    }
    pendingAutoSubmitText = "";
  }

  function scheduleDeepSeekAutoSubmit(composer) {
    if (window.location.hostname !== deepSeekHost) {
      return;
    }
    const text = getElementText(composer).trim();
    const automationState = getAutomationState();
    if (!shouldAutoSubmitText(text, automationState)) {
      clearPendingAutoSubmit();
      return;
    }
    if (pendingAutoSubmitTimer !== null && pendingAutoSubmitText === text) {
      return;
    }

    clearPendingAutoSubmit();
    pendingAutoSubmitText = text;
    const configuredDelay = Math.max(0, Number(automationState.autoSubmitDelay) || 0) * 1000;
    pendingAutoSubmitTimer = window.setTimeout(() => {
      pendingAutoSubmitTimer = null;
      const currentComposer = findComposer();
      const currentText = currentComposer ? getElementText(currentComposer).trim() : "";
      if (
        !currentComposer ||
        currentText !== pendingAutoSubmitText ||
        !shouldAutoSubmitText(currentText, getAutomationState())
      ) {
        pendingAutoSubmitText = "";
        return;
      }
      const control = findDeepSeekSubmitControl(currentComposer);
      pendingAutoSubmitText = "";
      if (isUsableSubmitControl(control)) {
        control.click();
      }
    }, configuredDelay + autoSubmitFallbackDelay);
  }

  function dispatchTextInputEvents(element, text) {
    try {
      element.dispatchEvent(new InputEvent("beforeinput", {
        bubbles: true,
        cancelable: true,
        inputType: "insertText",
        data: text,
      }));
    } catch {
      // Older Chromium pages can reject constructed InputEvent options.
    }
    element.dispatchEvent(new InputEvent("input", {
      bubbles: true,
      inputType: "insertText",
      data: text,
    }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
  }

  async function insertIntoComposer(text) {
    const composer = findComposer();
    if (!composer) {
      return { ok: false, reason: "未找到当前网页输入框" };
    }

    composer.focus();

    if (composer instanceof HTMLTextAreaElement || composer instanceof HTMLInputElement) {
      const prefix = composer.value && !composer.value.endsWith("\n") ? "\n" : "";
      composer.value = `${composer.value || ""}${prefix}${text}`;
      dispatchTextInputEvents(composer, text);
      return { ok: true, method: "textarea" };
    }

    const before = getElementText(composer);
    let inserted = false;
    try {
      inserted = document.execCommand("insertText", false, text);
    } catch {
      inserted = false;
    }

    if (!inserted || getElementText(composer) === before) {
      const prefix = before && !before.endsWith("\n") ? "\n" : "";
      composer.textContent = `${before || ""}${prefix}${text}`;
      dispatchTextInputEvents(composer, text);
    }

    return { ok: true, method: "contenteditable" };
  }

  async function copyFallback(text) {
    await navigator.clipboard.writeText(text);
  }

  function setButtonStatus(button, label, timeoutMs = 2500) {
    const original = button.dataset.webAgentOriginalLabel || button.textContent || "插入";
    button.dataset.webAgentOriginalLabel = original;
    button.textContent = label;
    window.clearTimeout(button.webAgentStatusTimer);
    button.webAgentStatusTimer = window.setTimeout(() => {
      button.textContent = button.dataset.webAgentOriginalLabel || original;
    }, timeoutMs);
  }

  async function handleInsertClick(button) {
    const card = findToolCard(button);
    if (!card) {
      return false;
    }
    const text = extractToolResultText(getCardText(card));
    if (!text) {
      setButtonStatus(button, "无结果");
      return true;
    }

    try {
      const result = await insertIntoComposer(text);
      if (result.ok) {
        setButtonStatus(button, "已插入");
        return true;
      }
      await copyFallback(text);
      setButtonStatus(button, "已复制，请粘贴", 3500);
      return true;
    } catch {
      try {
        await copyFallback(text);
        setButtonStatus(button, "已复制，请粘贴", 3500);
      } catch {
        setButtonStatus(button, "插入失败", 3500);
      }
      return true;
    }
  }

  function install() {
    document.addEventListener("click", (event) => {
      const button = event.target && event.target.closest ? event.target.closest("button, [role='button']") : null;
      if (!button || !isInsertButtonText(button.textContent || "")) {
        return;
      }
      const card = findToolCard(button);
      if (!card) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      void handleInsertClick(button);
    }, true);
    document.addEventListener("input", (event) => {
      const target = event.target;
      if (
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLInputElement ||
        target?.getAttribute?.("contenteditable") === "true"
      ) {
        scheduleDeepSeekAutoSubmit(target);
      }
    }, true);
  }

  const api = {
    isInsertButtonText,
    extractToolResultText,
    shouldAutoSubmitText,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    window.webAgentInsertFallback = api;
    install();
  }
})();
