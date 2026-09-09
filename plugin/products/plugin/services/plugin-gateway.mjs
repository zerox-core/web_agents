import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { atomicWriteFile } from "@web-agents/local-core/atomic-file";
import { PathLockManager } from "@web-agents/local-core/paths";
import {
  assertMutationPathIdentity,
  resolvePathIdentity,
} from "@web-agents/local-core/real-paths";
import {
  approvePermissionRequest,
  rejectPermissionRequest,
} from "./permission-store-adapter.mjs";
import { buildGatewayConfig, evaluatePermission, getAllowedRoots } from "./config-gateway.mjs";
import { createAutomationTaskQueue } from "./automation-task-queue.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultProductRoot = path.resolve(__dirname, "..");
const maxBytes = Number(process.env.WEB_AGENT_IMAGE_SAVE_MAX_BYTES || 50 * 1024 * 1024);
const maxToolResultBytes = Number(process.env.WEB_AGENT_TOOL_RESULT_MAX_BYTES || 5 * 1024 * 1024);
const allowedMimeTypes = new Map([
  ["image/png", ".png"],
  ["image/jpeg", ".jpg"],
  ["image/jpg", ".jpg"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);
const imagePathExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);
const imagePathLocks = new PathLockManager();
const permissionConfigLocks = new PathLockManager();

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
  });
  response.end(JSON.stringify(body));
}

function sanitizeFileName(value, extension) {
  const fallback = `gpt-image-${new Date().toISOString().replace(/[-:]/g, "").replace(/\..+$/, "").replace("T", "-")}${extension}`;
  const raw = typeof value === "string" && value.trim() ? value.trim() : fallback;
  const baseName = path.basename(raw).replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").slice(0, 120);
  const parsed = path.parse(baseName);
  const safeName = parsed.name || path.parse(fallback).name;
  return `${safeName}${extension}`;
}

function sanitizeToolName(value) {
  const raw = typeof value === "string" && value.trim() ? value.trim() : "tool-result";
  return raw.replace(/[<>:"/\\|?*\u0000-\u001f\s]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "tool-result";
}

function makeTimestamp() {
  return new Date().toISOString().replace(/[-:]/g, "").replace(/\..+$/, "").replace("T", "-");
}

function createGatewayRuntime({
  productRoot = defaultProductRoot,
  configDir = path.join(productRoot, "config"),
  dataDir = path.join(productRoot, "data"),
} = {}) {
  const resolvedProductRoot = path.resolve(productRoot);
  const resolvedDataDir = path.resolve(dataDir);
  return {
    productRoot: resolvedProductRoot,
    configDir: path.resolve(configDir),
    configFile: path.join(path.resolve(configDir), "allowed-directories.local.txt"),
    dataDir: resolvedDataDir,
    outputDir: path.join(resolvedDataDir, "gpt-images"),
    toolResultsDir: path.join(resolvedDataDir, "tool-results"),
    permissionStoreDir: process.env.WEB_AGENT_PERMISSION_STORE_DIR || path.join(resolvedDataDir, "permissions"),
  };
}

async function resolveOutputDir(payload, runtime) {
  const requested = String(
    payload?.targetDirectory || payload?.directoryPath || payload?.targetPath || ""
  ).trim();
  if (!requested) {
    return runtime.outputDir;
  }

  const requestedPath = path.resolve(requested);
  const requestedExtension = path.extname(requestedPath).toLowerCase();
  const targetDir = imagePathExtensions.has(requestedExtension)
    ? path.dirname(requestedPath)
    : requestedPath;
  const resolvedTargetDir = path.resolve(targetDir);
  const allowedRoots = await getAllowedRoots({
    repoRoot: runtime.productRoot,
    configFile: runtime.configFile,
  });
  for (const allowedRoot of allowedRoots) {
    const identity = await resolvePathIdentity(resolvedTargetDir, {
      cwd: runtime.productRoot,
      workspaceRoot: allowedRoot,
    });
    if (!identity.isInsideWorkspace) continue;
    try {
      assertMutationPathIdentity(identity);
    } catch (error) {
      error.statusCode = 400;
      throw error;
    }
    return identity.physicalPath;
  }
  const error = new Error("OUTPUT_PATH_NOT_ALLOWED");
  error.statusCode = 403;
  throw error;
}

async function readJson(request) {
  const chunks = [];
  let total = 0;
  for await (const chunk of request) {
    total += chunk.length;
    if (total > maxBytes * 1.4) {
      throw new Error("PAYLOAD_TOO_LARGE");
    }
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function requireAutomationString(value) {
  return typeof value === "string" && Boolean(value.trim());
}

function validateAutomationTask(payload) {
  const valid = payload
    && typeof payload === "object"
    && payload.version === 1
    && payload.type === "provider.generate_image"
    && requireAutomationString(payload.clientRequestId)
    && requireAutomationString(payload.sessionId)
    && requireAutomationString(payload.provider)
    && requireAutomationString(payload.workspaceRoot)
    && payload.payload
    && typeof payload.payload === "object"
    && requireAutomationString(payload.payload.prompt)
    && requireAutomationString(payload.payload.targetDirectory)
    && (payload.tabId === undefined || (Number.isInteger(payload.tabId) && payload.tabId > 0))
    && (payload.payload.fileName === undefined || requireAutomationString(payload.payload.fileName));
  if (!valid) {
    const error = new Error("INVALID_AUTOMATION_TASK");
    error.statusCode = 400;
    throw error;
  }
  return payload;
}

async function saveImage(payload, runtime = createGatewayRuntime()) {
  const mimeType = String(payload?.mimeType || "").toLowerCase();
  const extension = allowedMimeTypes.get(mimeType);
  if (!extension) {
    const error = new Error("UNSUPPORTED_MIME_TYPE");
    error.statusCode = 415;
    throw error;
  }

  const base64 = String(payload?.base64 || "").replace(/^data:[^,]+,/, "");
  if (!base64) {
    const error = new Error("EMPTY_IMAGE_DATA");
    error.statusCode = 400;
    throw error;
  }

  const imageBuffer = Buffer.from(base64, "base64");
  if (!imageBuffer.length) {
    const error = new Error("EMPTY_IMAGE_DATA");
    error.statusCode = 400;
    throw error;
  }
  if (imageBuffer.length > maxBytes) {
    const error = new Error("IMAGE_TOO_LARGE");
    error.statusCode = 413;
    throw error;
  }

  const saveDir = await resolveOutputDir(payload, runtime);
  await fs.mkdir(saveDir, { recursive: true });
  const fileName = sanitizeFileName(payload?.fileName, extension);
  const filePath = path.join(saveDir, fileName);
  const resolved = path.resolve(filePath);
  const resolvedOutput = path.resolve(saveDir);
  if (!resolved.startsWith(resolvedOutput + path.sep)) {
    const error = new Error("INVALID_FILE_PATH");
    error.statusCode = 400;
    throw error;
  }

  const identity = await resolvePathIdentity(resolved, {
    cwd: resolvedOutput,
    workspaceRoot: resolvedOutput,
  });
  try {
    assertMutationPathIdentity(identity);
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
  if (!identity.isInsideWorkspace) {
    const error = new Error("INVALID_FILE_PATH");
    error.statusCode = 400;
    throw error;
  }
  await imagePathLocks.runExclusive(identity.physicalPath, () => atomicWriteFile(identity.physicalPath, imageBuffer));
  return { filePath: resolved, outputDir: resolvedOutput, bytes: imageBuffer.length, mimeType };
}

async function saveToolResult(payload, runtime = createGatewayRuntime()) {
  const text = String(payload?.text || payload?.content || "");
  if (!text.trim()) {
    const error = new Error("EMPTY_TOOL_RESULT");
    error.statusCode = 400;
    throw error;
  }

  const bytes = Buffer.byteLength(text, "utf8");
  if (bytes > maxToolResultBytes) {
    const error = new Error("TOOL_RESULT_TOO_LARGE");
    error.statusCode = 413;
    throw error;
  }

  await fs.mkdir(runtime.toolResultsDir, { recursive: true });
  const extension = String(payload?.extension || ".md").toLowerCase() === ".txt" ? ".txt" : ".md";
  const toolName = sanitizeToolName(payload?.toolName || payload?.name);
  const fileName = sanitizeFileName(payload?.fileName || `${toolName}-${makeTimestamp()}${extension}`, extension);
  const filePath = path.join(runtime.toolResultsDir, fileName);
  const resolved = path.resolve(filePath);
  const resolvedOutput = path.resolve(runtime.toolResultsDir);
  if (!resolved.startsWith(resolvedOutput + path.sep)) {
    const error = new Error("INVALID_TOOL_RESULT_PATH");
    error.statusCode = 400;
    throw error;
  }

  const header = [
    `# web_Agent 工具结果`,
    ``,
    `- Tool: ${toolName}`,
    `- Saved: ${new Date().toISOString()}`,
    ``,
    `---`,
    ``,
  ].join("\n");
  await fs.writeFile(resolved, extension === ".md" ? `${header}${text}` : text, "utf8");
  return { filePath: resolved, outputDir: resolvedOutput, bytes, toolName };
}

async function approvePermissionViaGateway(payload, runtime = createGatewayRuntime()) {
  const mode = payload?.mode === "directory" ? "directory" : "once";
  const result = await approvePermissionRequest({
    storeDir: payload?.storeDir || runtime.permissionStoreDir,
    requestId: payload?.requestId,
    argsHash: payload?.argsHash,
    mode,
  });
  const persistedDirectories = mode === "directory"
    ? await persistAllowedDirectories(runtime.configFile, result.directoriesToApprove)
    : [];
  return {
    ok: true,
    requestId: result.requestId,
    status: result.status,
    token: result.token,
    expiresAt: result.expiresAt,
    targetPaths: result.targetPaths,
    directoriesToApprove: result.directoriesToApprove,
    approvalMode: result.approvalMode,
    persistedDirectories,
  };
}

function normalizePathKey(value) {
  const resolved = path.resolve(value);
  return process.platform === "win32" ? resolved.toLowerCase() : resolved;
}

async function persistAllowedDirectories(configFile, directories) {
  const resolvedConfigFile = path.resolve(configFile);
  return permissionConfigLocks.runExclusive(resolvedConfigFile, async () => {
    await fs.mkdir(path.dirname(resolvedConfigFile), { recursive: true });
    let current = "";
    try {
      current = await fs.readFile(resolvedConfigFile, "utf8");
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }

    const existingKeys = new Set(
      current.split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"))
        .map(normalizePathKey)
    );
    const additions = [];
    for (const directory of directories || []) {
      const value = String(directory || "").trim();
      if (!value) continue;
      const resolved = path.resolve(value);
      const key = normalizePathKey(resolved);
      if (!existingKeys.has(key)) {
        existingKeys.add(key);
        additions.push(resolved);
      }
    }
    if (!additions.length) return [];

    const prefix = current && !current.endsWith("\n") ? `${current}\n` : current;
    await atomicWriteFile(resolvedConfigFile, `${prefix}${additions.join("\n")}\n`);
    return additions;
  });
}

async function rejectPermissionViaGateway(payload, runtime = createGatewayRuntime()) {
  const result = await rejectPermissionRequest({
    storeDir: payload?.storeDir || runtime.permissionStoreDir,
    requestId: payload?.requestId,
  });
  return {
    ok: true,
    requestId: result.requestId,
    status: result.status,
  };
}

export function createPluginGatewayServer(options = {}) {
  const runtime = createGatewayRuntime(options);
  const taskQueue = options.taskQueue || createAutomationTaskQueue();
  const ownsTaskQueue = !options.taskQueue;
  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, "http://127.0.0.1");
      if (request.method === "OPTIONS") return sendJson(response, 204, {});
      if (request.method === "GET" && url.pathname === "/health") {
        return sendJson(response, 200, {
          ok: true,
          service: "web-agents-plugin-gateway",
          pid: process.pid,
          productRoot: runtime.productRoot,
          port: server.address()?.port || 0,
          outputDir: runtime.outputDir,
          toolResultsDir: runtime.toolResultsDir,
          permissionStoreDir: runtime.permissionStoreDir,
          features: { saveGptImage: true, saveToolResult: true, permissionApproval: true, automationTasks: true },
          automation: taskQueue.snapshot(),
        });
      }
      if (request.method === "GET" && url.pathname === "/config") {
        const config = await buildGatewayConfig({
          repoRoot: runtime.productRoot,
          configFile: runtime.configFile,
          gatewayUrl: `http://${request.headers.host || "127.0.0.1:3017"}`,
        });
        return sendJson(response, 200, config);
      }
      if (request.method === "POST" && url.pathname === "/automation/tasks") {
        const task = taskQueue.submit(validateAutomationTask(await readJson(request)));
        return sendJson(response, 202, { ok: true, taskId: task.taskId, task });
      }
      if (request.method === "GET" && url.pathname === "/automation/next") {
        const waitMs = Math.max(0, Math.min(20_000, Number(url.searchParams.get("waitMs")) || 0));
        const provider = String(url.searchParams.get("provider") || "").trim().toLowerCase();
        const sessionId = String(url.searchParams.get("sessionId") || "").trim();
        const task = await taskQueue.take({ provider, sessionId, waitMs });
        return sendJson(response, 200, { ok: true, task });
      }
      const automationResultMatch = url.pathname.match(/^\/automation\/tasks\/([^/]+)\/result$/);
      if (request.method === "POST" && automationResultMatch) {
        const task = taskQueue.complete(decodeURIComponent(automationResultMatch[1]), await readJson(request));
        return sendJson(response, 200, { ok: true, task });
      }
      const automationStatusMatch = url.pathname.match(/^\/automation\/tasks\/([^/]+)$/);
      if (request.method === "GET" && automationStatusMatch) {
        const task = taskQueue.get(decodeURIComponent(automationStatusMatch[1]));
        return task
          ? sendJson(response, 200, { ok: true, task })
          : sendJson(response, 404, { ok: false, error: "AUTOMATION_TASK_NOT_FOUND" });
      }
      if (request.method === "POST" && request.url === "/permission/evaluate") {
        const payload = await readJson(request);
        const allowedRoots = await getAllowedRoots({
          repoRoot: runtime.productRoot,
          configFile: runtime.configFile,
        });
        const decision = evaluatePermission({
          allowedRoots,
          mode: process.env.WEB_AGENT_PERMISSION_MODE || "standard",
          highPrivilege: process.env.WEB_AGENT_HIGH_PRIVILEGE === "1",
          toolName: String(payload.toolName || ""),
          targetPath: payload.path ? String(payload.path) : undefined,
        });
        return sendJson(response, 200, decision);
      }
      if (request.method === "POST" && request.url === "/save-gpt-image") {
        const result = await saveImage(await readJson(request), runtime);
        return sendJson(response, 200, { ok: true, ...result });
      }
      if (request.method === "POST" && request.url === "/save-tool-result") {
        const result = await saveToolResult(await readJson(request), runtime);
        return sendJson(response, 200, { ok: true, ...result });
      }
      if (request.method === "POST" && (request.url === "/permissions/approve" || request.url === "/permissions/approve-once")) {
        return sendJson(response, 200, await approvePermissionViaGateway(await readJson(request), runtime));
      }
      if (request.method === "POST" && request.url === "/permissions/reject") {
        return sendJson(response, 200, await rejectPermissionViaGateway(await readJson(request), runtime));
      }
      return sendJson(response, 404, { ok: false, error: "NOT_FOUND" });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const statusCode = error?.statusCode
        || (error?.code === "AUTOMATION_QUEUE_FULL" ? 429 : null)
        || (error?.code === "AUTOMATION_TASK_NOT_FOUND" ? 404 : null)
        || (message === "PAYLOAD_TOO_LARGE" ? 413 : 500);
      return sendJson(response, statusCode, { ok: false, error: message });
    }
  });
  server.runtime = runtime;
  server.taskQueue = taskQueue;
  server.closeAllSessions = () => {
    if (ownsTaskQueue) taskQueue.close();
  };
  return server;
}

if (path.resolve(process.argv[1] || "") === __filename) {
  const port = Number(process.env.WEB_AGENT_IMAGE_SAVE_PORT || 3017);
  const host = process.env.WEB_AGENT_IMAGE_SAVE_HOST || "127.0.0.1";
  const server = createPluginGatewayServer();
  server.listen(port, host, () => console.log(`Web Agents plugin gateway listening at http://${host}:${port}`));
}

export {
  approvePermissionViaGateway,
  persistAllowedDirectories,
  rejectPermissionViaGateway,
  saveImage,
  saveToolResult,
  sanitizeToolName,
};
