# GPT 生成图片本地自动保存设计

## 背景

旧版可用插件 `web_Agent` 当前已经支持把本地 MCP 图片结果附加到 ChatGPT 输入框，用于让 GPT 分析本地图片。下一步需要补齐反向链路：当 ChatGPT 在网页端生成新图片后，插件能自动把生成结果保存到本地工程目录。

本功能只在旧插件小步增强分支内实现，不重构工程结构，不引入新前端框架。

## 目标

- 在 ChatGPT 页面识别新生成的图片结果。
- 自动保存新生成图片到 `F:\web_agents\generated\gpt-images\`。
- 排除头像、用户上传预览、历史消息旧图和页面装饰图片。
- 保存成功或失败后给出中文提示。
- 保持现有文本工具、文件读写、GPT 图片附加能力不退化。

## 非目标

- 不保存页面里出现的所有图片。
- 不做图片编辑、图片批量管理、视频或音频保存。
- 不改造成新插件重构架构。
- 不依赖 Chrome 下载目录作为最终保存位置。

## 用户流程

1. 用户打开 ChatGPT，并启用 `web_Agent` 旧插件。
2. 用户让 ChatGPT 生成图片。
3. 插件观察到对话区出现新的生成结果图。
4. 插件抓取图片数据，转成 base64 和 MIME 信息。
5. 插件调用本地写入能力，把图片保存到 `F:\web_agents\generated\gpt-images\`。
6. 页面显示中文提示，例如：`已保存 GPT 图片：F:\web_agents\generated\gpt-images\gpt-image-20260630-153012-001.png`。

## 识别规则

第一版采用保守识别：

- 只处理 ChatGPT 页面中新出现的图片节点。
- 优先选择 assistant 消息区域、生成结果区域、图片预览区域中的图片。
- 跳过已经存在于页面初始快照中的图片。
- 跳过尺寸过小的图片，避免头像和图标被保存。
- 跳过用户输入区、上传预览区和明显的装饰图。
- 对同一图片 URL 或同一 DOM 节点做去重，避免重复写入。

如果 ChatGPT 后续 DOM 结构变化，识别逻辑应失败得保守：宁可不保存并提示，也不要大量误保存无关图片。

## 保存路径和命名

默认保存目录：

```text
F:\web_agents\generated\gpt-images\
```

默认文件名：

```text
gpt-image-YYYYMMDD-HHMMSS-NNN.ext
```

扩展名根据 MIME 或图片 URL 推断。无法可靠推断时默认使用 `.png`。

## 架构

### 内容脚本

旧插件的 `content/index.iife.js` 负责：

- 在 ChatGPT 页面启用图片观察器。
- 使用 `MutationObserver` 监听新图片节点。
- 判断图片是否属于 GPT 新生成结果。
- 通过 `fetch` 或 canvas 读取图片数据。
- 把 `{ fileName, mimeType, base64 }` 发送给本地写入能力。
- 在页面侧给出中文状态提示。

### 本地写入能力

当前 MCP filesystem 的 `write_file` 更适合文本，不适合直接写 PNG/JPG 二进制。第一版需要新增一个最小本地二进制写入能力：

- 输入：目标文件名、MIME、base64 图片数据。
- 行为：确保 `F:\web_agents\generated\gpt-images\` 存在，解码 base64，写入二进制文件。
- 输出：保存后的绝对路径。

实现可以是轻量本地 gateway 或自定义 MCP 工具，但应保持旧插件调用面简单，不改动大架构。

### 后台脚本

如果内容脚本直接访问本地写入能力存在跨域或权限问题，可由 `background.js` 作为转发层：

- 内容脚本发送保存请求到 background。
- background 调用本地 gateway。
- background 把保存结果返回内容脚本。

## 错误处理

- 图片数据读取失败：提示 `无法读取图片数据，请点击图片放大后重试`。
- 本地写入服务未启动：提示 `本地图片保存服务未连接，请先启动 web_Agent 后端`。
- 保存目录创建失败：提示 `保存目录创建失败，请检查本地权限`。
- 图片格式不支持：提示 `当前图片格式暂不支持自动保存`。
- 重复图片：静默跳过，不重复提示。

## 安全边界

- 第一版固定保存到 `F:\web_agents\generated\gpt-images\`，不接受网页传入任意绝对路径。
- 文件名由插件生成或严格清洗，避免路径穿越。
- 只写图片二进制，不执行下载内容。
- 不把保存到本地的图片自动再次上传给模型。

## 验证计划

- 静态验证：`node --check extensions/mcp-superassistant-local-fixed/content/index.iife.js`。
- 静态验证：`node --check extensions/mcp-superassistant-local-fixed/background.js`。
- 差异检查：`git diff --check`。
- 本地验证：启动旧插件后端，打开 ChatGPT 生成一张图片，确认图片自动保存到 `F:\web_agents\generated\gpt-images\`。
- 回归验证：确认现有 `read_media_file` 图片附加到 GPT 功能仍然可用。

## 成功标准

- ChatGPT 新生成的图片能自动落盘到目标目录。
- 页面不会批量误保存头像、历史图、用户上传图。
- 保存成功路径对用户可见。
- 后端未启动或读取失败时有清晰中文提示。
- 旧插件现有文字、本地文件和 GPT 图片附加流程保持可用。
