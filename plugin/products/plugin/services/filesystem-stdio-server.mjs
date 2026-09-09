import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildPermissionMarker,
  buildPermissionRequiredResult,
  CONTROLLER_TOOL_CAPABILITY,
  createFilesystemTools,
  getAllowedDirectories,
  getWritablePermissionCheck,
  toolDefinitions,
} from "@web-agents/local-core/filesystem-tools";
import { defaultPermissionStoreDir } from "./permission-store-adapter.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultRepoRoot = path.resolve(__dirname, "..");
const defaultConfigFile = path.join(defaultRepoRoot, "config", "allowed-directories.local.txt");
const defaultAuditFile = path.join(defaultRepoRoot, "data", "audit", "writes.jsonl");

function filesystemToolsFor(context = {}) {
  return createFilesystemTools({
    repoRoot: context.repoRoot || defaultRepoRoot,
    configFile: context.configFile || defaultConfigFile,
    permissionStoreDir: context.permissionStoreDir || defaultPermissionStoreDir,
    auditFile: context.auditFile || defaultAuditFile,
  });
}

export function callTool(name, args = {}, context = {}) {
  return filesystemToolsFor(context).call(name, args, {
    controllerCapability: context.controllerCapability,
  });
}

function sendMessage(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

function sendResult(id, result) {
  sendMessage({ jsonrpc: "2.0", id, result });
}

function sendError(id, code, message) {
  sendMessage({ jsonrpc: "2.0", id, error: { code, message } });
}

async function handleJsonRpcMessage(message) {
  if (!message || typeof message !== "object") return;
  const { id, method, params } = message;
  if (!id && id !== 0) return;
  try {
    switch (method) {
      case "initialize":
        sendResult(id, {
          protocolVersion: params?.protocolVersion || "2025-11-25",
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: "web-agent-dynamic-filesystem", version: "1.0.0" },
        });
        break;
      case "ping":
        sendResult(id, {});
        break;
      case "tools/list":
        sendResult(id, { tools: toolDefinitions });
        break;
      case "tools/call":
        sendResult(id, await callTool(params?.name, params?.arguments || {}));
        break;
      case "resources/list":
        sendResult(id, { resources: [] });
        break;
      case "prompts/list":
        sendResult(id, { prompts: [] });
        break;
      default:
        sendError(id, -32601, `Method not found: ${method}`);
    }
  } catch (error) {
    sendResult(id, {
      isError: true,
      content: [{ type: "text", text: error instanceof Error ? error.message : String(error) }],
    });
  }
}

export function startStdioServer() {
  let buffer = "";
  let queue = Promise.resolve();
  const enqueueMessage = (message) => {
    queue = queue.then(() => handleJsonRpcMessage(message)).catch((error) => {
      process.stderr.write(`[web_Agent filesystem] Failed to handle JSON-RPC message: ${error?.message || String(error)}\n`);
    });
  };
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => {
    buffer += chunk;
    while (true) {
      const newline = buffer.indexOf("\n");
      if (newline < 0) break;
      const line = buffer.slice(0, newline).trim();
      buffer = buffer.slice(newline + 1);
      if (!line) continue;
      try {
        enqueueMessage(JSON.parse(line));
      } catch (error) {
        process.stderr.write(`[web_Agent filesystem] Invalid JSON-RPC message: ${error?.message || String(error)}\n`);
      }
    }
  });
  process.stdin.on("end", () => queue.finally(() => process.exit(0)));
}

if (path.resolve(process.argv[1] || "") === __filename) startStdioServer();

export {
  buildPermissionMarker,
  buildPermissionRequiredResult,
  CONTROLLER_TOOL_CAPABILITY,
  getAllowedDirectories,
  getWritablePermissionCheck,
  toolDefinitions,
};
