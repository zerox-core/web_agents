# web_Agent 本地固定版插件使用指南

本仓库当前可实机使用的浏览器插件在：

```text
extensions/mcp-superassistant-local-fixed
```

这条线只做旧插件小步增强：站点适配、说明优化、默认配置、权限提示和小范围 UI 文案。新插件重构不放在这里。

## 1. 启动本地 MCP 后端

插件只是浏览器侧通道，真正读写本地文件的是本地 MCP SSE 后端。使用前先在 PowerShell 里运行：

```powershell
cd F:\web_agents
.\scripts\start-gemini-backend.local.ps1
```

默认连接地址：

```text
http://127.0.0.1:3006/sse
```

如果插件显示 `SSE error: Failed to fetch` 或 `No tools available`，通常是后端没有启动、端口不对，或者浏览器页面还没刷新。

## 2. 在 Chrome 加载插件

1. 打开 `chrome://extensions`。
2. 打开右上角 `开发者模式`。
3. 如果已经安装商店版 MCP SuperAssistant，先禁用商店版，避免两个插件同时注入同一网页。
4. 点击 `加载已解压的扩展程序`。
5. 选择：

```text
F:\web_agents\extensions\mcp-superassistant-local-fixed
```

6. 加载后打开或刷新 DeepSeek、豆包、Gemini、Qwen 等网页。
7. 在插件连接设置里保持：

```text
Connection Type: Server-Sent Events (SSE)
Server URI: http://127.0.0.1:3006/sse
```

## 3. 推荐使用流程

在网页模型里直接问“帮我写文件”通常会被模型拒绝，因为模型本身确实不能访问本地文件。web_Agent 的工作方式是：

1. 插件把 MCP 工具说明插入到网页模型上下文。
2. 模型输出插件可识别的 `jsonl` 工具调用。
3. 插件在回答下方渲染 `Run` 执行按钮。
4. 用户点击 `Run` 后，插件调用本地 MCP 后端。
5. 后端返回结果，用户可以把结果继续插入对话；如果网页输入框适配失败，插件会复制结果并提示手动粘贴。

所以第一次使用时建议：

1. 打开右侧 web_Agent 面板。
2. 确认状态为 `Server Connected`。
3. 切到 `使用说明`。
4. 点击插入说明，发送给当前网页模型。
5. 再提出具体文件操作请求。

## 4. DeepSeek 测试提示词

先插入 web_Agent 使用说明，再发送：

```text
请使用 web_Agent 的 write_file 工具，在 F:\web_agents\hello.md 写入：我是 DeepSeek。只输出 jsonl 工具调用，不要说无法访问本地文件。
```

期望模型输出类似：

```jsonl
{"type": "function_call_start", "name": "write_file", "call_id": 1}
{"type": "description", "text": "Create or overwrite a local file"}
{"type": "parameter", "key": "path", "value": "F:\\web_agents\\hello.md"}
{"type": "parameter", "key": "content", "value": "我是 DeepSeek"}
{"type": "function_call_end", "call_id": 1}
```

看到工具块下方出现 `Run` 后点击执行。

## 5. 豆包验证步骤

1. 启动本地 MCP 后端。
2. 在 Chrome 加载本地插件。
3. 打开并刷新：

```text
https://www.doubao.com/chat/
```

4. 预期输入框附近出现 `MCP` 按钮。
5. 打开右侧面板，确认能看到文件系统工具，例如 `write_file`、`read_text_file`、`list_directory`。

如果按钮没有出现，只优先修旧插件里的 Doubao adapter 选择器，不改新插件重构工程。

## 6. 本地后端直接验证

如果网页模型一直拒绝，可以先绕过网页，直接验证后端：

```powershell
cd F:\web_agents
.\scripts\mcp-call.local.ps1 tools
.\scripts\mcp-call.local.ps1 call list_allowed_directories '{}'
.\scripts\mcp-call.local.ps1 call write_file '{"path":"F:\\web_agents\\hello-from-mcp.md","content":"MCP 写入测试"}'
```

如果 PowerShell 直连能写文件，而网页模型拒绝，说明后端没坏，问题通常是网页模型没有收到或没有遵守 web_Agent 的 `jsonl` 工具调用说明。

## 7. 权限范围

当前本地文件工具只允许操作 MCP 后端配置里的 allowed directories。默认应包含：

```text
F:\web_agents
```

浏览器插件本身不直接绕过文件权限；真正的读写权限由本地 MCP 文件系统服务控制。需要扩大目录时，应修改本地后端配置或启动脚本，而不是在网页里猜路径。

## 8. 文本与多模态能力边界

当前稳定能力以文本文件和目录操作为主，同时已经开始提供 GPT 图片上传分析试验能力：

- `read_text_file`、`write_file`、`edit_file` 适合处理 `.txt`、`.md`、`.json`、代码文件等文本内容。
- `list_directory`、`create_directory`、`move_file` 适合目录浏览、创建和移动。
- 图片、音频、视频、压缩包、Office 文档等不要用文本读写工具直接处理，否则可能得到乱码或损坏文件。
- 后端工具列表里如果出现 `read_media_file`，可以把允许目录内的图片读成 base64/MIME；在 ChatGPT 页面，旧插件会把支持的图片结果转换成浏览器 `File`，再通过已有 GPT 上传入口附加到输入框。
- 当前 GPT 图片试验功能支持 `png`、`jpg/jpeg`、`webp`、`gif`，插件只负责附加图片，不自动发送。
- 如果图片在同一个文件夹里，先用 `list_directory` 或 `search_files` 找出图片；结果卡片识别到图片路径后会显示 `附加最多20张图片到 GPT`，超过 20 张只取前 20 张。
- 启动 `scripts/start-gemini-backend.local.ps1` 后会同时启动 `http://127.0.0.1:3017` 图片保存服务。ChatGPT 新生成的 assistant 图片会尝试自动保存到 `F:\web_agents\generated\gpt-images\`。
- 如果最近一条用户消息里包含 `F:\web_agents\...` 路径，生成图会优先保存到这个路径所在目录，例如 `F:\web_agents\test\demo.png` 会让生成图保存到 `F:\web_agents\test\`。自动保存只允许写入 `F:\web_agents` 目录内。
- 自动保存会跳过头像、用户上传预览、历史旧图和小图标；如果页面提示“本地图片保存服务未连接”，重新运行本地启动脚本后再生成新图片。
- ChatGPT 不能只靠一段 Windows 路径读取原图。要转换本地图片时，先通过 `read_media_file` 读取图片并点击 `附加到 GPT`，确认输入框出现图片预览后再发送生成请求。
- 当前旧插件不提供稳定的图片编辑、音频理解、视频处理、Office/PDF 解析或多模态文件写入流程。

简单说：现在先把“本地文本文件 + 目录操作”当成可靠能力；GPT 本地图片上传分析可以按试验流程使用，GPT 新生成图片会尽量自动保存到本地工程目录。

## 9. 常见问题

### 右侧面板显示已连接，但模型说不能访问本地文件

这是最常见情况。说明插件和后端连接正常，但模型没有输出工具调用。解决方式：

1. 切到 `使用说明`。
2. 插入说明并发送给模型。
3. 请求里明确写：`只输出 jsonl 工具调用`。

### 没有 Run 按钮

模型没有输出插件可识别的格式。必须包含：

```jsonl
{"type": "function_call_start", "name": "tool_name", "call_id": 1}
{"type": "parameter", "key": "path", "value": "F:\\web_agents\\file.md"}
{"type": "function_call_end", "call_id": 1}
```

### 可用工具为空

检查：

1. PowerShell 后端是否运行。
2. 插件地址是否为 `http://127.0.0.1:3006/sse`。
3. 页面是否刷新。
4. 是否同时启用了商店版和本地版插件。

### 写入跨目录失败

先运行：

```powershell
.\scripts\mcp-call.local.ps1 call list_allowed_directories '{}'
```

只有返回列表里的目录及其子目录能被文件工具操作。
