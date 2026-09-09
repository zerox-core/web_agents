# Product Isolation Baseline

Date: 2026-07-18
Base commit: `f9c9820`

| Command | Result |
|---|---|
| `npm.cmd run test:legacy-roundtable-extension` | exit 0, 84 passed |
| `npm.cmd --prefix extensions/web-agents-extension test` | exit 0, 85 passed |
| `npm.cmd --prefix extensions/web-agents-extension run typecheck` | exit 0 |
| `npm.cmd run test:roundtable-web` | exit 0, 201 passed |
| `node --test scripts/start-web-agents-browser.test.mjs` | exit 0, 3 passed |
| roundtable launcher static tests | exit 0, 2 passed |

Known open issue: the complete launcher start/reuse/restart/stop chain passes functionally but has shown approximately 252 seconds of host-dependent latency. It is not accepted by this baseline.

Local configuration, generated data, browser profiles, ADworkflo transient context, codegraph locks, and dependencies are excluded from the checkpoint.
