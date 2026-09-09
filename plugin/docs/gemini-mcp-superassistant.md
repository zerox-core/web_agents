# Gemini / DeepSeek + MCP SuperAssistant

Gemini、DeepSeek 等网页端可以通过 MCP SuperAssistant 浏览器扩展连接本地 MCP 服务。

如果商店版扩展不稳定，或者需要本地修改过的站点权限，可以使用仓库里的本地解包版：

```text
extensions/mcp-superassistant-local-fixed
```

安装方式见：[本地魔改版 MCP SuperAssistant 扩展](local-fixed-extension.md)。

## 连接地址

默认本地 SSE 地址：

```text
http://127.0.0.1:3006/sse
```

连接类型：

```text
Server-Sent Events / SSE
```

## 注意机制

MCP SuperAssistant 通常不是模型原生工具。

它的流程是：

1. 模型根据扩展注入的说明输出工具调用文本。
2. 扩展识别工具调用。
3. 扩展执行 MCP 工具。
4. 扩展把结果插回网页对话。

所以如果模型说“我不能直接访问本地文件”，不一定是后端坏了。需要让它按照 MCP SuperAssistant 的工具调用格式输出。

## 常见提示词

```text
请按照 MCP SuperAssistant instructions 的格式调用本地 MCP 工具。
请生成工具调用，读取指定路径的文件。
不要说你直接访问本地文件；浏览器扩展会执行工具调用。
```

## 工具列表显示 0

某些版本的 MCP SuperAssistant 对新版 MCP 工具字段兼容不完整，可能出现：

```text
Server Connected
0 of 0 tools
```

如果服务端实际返回工具，但 UI 不显示，需要检查工具 schema 兼容性，例如 `outputSchema` 字段。
