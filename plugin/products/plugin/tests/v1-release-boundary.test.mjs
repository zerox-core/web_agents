import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testDir, "../../..");
const extensionRoot = path.join(repoRoot, "extensions/mcp-superassistant-local-fixed");
const coreDependency = "https://github.com/zhuxice-ctrl/web_agents/archive/refs/tags/local-core-v1.0.1.tar.gz";

test("webagent v1 contains only the plugin product", async () => {
  await assert.rejects(fs.access(path.join(repoRoot, "products/roundtable")), { code: "ENOENT" });
  await assert.rejects(fs.access(path.join(repoRoot, "packages/local-core")), { code: "ENOENT" });
  await assert.rejects(fs.access(path.join(repoRoot, "products/plugin/legacy-extension")), { code: "ENOENT" });
});

test("webagent v1 pins the independent local core release", async () => {
  const rootPackage = JSON.parse(await fs.readFile(path.join(repoRoot, "package.json"), "utf8"));
  const pluginPackage = JSON.parse(await fs.readFile(path.join(repoRoot, "products/plugin/package.json"), "utf8"));

  assert.equal(rootPackage.name, "webagent");
  assert.equal(rootPackage.version, "1.0.2");
  assert.equal(pluginPackage.version, "1.0.2");
  assert.equal(pluginPackage.dependencies["@web-agents/local-core"], coreDependency);
  assert.doesNotMatch(JSON.stringify(rootPackage.scripts), /roundtable|test:core/i);
});

test("webagent v1 manifest is product-scoped", async () => {
  const manifest = JSON.parse(await fs.readFile(path.join(extensionRoot, "manifest.json"), "utf8"));
  const background = await fs.readFile(path.join(extensionRoot, "background.js"), "utf8");

  assert.equal(manifest.name, "web_Agent");
  assert.equal(manifest.version, "1.0.2");
  assert.doesNotMatch(JSON.stringify(manifest), /roundtable/i);
  assert.doesNotMatch(background, /roundtable-background/i);
  assert.equal(manifest.permissions.includes("tabs"), false);
  assert.equal(manifest.permissions.includes("scripting"), false);
});
