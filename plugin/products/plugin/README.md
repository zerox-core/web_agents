# web_Agent Plugin v1

The plugin product contains the normal browser extension experience and its local filesystem and permission gateway services. It does not start or package the roundtable workbench.

Version `1.0.2` depends on the independently versioned `local-core-v1.0.1` release and contains no vendored core or legacy extension copy.

## Commands

- `npm run test:plugin` runs extension, service, and release-boundary tests.
- `npm run build:plugin` verifies the unpacked extension at `extensions/mcp-superassistant-local-fixed`, including every manifest-declared runtime file.
- `start-plugin.bat` starts only the filesystem MCP on port `3006` and the plugin gateway on port `3017`.

Load `extensions/mcp-superassistant-local-fixed` as the unpacked browser extension. The rejected popup rewrite formerly stored at `products/plugin/extension` is intentionally not part of this product.

Plugin-local configuration lives under `products/plugin/config`; runtime audit, permission, image, and tool-result data lives under `products/plugin/data`. Local files in both locations are ignored by Git.

The permission panel separates one-time approval from persistent directory approval. Persistent approval applies to the selected directory and its descendants. The `delete_file` tool deletes individual files with the same permission and audit controls; recursive directory deletion is intentionally not exposed.

When a user submits a Windows absolute path, the extension records that path intent for the current browser tab. A matching mutation is automatically approved and the exact directory is persisted locally. Mutations without matching user-entered path intent continue to use the permission panel.
