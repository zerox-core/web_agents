# Changelog

## 1.1.0 - 2026-09-13

- Added twenty permission-gated tools on top of the filesystem set, bringing the default registry to 42 tools: ping, todo list read/write, allowlist-gated `web_fetch` with per-origin approval, workspace context, local workspace listing, development environment inspection, Node/Python/Java runners, Android device operations, unified `git_workflow` (status/log/add_files/commit automatic, push approval-gated), development project registry, background development tasks with logs and cancellation, local dev server management, and chunked large-file transfer.
- Kept the fail-closed permission model: every new mutating tool declares full metadata (read-only, destructive, reversible, open-world, idempotent flags, path argument descriptors) and routes through the same one-time permission token flow as the filesystem tools.
- The web_Agent plugin now pins this release.

## 1.0.1 - 2026-07-23

- Kept permission suggestions scoped to the requested directory instead of widening to an existing drive root.
- Added explicit directory-persistent approval metadata alongside one-time approval.
- Added audited, permission-gated `delete_file` support without recursive directory deletion.

## 1.0.0 - 2026-07-23

- Extracted the shared filesystem and permission foundation into an independent package branch.
- Preserved the existing public subpath exports used by web_Agent and TableLLM.
- Added an explicit Node.js 24 runtime contract and independent release policy.
