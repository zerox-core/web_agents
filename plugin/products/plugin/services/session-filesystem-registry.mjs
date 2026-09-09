import fs from "node:fs/promises";
import path from "node:path";

import { createFilesystemTools } from "@web-agents/local-core/filesystem-tools";
import {
  assertMutationPathIdentity,
  resolvePathIdentity,
} from "@web-agents/local-core/real-paths";

import { getAllowedRoots } from "./config-gateway.mjs";

function registryError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function requireValue(value, code) {
  const normalized = String(value || "").trim();
  if (!normalized) throw registryError(code, code);
  return normalized;
}

export function createSessionFilesystemRegistry({
  repoRoot,
  configFile,
  permissionStoreDir,
  auditFile,
  toolFactory = createFilesystemTools,
} = {}) {
  const runtime = {
    repoRoot: path.resolve(requireValue(repoRoot, "REPO_ROOT_REQUIRED")),
    configFile: path.resolve(requireValue(configFile, "CONFIG_FILE_REQUIRED")),
    permissionStoreDir: path.resolve(requireValue(permissionStoreDir, "PERMISSION_STORE_DIR_REQUIRED")),
    auditFile: path.resolve(requireValue(auditFile, "AUDIT_FILE_REQUIRED")),
  };
  const cache = new Map();

  async function resolveWorkspace(workspaceRoot) {
    const requested = path.resolve(String(workspaceRoot || runtime.repoRoot));
    const allowedRoots = await getAllowedRoots(runtime);

    for (const allowedRoot of allowedRoots) {
      const identity = await resolvePathIdentity(requested, {
        cwd: runtime.repoRoot,
        workspaceRoot: allowedRoot,
      });
      if (!identity.isInsideWorkspace) continue;
      assertMutationPathIdentity(identity);
      const stat = await fs.stat(identity.physicalPath).catch(() => null);
      if (!stat?.isDirectory()) {
        throw registryError("WORKSPACE_NOT_FOUND", `Workspace does not exist: ${requested}`);
      }
      return identity;
    }

    throw registryError("WORKSPACE_NOT_ALLOWED", `Workspace is not allowed: ${requested}`);
  }

  return {
    async get({ sessionId, workspaceRoot } = {}) {
      const resolvedSessionId = requireValue(sessionId, "SESSION_ID_REQUIRED");
      const identity = await resolveWorkspace(workspaceRoot);
      const cacheKey = `${resolvedSessionId}\u0000${identity.physicalKey}`;
      let tools = cache.get(cacheKey);
      if (!tools) {
        tools = toolFactory({
          repoRoot: identity.physicalPath,
          configFile: runtime.configFile,
          permissionStoreDir: runtime.permissionStoreDir,
          auditFile: runtime.auditFile,
        });
        cache.set(cacheKey, tools);
      }
      return tools;
    },
    clear() {
      cache.clear();
    },
    get size() {
      return cache.size;
    },
  };
}
