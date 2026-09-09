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
