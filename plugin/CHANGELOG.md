# Changelog

## 1.0.2 - 2026-07-23

- Trusted explicit paths supplied by the user without widening access to unrelated directories.
- Kept non-explicit external mutations behind the permission workflow.

## 1.0.1 - 2026-07-23

- Upgraded the shared filesystem foundation to `@web-agents/local-core@1.0.1`.
- Added persistent scoped approvals and audited single-file deletion.

## 1.0.0 - 2026-07-23

- Split web_Agent into an independent plugin product branch with no roundtable source.
- Replaced the vendored core with the versioned `local-core-v1` dependency.
- Removed the duplicate legacy extension and unused runtime assets.
- Promoted the active extension and plugin package to version `1.0.0`.
- Added launcher port checks and v1 product-boundary tests.
