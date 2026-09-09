# Provider Adapter Normalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Normalize browser provider adapters from the working providers, add Doubao as the first new provider, and verify Grok, Google AI Studio, and Qwen with the same checklist.

**Architecture:** Keep the current bundled extension as the runnable artifact. Add implementation documentation and verification artifacts around the bundle, then make small targeted edits to `manifest.json` and `content/index.iife.js`. Avoid a full source rewrite until a separate source-extension project exists.

**Tech Stack:** Chrome/Edge Manifest V3 extension, bundled JavaScript content script, PowerShell verification commands, browser manual verification with local MCP SSE backend.

---

## Scope

This plan implements the approved design in `docs/superpowers/specs/2026-06-29-provider-adapter-normalization-design.md`.

The current extension has reliable baseline adapters for ChatGPT, Gemini, DeepSeek, Kimi, and GLM/Z. It already contains adapter classes for Grok, Google AI Studio, and Qwen. Doubao is the new provider for this phase.

This plan does not build a new extension source project. It documents the normalized adapter contract and makes the current bundled extension support and verify the selected providers.

## File Structure

- Create: `docs/provider-adapters/contract.md`
  - Human-readable adapter contract derived from baseline providers.
- Create: `docs/provider-adapters/verification-matrix.md`
  - Provider-by-provider verification evidence table.
- Modify: `extensions/mcp-superassistant-local-fixed/manifest.json`
  - Add Doubao content script matches and host permission.
- Modify: `extensions/mcp-superassistant-local-fixed/content/index.iife.js`
  - Add Doubao extraction config.
  - Add Doubao adapter class and registration by following existing adapter patterns.
  - Harden Grok, Google AI Studio, and Qwen selectors only when verification shows drift.
- Modify: `docs/local-fixed-extension.md`
  - Add provider list and validation notes for Doubao, Grok, Google AI Studio, and Qwen.
- Modify: `docs/troubleshooting.md`
  - Add a provider adapter troubleshooting section.

## Shared Commands

Run these commands from `F:\web_agents`.

```powershell
git status --short --branch
```

Expected before implementation: current branch is `codex/awaiting-task`; unrelated untracked planning files may exist and must not be staged unless the user explicitly asks.

```powershell
Select-String -Path 'extensions\mcp-superassistant-local-fixed\content\index.iife.js' -Pattern 'N\(this,"name","[^"]+"\)|N\(this,"hostnames",\[[^\]]+\]\)' -AllMatches |
  ForEach-Object { $_.Matches.Value } |
  Sort-Object -Unique
```

Expected current adapter names include:

```text
AIStudioAdapter
ChatGPTAdapter
DeepSeekAdapter
GeminiAdapter
GrokAdapter
KimiAdapter
QwenAdapter
ZAdapter
```

Expected current adapter names do not include:

```text
DoubaoAdapter
```

---

### Task 1: Document the Normalized Adapter Contract

**Files:**
- Create: `docs/provider-adapters/contract.md`

- [ ] **Step 1: Write the contract document**

Create `docs/provider-adapters/contract.md` with this content:

```markdown
# Provider Adapter Contract

This contract is derived from the current working browser adapters in the local fixed MCP SuperAssistant extension.

## Baseline Adapters

- ChatGPTAdapter: text insertion, form submission, file attachment, MCP button placement.
- GeminiAdapter: page readiness, result extraction, dynamic DOM handling.
- DeepSeekAdapter: retry logic, insertion point fallback, DOM observer handling.
- KimiAdapter: Chinese web model page behavior.
- ZAdapter: z.ai/chat.z.ai support and CodeMirror-related extraction.

## Provider Adapter Spec

Each provider adapter must declare:

- `id`: stable lowercase adapter id, for example `doubao-adapter`.
- `displayName`: human-readable provider name.
- `hostnames`: hostname strings or regular expressions used by plugin activation.
- `urlPatterns`: full URL patterns used by `isSupported`.
- `capabilities`: supported features.
- `selectors`: DOM selectors for composer, submit, attachment, insertion point, messages, and result extraction.
- `fallbacks`: explicit fallback behavior for submit and DOM readiness.
- `knownLimitations`: concrete limitations observed during verification.

## Capabilities

- `text-insertion`: adapter can put text into the native provider composer.
- `form-submission`: adapter can submit the native provider composer.
- `file-attachment`: adapter can attach files through provider UI or file input.
- `tool-result-extraction`: extension can detect tool-call or result-like content.
- `mcp-button-injection`: extension can place the MCP control near the provider composer.

## Required Selectors

- `chatInput`
- `submitButton`
- `fileInput`
- `fileUploadButton`
- `dropZone`
- `buttonInsertionPoint`
- `messageContainer`
- `userMessage`
- `assistantMessage`
- `functionResult`
- `codeBlock`

## Required Fallbacks

- Wait for page readiness before first injection.
- Retry MCP popover insertion after DOM changes.
- Submit with Enter when no clickable submit button is available.
- Use alternate selector groups when the primary selector fails.
- Re-check site support after SPA navigation.
- Disable only the active provider adapter when support checks fail.

## Verification Status Values

- `pass`: provider satisfies all minimal acceptance checks.
- `degraded`: provider works for text insertion and submit but misses optional behavior.
- `blocked`: provider cannot be verified because login, region, DOM, or provider behavior prevents a minimal run.
- `not-started`: provider has not been verified in this branch.
```

- [ ] **Step 2: Verify the document exists**

Run:

```powershell
Test-Path docs\provider-adapters\contract.md
```

Expected:

```text
True
```

- [ ] **Step 3: Commit**

```powershell
git add docs\provider-adapters\contract.md
git commit -m "docs: add provider adapter contract"
```

Expected: commit succeeds and only `docs/provider-adapters/contract.md` is included.

---

### Task 2: Add the Provider Verification Matrix

**Files:**
- Create: `docs/provider-adapters/verification-matrix.md`

- [ ] **Step 1: Write the verification matrix**

Create `docs/provider-adapters/verification-matrix.md` with this content:

````markdown
# Provider Adapter Verification Matrix

Date started: 2026-06-30

## Minimal Acceptance Checks

Each provider must be checked against:

1. Content script loads on the provider page.
2. Active adapter is selected for the hostname.
3. MCP sidebar connects to the configured local SSE endpoint.
4. MCP button or popover appears in a stable location.
5. A short prompt can be inserted into the native composer.
6. The prompt can be submitted.
7. Tool-call style content can be detected.
8. Tool result text can be inserted back into the conversation.
9. SPA refresh or navigation restores the integration.
10. Failure states are visible in logs without breaking the page.

## Providers

| Provider | Domain Pattern | Adapter | Status | Evidence |
| --- | --- | --- | --- | --- |
| ChatGPT | `chatgpt.com` | `ChatGPTAdapter` | not-started | Baseline regression check required. |
| Gemini | `gemini.google.com` | `GeminiAdapter` | not-started | Baseline regression check required. |
| DeepSeek | `chat.deepseek.com` | `DeepSeekAdapter` | not-started | Baseline regression check required. |
| Kimi | `kimi.com` | `KimiAdapter` | not-started | Baseline regression check required. |
| GLM/Z | `chat.z.ai`, `z.ai` | `ZAdapter` | not-started | Baseline regression check required. |
| Doubao | `doubao.com` | `DoubaoAdapter` | not-started | New provider for this phase. |
| Grok | `grok.com`, `x.com`, `twitter.com` | `GrokAdapter` | not-started | Existing adapter needs verification. |
| Google AI Studio | `aistudio.google.com` | `AIStudioAdapter` | not-started | Existing adapter needs verification. |
| Qwen | `chat.qwen.ai`, `qwen.ai` | `QwenAdapter` | not-started | Existing adapter needs verification. |

## Evidence Format

Use one short evidence note per provider:

```text
2026-06-30: pass. Browser: Edge. Page: https://www.doubao.com/. Checks: 1-10. Notes: text insertion, submit, popover, and result reinsertion verified.
```
````

- [ ] **Step 2: Verify matrix status labels**

Run:

```powershell
Select-String -Path docs\provider-adapters\verification-matrix.md -Pattern 'not-started|pass|degraded|blocked'
```

Expected: output includes all four status values.

- [ ] **Step 3: Commit**

```powershell
git add docs\provider-adapters\verification-matrix.md
git commit -m "docs: add provider verification matrix"
```

Expected: commit succeeds and only `docs/provider-adapters/verification-matrix.md` is included.

---

### Task 3: Add Doubao Manifest Coverage

**Files:**
- Modify: `extensions/mcp-superassistant-local-fixed/manifest.json`

- [ ] **Step 1: Write the failing manifest check**

Run:

```powershell
Select-String -Path extensions\mcp-superassistant-local-fixed\manifest.json -Pattern 'doubao.com'
```

Expected before the change: no output.

- [ ] **Step 2: Add Doubao content script match**

In `extensions/mcp-superassistant-local-fixed/manifest.json`, add this object to `content_scripts` near the other provider entries:

```json
{
  "js": [
    "content/index.iife.js"
  ],
  "matches": [
    "*://*.doubao.com/*"
  ],
  "run_at": "document_idle"
}
```

- [ ] **Step 3: Add Doubao host permission**

In `host_permissions`, add:

```json
"*://*.doubao.com/*"
```

- [ ] **Step 4: Validate JSON**

Run:

```powershell
Get-Content -Raw extensions\mcp-superassistant-local-fixed\manifest.json | ConvertFrom-Json | Out-Null
```

Expected: command exits with code 0.

- [ ] **Step 5: Verify Doubao appears twice**

Run:

```powershell
(Select-String -Path extensions\mcp-superassistant-local-fixed\manifest.json -Pattern 'doubao.com').Count
```

Expected:

```text
2
```

- [ ] **Step 6: Commit**

```powershell
git add extensions\mcp-superassistant-local-fixed\manifest.json
git commit -m "feat: add Doubao extension permissions"
```

Expected: commit succeeds and only `manifest.json` is included.

---

### Task 4: Add Doubao Extraction Configuration

**Files:**
- Modify: `extensions/mcp-superassistant-local-fixed/content/index.iife.js`

- [ ] **Step 1: Confirm Doubao extraction config is absent**

Run:

```powershell
Select-String -Path extensions\mcp-superassistant-local-fixed\content\index.iife.js -Pattern 'urlPattern:"doubao.com"'
```

Expected before the change: no output.

- [ ] **Step 2: Add Doubao to the function-result extraction config array**

Find the `$A=[{urlPattern:"aistudio"` config array in `content/index.iife.js`.

Insert this entry before the `aistudio` entry:

```js
{urlPattern:"doubao.com",config:{targetSelectors:["pre","code"],streamingContainerSelectors:["pre","code"],function_result_selector:['div[class*="user"]','div[class*="message"]','[data-testid*="message"]'],useCodeMirrorExtraction:!1}},
```

- [ ] **Step 3: Verify extraction config is present**

Run:

```powershell
Select-String -Path extensions\mcp-superassistant-local-fixed\content\index.iife.js -Pattern 'urlPattern:"doubao.com"'
```

Expected: one match.

- [ ] **Step 4: Verify the bundle remains syntactically parseable**

Run:

```powershell
node --check extensions\mcp-superassistant-local-fixed\content\index.iife.js
```

Expected: command exits with code 0.

- [ ] **Step 5: Commit**

```powershell
git add extensions\mcp-superassistant-local-fixed\content\index.iife.js
git commit -m "feat: add Doubao extraction config"
```

Expected: commit succeeds and only `content/index.iife.js` is included.

---

### Task 5: Add Doubao Adapter Class and Registration

**Files:**
- Modify: `extensions/mcp-superassistant-local-fixed/content/index.iife.js`
- Modify: `docs/provider-adapters/verification-matrix.md`

- [ ] **Step 1: Confirm Doubao adapter is absent**

Run:

```powershell
Select-String -Path extensions\mcp-superassistant-local-fixed\content\index.iife.js -Pattern 'DoubaoAdapter|doubao-adapter'
```

Expected before the change: no output.

- [ ] **Step 2: Inspect the closest existing adapter pattern**

Run:

```powershell
Select-String -Path extensions\mcp-superassistant-local-fixed\content\index.iife.js -Pattern 'DeepSeekAdapter|GrokAdapter|registerAdapterFactory\(\{name:"grok-adapter"|registerAdapterFactory\(\{name:"deepseek-adapter"' -AllMatches |
  ForEach-Object { $_.Matches.Value } |
  Sort-Object -Unique
```

Expected:

```text
DeepSeekAdapter
GrokAdapter
registerAdapterFactory({name:"deepseek-adapter"
registerAdapterFactory({name:"grok-adapter"
```

- [ ] **Step 3: Add a Doubao adapter class**

Insert a `DoubaoAdapter` class near the other provider adapter classes. The class must extend the same base adapter class used by `DeepSeekAdapter` and `GrokAdapter`.

Use this behavior:

```js
name = "DoubaoAdapter";
version = "1.0.0";
hostnames = ["doubao.com"];
capabilities = ["text-insertion","form-submission","mcp-button-injection"];
selectors = {
  CHAT_INPUT: 'textarea, div[contenteditable="true"], [role="textbox"]',
  SUBMIT_BUTTON: 'button[aria-label*="Send"], button[aria-label*="发送"], button[type="submit"]',
  FILE_UPLOAD_BUTTON: 'button[aria-label*="attach"], button[aria-label*="上传"], button[aria-label*="file"]',
  FILE_INPUT: 'input[type="file"]',
  MAIN_PANEL: 'main, [role="main"], body',
  DROP_ZONE: 'textarea, div[contenteditable="true"], [role="textbox"]',
  FILE_PREVIEW: '.file-preview, .attachment-preview, [class*="file"]',
  BUTTON_INSERTION_CONTAINER: 'form, [class*="input"], [class*="composer"], [class*="chat"]',
  FALLBACK_INSERTION: 'form, [role="main"], body'
};
```

The methods must match the existing provider method names:

```text
initialize
activate
deactivate
cleanup
insertText
submitForm
attachFile
isSupported
supportsFileUpload
findButtonInsertionPoint
injectMCPPopover
renderMCPPopover
```

Use the existing `DeepSeekAdapter` methods as the concrete source for lifecycle, text insertion, submit fallback, DOM observer, MCP popover rendering, and event emission. Replace only adapter name strings, hostname support checks, selector constants, and generated call id prefix.

- [ ] **Step 4: Register the Doubao adapter factory**

Inside the built-in adapter registration section, add a factory before `grok-adapter`:

```js
this.registerAdapterFactory({name:"doubao-adapter",version:"1.0.0",type:"website-adapter",hostnames:["doubao.com"],capabilities:["text-insertion","form-submission","mcp-button-injection"],create:()=>new DoubaoAdapter,config:{id:"doubao-adapter",name:"Doubao Adapter",description:"Specialized adapter for Doubao web chat with text insertion, form submission, and MCP popover support",version:"1.0.0",enabled:!0,priority:5,settings:{logLevel:"info",urlCheckInterval:1e3}}})
```

Name the inserted class expression variable `DoubaoAdapter` so the factory can use `create:()=>new DoubaoAdapter`.

- [ ] **Step 5: Verify adapter strings**

Run:

```powershell
Select-String -Path extensions\mcp-superassistant-local-fixed\content\index.iife.js -Pattern 'DoubaoAdapter|doubao-adapter|doubao.com'
```

Expected: matches include `DoubaoAdapter`, `doubao-adapter`, and `doubao.com`.

- [ ] **Step 6: Verify syntax**

Run:

```powershell
node --check extensions\mcp-superassistant-local-fixed\content\index.iife.js
```

Expected: command exits with code 0.

- [ ] **Step 7: Mark Doubao as ready for browser verification**

In `docs/provider-adapters/verification-matrix.md`, update the Doubao evidence cell to:

```text
2026-06-30: code-ready. Manifest, extraction config, and adapter registration are present; browser verification required.
```

- [ ] **Step 8: Commit**

```powershell
git add extensions\mcp-superassistant-local-fixed\content\index.iife.js docs\provider-adapters\verification-matrix.md
git commit -m "feat: add Doubao website adapter"
```

Expected: commit succeeds with the bundle and matrix changes only.

---

### Task 6: Verify Existing Grok, Google AI Studio, and Qwen Adapter Coverage

**Files:**
- Modify: `docs/provider-adapters/verification-matrix.md`
- Modify if selector drift is found: `extensions/mcp-superassistant-local-fixed/content/index.iife.js`

- [ ] **Step 1: Confirm current adapter coverage strings**

Run:

```powershell
Select-String -Path extensions\mcp-superassistant-local-fixed\content\index.iife.js -Pattern 'GrokAdapter|AIStudioAdapter|QwenAdapter|grok-adapter|aistudio-adapter|qwen-adapter|grok.com|aistudio.google.com|chat.qwen.ai' -AllMatches |
  ForEach-Object { $_.Matches.Value } |
  Sort-Object -Unique
```

Expected output includes:

```text
AIStudioAdapter
GrokAdapter
QwenAdapter
aistudio-adapter
grok-adapter
qwen-adapter
grok.com
aistudio.google.com
chat.qwen.ai
```

- [ ] **Step 2: Verify manifest coverage**

Run:

```powershell
Select-String -Path extensions\mcp-superassistant-local-fixed\manifest.json -Pattern 'grok.com|x.com|twitter.com|aistudio.google.com|chat.qwen.ai'
```

Expected: output includes all listed domains.

- [ ] **Step 3: Run syntax verification before browser testing**

Run:

```powershell
node --check extensions\mcp-superassistant-local-fixed\content\index.iife.js
```

Expected: command exits with code 0.

- [ ] **Step 4: Browser verify Grok**

Load the unpacked extension from:

```text
F:\web_agents\extensions\mcp-superassistant-local-fixed
```

Open:

```text
https://grok.com/
```

Check:

```text
1. Content script loads.
2. GrokAdapter activates.
3. MCP popover appears near the composer.
4. Text insertion works.
5. Submit works.
```

Record the result in `docs/provider-adapters/verification-matrix.md` using the evidence format from Task 2.

- [ ] **Step 5: Browser verify Google AI Studio**

Open:

```text
https://aistudio.google.com/
```

Check:

```text
1. Content script loads.
2. AIStudioAdapter activates.
3. MCP popover appears near the composer.
4. Text insertion works.
5. Submit works.
```

Record the result in `docs/provider-adapters/verification-matrix.md`.

- [ ] **Step 6: Browser verify Qwen**

Open:

```text
https://chat.qwen.ai/
```

Check:

```text
1. Content script loads.
2. QwenAdapter activates.
3. MCP popover appears near the composer.
4. Text insertion works.
5. Submit works.
6. CodeMirror or Monaco extraction still works when a code block appears.
```

Record the result in `docs/provider-adapters/verification-matrix.md`.

- [ ] **Step 7: Patch selectors only for failed checks**

If a provider fails because selectors drifted, modify only that provider's selector constants or extraction config in `content/index.iife.js`.

Use these fallback selector groups:

```js
const composerFallbacks = 'textarea, div[contenteditable="true"], [role="textbox"]';
const submitFallbacks = 'button[aria-label*="Send"], button[aria-label*="发送"], button[type="submit"]';
const insertionFallbacks = 'form, [class*="input"], [class*="composer"], [class*="chat"], [role="main"]';
```

After a selector patch, run:

```powershell
node --check extensions\mcp-superassistant-local-fixed\content\index.iife.js
```

Expected: command exits with code 0.

- [ ] **Step 8: Commit**

If only the matrix changed:

```powershell
git add docs\provider-adapters\verification-matrix.md
git commit -m "test: record provider adapter verification"
```

If selectors changed:

```powershell
git add extensions\mcp-superassistant-local-fixed\content\index.iife.js docs\provider-adapters\verification-matrix.md
git commit -m "fix: harden provider adapter selectors"
```

Expected: commit succeeds with only the verification and required selector changes.

---

### Task 7: Verify Doubao in the Browser

**Files:**
- Modify: `docs/provider-adapters/verification-matrix.md`
- Modify if selector drift is found: `extensions/mcp-superassistant-local-fixed/content/index.iife.js`

- [ ] **Step 1: Open Doubao**

Load the unpacked extension from:

```text
F:\web_agents\extensions\mcp-superassistant-local-fixed
```

Open:

```text
https://www.doubao.com/
```

- [ ] **Step 2: Confirm content script injection**

In the page console, run:

```js
typeof window.__mcpAutomationState !== "undefined" || typeof window._appDebug !== "undefined"
```

Expected:

```text
true
```

- [ ] **Step 3: Confirm adapter activation**

Use the extension UI and browser console logs to confirm the active adapter name is `DoubaoAdapter` or `doubao-adapter`.

Expected evidence text:

```text
Doubao adapter selected for hostname www.doubao.com.
```

- [ ] **Step 4: Verify composer selectors**

In the page console, run:

```js
[
  "textarea",
  'div[contenteditable="true"]',
  '[role="textbox"]'
].map((selector) => ({
  selector,
  count: document.querySelectorAll(selector).length
}))
```

Expected: at least one selector reports `count` greater than 0.

- [ ] **Step 5: Verify submit selectors**

In the page console, run:

```js
[
  'button[aria-label*="Send"]',
  'button[aria-label*="发送"]',
  'button[type="submit"]'
].map((selector) => ({
  selector,
  count: document.querySelectorAll(selector).length
}))
```

Expected: at least one selector reports `count` greater than 0 after text is inserted.

- [ ] **Step 6: Run manual chat flow**

Use a harmless prompt:

```text
Reply with exactly: MCP adapter smoke test passed.
```

Check:

```text
1. Text appears in the native composer.
2. Submit sends the message.
3. The page remains usable after submit.
4. The MCP popover remains visible or reappears after DOM changes.
```

- [ ] **Step 7: Patch Doubao selectors if required**

If Task 7 Step 4 or Step 5 fails, update only `DoubaoAdapter` selectors and the `doubao.com` extraction config.

After the patch, run:

```powershell
node --check extensions\mcp-superassistant-local-fixed\content\index.iife.js
```

Expected: command exits with code 0.

- [ ] **Step 8: Record Doubao evidence**

Update the Doubao row in `docs/provider-adapters/verification-matrix.md` with one of:

```text
2026-06-30: pass. Browser: Edge or Chrome. Page: https://www.doubao.com/. Checks: 1-10. Notes: text insertion, submit, popover, and result reinsertion verified.
```

```text
2026-06-30: degraded. Browser: Edge or Chrome. Page: https://www.doubao.com/. Checks: 1-6, 9-10. Notes: basic composer flow works; tool-result extraction needs provider-specific selector refinement.
```

```text
2026-06-30: blocked. Browser: Edge or Chrome. Page: https://www.doubao.com/. Checks: none. Notes: login, region, or page access prevented DOM verification.
```

- [ ] **Step 9: Commit**

```powershell
git add extensions\mcp-superassistant-local-fixed\content\index.iife.js docs\provider-adapters\verification-matrix.md
git commit -m "test: verify Doubao adapter"
```

Expected: commit succeeds with only Doubao verification and required selector changes.

---

### Task 8: Update User-Facing Documentation

**Files:**
- Modify: `docs/local-fixed-extension.md`
- Modify: `docs/troubleshooting.md`

- [ ] **Step 1: Update local fixed extension docs**

In `docs/local-fixed-extension.md`, add this provider list under the permissions or supported sites section:

```markdown
## Provider Adapter Coverage

The local fixed extension contains browser adapters for:

- ChatGPT: `chatgpt.com`
- Gemini: `gemini.google.com`
- DeepSeek: `chat.deepseek.com`
- Kimi: `kimi.com`
- GLM/Z: `chat.z.ai`, `z.ai`
- Doubao: `doubao.com`
- Grok: `grok.com`, `x.com`, `twitter.com`
- Google AI Studio: `aistudio.google.com`
- Qwen: `chat.qwen.ai`, `qwen.ai`

Provider pages change often. When a provider fails, first check whether the page is logged in, whether the MCP backend is connected, and whether the provider adapter is active for the current hostname.
```

- [ ] **Step 2: Update troubleshooting docs**

In `docs/troubleshooting.md`, add:

````markdown
## Provider Adapter Does Not Activate

Check the current hostname first. The hostname must match a provider entry in `extensions/mcp-superassistant-local-fixed/manifest.json` and the adapter registration inside `content/index.iife.js`.

Run:

```powershell
Select-String -Path extensions\mcp-superassistant-local-fixed\manifest.json -Pattern 'doubao.com'
Select-String -Path extensions\mcp-superassistant-local-fixed\content\index.iife.js -Pattern 'DoubaoAdapter|doubao-adapter'
```

If the manifest matches but the adapter does not activate, reload the unpacked extension and refresh the provider page.

## MCP Button Does Not Appear

The provider page likely changed its composer DOM. Check these selectors in the browser console:

```js
[
  "textarea",
  'div[contenteditable="true"]',
  '[role="textbox"]',
  "form",
  '[class*="input"]',
  '[class*="composer"]'
].map((selector) => ({
  selector,
  count: document.querySelectorAll(selector).length
}))
```

If all counts are zero, the provider page is not on a chat/composer view or the page blocks content-script DOM access.
````

- [ ] **Step 3: Verify docs mention Doubao**

Run:

```powershell
Select-String -Path docs\local-fixed-extension.md,docs\troubleshooting.md -Pattern 'Doubao|doubao.com'
```

Expected: output includes both docs.

- [ ] **Step 4: Commit**

```powershell
git add docs\local-fixed-extension.md docs\troubleshooting.md
git commit -m "docs: add provider adapter troubleshooting"
```

Expected: commit succeeds with only documentation changes.

---

### Task 9: Final Verification and Summary

**Files:**
- Read: all changed files

- [ ] **Step 1: Verify JSON and JavaScript syntax**

Run:

```powershell
Get-Content -Raw extensions\mcp-superassistant-local-fixed\manifest.json | ConvertFrom-Json | Out-Null
node --check extensions\mcp-superassistant-local-fixed\content\index.iife.js
```

Expected: both commands exit with code 0.

- [ ] **Step 2: Verify required provider strings**

Run:

```powershell
Select-String -Path extensions\mcp-superassistant-local-fixed\manifest.json -Pattern 'doubao.com|grok.com|aistudio.google.com|chat.qwen.ai'
Select-String -Path extensions\mcp-superassistant-local-fixed\content\index.iife.js -Pattern 'DoubaoAdapter|doubao-adapter|GrokAdapter|AIStudioAdapter|QwenAdapter'
```

Expected: all provider strings are present.

- [ ] **Step 3: Verify matrix has no not-started target rows**

Run:

```powershell
Select-String -Path docs\provider-adapters\verification-matrix.md -Pattern '\| Doubao \|.*not-started|\| Grok \|.*not-started|\| Google AI Studio \|.*not-started|\| Qwen \|.*not-started'
```

Expected after browser verification: no output.

- [ ] **Step 4: Check git status**

Run:

```powershell
git status --short --branch
```

Expected: only unrelated pre-existing untracked files remain.

- [ ] **Step 5: Report result**

Report:

```text
Implemented provider adapter normalization docs, Doubao manifest and adapter support, and verification records for Grok, Google AI Studio, Qwen, and Doubao.
Verification:
- manifest JSON parse: pass
- content bundle syntax: pass
- provider string checks: pass
- browser verification: copy the final Doubao, Grok, Google AI Studio, and Qwen status rows from `docs/provider-adapters/verification-matrix.md`
```
