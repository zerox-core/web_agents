import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultRepoRoot = path.resolve(__dirname, "..");
const defaultConfigFile = path.join(defaultRepoRoot, "config", "allowed-directories.local.txt");
const defaultHost = process.env.WEB_AGENT_CONFIG_GATEWAY_HOST || "127.0.0.1";
const defaultPort = Number(process.env.WEB_AGENT_CONFIG_GATEWAY_PORT || 3007);
const defaultMcpServerUri = process.env.WEB_AGENT_MCP_SERVER_URI || "http://127.0.0.1:3006/sse";

const MUTATION_TOOL_PATTERN = /(write|edit|delete|remove|move|rename|create|mkdir|patch|replace)/i;
const READ_TOOL_PATTERN = /(read|get|cat|view|fetch|open)/i;
const SEARCH_TOOL_PATTERN = /(search|find|grep|rg|glob|list|ls|tree|directory|dir)/i;
const DELETE_TOOL_PATTERN = /(delete|remove|rm|rmdir)/i;
const MOVE_TOOL_PATTERN = /(move|mv)/i;
const RENAME_TOOL_PATTERN = /(rename)/i;
const CREATE_TOOL_PATTERN = /(create|mkdir|new)/i;

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type,accept",
  });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  return text.trim() ? JSON.parse(text) : {};
}

async function ensureAllowedDirectoriesFile({ repoRoot = defaultRepoRoot, configFile = defaultConfigFile } = {}) {
  await fs.mkdir(path.dirname(configFile), { recursive: true });
  try {
    await fs.access(configFile);
  } catch {
    await fs.writeFile(
      configFile,
      [
        "# One writable directory per line. Blank lines and lines starting with # are ignored.",
        "# Changes take effect immediately.",
        repoRoot,
        "",
      ].join("\n"),
      "utf8"
    );
  }
}

function normalizePathForCompare(value) {
  return path.resolve(value).replaceAll("\\", "/").replace(/\/+$/g, "").toLowerCase();
}

function isInsideOrEqual(targetPath, rootPath) {
  const target = normalizePathForCompare(targetPath);
  const root = normalizePathForCompare(rootPath);
  return target === root || target.startsWith(`${root}/`);
}

async function resolveExistingDirectory(value) {
  const resolved = path.resolve(value);
  const stat = await fs.stat(resolved);
  return stat.isDirectory() ? resolved : null;
}

export async function getAllowedRoots({ repoRoot = defaultRepoRoot, configFile = defaultConfigFile } = {}) {
  await ensureAllowedDirectoriesFile({ repoRoot, configFile });

  const roots = [];
  const seen = new Set();

  async function addRoot(value) {
    try {
      const resolved = await resolveExistingDirectory(value);
      if (!resolved) return;
      const key = normalizePathForCompare(resolved);
      if (!seen.has(key)) {
        seen.add(key);
        roots.push(resolved);
      }
    } catch {
      // Missing paths are ignored because users may temporarily unplug drives.
    }
  }

  await addRoot(repoRoot);

  const content = await fs.readFile(configFile, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    await addRoot(trimmed.replace(/%([^%]+)%/g, (_, name) => process.env[name] || `%${name}%`));
  }

  return roots;
}

export function classifyPermissionOperation(toolName = "") {
  if (DELETE_TOOL_PATTERN.test(toolName)) return "delete";
  if (MOVE_TOOL_PATTERN.test(toolName)) return "move";
  if (RENAME_TOOL_PATTERN.test(toolName)) return "rename";
  if (CREATE_TOOL_PATTERN.test(toolName)) return "create";
  if (MUTATION_TOOL_PATTERN.test(toolName)) return "write";
  if (SEARCH_TOOL_PATTERN.test(toolName)) return "browse";
  if (READ_TOOL_PATTERN.test(toolName)) return "read";
  return "read";
}

export function evaluatePermission({ allowedRoots, mode = "standard", highPrivilege = false, toolName, targetPath }) {
  const operation = classifyPermissionOperation(toolName);
  const mutation = MUTATION_TOOL_PATTERN.test(toolName || "");
  const insideAllowedRoot = targetPath ? allowedRoots.some((root) => isInsideOrEqual(targetPath, root)) : false;

  if (mode === "high_privilege" || highPrivilege) {
    return {
      toolName,
      operation,
      path: targetPath,
      risk: mutation ? "high" : "low",
      insideAllowedRoot,
      requiresConfirmation: false,
      reason: "最高权限模式已开启，本地网关会记录高风险操作。",
    };
  }

  if ((mode === "strict" || mode === "privacy") && !insideAllowedRoot) {
    return {
      toolName,
      operation,
      path: targetPath,
      risk: mutation ? "high" : "low",
      insideAllowedRoot,
      requiresConfirmation: true,
      reason: mode === "privacy" ? "隐私模式下，允许目录外的读取和变更都需要确认。" : "严格模式下，允许目录外的读取和变更都需要确认。",
    };
  }

  const requiresConfirmation = mutation && !insideAllowedRoot;
  return {
    toolName,
    operation,
    path: targetPath,
    risk: mutation ? "high" : "low",
    insideAllowedRoot,
    requiresConfirmation,
    reason: requiresConfirmation
      ? "标准模式下，允许目录外的写入、删除、覆盖、移动、重命名或新建目录必须确认。"
      : "当前操作符合标准模式权限合同。",
  };
}

export async function buildGatewayConfig({
  repoRoot = defaultRepoRoot,
  configFile = defaultConfigFile,
  mcpServerUri = defaultMcpServerUri,
  mode = process.env.WEB_AGENT_PERMISSION_MODE || "standard",
  highPrivilege = process.env.WEB_AGENT_HIGH_PRIVILEGE === "1",
  gatewayUrl = `http://${defaultHost}:${defaultPort}`,
} = {}) {
  const allowedRoots = await getAllowedRoots({ repoRoot, configFile });
  return {
    ok: true,
    mcp: {
      serverUri: mcpServerUri,
      transport: "sse",
    },
    permissions: {
      mode,
      allowedRoots,
      highPrivilege: {
        enabled: highPrivilege,
        expiresAt: null,
      },
      enforcement: "gateway",
      gatewayUrl,
      lastSyncedAt: new Date().toISOString(),
      message: "已连接本地 Web Agents 配置网关。",
    },
  };
}

export function createConfigGatewayServer(options = {}) {
  const repoRoot = options.repoRoot || defaultRepoRoot;
  const configFile = options.configFile || defaultConfigFile;
  const mcpServerUri = options.mcpServerUri || defaultMcpServerUri;
  const mode = options.mode || process.env.WEB_AGENT_PERMISSION_MODE || "standard";
  const highPrivilege = Boolean(options.highPrivilege ?? process.env.WEB_AGENT_HIGH_PRIVILEGE === "1");
  const gatewayUrl = options.gatewayUrl || `http://${options.host || defaultHost}:${options.port || defaultPort}`;

  return http.createServer(async (request, response) => {
    try {
      if (request.method === "OPTIONS") {
        return sendJson(response, 204, {});
      }

      if (request.method === "GET" && request.url === "/health") {
        const allowedRoots = await getAllowedRoots({ repoRoot, configFile });
        return sendJson(response, 200, {
          ok: true,
          repoRoot,
          configFile,
          allowedRootsCount: allowedRoots.length,
          mcpServerUri,
          mode,
          highPrivilege,
        });
      }

      if (request.method === "GET" && request.url === "/config") {
        const config = await buildGatewayConfig({
          repoRoot,
          configFile,
          mcpServerUri,
          mode,
          highPrivilege,
          gatewayUrl,
        });
        return sendJson(response, 200, config);
      }

      if (request.method === "POST" && request.url === "/permission/evaluate") {
        const payload = await readJson(request);
        const allowedRoots = await getAllowedRoots({ repoRoot, configFile });
        const decision = evaluatePermission({
          allowedRoots,
          mode,
          highPrivilege,
          toolName: String(payload.toolName || ""),
          targetPath: payload.path ? String(payload.path) : undefined,
        });
        return sendJson(response, 200, decision);
      }

      return sendJson(response, 404, { ok: false, error: "NOT_FOUND" });
    } catch (error) {
      return sendJson(response, 500, {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  });
}

if (path.resolve(process.argv[1] || "") === __filename) {
  const server = createConfigGatewayServer({ host: defaultHost, port: defaultPort });
  server.listen(defaultPort, defaultHost, () => {
    console.log(`Web Agents config gateway listening at http://${defaultHost}:${defaultPort}`);
    console.log(`Config file: ${defaultConfigFile}`);
  });
}
