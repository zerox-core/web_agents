[简体中文](README.md) | **English**

# Web Agents

Web Agents is a single-branch repository hosting the web_Agent browser extension product and the shared filesystem safety foundation: the repository root of `main` is the shared foundation @web-agents/local-core, the `plugin/` directory holds the web_Agent browser extension product, and the two are stored on one branch, tested and released independently. The multi-model roundtable workbench TableLLM has migrated to its own repository [zhuxice-ctrl/web_agent_tablellm](https://github.com/zhuxice-ctrl/web_agent_tablellm), together with the full `tablellm` branch history and `tablellm-v*` tags.

## Repository Structure

| Formal branch | Current version | Responsibility | Core dependency |
| --- | --- | --- | --- |
| [`main`](https://github.com/zhuxice-ctrl/web_agents/tree/main) root | `local-core 1.0.1` | Shared path, permission, transaction, and filesystem tool foundation | Standalone foundation |
| [`main`](https://github.com/zhuxice-ctrl/web_agents/tree/main) `plugin/` directory | `web_Agent 1.0.2` | Browser extension, local filesystem MCP, and plugin gateway | `local-core 1.0.1` |
| Migrated → [web_agent_tablellm](https://github.com/zhuxice-ctrl/web_agent_tablellm) | `TableLLM 1.0.1` | Multi-model roundtable UI, scheduler, and browser runtime (separate repository) | `local-core 1.0.0` |

```text
main
  ├─ / (repository root) = @web-agents/local-core foundation
  └─ plugin/ = web_Agent plugin (consumes Core through local-core-v* tags)
```

The separate web_agent_tablellm repository (roundtable product) also consumes Core through the `local-core-v*` tags of this repository.

The only permanent remote branch is `main`. Historical releases are retained through `local-core-v*` and `webagent-v*` tags instead of permanent version branches; `tablellm-v*` tags moved to the separate repository with the roundtable.

## Choosing a Branch

A default clone checks out `main`, which is appropriate for developing or auditing the shared Core:

```powershell
git clone https://github.com/zhuxice-ctrl/web_agents.git
cd web_agents
npm ci
npm test
```

For plugin development, work inside the `plugin/` directory:

```powershell
cd plugin
npm ci
npm run start:plugin
```

For roundtable development, clone the separate repository:

```powershell
git clone https://github.com/zhuxice-ctrl/web_agent_tablellm.git
cd web_agent_tablellm
npm ci
npm run start:roundtable
```

Use separate working directories for different products. Repeatedly switching these branches in one worktree can mix local configuration, browser data, or uncommitted files into the wrong product.

## Version Compatibility

| Product | Product version | Pinned Core version | Release tag |
| --- | --- | --- | --- |
| Local Core | `1.0.1` | - | `local-core-v1.0.1` |
| web_Agent | `1.0.2` | `1.0.1` | `webagent-v1.0.2` |
| TableLLM | `1.0.1` | `1.0.0` | `tablellm-v1.0.1` ([web_agent_tablellm](https://github.com/zhuxice-ctrl/web_agent_tablellm)) |

Products consume immutable Core tags. After a new Core release, the plugin and roundtable upgrade and test independently; they do not have to upgrade at the same time.

## Local Core

`@web-agents/local-core` is the filesystem safety and transaction foundation shared by the web_Agent plugin and the TableLLM roundtable. It owns:

- Windows path normalization, extended path prefixes, and case handling.
- Physical real-path resolution and junction-safe mutation boundaries.
- Concurrent mutation locks for exact paths and directory subtrees.
- Creation, approval, rejection, and consumption of one-time or task-scoped permissions.
- Atomic writes, backups, transaction commits, idempotent recovery, and conflict-aware rollback.
- Filesystem tools with explicit permission metadata and audit records.
- Permission-gated single-file `delete_file`, without recursive directory deletion.

Core contains no browser UI, provider website adapter, HTTP server, workspace selection UI, or product runtime.

## Installation

Requirements: Windows, Linux, or macOS and Node.js 24 or newer.

Pin the dependency to a release tag:

```json
{
  "dependencies": {
    "@web-agents/local-core": "https://github.com/zhuxice-ctrl/web_agents/archive/refs/tags/local-core-v1.0.1.tar.gz"
  }
}
```

Then run:

```powershell
npm install
```

Products should not depend on the moving `main` tip or copy Core source into their own branch.

## Public Modules

| Import path | Purpose |
| --- | --- |
| `@web-agents/local-core/paths` | Path normalization, exact locks, and subtree locks |
| `@web-agents/local-core/real-paths` | Real-path resolution and mutation identity checks |
| `@web-agents/local-core/atomic-file` | Atomic file and JSON writes |
| `@web-agents/local-core/permissions` | Product-injectable permission request broker |
| `@web-agents/local-core/permission-store` | Persistent permission requests, approvals, and tokens |
| `@web-agents/local-core/transactions` | File transactions, backups, rollback, and execution idempotency |
| `@web-agents/local-core/tool-registry` | Tool metadata validation and the default registry |
| `@web-agents/local-core/filesystem-tools` | Filesystem read, search, mutation, and deletion tools |

## Security Boundary

Core fails closed by default. Unknown tools, incomplete permission metadata, authorization paths that differ from physical paths, cross-workspace rollback, and mutation through junction aliases are rejected.

Permission tokens are bound to the request, task, tool, paths, and argument hash; they cannot be reused for a different operation. Transaction rollback checks the current file hash. If a user edits a file after the transaction, Core preserves that later edit and creates a recovery copy instead of silently overwriting it.

Products remain responsible for:

- Deciding which user input constitutes explicit path intent.
- Presenting permission UI and collecting approval or rejection.
- Selecting workspaces, sessions, browsers, and provider pages.
- Protecting HTTP, browser extension, and other transport boundaries.

## Testing

Install dependencies and run the complete Core suite:

```powershell
npm ci
npm test
```

The suite covers atomic writes, Windows paths, concurrency locks, permission tokens, real paths, tool metadata, file deletion, transaction recovery, and product dependency isolation.

## Release and Development Rules

- Patch releases preserve compatibility for existing public exports.
- Minor releases may add exports or optional behavior.
- Major releases may change permission or filesystem contracts.
- Shared capabilities are tested on `main` before creating a `local-core-vX.Y.Z` tag.
- The `plugin/` directory and the `tablellm` branch of the web_agent_tablellm repository upgrade Core only through pinned tags and never share source directories.
- Temporary feature branches are deleted after integration; the only permanent remote branch is `main`.
- Never commit machine-specific absolute paths, permission allowlists, account data, tokens, or real session data.

## License

[MIT](LICENSE)
