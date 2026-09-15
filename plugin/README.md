**简体中文** | [English](README.en.md)

# web_Agent

web_Agent 是一个面向网页大模型的本地浏览器插件产品。它把模型网页中的 MCP 面板连接到本机文件系统服务，让模型在用户可见、可审计的权限边界内读取文件、搜索目录、写入内容和执行多步骤任务。

本分支只包含插件产品，不包含 TableLLM 圆桌运行时，也不复制共享 Core 源码。

## 产品定位

web_Agent 适合这些场景：

- 在模型网页中读取本地项目文件，再基于真实内容回答问题。
- 让模型按顺序完成“读取多个文件、修改内容、最后统一汇报”等任务。
- 将模型生成的长文本、代码或结构化结果写入用户指定位置。
- 在不向云端部署额外后端的情况下，通过本机 MCP 使用文件工具。
- 对外部目录写入、移动和删除保留明确的授权范围与审计记录。

它不是一个独立聊天客户端。模型账号、对话记录和网页能力仍由对应模型网站提供。

## 支持范围

扩展清单会在以下网页范围加载 MCP 面板或结果增强脚本：

| 类别 | 网页范围 |
| --- | --- |
| 主流模型 | ChatGPT、Gemini、DeepSeek、Kimi、豆包、通义千问 |
| Grok | `grok.com`，以及 X/Twitter 中的 Grok 页面 |
| 其他清单范围 | Perplexity、Google AI Studio、OpenRouter、Kagi、T3 Chat、Mistral、GitHub Copilot、智谱/ChatGLM |

网页结构会持续变化。“脚本已加载”不等于所有自动插入、自动发送和结果捕获能力始终可用。当前产品测试重点覆盖 ChatGPT、DeepSeek、豆包、Kimi、Grok 和通用 MCP 流程；网页更新后应重新执行测试并人工确认输入框、发送按钮和回复选择器。

## 工作原理

```text
模型网页
  ↓ 浏览器扩展：面板、提示词插入、工具卡队列、结果回传
Filesystem MCP :3006
  ↓ 文件工具、路径检查、权限令牌、审计
Plugin Gateway :3017
  ↓ 配置、授权请求、自动化任务、结果保存
@web-agents/local-core
  ↓ 原子写入、真实路径、并发锁、事务和删除边界
本地文件系统
```

模型每次只返回一个真实工具调用。扩展执行后把结果送回模型，模型再决定下一步；所有步骤完成后再统一汇报。这个串行协议避免多个写入同时运行，也避免模型只完成第一个文件就提前结束。

## 主要能力

- 在支持的模型网页中显示本地化 MCP 面板和连接状态。
- 插入或复制当前网页适用的工具说明，不覆盖用户已经输入的草稿。
- 读取文本、批量读取、列出目录、生成目录树、搜索文件和读取文件信息。
- 创建目录、写入文件、按编辑列表修改文件和移动文件。
- 使用 `delete_file` 删除单个文件；不提供递归目录删除。
- 将多个工具调用排队，每次只执行一个，等待结果后继续。
- 对工具结果提供稳定文本提取，避免重复插入或重复执行。
- 为 Grok 提供 JSONL 工具桥接和 MCP 自有界面的中文本地化。
- 为豆包提供 Windows 绝对路径约束，为 Kimi 等网页保留授权回退流程。
- 保存审计记录、权限状态、图片和长工具结果到插件本地数据目录。

## 目录结构

```text
extensions/mcp-superassistant-local-fixed/
  manifest.json                         当前加载的 Manifest V3 扩展
  background.js                         后台服务工作线程
  content/                              网页面板、适配和结果增强脚本

products/plugin/
  config/                               本机可写目录配置说明
  data/                                 运行数据，默认不提交 Git
  services/                             Filesystem MCP 与插件网关
  tests/                                扩展、权限、结果和边界测试
  start-plugin.bat                      Windows 启动脚本

tools/                                  产品边界检查
```

## 环境要求

- Windows 10 或 Windows 11。
- Node.js 24 或更高版本。
- Chrome 或 Edge，并已登录需要使用的模型网页。
- 本地端口 `3006` 和 `3017` 未被其他程序占用。

## 安装与启动

在插件分支根目录安装依赖：

```powershell
npm ci
```

启动本地服务：

```powershell
.\products\plugin\start-plugin.bat
```

也可以直接使用 npm：

```powershell
npm run start:plugin
```

默认服务：

| 服务 | 地址 |
| --- | --- |
| Filesystem MCP SSE | `http://127.0.0.1:3006/sse` |
| Filesystem MCP 健康检查 | `http://127.0.0.1:3006/health` |
| Plugin Gateway | `http://127.0.0.1:3017` |
| Plugin Gateway 健康检查 | `http://127.0.0.1:3017/health` |

启动脚本会先检查端口。如果两个服务都已经运行，它不会重复启动；如果只有一个端口被占用，它会提示冲突并停止。

## 加载浏览器扩展

1. 打开 `chrome://extensions` 或 `edge://extensions`。
2. 开启“开发者模式”。
3. 选择“加载已解压的扩展程序”。
4. 选择仓库中的 `extensions/mcp-superassistant-local-fixed`。
5. 打开受支持的模型网页，确认 MCP 面板出现。
6. 修改扩展代码后，在扩展管理页点击“重新加载”，然后刷新模型网页。

扩展中的 MCP 连接使用：

```text
Connection Type: SSE
Server URI: http://127.0.0.1:3006/sse
```

不要同时启用商店版本和本地开发版本，否则可能出现重复面板、旧适配器覆盖或工具结果重复执行。

## 权限与删除规则

读取操作可以使用用户明确提供的绝对路径，并会记录必要的访问上下文。修改操作遵循以下顺序：

1. 用户在当前任务中明确输入 Windows 绝对路径时，扩展记录该路径意图。
2. 与该意图匹配的修改可以自动授权，并只持久化对应目录，不扩大到盘符根目录。
3. 没有匹配路径意图的外部修改进入授权面板。
4. 用户可以选择一次性批准、按目录持久批准或拒绝。
5. 权限令牌绑定请求、工具、路径和参数，不能用于其他操作。

可选的静态可写目录文件位于：

```text
products/plugin/config/allowed-directories.local.txt
```

可以从 `allowed-directories.example.txt` 创建本机文件，每行填写一个绝对目录。该文件包含本机路径，必须保持未跟踪状态。

`delete_file` 仅删除单个文件，使用与写入相同的权限和审计控制。删除目录会被拒绝，递归目录删除没有暴露给模型。

## 本地数据与隐私

以下内容属于本机运行数据，不应提交：

- `products/plugin/data/` 中的权限、审计、图片和工具结果。
- `products/plugin/config/*.local.*` 本机配置。
- 本机绝对路径、账号信息、令牌和真实会话内容。
- `node_modules/`、临时日志和测试输出。

文件内容只在本机 MCP、浏览器扩展和用户正在使用的模型网页之间流转。是否将内容发送给模型网站取决于用户调用的网页服务及其隐私政策。

## 测试与构建

运行完整验证：

```powershell
npm test
```

该命令依次执行产品边界、扩展、服务、源码边界测试，并验证未解压扩展的运行文件。

也可以分别运行：

```powershell
npm run check:boundaries
npm run test:plugin
npm run build:plugin
```

修改网页适配器后，自动测试不能替代人工网页验证；至少应在目标网页确认面板显示、提示词插入、发送、工具执行和结果回传。

## 常见问题

**双击 BAT 后窗口闪退**

在 PowerShell 中运行 `.\products\plugin\start-plugin.bat` 查看错误。优先检查 Node.js 版本以及 `3006/3017` 端口占用。

**网页出现两个 MCP 面板**

关闭商店版或其他本地副本，只保留当前 `extensions/mcp-superassistant-local-fixed`，然后刷新网页。

**面板出现但无法插入提示词**

重新加载扩展并刷新模型网页。网页 DOM 更新可能使输入框或发送按钮选择器失效，需要针对该网页更新适配器。

**写入没有出现授权或仍被拒绝**

确认本地网关健康、路径为 Windows 绝对路径，并确认路径确实出现在当前用户输入中。没有明确路径意图的修改需要在授权面板中处理。

**端口已占用**

不要同时启动插件和另一个使用 `3006/3017` 的旧服务。启动脚本会显示冲突端口；停止对应进程后重试。

## 版本与分支

- 正式分支：`webagent`。
- 当前版本：`1.0.3`。
- 发布标签：`webagent-v1.0.3`。
- 共享底座：`@web-agents/local-core@1.0.1`，固定到 `local-core-v1.0.1` 标签。
- 圆桌产品已迁移至独立仓库 [zhuxice-ctrl/web_agent_tablellm](https://github.com/zhuxice-ctrl/web_agent_tablellm)；两个产品不互相合并。

## 许可证

[MIT](LICENSE)
