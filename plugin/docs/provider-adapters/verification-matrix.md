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
| Doubao | `doubao.com` | `DoubaoAdapter` | degraded | 2026-06-30: degraded. Browser: Chrome 149. Page: https://www.doubao.com/. Checks: 1-5 partial. Notes: content script injection, `DoubaoAdapter` activation, composer detection, text insertion, and MCP popover visibility verified; submit/result reinsertion not verified because committed submit selectors matched 0 buttons; observed candidate selector `button[class*="g-send-msg-btn"]` for future patch. |
| Grok | `grok.com`, `x.com`, `twitter.com` | `GrokAdapter` | blocked | 2026-06-30: blocked. Browser: Edge 149 with unpacked extension. Page: https://grok.com/. Checks: 1-2 partial. Notes: extension service worker loaded and Grok-specific MCP style/sidebar host appeared, but the Grok UI did not reach a composer before the Edge process exited; popover, text insertion, and submit were not verified. |
| Google AI Studio | `aistudio.google.com` | `AIStudioAdapter` | blocked | 2026-06-30: blocked. Browser: Edge 149. Page: https://aistudio.google.com/welcome. Checks: 1-2 partial; composer, SSE, popover-near-composer, text insertion, and submit were not verified. Notes: unauthenticated welcome/get-started page blocked composer access. |
| Qwen | `chat.qwen.ai`, `qwen.ai` | `QwenAdapter` | blocked | 2026-06-30: blocked. Browser: Edge 149 with unpacked extension. Page: https://chat.qwen.ai/. Checks: none. Notes: navigation failed with ERR_CONNECTION_CLOSED and landed on chrome-error://chromewebdata/; content script, adapter activation, popover, text insertion, submit, and CodeMirror/Monaco extraction were not verified. |

## Status Values

- `not-started`: provider has not been verified in this branch.
- `pass`: provider satisfies all minimal acceptance checks.
- `degraded`: provider works for text insertion and submit but misses optional behavior.
- `blocked`: provider cannot be verified because login, region, DOM, or provider behavior prevents a minimal run.

## Evidence Format

Use one short evidence note per provider:

```text
2026-06-30: pass. Browser: Edge. Page: https://www.doubao.com/. Checks: 1-10. Notes: text insertion, submit, popover, and result reinsertion verified.
```
