(() => {
  "use strict";

  const ownedSelector = [
    "#mcp-popover-container",
    "#mcp-popover-portal",
    "#mcp-sidebar-container",
    "#mcp-sidebar-root",
    "#mcp-sidebar-shadow-host",
    "#sidebar-container",
    "#web-agent-permission-dock",
    ".mcp-popover-container",
    ".mcp-popover",
    ".mcp-sidebar",
    ".web-agent-result-card",
    ".web-agent-permission-dock",
    "[id^='mcp-']",
    "[class*='mcp-']",
    "[id^='web-agent-']",
    "[class*='web-agent-']",
  ].join(",");

  const exactText = new Map([
    ["MCP SuperAssistant", "web_Agent"],
    ["MCP Settings", "MCP 设置"],
    ["Available Tools", "可用工具"],
    ["Push Content Mode", "推送内容模式"],
    ["Enable All", "全部启用"],
    ["Disable All", "全部禁用"],
    ["Individual Tools", "单个工具"],
    ["Search tools...", "搜索工具..."],
    ["No tools available", "暂无可用工具"],
    ["Check your server connection or refresh", "请检查服务器连接或刷新页面"],
    ["Server Error", "服务器错误"],
    ["Server connection error. Check your configuration and try again.", "服务器连接错误，请检查配置后重试。"],
    ["Settings", "设置"],
    ["Instructions", "使用说明"],
    ["Custom Instructions", "自定义说明"],
    ["Enable", "启用"],
    ["Enabled", "已启用"],
    ["Disabled", "已禁用"],
    ["Save", "保存"],
    ["Cancel", "取消"],
    ["Edit", "编辑"],
    ["Copy", "复制"],
    ["Copied!", "已复制"],
    ["Insert", "插入"],
    ["Inserted!", "已插入"],
    ["Attach", "附加"],
    ["Run", "运行"],
    ["Show raw", "显示原始信息"],
    ["Auto Insert", "自动插入"],
    ["Auto Submit", "自动发送"],
    ["Auto Execute", "自动执行"],
    ["Show Sidebar", "显示侧栏"],
    ["Hide Sidebar", "隐藏侧栏"],
    ["Configure", "配置"],
    ["Close", "关闭"],
    ["Active", "已启用"],
    ["Inactive", "未启用"],
    ["Connected", "已连接"],
    ["Disconnected", "未连接"],
    ["Connection", "连接"],
    ["Tools", "工具"],
    ["Status", "状态"],
    ["Server Settings", "服务器设置"],
    ["Server Connected", "服务已连接"],
    ["Server Disconnected", "服务未连接"],
    ["Configure Server", "配置服务器"],
    ["Loading...", "加载中..."],
    ["Loading instructions...", "正在加载使用说明..."],
    ["Generating instructions...", "正在生成使用说明..."],
    ["No custom instructions set", "尚未设置自定义说明"],
    ["Custom instructions disabled", "自定义说明已禁用"],
    ["Enter your custom instructions here...", "在此输入自定义说明..."],
    ["Execution history", "执行历史"],
    ["Run again", "重新运行"],
    ["Show full result", "展开完整结果"],
    ["Collapse result", "收起结果"],
    ["Save locally", "保存到本地"],
    ["Error", "错误"],
  ]);

  const phraseRules = [
    [/^MCP Settings - Active$/, "MCP 设置 - 已启用"],
    [/^MCP Settings - Inactive$/, "MCP 设置 - 未启用"],
    [/^MCP Settings - Sidebar Visible$/, "MCP 设置 - 侧栏已显示"],
    [/^MCP Settings - Sidebar Hidden$/, "MCP 设置 - 侧栏已隐藏"],
    [/^Insert instructions$/, "插入使用说明"],
    [/^Attach instructions as file$/, "以文件附加使用说明"],
    [/^Configure MCP settings$/, "配置 MCP 设置"],
    [/^Copy result$/, "复制结果"],
    [/^Tool execution failed$/, "工具执行失败"],
  ];

  function isGrokPage() {
    const host = window.location.hostname.toLowerCase();
    return host === "grok.com"
      || host.endsWith(".grok.com")
      || ((host === "x.com" || host.endsWith(".x.com") || host === "twitter.com" || host.endsWith(".twitter.com"))
        && window.location.pathname.startsWith("/i/grok"));
  }

  function isOwned(element) {
    if (!(element instanceof Element)) return false;
    if (element.matches(ownedSelector) || Boolean(element.closest(ownedSelector))) return true;

    let root = element.getRootNode?.();
    while (root?.host) {
      const host = root.host;
      if (host.matches?.(ownedSelector) || host.id === "mcp-sidebar-shadow-host" || host.dataset?.shadowHost === "true") {
        return true;
      }
      root = host.getRootNode?.();
    }
    return false;
  }

  function translate(value) {
    const normalized = String(value || "").trim();
    if (!normalized) return null;
    const exact = exactText.get(normalized);
    if (exact) return exact;
    for (const [pattern, replacement] of phraseRules) {
      if (pattern.test(normalized)) return replacement;
    }
    return null;
  }

  function translateTextNode(node) {
    const parent = node.parentElement;
    if (!parent || !isOwned(parent)) return;
    const translated = translate(node.nodeValue);
    if (!translated) return;
    node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), translated);
  }

  function translateAttributes(element) {
    if (!isOwned(element)) return;
    for (const attribute of ["title", "aria-label", "placeholder"]) {
      const value = element.getAttribute(attribute);
      const translated = translate(value);
      if (translated && translated !== value) element.setAttribute(attribute, translated);
    }
  }

  function localize(root) {
    if (root instanceof Text) {
      translateTextNode(root);
      return;
    }
    if (!(root instanceof Element || root instanceof Document || root instanceof ShadowRoot)) return;
    if (root instanceof Element) translateAttributes(root);
    const walker = (root.ownerDocument || document).createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (node instanceof Text) translateTextNode(node);
      else translateAttributes(node);
    }
  }

  function observeShadowRoots(root) {
    if (!root?.querySelectorAll) return;
    const elements = root.querySelectorAll("*");
    for (const element of elements) {
      if (element.shadowRoot) observeRoot(element.shadowRoot);
    }
  }

  const observedRoots = new WeakSet();
  function handleMutations(mutations) {
    for (const mutation of mutations) {
      if (mutation.type === "characterData" || mutation.type === "attributes") localize(mutation.target);
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          localize(node);
          observeShadowRoots(node);
          if (node.shadowRoot) observeRoot(node.shadowRoot);
        });
      }
    }
  }

  function observeRoot(root) {
    if (!root || observedRoots.has(root)) return;
    observedRoots.add(root);
    localize(root);
    observeShadowRoots(root);
    const observer = new MutationObserver(handleMutations);
    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["title", "aria-label", "placeholder"],
    });
  }

  function injectStyles() {
    if (document.getElementById("web-agent-grok-zh-styles")) return;
    const style = document.createElement("style");
    style.id = "web-agent-grok-zh-styles";
    style.textContent = `
#mcp-popover-container,
#mcp-popover-portal,
#mcp-sidebar-container,
.mcp-popover,
.mcp-sidebar {
  letter-spacing: 0 !important;
}
#mcp-popover-container button,
#mcp-popover-portal button,
.mcp-sidebar button {
  min-width: max-content;
  white-space: nowrap;
}
`;
    document.head.appendChild(style);
  }

  if (!isGrokPage()) return;
  injectStyles();
  observeRoot(document);
})();
