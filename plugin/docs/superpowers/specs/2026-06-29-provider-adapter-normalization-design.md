# Provider Adapter Normalization Design

Date: 2026-06-29
Branch: codex/awaiting-task
Status: approved for planning

## Background

The current local extension is a fixed build of MCP SuperAssistant under
`extensions/mcp-superassistant-local-fixed`. It already contains website
adapter logic inside the bundled `content/index.iife.js`, plus site injection
rules in `manifest.json`.

The current adapter set is uneven. ChatGPT, Gemini, DeepSeek, Kimi, and GLM/Z
are treated as the reliable baseline. Grok, Google AI Studio, and Qwen already
have adapter classes and manifest coverage, but need explicit connection
verification and selector hardening. Doubao is not present as an adapter and
should be the first new provider used to validate the normalized adapter shape.

The design principle is: derive the adapter contract from providers that
already work, then apply that contract to new and partially supported sites.
The contract should grow out of observed behavior rather than being invented as
an abstract SDK.

## Goals

- Normalize provider adapters around a small shared contract.
- Preserve the behavior of currently working providers.
- Make new providers easier to add without copying large adapter classes.
- Add Doubao as the first contract-driven new provider.
- Re-verify and harden Grok, Google AI Studio, and Qwen against the same
  checklist.
- Keep this phase focused on browser website connectivity, not native model
  APIs.

## Non-Goals

- Do not redesign the whole extension UI in this phase.
- Do not replace the MCP backend or DevSpace flow.
- Do not promise official provider API integration.
- Do not depend on account credentials, cookies, private browser profiles, or
  any user-specific local paths.
- Do not turn the bundled extension into a full source rewrite as part of this
  provider-connectivity task.

## Current Provider Classification

Baseline providers:

- ChatGPT: mature adapter reference for text insertion, submit, file
  attachment, and MCP button placement.
- Gemini: mature adapter reference for dynamic page readiness and result
  extraction.
- DeepSeek: mature adapter reference for retry logic, insertion point fallback,
  and DOM observer handling.
- Kimi: mature adapter reference for Chinese web model pages.
- GLM/Z: mature adapter reference for z.ai/chat.z.ai style pages and
  CodeMirror-related extraction.

Existing but needs verification:

- Grok: adapter and manifest coverage exist; verify current DOM selectors,
  submit behavior, and x.com/grok routing.
- Google AI Studio: adapter and manifest coverage exist; verify current
  composer selectors and tool-result extraction.
- Qwen: adapter and manifest coverage exist; verify chat.qwen.ai selectors,
  Monaco/CodeMirror extraction, submit behavior, and response reinsertion.

New provider:

- Doubao: add a new adapter after confirming current official web chat domain
  and DOM structure during implementation.

## Recommended Approach

Use sample-driven normalization:

1. Extract the smallest common adapter contract from the baseline providers.
2. Keep provider-specific overrides available for sites with unusual DOMs.
3. Validate the contract by implementing Doubao.
4. Apply the same verification matrix to Grok, Google AI Studio, and Qwen.

This is preferred over directly patching each site one by one, because direct
patching expands support quickly but leaves the codebase harder to maintain. It
is also preferred over a full adapter SDK rewrite, because the repository
currently contains bundled extension assets rather than a maintainable
TypeScript source project.

## Adapter Contract

Each provider adapter should be expressible as a provider spec plus optional
overrides:

```ts
type ProviderAdapterSpec = {
  id: string;
  displayName: string;
  hostnames: Array<string | RegExp>;
  urlPatterns: Array<string | RegExp>;
  capabilities: ProviderCapability[];
  selectors: ProviderSelectors;
  fallbacks: ProviderFallbacks;
  extraction: ProviderExtractionConfig;
  diagnostics: ProviderDiagnosticsConfig;
  knownLimitations: string[];
};
```

Capabilities:

- `text-insertion`
- `form-submission`
- `file-attachment`
- `tool-result-extraction`
- `mcp-button-injection`

Selectors:

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

Fallbacks:

- wait for page readiness before first injection
- retry MCP popover insertion on DOM changes
- submit with Enter when no submit button is available
- use alternate selector groups when the primary selector fails
- re-check support after SPA navigation
- disable only the active provider adapter when support checks fail

Diagnostics:

- log selected provider and matched hostname
- log selector used for chat input and submit button
- log why MCP button injection failed
- log whether result extraction found candidate nodes
- expose provider status as supported, unsupported, degraded, or error

## Shared Base Behavior

`BaseWebsiteAdapter` should own common behavior:

- initialize, activate, deactivate, cleanup lifecycle
- site support check by hostname and URL pattern
- wait-for-ready loop
- text insertion with input/change events
- form submission by button click or keyboard fallback
- MCP button insertion and re-insertion
- SPA URL tracking
- DOM mutation observation
- basic file attachment through file input or drag/drop simulation
- structured logging and tool execution events

Concrete providers should mostly provide specs. They should override methods
only for site-specific behavior that cannot be represented through selectors
or fallbacks.

## Provider Implementation Plan

Doubao:

- Add manifest content-script and host permission entries after verifying the
  current chat domain.
- Add `DoubaoAdapter` using the normalized contract.
- Configure chat input, submit button, insertion point, and result extraction
  selectors from live DOM inspection.
- Start with text insertion, submit, and MCP button injection.
- Treat file attachment as optional until the basic flow is stable.

Grok:

- Verify `grok.com` first.
- Verify x.com and twitter.com routes only after the direct grok.com flow is
  stable.
- Confirm whether textarea selectors and submit selectors still match.
- Confirm MCP button insertion location does not cover native controls.

Google AI Studio:

- Verify the AI Studio chat/composer page reached through Google AI Studio.
- Confirm Angular component selectors used for result extraction still exist.
- Prefer text insertion and submit first; file attachment can remain optional.

Qwen:

- Verify `chat.qwen.ai`.
- Confirm Monaco/CodeMirror extraction still works.
- Confirm chat input and submit selectors are stable after model/page changes.

## Test Matrix

Every provider must pass the same minimal acceptance tests:

- Content script loads on the provider page.
- Active adapter is selected for the hostname.
- MCP sidebar can connect to the configured local SSE endpoint.
- MCP button or popover appears in a stable location.
- A short prompt can be inserted into the native provider composer.
- The prompt can be submitted manually or automatically.
- A tool-call style response can be detected and executed.
- Tool result text can be inserted back into the conversation.
- Refreshing or navigating inside the single-page app restores the integration.
- Failure states are visible in logs without breaking the page.

Optional tests:

- File upload works.
- Multiple chat tabs with different providers do not cross-activate adapters.
- Provider-specific code block extraction works for tool call payloads.

## Risks

- Provider DOMs can change without notice.
- Some providers may block script-driven insertion or submission.
- Some sites may require login or region-specific routing before their chat DOM
  appears.
- The current extension is bundled, so large structural edits are harder than
  they would be in a source TypeScript project.
- A broad manifest permission list increases review and trust burden; each new
  provider domain should be justified.

## Acceptance Criteria

The design is considered implemented when:

- A documented provider contract exists in code or implementation docs.
- Baseline providers still work after normalization.
- Doubao is supported at the same minimal level as other provider adapters:
  load, inject, insert text, submit, and return tool results.
- Grok, Google AI Studio, and Qwen are each marked pass, degraded, or blocked
  with concrete evidence.
- The manifest includes only verified provider domains for this phase.
- Troubleshooting docs describe how to tell whether a provider failed because
  of login state, selector drift, MCP backend connection, or unsupported page
  shape.

## Open Implementation Checks

- Confirm the current Doubao chat domain before editing manifest permissions.
- Decide whether provider specs live as code objects inside the existing bundle
  patch path or in a parallel source document until a source extension project
  exists.
- Decide whether file attachment is required for Doubao MVP or deferred.
- Capture before/after screenshots for provider pages during verification, if
  test accounts and pages are available.

