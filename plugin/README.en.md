[简体中文](README.md) | **English**

# web_Agent

web_Agent is a local browser extension product for web-based AI models. It connects an MCP panel inside provider websites to a local filesystem service, allowing models to read files, search directories, write content, and complete multi-step tasks within visible and auditable permission boundaries.

This branch contains only the plugin product. It does not contain the TableLLM runtime or a copied Local Core source tree.

## Product Scope

web_Agent is designed for workflows such as:

- Reading real project files from a provider website before answering questions.
- Completing sequential tasks such as reading several files, editing content, and reporting once at the end.
- Saving long model output, code, or structured results to a user-selected location.
- Using local filesystem tools without deploying another remote backend.
- Keeping external writes, moves, and deletions inside explicit permission and audit boundaries.

It is not a standalone chat client. Accounts, conversations, and model capabilities remain provided by each model website.

## Supported Scope

The extension manifest loads the MCP panel or result-enhancement scripts on these website scopes:

| Category | Website scope |
| --- | --- |
| Major providers | ChatGPT, Gemini, DeepSeek, Kimi, Doubao, and Qwen |
| Grok | `grok.com` and Grok pages hosted on X/Twitter |
| Other manifest scopes | Perplexity, Google AI Studio, OpenRouter, Kagi, T3 Chat, Mistral, GitHub Copilot, and Zhipu/ChatGLM |

Provider DOMs change continuously. Script injection does not guarantee that automatic insertion, submission, and response capture always remain available. Current product tests focus on ChatGPT, DeepSeek, Doubao, Kimi, Grok, and the generic MCP flow. After a website update, rerun tests and manually verify the composer, submit control, and assistant response selectors.

## How It Works

```text
Provider website
  ↓ Browser extension: panel, prompt insertion, tool queue, result return
Filesystem MCP :3006
  ↓ Filesystem tools, path checks, permission tokens, audit
Plugin Gateway :3017
  ↓ Configuration, permission requests, automation tasks, result storage
@web-agents/local-core
  ↓ Atomic writes, real paths, mutation locks, transactions, deletion boundary
Local filesystem
```

The model returns one real tool call at a time. The extension executes it and sends the result back before the model chooses the next action. The model produces one final report only after every step finishes. This serial protocol prevents overlapping mutations and avoids stopping after only the first requested file.

## Key Capabilities

- A localized MCP panel and connection state on supported provider websites.
- Prompt instructions that can be copied or inserted without overwriting a user draft.
- Text reads, batch reads, directory lists, directory trees, file search, and file metadata.
- Directory creation, file writes, edit lists, and file moves.
- Permission-gated single-file deletion through `delete_file`, without recursive directory deletion.
- A tool-card queue that executes one call at a time and waits for each result.
- Stable tool-result extraction that avoids duplicate insertion and execution.
- A JSONL tool bridge and MCP-owned Chinese localization for Grok.
- Windows absolute-path guidance for Doubao and permission fallbacks for pages such as Kimi.
- Local audit, permission, image, and long tool-result storage.

## Repository Layout

```text
extensions/mcp-superassistant-local-fixed/
  manifest.json                         Active Manifest V3 extension
  background.js                         Background service worker
  content/                              Provider panels, adapters, and result helpers

products/plugin/
  config/                               Machine-local writable directory configuration
  data/                                 Runtime data, ignored by Git
  services/                             Filesystem MCP and plugin gateway
  tests/                                Extension, permission, result, and boundary tests
  start-plugin.bat                      Windows launcher

tools/                                  Product boundary checks
```

## Requirements

- Windows 10 or Windows 11.
- Node.js 24 or newer.
- Chrome or Edge, signed in to the provider websites you intend to use.
- Local ports `3006` and `3017` available.

## Install and Start

Install dependencies from the plugin branch root:

```powershell
npm ci
```

Start the local services:

```powershell
.\products\plugin\start-plugin.bat
```

You can also use npm directly:

```powershell
npm run start:plugin
```

Default services:

| Service | Address |
| --- | --- |
| Filesystem MCP SSE | `http://127.0.0.1:3006/sse` |
| Filesystem MCP health | `http://127.0.0.1:3006/health` |
| Plugin Gateway | `http://127.0.0.1:3017` |
| Plugin Gateway health | `http://127.0.0.1:3017/health` |

The launcher checks both ports first. If both services are already running, it does not start duplicates. If only one port is occupied, it reports the conflict and stops.

## Load the Browser Extension

1. Open `chrome://extensions` or `edge://extensions`.
2. Enable Developer mode.
3. Select **Load unpacked**.
4. Select `extensions/mcp-superassistant-local-fixed` from this repository.
5. Open a supported provider website and confirm that the MCP panel appears.
6. After changing extension code, reload it on the extensions page and refresh the provider tab.

Use this MCP connection in the extension:

```text
Connection Type: SSE
Server URI: http://127.0.0.1:3006/sse
```

Do not enable the store build and the local development build at the same time. Doing so can produce duplicate panels, allow an old adapter to win, or execute a tool result twice.

## Permissions and Deletion

Read operations can use absolute paths explicitly provided by the user and retain the necessary access context. Mutation follows this order:

1. When a user enters a Windows absolute path in the current task, the extension records that path intent.
2. A matching mutation can be approved automatically, persisting only the corresponding directory rather than a drive root.
3. External mutations without matching path intent enter the permission panel.
4. The user can approve once, approve the directory persistently, or reject the request.
5. Permission tokens are bound to the request, tool, paths, and arguments and cannot authorize another operation.

The optional static writable-directory file is:

```text
products/plugin/config/allowed-directories.local.txt
```

Create it from `allowed-directories.example.txt` and place one absolute directory on each line. It contains machine-local paths and must remain untracked.

`delete_file` removes one file and uses the same permission and audit controls as writes. Directory deletion is rejected, and recursive directory deletion is not exposed to the model.

## Local Data and Privacy

Do not commit these machine-local artifacts:

- Permission, audit, image, and tool-result data under `products/plugin/data/`.
- Machine configuration matching `products/plugin/config/*.local.*`.
- Absolute local paths, account data, tokens, and real conversation content.
- `node_modules/`, temporary logs, and test output.

File content moves only between the local MCP, the browser extension, and the provider page selected by the user. Whether content is sent to a provider is governed by the website the user invokes and that provider's privacy policy.

## Testing and Build

Run the complete verification pipeline:

```powershell
npm test
```

This command runs product-boundary, extension, service, and source-boundary tests before verifying every runtime file in the unpacked extension.

Individual commands are also available:

```powershell
npm run check:boundaries
npm run test:plugin
npm run build:plugin
```

Automated tests do not replace manual provider verification after adapter changes. At minimum, confirm panel rendering, prompt insertion, submission, tool execution, and result return on the target website.

## Troubleshooting

**The BAT window closes immediately**

Run `.\products\plugin\start-plugin.bat` from PowerShell to keep the error visible. Check the Node.js version and port `3006/3017` ownership first.

**Two MCP panels appear**

Disable the store build or other local copies, keep only `extensions/mcp-superassistant-local-fixed`, and refresh the provider page.

**The panel appears but cannot insert instructions**

Reload the extension and refresh the provider tab. A provider DOM change may have invalidated the composer or submit selector and require an adapter update.

**A write shows no approval or remains denied**

Confirm that the gateway is healthy, the path is an absolute Windows path, and the exact path appears in the current user input. Mutations without explicit path intent must be handled in the permission panel.

**A port is already in use**

Do not run the plugin together with an older service using `3006/3017`. The launcher identifies the conflicting port; stop that process and retry.

## Versions and Branches

- Formal branch: `webagent`.
- Current version: `1.0.2`.
- Release tag: `webagent-v1.0.2`.
- Shared foundation: `@web-agents/local-core@1.0.1`, pinned to `local-core-v1.0.1`.
- The roundtable product has migrated to the separate repository [zhuxice-ctrl/web_agent_tablellm](https://github.com/zhuxice-ctrl/web_agent_tablellm); the two products are never merged.

## License

[MIT](LICENSE)
