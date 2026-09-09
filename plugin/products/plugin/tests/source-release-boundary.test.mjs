import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const pluginDir = path.resolve(testDir, "..");
const repoRoot = path.resolve(pluginDir, "../..");
const rejectedExtensionDir = path.join(pluginDir, "extension");
const extensionDir = path.join(repoRoot, "extensions/mcp-superassistant-local-fixed");

async function sourceFiles(directory) {
  const output = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ["dist", "node_modules"].includes(entry.name)) continue;
    const item = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await sourceFiles(item));
    else if (/\.(?:ts|tsx|js|json|css)$/.test(entry.name)) output.push(item);
  }
  return output;
}

test("rejected popup extension source has been removed", async () => {
  await assert.rejects(fs.access(rejectedExtensionDir), { code: "ENOENT" });

  const pluginPackage = JSON.parse(await fs.readFile(path.join(pluginDir, "package.json"), "utf8"));
  assert.doesNotMatch(JSON.stringify(pluginPackage.scripts), /npm --prefix extension|extension\/dist/);
});

test("active unpacked extension contains the expected main entries", async () => {
  const manifest = JSON.parse(await fs.readFile(path.join(extensionDir, "manifest.json"), "utf8"));
  assert.equal(manifest.name, "web_Agent");
  assert.equal(manifest.version, "1.0.2");
  await Promise.all([
    fs.access(path.join(extensionDir, "background.js")),
    fs.access(path.join(extensionDir, "content/index-main.iife.js")),
    fs.access(path.join(extensionDir, "content/local-automation-bridge.js")),
    fs.access(path.join(extensionDir, "content/grok-zh-localization.js"))
  ]);
});

test("active normal plugin contains no roundtable product code", async () => {
  for (const file of await sourceFiles(extensionDir)) {
    const relative = path.relative(extensionDir, file).replaceAll("\\", "/");
    const source = await fs.readFile(file, "utf8");
    assert.doesNotMatch(`${relative}\n${source}`, /roundtable/i, relative);
  }
});
