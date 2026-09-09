# web_Agent 本地固定版

这是 `webagent-v1` 分支唯一的活动扩展入口，版本为 `1.0.0`，包含中文面板、网页适配、权限回路、连续任务和 Grok 反向任务通道。

## 加载路径

在 Chrome 或 Edge 打开 `chrome://extensions` / `edge://extensions`，启用开发者模式，选择“加载已解压的扩展程序”：

```text
<仓库目录>\extensions\mcp-superassistant-local-fixed
```

v1 已移除其他插件副本。浏览器中不要同时启用商店版或旧工作区加载的扩展。

## MCP 连接

扩展设置使用：

```text
Connection Type: Server-Sent Events (SSE)
Server URI: http://127.0.0.1:3006/sse
```

插件专属服务：

- MCP 文件读写：`http://127.0.0.1:3006`
- 反向任务和图片保存：`http://127.0.0.1:3017`

## 已适配入口

保留原有输入框 MCP 集成，并补齐中文入口和国产模型站点：

- ChatGPT、Gemini、Google AI Studio
- DeepSeek、豆包、Kimi、Qwen
- BigModel / Zhipu / GLM、Chat Z、Mistral、OpenRouter
- GitHub Copilot、Perplexity、Grok / X

所有已适配站点统一加载 `content/index-main.iife.js` 中文 bundle。Grok / X 使用已经合入主 bundle 的 `GrokAdapter`，并额外加载 `local-automation-bridge.js` 保留反向任务能力；v1 已删除不再使用的旧英文 bundle。

Grok / X 还会加载 `grok-zh-localization.js`，仅翻译插件自己的 MCP 按钮、弹层、侧栏、状态提示和结果卡操作，不改动 Grok 网页正文或对话内容。

`web-agent-result-enhancer.js` 和 `web-agent-insert-fallback.js` 负责跨网页的中文结果卡、稳定结果保存和“插入失败时复制”兜底；它们不替换原有 MCP 输入框 bundle。

## 连续任务

需要连续读取多个文件或按顺序执行多个工具时，同时启用“自动插入”“自动发送”“自动执行”。web_Agent 每轮只运行一个工具，把结果送回模型后继续待办队列；上一项结束后才释放下一项，全部步骤完成后由模型统一汇报。

关闭其中任一自动化选项时，队列会停在对应的人工操作环节，等待手动插入结果、发送消息或运行工具。

## Grok 反向任务

Grok 页面会从 `3017` 异步领取 `provider.generate_image` 任务，输入提示词、等待新图片、保存到任务的 `targetDirectory`，再回传任务结果。不同页面可以并发执行，任务自身携带 `sessionId`、`workspaceRoot` 和目标目录。

目标项目目录必须位于插件白名单中。白名单文件是本机忽略配置：

```text
products/plugin/config/allowed-directories.local.txt
```

## 运行

从当前仓库根目录启动：

```powershell
products\plugin\start-plugin.bat
```

启动后刷新模型网页。不要同时启用商店版和此本地版扩展。
