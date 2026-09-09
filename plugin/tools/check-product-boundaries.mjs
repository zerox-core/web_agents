import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CORE_DEPENDENCY = "https://github.com/zhuxice-ctrl/web_agents/archive/refs/tags/local-core-v1.0.1.tar.gz";
const SOURCE_EXTENSIONS = new Set([".js", ".mjs", ".ts", ".tsx"]);
const STATIC_IMPORT = /(?:import|export)\s+(?:[^"']*?\s+from\s+)?["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g;

async function exists(target) {
  return fs.access(target).then(() => true, () => false);
}

async function walk(root) {
  const files = [];
  for (const entry of await fs.readdir(root, { withFileTypes: true })) {
    if (["node_modules", "data"].includes(entry.name)) continue;
    const item = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...await walk(item));
    else files.push(item);
  }
  return files;
}

export async function checkProductBoundaries({ repoRoot }) {
  const root = path.resolve(repoRoot);
  const violations = [];
  for (const relative of ["products/roundtable", "packages/local-core", "products/plugin/legacy-extension"]) {
    if (await exists(path.join(root, relative))) violations.push({ file: relative, rule: "foreign-or-vendored-product" });
  }

  const pluginRoot = path.join(root, "products/plugin");
  for (const file of await walk(pluginRoot)) {
    if (!SOURCE_EXTENSIONS.has(path.extname(file))) continue;
    const source = await fs.readFile(file, "utf8");
    for (const match of source.matchAll(STATIC_IMPORT)) {
      const specifier = match[1] || match[2];
      if (/products[\\/]roundtable|@web-agents[\\/]roundtable|packages[\\/]local-core/i.test(specifier)) {
        violations.push({ file, rule: "plugin-imports-non-package-runtime", specifier });
      }
    }
  }

  const rootPackage = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"));
  const pluginPackage = JSON.parse(await fs.readFile(path.join(pluginRoot, "package.json"), "utf8"));
  if (rootPackage.name !== "webagent" || rootPackage.version !== "1.0.2") {
    violations.push({ file: "package.json", rule: "invalid-product-version" });
  }
  if (pluginPackage.dependencies?.["@web-agents/local-core"] !== CORE_DEPENDENCY) {
    violations.push({ file: "products/plugin/package.json", rule: "unpinned-local-core" });
  }

  const manifest = JSON.parse(await fs.readFile(
    path.join(root, "extensions/mcp-superassistant-local-fixed/manifest.json"),
    "utf8"
  ));
  if (manifest.version !== "1.0.2" || /roundtable/i.test(JSON.stringify(manifest))) {
    violations.push({ file: "extensions/mcp-superassistant-local-fixed/manifest.json", rule: "invalid-manifest-boundary" });
  }

  if (violations.length) {
    const error = new Error("PRODUCT_BOUNDARY_VIOLATION");
    error.violations = violations;
    throw error;
  }
  return { ok: true, violations: [] };
}

const currentFile = fileURLToPath(import.meta.url);
if (path.resolve(process.argv[1] || "") === currentFile) {
  try {
    await checkProductBoundaries({ repoRoot: path.resolve(path.dirname(currentFile), "..") });
    console.log("webagent v1 boundaries: OK");
  } catch (error) {
    console.error(JSON.stringify({ error: error.message, violations: error.violations || [] }, null, 2));
    process.exitCode = 1;
  }
}
