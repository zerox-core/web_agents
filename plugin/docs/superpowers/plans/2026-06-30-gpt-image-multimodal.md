# GPT Image Multimodal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let the legacy web_Agent extension attach local MCP image results to ChatGPT through the existing ChatGPT file upload adapter.

**Architecture:** Keep the old bundled extension structure. Add a thin content-script bridge that detects MCP `read_media_file` image results, converts base64 to a browser `File`, and calls the active adapter's existing `attachFile(file)` method without auto-submitting.

**Tech Stack:** Chrome extension Manifest V3, bundled JavaScript content script, existing MCP SSE bridge, existing `@modelcontextprotocol/server-filesystem` `read_media_file` tool.

---

## File Structure

- Modify: `extensions/mcp-superassistant-local-fixed/content/index.iife.js`
  - Add image MIME detection and base64-to-File helpers near the existing adapter-access and attachment helpers, before `mS=async(...)`.
  - Update `hs(...)` tool result rendering so supported image results show `附加到 GPT`.
  - Keep the existing text result `插入` and text-file `附加 File` behavior for non-media results.
- Modify: `extensions/mcp-superassistant-local-fixed/README.md`
  - Add a short Chinese GPT image upload workflow.
- Modify: `docs/local-fixed-extension.md`
  - Update multimodal boundary notes from "not stable" to "GPT image first version".

No new extension architecture, build system, React/Vite/TypeScript source tree, or local gateway should be introduced.

## Task 1: Baseline Checks

**Files:**
- Read only: `extensions/mcp-superassistant-local-fixed/content/index.iife.js`
- Read only: `extensions/mcp-superassistant-local-fixed/background.js`
- Read only: `scripts/mcp-call.local.ps1`

- [ ] **Step 1: Confirm branch and dirty files**

Run:

```powershell
git status --short -b
git log -1 --oneline
```

Expected:

```text
## codex/legacy-local-fixed-enhancements
4b1392e Document GPT image multimodal design
```

Untracked local process files may remain. Do not stage them.

- [ ] **Step 2: Confirm MCP exposes image reading**

Run:

```powershell
.\scripts\mcp-call.local.ps1 tools
```

Expected: output includes `read_media_file`.

- [ ] **Step 3: Confirm a real image result shape**

Run:

```powershell
.\scripts\mcp-call.local.ps1 call read_media_file '{"path":"F:\\web_agents\\extensions\\mcp-superassistant-local-fixed\\icon-34.png"}'
```

Expected: output includes:

```json
{
  "type": "image",
  "data": "<base64>",
  "mimeType": "image/png"
}
```

## Task 2: Add MCP Image Helpers

**Files:**
- Modify: `extensions/mcp-superassistant-local-fixed/content/index.iife.js`

- [ ] **Step 1: Insert helper code before `mS=async(...)`**

Find this existing code segment:

```javascript
return yC.lastIndex=0,xC.lastIndex=0,l},mS=async(f,l,n,r,s,d,h=!1)=>{
```

Replace it with:

```javascript
return yC.lastIndex=0,xC.lastIndex=0,l},SUPPORTED_IMAGE_MIME_TYPES=new Set(["image/png","image/jpeg","image/jpg","image/webp","image/gif"]),getImageExtensionFromMime=f=>f==="image/png"?"png":f==="image/webp"?"webp":f==="image/gif"?"gif":f==="image/jpg"||f==="image/jpeg"?"jpg":"img",stripBase64DataUrl=f=>{const l=String(f||"");return l.includes(",")&&l.startsWith("data:")?l.slice(l.indexOf(",")+1):l},normalizeMcpImageResult=(f,l,n)=>{const r=f&&typeof f=="object"&&Array.isArray(f.content)?f.content:f&&typeof f=="object"?[f]:[],s=r.find(d=>d&&d.type==="image"&&typeof d.data=="string"&&typeof d.mimeType=="string");if(!s)return null;const d=s.mimeType.toLowerCase();return SUPPORTED_IMAGE_MIME_TYPES.has(d)?{supported:!0,data:stripBase64DataUrl(s.data),mimeType:d,fileName:`${l||"image"}_result_call_id_${n||Date.now()}.${getImageExtensionFromMime(d)}`}:{supported:!1,mimeType:d}},mcpImageToFile=f=>{const l=atob(f.data),n=new Uint8Array(l.length);for(let r=0;r<l.length;r++)n[r]=l.charCodeAt(r);return new File([n],f.fileName,{type:f.mimeType})},setMediaAttachButtonState=(f,l,n,r=!0)=>{f.innerHTML="";const s=Xi("span",{innerHTML:_i.ATTACH,styles:{display:"inline-flex",marginRight:"6px"}}),d=Xi("span",{textContent:l});f.appendChild(s),f.appendChild(d),f.disabled=r,n&&(f.classList.remove("attach-success","attach-error"),f.classList.add(n))},resetMediaAttachButton=f=>{setTimeout(()=>{f.innerHTML=`${_i.ATTACH}<span>附加到 GPT</span>`,f.classList.remove("attach-success","attach-error"),f.disabled=!1},2e3)},attachMcpImageResult=async(f,l,n,r,s)=>{if(!r||!r.supported)return setMediaAttachButtonState(s,"不支持","attach-error",!0),resetMediaAttachButton(s),{success:!1,message:"当前结果不是支持的图片类型"};if(!f||typeof f.attachFile!="function")return setMediaAttachButtonState(s,"无适配器","attach-error",!0),resetMediaAttachButton(s),{success:!1,message:"未找到 GPT 上传入口，请刷新页面或重新打开对话"};if(!xy("file-attachment"))return setMediaAttachButtonState(s,"不支持","attach-error",!0),resetMediaAttachButton(s),{success:!1,message:"图片附加失败，请确认 ChatGPT 当前模型支持图片"};try{setMediaAttachButtonState(s,"附加中...",void 0,!0);const d=mcpImageToFile(r);if(await f.attachFile(d)){const h=`图片已附加到 GPT：${d.name}`;setMediaAttachButtonState(s,"已附加","attach-success",!0),requestAnimationFrame(()=>{document.dispatchEvent(new CustomEvent("mcp:tool-execution-complete",{detail:{file:d,result:h,isFileAttachment:!0,fileName:d.name,confirmationText:h,skipAutoInsertCheck:!0}}))}),resetMediaAttachButton(s);return{success:!0,message:h}}throw new Error("Adapter attachFile method returned false")}catch(d){return ht.error("MCP image attachment error:",d),setMediaAttachButtonState(s,"附加失败","attach-error",!0),resetMediaAttachButton(s),{success:!1,message:"图片附加失败，请确认 ChatGPT 当前模型支持图片"}}},mS=async(f,l,n,r,s,d,h=!1)=>{
```

Reasoning:

- `normalizeMcpImageResult(...)` accepts both raw image blocks and MCP result objects with `content`.
- The MIME allowlist matches the approved spec.
- `attachMcpImageResult(...)` uses `attachFile(file)` and sets `skipAutoInsertCheck:true`, so image attachment will not trigger automatic submit.

- [ ] **Step 2: Run syntax check**

Run:

```powershell
node --check extensions/mcp-superassistant-local-fixed/content/index.iife.js
```

Expected:

```text
```

`node --check` prints nothing when the bundle parses successfully.

## Task 3: Render the GPT Image Attachment Action

**Files:**
- Modify: `extensions/mcp-superassistant-local-fixed/content/index.iife.js`

- [ ] **Step 1: Update result display logic inside `hs(...)`**

Find this existing block inside `hs(...)`:

```javascript
if(typeof r=="object")try{if(r&&r.content&&Array.isArray(r.content)){const Z=r.content.filter(F=>F.type==="text"&&F.text).map(F=>F.text);if(Z.length>0)x=Z.join(`\n`),T.textContent=x;else{x=JSON.stringify(r,null,2);const F=Xi("pre",{textContent:x,styles:{fontFamily:"inherit",fontSize:"13px",lineHeight:"1.5",padding:"0",margin:"0"}});T.appendChild(F)}}else{x=JSON.stringify(r,null,2);const Z=Xi("pre",{textContent:x,styles:{fontFamily:"inherit",fontSize:"13px",lineHeight:"1.5",padding:"0",margin:"0"}});T.appendChild(Z)}}catch{x=String(r),T.textContent=x}else x=String(r),T.textContent=x;
```

Replace it with:

```javascript
const te=normalizeMcpImageResult(r,d,s);if(typeof r=="object")try{if(te){x=te.supported?`图片结果：${te.mimeType}，可附加到 GPT 后让模型分析。`:`媒体结果：${te.mimeType||"unknown"}，当前版本暂不支持附加。`,T.textContent=x}else if(r&&r.content&&Array.isArray(r.content)){const Z=r.content.filter(F=>F.type==="text"&&F.text).map(F=>F.text);if(Z.length>0)x=Z.join(`\n`),T.textContent=x;else{x=JSON.stringify(r,null,2);const F=Xi("pre",{textContent:x,styles:{fontFamily:"inherit",fontSize:"13px",lineHeight:"1.5",padding:"0",margin:"0"}});T.appendChild(F)}}else{x=JSON.stringify(r,null,2);const Z=Xi("pre",{textContent:x,styles:{fontFamily:"inherit",fontSize:"13px",lineHeight:"1.5",padding:"0",margin:"0"}});T.appendChild(Z)}}catch{x=String(r),T.textContent=x}else x=String(r),T.textContent=x;
```

Reasoning:

- Supported image results do not dump base64 into the UI.
- Unsupported media results do not get a misleading upload action.
- Text results keep current behavior.

- [ ] **Step 2: Update button rendering inside `hs(...)`**

Find this existing block:

```javascript
const $=Xi("button",{className:"attach-file-button",innerHTML:`${_i.ATTACH}<span>附加 File</span>`,styles:{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px"},attributes:{"data-result-id":`attach-${s}-${Date.now()}`}});$.onclick=async()=>{const Z=yy();await mS(Z,d,s,x,$,null,!0)},M.appendChild(A);const H=yy();if(H&&xy("file-attachment")&&M.appendChild($),D.appendChild(M),(S=f.parentNode)==null||S.insertBefore(D,f.nextSibling),x.length>Sy&&H&&xy("file-attachment")&&bC.includes(vC)){
```

Replace it with:

```javascript
const $=Xi("button",{className:"attach-file-button",innerHTML:`${_i.ATTACH}<span>附加 File</span>`,styles:{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px"},attributes:{"data-result-id":`attach-${s}-${Date.now()}`}});$.onclick=async()=>{const Z=yy();await mS(Z,d,s,x,$,null,!0)};const Ht=Xi("button",{className:"attach-file-button",innerHTML:`${_i.ATTACH}<span>附加到 GPT</span>`,styles:{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px"},attributes:{"data-result-id":`attach-image-${s}-${Date.now()}`}});Ht.onclick=async()=>{const Z=yy();await attachMcpImageResult(Z,d,s,te,Ht)},M.appendChild(A);const H=yy();if(H&&xy("file-attachment")&&(te?te.supported&&M.appendChild(Ht):M.appendChild($)),D.appendChild(M),(S=f.parentNode)==null||S.insertBefore(D,f.nextSibling),!te&&x.length>Sy&&H&&xy("file-attachment")&&bC.includes(vC)){
```

Reasoning:

- Supported image results get the Chinese `附加到 GPT` action.
- Unsupported image/audio media results get no attachment button.
- Existing text attachment remains available for long or non-media text.
- Existing auto-attach logic cannot accidentally attach the image summary as a `.txt` file because it is gated by `!te`.

- [ ] **Step 3: Run syntax check**

Run:

```powershell
node --check extensions/mcp-superassistant-local-fixed/content/index.iife.js
```

Expected:

```text
```

## Task 4: Update Chinese Usage Docs

**Files:**
- Modify: `extensions/mcp-superassistant-local-fixed/README.md`
- Modify: `docs/local-fixed-extension.md`

- [ ] **Step 1: Add GPT image workflow to README**

Add this section after the existing multimodal note in `extensions/mcp-superassistant-local-fixed/README.md`:

```markdown
### GPT 图片读取试验功能

当前旧插件优先支持 GPT 图片上传分析：当 MCP 工具返回 `read_media_file` 的图片结果时，结果卡片会显示 `附加到 GPT`。

使用方式：

1. 确认图片在允许目录内，例如 `F:\web_agents\images\demo.png`。
2. 在 ChatGPT 页面插入 web_Agent 使用说明。
3. 让 ChatGPT 调用 `read_media_file` 读取图片。
4. 工具执行成功后点击结果卡片里的 `附加到 GPT`。
5. 等 ChatGPT 输入框出现图片预览后，再手动发送。

第一版只支持 `png`、`jpg/jpeg`、`webp`、`gif`。音频、视频、Office、PDF 和图片编辑暂不作为稳定能力。
```

- [ ] **Step 2: Update `docs/local-fixed-extension.md` multimodal boundary**

Replace the old statement that multimedia is not stable with this text:

```markdown
### GPT 图片多模态试验功能

旧插件当前先从 GPT 图片上传分析开始做多模态增强。后端 `read_media_file` 会把允许目录内的图片读成 base64/MIME；插件在 ChatGPT 页面把支持的图片结果转换成浏览器 `File`，再通过已有 GPT 上传入口附加到输入框。

支持格式：`png`、`jpg/jpeg`、`webp`、`gif`。

注意：

- 图片必须在 MCP allowed directories 内。
- 插件只负责附加图片，不自动发送。
- 音频、视频、Office、PDF、压缩包和图片编辑仍不属于当前稳定能力。
```

- [ ] **Step 3: Check docs diff**

Run:

```powershell
git diff -- extensions/mcp-superassistant-local-fixed/README.md docs/local-fixed-extension.md
```

Expected: only Chinese documentation for GPT image attachment changed.

## Task 5: Verification And Commit

**Files:**
- Verify: `extensions/mcp-superassistant-local-fixed/content/index.iife.js`
- Verify: `extensions/mcp-superassistant-local-fixed/background.js`
- Verify: `extensions/mcp-superassistant-local-fixed/README.md`
- Verify: `docs/local-fixed-extension.md`

- [ ] **Step 1: Run static checks**

Run:

```powershell
node --check extensions/mcp-superassistant-local-fixed/content/index.iife.js
node --check extensions/mcp-superassistant-local-fixed/background.js
git diff --check
```

Expected:

```text
```

`node --check` and `git diff --check` print nothing when successful.

- [ ] **Step 2: Inspect staged scope**

Run:

```powershell
git status --short
git diff --stat
```

Expected changed tracked files:

```text
extensions/mcp-superassistant-local-fixed/content/index.iife.js
extensions/mcp-superassistant-local-fixed/README.md
docs/local-fixed-extension.md
```

Untracked local process files must remain unstaged.

- [ ] **Step 3: Manual Chrome test**

Run backend if it is not already running:

```powershell
.\scripts\start-gemini-backend.local.ps1
```

Chrome steps:

```text
1. Open chrome://extensions.
2. Reload the unpacked extension at F:\web_agents\extensions\mcp-superassistant-local-fixed.
3. Open https://chatgpt.com/.
4. Insert the web_Agent instructions.
5. Ask ChatGPT to call read_media_file for F:\web_agents\extensions\mcp-superassistant-local-fixed\icon-34.png.
6. Click 附加到 GPT in the tool result card.
7. Confirm the ChatGPT composer shows the image preview and the page stays responsive.
8. Send manually only after preview appears.
```

- [ ] **Step 4: Commit implementation**

Run:

```powershell
git add -- extensions/mcp-superassistant-local-fixed/content/index.iife.js extensions/mcp-superassistant-local-fixed/README.md docs/local-fixed-extension.md
git commit -m "Add GPT image attachment for MCP media results"
```

Expected commit message:

```text
Add GPT image attachment for MCP media results
```

## Self-Review

- Spec coverage: The plan implements GPT-first image upload, supported MIME allowlist, allowed-directory reliance through MCP, manual send, Chinese UI copy, docs, and static/manual verification.
- Placeholder scan: No unresolved placeholder markers or undefined future steps are present.
- Type consistency: Helper names are used consistently: `normalizeMcpImageResult`, `mcpImageToFile`, `attachMcpImageResult`, and `SUPPORTED_IMAGE_MIME_TYPES`.
