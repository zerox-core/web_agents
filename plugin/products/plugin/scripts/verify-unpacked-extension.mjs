import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../../..");
const extensionDir = path.join(repoRoot, "extensions/mcp-superassistant-local-fixed");
const manifestFile = path.join(extensionDir, "manifest.json");
const manifest = JSON.parse(await fs.readFile(manifestFile, "utf8"));

assert.equal(manifest.manifest_version, 3, "The active extension must use Manifest V3");
assert.equal(manifest.name, "web_Agent", "Unexpected active extension");

const runtimeFiles = new Set([
  manifest.background?.service_worker,
  ...manifest.content_scripts.flatMap((entry) => entry.js || []),
  ...Object.values(manifest.icons || {}),
  "_locales/zh_CN/messages.json"
].filter(Boolean));

const missing = [];
for (const relativeFile of runtimeFiles) {
  try {
    const stat = await fs.stat(path.join(extensionDir, relativeFile));
    if (!stat.isFile()) missing.push(relativeFile);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
    missing.push(relativeFile);
  }
}

assert.deepEqual(missing, [], `Missing manifest runtime files: ${missing.join(", ")}`);
console.log(`Unpacked extension ${manifest.name} ${manifest.version}: ${runtimeFiles.size} runtime files verified`);
