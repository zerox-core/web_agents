# GPT Image Multimodal Design

Date: 2026-06-30
Branch: codex/legacy-local-fixed-enhancements
Scope: extensions/mcp-superassistant-local-fixed

## Goal

Add a small, stable multimodal step to the existing usable web_Agent browser extension by letting ChatGPT receive local image files through the current MCP filesystem bridge.

This is not a rewrite. It must preserve the legacy extension structure and reuse the existing ChatGPT adapter file attachment path where possible.

## First Version Scope

- Support image upload to ChatGPT from MCP `read_media_file` results.
- Supported MIME types: `image/png`, `image/jpeg`, `image/jpg`, `image/webp`, `image/gif`.
- Files must be inside the MCP allowed directories.
- The extension should attach the image to the ChatGPT composer, then let the user manually verify and send.
- UI copy and errors should be Chinese-first.

Out of scope for this version:

- Audio, video, Office documents, archives, PDF multimodal handling.
- Image editing or writing modified binary media back to disk.
- Batch upload.
- Multi-model routing or a generalized multimodal task panel.
- React/Vite/TypeScript rewrite or new extension architecture.

## User Flow

1. User opens ChatGPT with the legacy web_Agent extension loaded.
2. User asks ChatGPT to inspect a local image path that is inside the allowed MCP directory.
3. ChatGPT calls `read_media_file`.
4. The extension receives a tool result with base64 data and MIME type.
5. The tool result card shows an `附加到 GPT` action when the result is a supported image.
6. User clicks `附加到 GPT`.
7. The extension converts the base64 data into a browser `File` and calls the existing active adapter `attachFile(file)`.
8. ChatGPT shows the image preview.
9. User manually sends the message after confirming the preview.

## Architecture

The first implementation should be a thin bridge between MCP media output and the existing ChatGPT attachment adapter:

- MCP backend: existing `@modelcontextprotocol/server-filesystem` exposes `read_media_file`.
- Content script: detect supported image blocks in tool results.
- UI layer: render a small action button beside supported image results.
- Adapter layer: reuse `ChatGPTAdapter.attachFile(file)` instead of duplicating upload selectors.

No new local gateway is required for this first version because `read_media_file` already returns base64 and MIME data through the existing MCP channel.

## Data Handling

Expected successful media result shape is MCP-style content containing an image block:

```json
{
  "content": [
    {
      "type": "image",
      "data": "<base64>",
      "mimeType": "image/png"
    }
  ]
}
```

The content script should:

- Validate `type === "image"`.
- Validate MIME type against the supported allowlist.
- Convert base64 to a `Blob`.
- Create a `File` with a safe fallback name when no file name is available.
- Call the active adapter attachment function.

## Error Handling

Use concise Chinese messages:

- `当前结果不是支持的图片类型`
- `未找到 GPT 上传入口，请刷新页面或重新打开对话`
- `图片附加失败，请确认 ChatGPT 当前模型支持图片`
- `MCP 未连接或文件不在允许目录内`

The extension should not auto-submit after attachment. This avoids accidental uploads and lets the user confirm that ChatGPT accepted the image.

## Testing

Static checks:

- `node --check extensions/mcp-superassistant-local-fixed/content/index.iife.js`
- `node --check extensions/mcp-superassistant-local-fixed/background.js`
- `git diff --check`

Manual check:

- Start the local backend with `scripts/start-gemini-backend.local.ps1`.
- Load `F:\web_agents\extensions\mcp-superassistant-local-fixed` in Chrome.
- Open ChatGPT.
- Ask it to read an allowed local image with `read_media_file`.
- Click `附加到 GPT`.
- Confirm the image preview appears and the page remains responsive.

## Acceptance Criteria

- ChatGPT text/file-system behavior from the legacy extension still works.
- Supported image results expose an obvious `附加到 GPT` action.
- Clicking the action uploads the image through the existing ChatGPT adapter.
- Unsupported media does not show a misleading upload action.
- User remains in control of final send.
