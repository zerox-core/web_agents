# GPT Generated Image Local Save Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Save newly generated ChatGPT images directly into the local repository folder at `generated/gpt-images`.

**Architecture:** Keep the legacy extension structure. Add a tiny local HTTP image-save gateway started alongside the existing MCP backend, then have the ChatGPT content script detect newly generated assistant images and ask the background service worker to forward image data to the gateway.

**Tech Stack:** Chrome extension Manifest V3, legacy bundled JavaScript content script, background service worker, Node.js built-in `http/fs/path` modules, PowerShell startup script.

---

## File Structure

- Create `scripts/web-agent-image-save-gateway.mjs`
  - Owns local binary image writing.
  - Exposes `GET /health` and `POST /save-gpt-image`.
  - Saves only into `<repo>/generated/gpt-images`.
- Modify `scripts/start-gemini-backend.local.ps1`
  - Starts the image-save gateway as a background PowerShell job.
  - Keeps the existing MCP filesystem proxy behavior unchanged.
  - Stops the gateway job when the MCP proxy exits.
- Modify `scripts/start-gemini-backend.example.ps1`
  - Documents the optional gateway startup for cloned repositories.
- Modify `extensions/mcp-superassistant-local-fixed/manifest.json`
  - Adds `http://127.0.0.1:3017/*` to `host_permissions`.
  - Bumps the legacy plugin patch version.
- Modify `extensions/mcp-superassistant-local-fixed/background.js`
  - Adds one command handler: `webAgentSaveGeneratedImage`.
  - Forwards image payloads to `http://127.0.0.1:3017/save-gpt-image`.
- Modify `extensions/mcp-superassistant-local-fixed/content/index.iife.js`
  - Adds a ChatGPT-only `MutationObserver`.
  - Captures new assistant/generated images, skips old images and user/composer images, sends base64 data to background.
  - Shows Chinese success/failure toast.
- Modify `extensions/mcp-superassistant-local-fixed/README.md` and `docs/local-fixed-extension.md`
  - Documents startup and usage.

## Task 1: Add Local Image Save Gateway

**Files:**
- Create: `scripts/web-agent-image-save-gateway.mjs`
- Test: `node --check scripts/web-agent-image-save-gateway.mjs`

- [ ] **Step 1: Create the gateway script**

Create `scripts/web-agent-image-save-gateway.mjs` with this behavior:

```js
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const outputDir = path.join(repoRoot, "generated", "gpt-images");
const port = Number(process.env.WEB_AGENT_IMAGE_SAVE_PORT || 3017);
const host = process.env.WEB_AGENT_IMAGE_SAVE_HOST || "127.0.0.1";
const maxBytes = Number(process.env.WEB_AGENT_IMAGE_SAVE_MAX_BYTES || 50 * 1024 * 1024);
const allowedMimeTypes = new Map([
  ["image/png", ".png"],
  ["image/jpeg", ".jpg"],
  ["image/jpg", ".jpg"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
  });
  response.end(JSON.stringify(body));
}

function sanitizeFileName(value, extension) {
  const fallback = `gpt-image-${new Date().toISOString().replace(/[-:]/g, "").replace(/\..+$/, "").replace("T", "-")}${extension}`;
  const raw = typeof value === "string" && value.trim() ? value.trim() : fallback;
  const baseName = path.basename(raw).replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").slice(0, 120);
  const parsed = path.parse(baseName);
  const safeName = parsed.name || path.parse(fallback).name;
  return `${safeName}${extension}`;
}

async function readJson(request) {
  const chunks = [];
  let total = 0;
  for await (const chunk of request) {
    total += chunk.length;
    if (total > maxBytes * 1.4) {
      throw new Error("PAYLOAD_TOO_LARGE");
    }
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function saveImage(payload) {
  const mimeType = String(payload?.mimeType || "").toLowerCase();
  const extension = allowedMimeTypes.get(mimeType);
  if (!extension) {
    const error = new Error("UNSUPPORTED_MIME_TYPE");
    error.statusCode = 415;
    throw error;
  }

  const base64 = String(payload?.base64 || "").replace(/^data:[^,]+,/, "");
  if (!base64) {
    const error = new Error("EMPTY_IMAGE_DATA");
    error.statusCode = 400;
    throw error;
  }

  const imageBuffer = Buffer.from(base64, "base64");
  if (!imageBuffer.length) {
    const error = new Error("EMPTY_IMAGE_DATA");
    error.statusCode = 400;
    throw error;
  }
  if (imageBuffer.length > maxBytes) {
    const error = new Error("IMAGE_TOO_LARGE");
    error.statusCode = 413;
    throw error;
  }

  await fs.mkdir(outputDir, { recursive: true });
  const fileName = sanitizeFileName(payload?.fileName, extension);
  const filePath = path.join(outputDir, fileName);
  const resolved = path.resolve(filePath);
  const resolvedOutput = path.resolve(outputDir);
  if (!resolved.startsWith(resolvedOutput + path.sep)) {
    const error = new Error("INVALID_FILE_PATH");
    error.statusCode = 400;
    throw error;
  }

  await fs.writeFile(resolved, imageBuffer);
  return { filePath: resolved, bytes: imageBuffer.length, mimeType };
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.method === "OPTIONS") {
      return sendJson(response, 204, {});
    }
    if (request.method === "GET" && request.url === "/health") {
      return sendJson(response, 200, { ok: true, outputDir });
    }
    if (request.method === "POST" && request.url === "/save-gpt-image") {
      const payload = await readJson(request);
      const result = await saveImage(payload);
      return sendJson(response, 200, { ok: true, ...result });
    }
    return sendJson(response, 404, { ok: false, error: "NOT_FOUND" });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const statusCode = error?.statusCode || (message === "PAYLOAD_TOO_LARGE" ? 413 : 500);
    return sendJson(response, statusCode, { ok: false, error: message });
  }
});

server.listen(port, host, () => {
  console.log(`web_Agent image save gateway listening at http://${host}:${port}`);
  console.log(`Saving GPT images to ${outputDir}`);
});
```

- [ ] **Step 2: Check script syntax**

Run:

```powershell
node --check scripts/web-agent-image-save-gateway.mjs
```

Expected: no output and exit code `0`.

- [ ] **Step 3: Smoke test the gateway manually**

Run in one terminal:

```powershell
node scripts/web-agent-image-save-gateway.mjs
```

Run in another terminal:

```powershell
$body = @{
  fileName = "gpt-image-smoke.png"
  mimeType = "image/png"
  base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFgwJ/lpdtVwAAAABJRU5ErkJggg=="
} | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:3017/save-gpt-image" -ContentType "application/json" -Body $body
```

Expected: JSON with `ok: true`, a `filePath` under `F:\web_agents\generated\gpt-images`, and `generated/gpt-images/gpt-image-smoke.png` exists.

- [ ] **Step 4: Commit gateway**

Run:

```powershell
git add -- scripts/web-agent-image-save-gateway.mjs
git commit -m "Add local GPT image save gateway"
```

## Task 2: Start Gateway With Existing Backend

**Files:**
- Modify: `scripts/start-gemini-backend.local.ps1`
- Modify: `scripts/start-gemini-backend.example.ps1`

- [ ] **Step 1: Update local startup script**

Replace `scripts/start-gemini-backend.local.ps1` with a version that starts the gateway job first, then runs the existing MCP proxy:

```powershell
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$gatewayScript = Join-Path $repoRoot "scripts/web-agent-image-save-gateway.mjs"

Set-Location $repoRoot

Write-Host "Starting web_Agent local image save gateway on http://127.0.0.1:3017 ..." -ForegroundColor Cyan
$gatewayJob = Start-Job -ScriptBlock {
  param($ScriptPath)
  node $ScriptPath
} -ArgumentList $gatewayScript

Start-Sleep -Milliseconds 600
if ($gatewayJob.State -eq "Failed") {
  Receive-Job $gatewayJob
  throw "web_Agent image save gateway failed to start."
}

try {
  Write-Host "Starting MCP filesystem bridge on http://127.0.0.1:3006/sse ..." -ForegroundColor Cyan
  npx -y mcp-proxy@latest `
    --port 3006 `
    --host 127.0.0.1 `
    --sseEndpoint /sse `
    --streamEndpoint /mcp `
    --shell `
    -- `
    npx.cmd `
    -y `
    @modelcontextprotocol/server-filesystem@latest `
    F:\web_agents
}
finally {
  if ($gatewayJob) {
    Stop-Job $gatewayJob -ErrorAction SilentlyContinue
    Receive-Job $gatewayJob -ErrorAction SilentlyContinue
    Remove-Job $gatewayJob -Force -ErrorAction SilentlyContinue
  }
}
```

- [ ] **Step 2: Update example startup script**

Update `scripts/start-gemini-backend.example.ps1` to explain that cloned users should start both services:

```powershell
$ErrorActionPreference = "Stop"

Write-Host "Example only."
Write-Host "Start your local filesystem MCP SSE bridge here."
Write-Host "Default MCP endpoint: http://127.0.0.1:3006/sse"
Write-Host "Optional GPT image save gateway: node scripts/web-agent-image-save-gateway.mjs"
Write-Host "Default image save gateway endpoint: http://127.0.0.1:3017"
```

- [ ] **Step 3: Verify gateway health via startup script**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-gemini-backend.local.ps1
```

In another terminal, run:

```powershell
Invoke-RestMethod "http://127.0.0.1:3017/health"
```

Expected: JSON with `ok: true` and `outputDir` ending in `generated\gpt-images`.

- [ ] **Step 4: Commit startup changes**

Run:

```powershell
git add -- scripts/start-gemini-backend.local.ps1 scripts/start-gemini-backend.example.ps1
git commit -m "Start image save gateway with local backend"
```

## Task 3: Add Extension Background Save Bridge

**Files:**
- Modify: `extensions/mcp-superassistant-local-fixed/manifest.json`
- Modify: `extensions/mcp-superassistant-local-fixed/background.js`

- [ ] **Step 1: Add localhost host permission and bump patch version**

In `extensions/mcp-superassistant-local-fixed/manifest.json`:

```json
"host_permissions": [
  "http://127.0.0.1:3017/*",
  "...existing entries..."
],
"version": "0.6.2"
```

Keep every existing AI website permission.

- [ ] **Step 2: Add background forwarding helper**

In `extensions/mcp-superassistant-local-fixed/background.js`, insert before the existing `chrome.runtime.onMessage.addListener((e, t, r) => {`:

```js
const WEB_AGENT_IMAGE_SAVE_ENDPOINT = "http://127.0.0.1:3017/save-gpt-image";
async function saveGeneratedImageToLocal(e) {
  const t = e && e.payload ? e.payload : {};
  const r = await fetch(WEB_AGENT_IMAGE_SAVE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  });
  const n = await r.json().catch(() => ({}));
  if (!r.ok || !n.ok)
    throw new Error(n.error || `HTTP ${r.status}`);
  return n;
}
```

- [ ] **Step 3: Handle content script save command**

At the start of the existing background message listener, before analytics handling, add:

```js
  if (e.command === "webAgentSaveGeneratedImage") {
    saveGeneratedImageToLocal(e).then((n) => {
      r({ success: true, result: n });
    }).catch((n) => {
      const o = n instanceof Error ? n.message : String(n);
      x.error("[Background] Failed to save generated GPT image:", n);
      r({ success: false, error: o });
    });
    return true;
  }
```

- [ ] **Step 4: Verify background syntax**

Run:

```powershell
node --check extensions/mcp-superassistant-local-fixed/background.js
```

Expected: no output and exit code `0`.

- [ ] **Step 5: Commit background bridge**

Run:

```powershell
git add -- extensions/mcp-superassistant-local-fixed/manifest.json extensions/mcp-superassistant-local-fixed/background.js
git commit -m "Bridge GPT image saves to local gateway"
```

## Task 4: Add ChatGPT Generated Image Observer

**Files:**
- Modify: `extensions/mcp-superassistant-local-fixed/content/index.iife.js`

- [ ] **Step 1: Insert observer helpers**

In `extensions/mcp-superassistant-local-fixed/content/index.iife.js`, insert a ChatGPT-only observer before the existing content script startup line `QT(),R("Content script loaded - initializing with Session 10 architecture");`.

The inserted code must define:

```js
const WEB_AGENT_GPT_IMAGE_SAVE_CONFIG = {
  minWidth: 256,
  minHeight: 256,
  stableDelayMs: 1400
};
```

and helper functions:

- `isWebAgentChatGptPage()`
- `showWebAgentImageSaveToast(message, type)`
- `getWebAgentImageKey(img)`
- `isWebAgentExistingImage(img)`
- `isLikelyGeneratedGptImage(img)`
- `blobToBase64Payload(blob)`
- `inferImageExtension(mimeType, src)`
- `makeGeneratedImageFileName(mimeType, src)`
- `saveGeneratedGptImage(img)`
- `startGeneratedGptImageAutoSave()`

The observer should:

- Snapshot all existing `img` nodes into a `Set` before observing.
- Observe `document.body` with `{ childList: true, subtree: true, attributes: true, attributeFilter: ["src", "srcset"] }`.
- Process only images that appear after observer startup.
- Skip images below `256x256`.
- Skip images inside `form`, `textarea`, `[contenteditable="true"]`, `#prompt-textarea`, `[data-message-author-role="user"]`, and composer/upload/attachment containers.
- Prefer images inside `[data-message-author-role="assistant"]`, `article`, or assistant-like containers.
- Use `fetch(img.currentSrc || img.src)` first. If fetch fails, try canvas extraction.
- Send `{ command: "webAgentSaveGeneratedImage", payload: { fileName, mimeType, base64, sourceUrl } }` to `chrome.runtime.sendMessage`.
- Deduplicate by image URL and DOM node.
- Show success toast with the saved absolute path.

- [ ] **Step 2: Call observer after content startup**

Immediately after `QT(),R("Content script loaded - initializing with Session 10 architecture");`, add:

```js
startGeneratedGptImageAutoSave();
```

The function itself must return early on non-ChatGPT hosts, so other providers are not affected.

- [ ] **Step 3: Verify content syntax**

Run:

```powershell
node --check extensions/mcp-superassistant-local-fixed/content/index.iife.js
```

Expected: no output and exit code `0`.

- [ ] **Step 4: Commit content observer**

Run:

```powershell
git add -- extensions/mcp-superassistant-local-fixed/content/index.iife.js
git commit -m "Auto-save generated ChatGPT images locally"
```

## Task 5: Document Usage

**Files:**
- Modify: `extensions/mcp-superassistant-local-fixed/README.md`
- Modify: `docs/local-fixed-extension.md`

- [ ] **Step 1: Update extension README**

Add a Chinese section after the GPT image upload section:

```markdown
### GPT 生成图片自动保存

启动 `scripts/start-gemini-backend.local.ps1` 后，会同时启动本地图片保存服务：

- MCP 地址：`http://127.0.0.1:3006/sse`
- 图片保存服务：`http://127.0.0.1:3017`
- 默认保存目录：`F:\web_agents\generated\gpt-images\`

在 ChatGPT 页面生成新图片时，插件会尝试自动保存 assistant 新生成的图片结果。插件会跳过头像、用户上传预览、历史旧图和小图标。保存成功后页面会显示中文提示和本地绝对路径。

如果提示“本地图片保存服务未连接”，请重新运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-gemini-backend.local.ps1
```
```

- [ ] **Step 2: Update local fixed extension doc**

Add the same workflow summary to `docs/local-fixed-extension.md` under the multimodal boundary section.

- [ ] **Step 3: Commit docs**

Run:

```powershell
git add -- extensions/mcp-superassistant-local-fixed/README.md docs/local-fixed-extension.md
git commit -m "Document GPT generated image saving"
```

## Task 6: Final Verification

**Files:**
- Verify all modified files.

- [ ] **Step 1: Run static checks**

Run:

```powershell
node --check scripts/web-agent-image-save-gateway.mjs
node --check extensions/mcp-superassistant-local-fixed/background.js
node --check extensions/mcp-superassistant-local-fixed/content/index.iife.js
git diff --check
```

Expected: all commands exit `0`.

- [ ] **Step 2: Run gateway write smoke test**

Run:

```powershell
$p = Start-Process -FilePath node -ArgumentList "scripts/web-agent-image-save-gateway.mjs" -PassThru -WindowStyle Hidden
Start-Sleep -Milliseconds 700
$body = @{
  fileName = "gpt-image-final-smoke.png"
  mimeType = "image/png"
  base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFgwJ/lpdtVwAAAABJRU5ErkJggg=="
} | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:3017/save-gpt-image" -ContentType "application/json" -Body $body
Stop-Process -Id $p.Id
Test-Path "generated/gpt-images/gpt-image-final-smoke.png"
```

Expected: the REST response has `ok: true`, and `Test-Path` prints `True`.

- [ ] **Step 3: Check repository status**

Run:

```powershell
git status --short
```

Expected: only known local process files remain untracked, and all planned source/doc changes are committed.

- [ ] **Step 4: Manual Chrome verification**

Run the backend:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-gemini-backend.local.ps1
```

Reload the unpacked `web_Agent` extension in Chrome, open ChatGPT, generate one image, and confirm:

- A Chinese save toast appears.
- A new image file appears under `F:\web_agents\generated\gpt-images\`.
- Existing `read_media_file` image attach flow still shows `附加到 GPT` and still attaches local images.

## Self-Review

- Spec coverage: The plan covers direct local saving, conservative ChatGPT-only generated image detection, fixed output directory, local binary writing, Chinese status messages, startup documentation, and regression checks.
- Placeholder scan: No banned placeholder markers, delayed-work wording, or vague error-handling steps remain.
- Type consistency: Payload names are consistent across content script, background bridge, and gateway: `fileName`, `mimeType`, `base64`, and `sourceUrl`.
