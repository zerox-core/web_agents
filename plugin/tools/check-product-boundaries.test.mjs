import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { checkProductBoundaries } from "./check-product-boundaries.mjs";

const coreDependency = "https://github.com/zhuxice-ctrl/web_agents/archive/refs/tags/local-core-v1.0.1.tar.gz";

async function write(root, relative, content) {
  const target = path.join(root, relative);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, content, "utf8");
}

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "webagent-v1-boundary-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  await write(root, "package.json", JSON.stringify({ name: "webagent", version: "1.0.2" }));
  await write(root, "products/plugin/package.json", JSON.stringify({
    dependencies: { "@web-agents/local-core": coreDependency },
  }));
  await write(root, "products/plugin/index.mjs", 'import "@web-agents/local-core/paths";');
  await write(root, "extensions/mcp-superassistant-local-fixed/manifest.json", JSON.stringify({
    name: "web_Agent",
    version: "1.0.2",
  }));
  return root;
}

test("accepts the independent webagent v1 layout", async (t) => {
  const root = await fixture(t);
  assert.deepEqual(await checkProductBoundaries({ repoRoot: root }), { ok: true, violations: [] });
});

test("rejects a vendored roundtable product", async (t) => {
  const root = await fixture(t);
  await write(root, "products/roundtable/package.json", "{}");
  await assert.rejects(() => checkProductBoundaries({ repoRoot: root }), /PRODUCT_BOUNDARY_VIOLATION/);
});

test("rejects a vendored or unpinned local core", async (t) => {
  const root = await fixture(t);
  await write(root, "packages/local-core/package.json", "{}");
  await assert.rejects(() => checkProductBoundaries({ repoRoot: root }), /PRODUCT_BOUNDARY_VIOLATION/);
});
