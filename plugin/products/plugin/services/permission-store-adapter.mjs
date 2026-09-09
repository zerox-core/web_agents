import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  approvePermissionRequest as approveCorePermissionRequest,
  calculateArgsHash,
  consumePermissionToken as consumeCorePermissionToken,
  createPermissionRequest as createCorePermissionRequest,
  rejectPermissionRequest as rejectCorePermissionRequest,
} from "@web-agents/local-core/permission-store";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");

export const defaultPermissionStoreDir = path.join(repoRoot, "data", "permissions");

function withDefaultStore(options = {}) {
  return { ...options, storeDir: options.storeDir || defaultPermissionStoreDir };
}

export function createPermissionRequest(options) {
  return createCorePermissionRequest(withDefaultStore(options));
}

export function approvePermissionRequest(options) {
  return approveCorePermissionRequest(withDefaultStore(options));
}

export function rejectPermissionRequest(options) {
  return rejectCorePermissionRequest(withDefaultStore(options));
}

export function consumePermissionToken(options) {
  return consumeCorePermissionToken(withDefaultStore(options));
}

export { calculateArgsHash };
