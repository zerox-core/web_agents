import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";
import { createHash } from "node:crypto";
import {
  calculateArgsHash,
  consumePermissionToken,
  createPermissionRequest,
} from "./permission-store.mjs";
import {
  assertMutationPathIdentity,
  resolvePathIdentity,
} from "./real-path-policy.mjs";

export const CONTROLLER_TOOL_CAPABILITY = Symbol("web-agents-controller-tool-capability");
const maxTextReadBytes = Number(process.env.WEB_AGENT_FS_MAX_TEXT_BYTES || 10 * 1024 * 1024);
const maxMediaReadBytes = Number(process.env.WEB_AGENT_FS_MAX_MEDIA_BYTES || 50 * 1024 * 1024);
const maxSearchResults = Number(process.env.WEB_AGENT_FS_MAX_SEARCH_RESULTS || 1000);
const maxTreeEntries = Number(process.env.WEB_AGENT_FS_MAX_TREE_ENTRIES || 2000);
const execFileAsync = promisify(execFile);
const maxGitOutputBytes = 2 * 1024 * 1024;
const maxCommandOutputBytes = 2 * 1024 * 1024;
const DEFAULT_COMMAND_WHITELIST = [
  "dir", "type", "findstr", "find", "where", "echo", "whoami", "tasklist",
  "ipconfig", "ping",
  "git status", "git diff", "git log", "git show", "git branch", "git rev-parse",
  "git ls-files", "git remote", "git tag", "git stash list",
  "node --version", "node -v", "npm --version", "npm ls", "npm run", "npm test",
  "py --version", "python --version",
];
const DENIED_COMMAND_RULES = [
  { pattern: /\bgit\s+push\b/i, reason: "git push 请使用 git_push 工具（需要单独授权）。" },
  { pattern: /\b(?:format|diskpart|bcdedit|shutdown|takeown|cipher|wmic|rundll32|mshta|certutil|bitsadmin)\b/i, reason: "命中高危命令黑名单。" },
  { pattern: /\b(?:del|erase)\s+\/[a-z]*s/i, reason: "禁止递归删除。" },
  { pattern: /\b(?:rd|rmdir)\s+\/[a-z]*s/i, reason: "禁止递归删除目录。" },
  { pattern: /\brm\s+-[a-z]*r/i, reason: "禁止递归删除。" },
  { pattern: /\bgit\s+(?:reset\s+--hard|clean\s+-[a-z]*f|branch\s+-[dD])/i, reason: "禁止破坏性 git 操作。" },
];

const mimeTypes = new Map([
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".gif", "image/gif"],
  [".bmp", "image/bmp"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain"],
  [".md", "text/markdown"],
  [".json", "application/json"],
  [".pdf", "application/pdf"],
  [".csv", "text/csv"],
  [".html", "text/html"],
  [".htm", "text/html"],
]);

async function appendWriteAudit(auditFile, event) {
  try {
    await fs.mkdir(path.dirname(auditFile), { recursive: true });
    const line = JSON.stringify({ at: new Date().toISOString(), ...event });
    await fs.appendFile(auditFile, `${line}\n`, "utf8");
  } catch {
    // Audit logging must never block the actual operation.
  }
}

export const toolDefinitions = [
  {
    name: "read_text_file",
    description: "Read a local text file. Local trust mode allows reading across directories.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string" },
        head: { type: "number", description: "Only return the first N lines." },
        tail: { type: "number", description: "Only return the last N lines." },
      },
      required: ["path"],
    },
  },
  {
    name: "read_media_file",
    description: "Read an image/media file as MCP content. Images are returned as image blocks.",
    inputSchema: {
      type: "object",
      properties: { path: { type: "string" } },
      required: ["path"],
    },
  },
  {
    name: "read_multiple_files",
    description: "Read multiple local text files.",
    inputSchema: {
      type: "object",
      properties: { paths: { type: "array", items: { type: "string" } } },
      required: ["paths"],
    },
  },
  {
    name: "write_file",
    description: "Create or overwrite a file in an allowed directory or with one-time approval. Writes are audited.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string" },
        content: { type: "string" },
      },
      required: ["path", "content"],
    },
  },
  {
    name: "edit_file",
    description: "Apply text replacements in an allowed directory or with one-time approval. Edits are audited.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string" },
        edits: {
          type: "array",
          items: {
            type: "object",
            properties: {
              oldText: { type: "string" },
              newText: { type: "string" },
            },
            required: ["oldText", "newText"],
          },
        },
        oldText: { type: "string" },
        newText: { type: "string" },
        dryRun: { type: "boolean" },
      },
      required: ["path"],
    },
  },
  {
    name: "delete_file",
    description: "Delete one file in an allowed directory or with explicit approval. Directories are never removed. Deletions are audited.",
    inputSchema: {
      type: "object",
      properties: { path: { type: "string" } },
      required: ["path"],
    },
  },
  {
    name: "create_directory",
    description: "Create a directory within an allowed directory or with one-time approval. Changes are audited.",
    inputSchema: {
      type: "object",
      properties: { path: { type: "string" } },
      required: ["path"],
    },
  },
  {
    name: "list_directory",
    description: "List directory entries. Local trust mode allows browsing across directories.",
    inputSchema: {
      type: "object",
      properties: { path: { type: "string" } },
      required: ["path"],
    },
  },
  {
    name: "list_directory_with_sizes",
    description: "List directory entries with file sizes.",
    inputSchema: {
      type: "object",
      properties: { path: { type: "string" } },
      required: ["path"],
    },
  },
  {
    name: "directory_tree",
    description: "Return a JSON directory tree. Defaults to a bounded depth to avoid huge responses.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string" },
        maxDepth: { type: "number" },
      },
      required: ["path"],
    },
  },
  {
    name: "move_file",
    description: "Move or rename only when both paths are allowed or covered by one-time approval. Changes are audited.",
    inputSchema: {
      type: "object",
      properties: {
        source: { type: "string" },
        destination: { type: "string" },
      },
      required: ["source", "destination"],
    },
  },
  {
    name: "search_files",
    description: "Search for files by name under a directory.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string" },
        pattern: { type: "string" },
        excludePatterns: { type: "array", items: { type: "string" } },
      },
      required: ["path", "pattern"],
    },
  },
  {
    name: "get_file_info",
    description: "Return metadata for a local file or directory.",
    inputSchema: {
      type: "object",
      properties: { path: { type: "string" } },
      required: ["path"],
    },
  },
  {
    name: "search_content",
    description: "Search file contents under a directory. Supports regex or literal patterns and returns file:line matches. Skips node_modules/.git and binary files by default.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string" },
        pattern: { type: "string" },
        isRegex: { type: "boolean", description: "Treat pattern as a regular expression (default true)." },
        include: { type: "string", description: "Only search files whose name matches this wildcard, e.g. *.mjs." },
        excludePatterns: { type: "array", items: { type: "string" } },
        maxResults: { type: "number", description: "Cap on returned matches." },
      },
      required: ["path", "pattern"],
    },
  },
  {
    name: "compare_files",
    description: "Compare two local text files line by line and return a unified-style diff.",
    inputSchema: {
      type: "object",
      properties: {
        path_a: { type: "string" },
        path_b: { type: "string" },
      },
      required: ["path_a", "path_b"],
    },
  },
  {
    name: "apply_patch",
    description: "Apply a multi-file patch in one call. Each op is create (content), update (edits of oldText/newText pairs), or delete (file only). All ops are validated before anything is written. Writes are audited.",
    inputSchema: {
      type: "object",
      properties: {
        ops: {
          type: "array",
          items: {
            type: "object",
            properties: {
              action: { type: "string", enum: ["create", "update", "delete"] },
              path: { type: "string" },
              content: { type: "string", description: "Required for create." },
              edits: {
                type: "array",
                description: "Required for update.",
                items: {
                  type: "object",
                  properties: {
                    oldText: { type: "string" },
                    newText: { type: "string" },
                  },
                  required: ["oldText", "newText"],
                },
              },
            },
            required: ["action", "path"],
          },
        },
        dryRun: { type: "boolean" },
      },
      required: ["ops"],
    },
  },
  {
    name: "git_status",
    description: "Run a read-only git status in a repository directory and return branch plus working tree changes.",
    inputSchema: {
      type: "object",
      properties: { path: { type: "string" } },
      required: ["path"],
    },
  },
  {
    name: "git_diff",
    description: "Run a read-only git diff in a repository directory. Use staged=true for cached changes and file to limit to one path.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string" },
        staged: { type: "boolean" },
        file: { type: "string" },
      },
      required: ["path"],
    },
  },
  {
    name: "execute_command",
    description: "Run a shell command on the local machine. Commands matching the whitelist run directly; anything else requires one-time approval via the permission panel. High-risk patterns are always refused. Output and failures are returned as text.",
    inputSchema: {
      type: "object",
      properties: {
        command: { type: "string" },
        cwd: { type: "string" },
        timeoutMs: { type: "number" },
      },
      required: ["command"],
    },
  },
  {
    name: "git_commit",
    description: "Stage changes (all by default, or only the listed files) and create a git commit in the repository. Local commits run without approval.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string" },
        message: { type: "string" },
        files: { type: "array", items: { type: "string" } },
      },
      required: ["path", "message"],
    },
  },
  {
    name: "git_push",
    description: "Push commits to a remote repository. Always requires one-time approval via the permission panel.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string" },
        remote: { type: "string" },
        branch: { type: "string" },
      },
      required: ["path"],
    },
  },
  {
    name: "list_allowed_directories",
    description: "Show directories where mutating tools can run without one-time approval.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "ping",
    description: "Health check. Returns service status, time and tool count.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "todo_read",
    description: "Read the current todo list.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "todo_write",
    description: "Replace the todo list. Each item needs content; status is pending/in_progress/completed.",
    inputSchema: {
      type: "object",
      properties: {
        todos: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              content: { type: "string" },
              status: { type: "string" },
            },
            required: ["content"],
          },
        },
      },
      required: ["todos"],
    },
  },
  {
    name: "web_fetch",
    description: "Fetch a web page and return readable text. Origins not present in allowed-origins.json require one-time approval.",
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string" },
        maxLength: { type: "number" },
        raw: { type: "boolean" },
      },
      required: ["url"],
    },
  },
  {
    name: "manage_text_transfer",
    description: "Chunked large-file upload: action=begin(path, expectedBytes, expectedSha256) -> append(sessionId, chunkIndex, content) -> commit(sessionId). Permission-gated like write_file; writes are audited.",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string" },
        path: { type: "string" },
        expectedBytes: { type: "number" },
        expectedSha256: { type: "string" },
        sessionId: { type: "string" },
        chunkIndex: { type: "number" },
        content: { type: "string" },
      },
      required: ["action"],
    },
  },
  {
    name: "workspace_context",
    description: "Show current workspace context: repo root, allowed directories, runtime info.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "list_local_workspaces",
    description: "List known local workspaces (allowed directories plus registered dev projects).",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "inspect_development_environment",
    description: "Probe local dev toolchain versions (node/npm/python/java/git/adb). Read-only.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "node_development",
    description: "Node.js helpers. action=version (read-only); action=npm_run(script)/npm_install/npm_test run in cwd and require one-time approval.",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string" },
        cwd: { type: "string" },
        script: { type: "string" },
        timeoutMs: { type: "number" },
      },
      required: ["action"],
    },
  },
  {
    name: "python_development",
    description: "Python helpers. action=python_version (read-only); action=script_run(script, args?) / pytest_run(path?) require one-time approval.",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string" },
        cwd: { type: "string" },
        script: { type: "string" },
        args: { type: "array", items: { type: "string" } },
        path: { type: "string" },
        timeoutMs: { type: "number" },
      },
      required: ["action"],
    },
  },
  {
    name: "java_development",
    description: "Java/Gradle helpers. action=version (read-only); action=gradle_task(tasks?, cwd?) requires one-time approval.",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string" },
        cwd: { type: "string" },
        tasks: { type: "array", items: { type: "string" } },
        timeoutMs: { type: "number" },
      },
      required: ["action"],
    },
  },
  {
    name: "android_development",
    description: "ADB helpers. action=devices/logcat (read-only); action=install(apk, serial?) / shell(command, serial?) require one-time approval.",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string" },
        serial: { type: "string" },
        apk: { type: "string" },
        command: { type: "string" },
        lines: { type: "number" },
        timeoutMs: { type: "number" },
      },
      required: ["action"],
    },
  },
  {
    name: "git_workflow",
    description: "Combined git operations. action=status/log (read-only), add_files/commit (local, audited), push (always one-time approval).",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string" },
        path: { type: "string" },
        message: { type: "string" },
        files: { type: "array", items: { type: "string" } },
        remote: { type: "string" },
        branch: { type: "string" },
        limit: { type: "number" },
      },
      required: ["action", "path"],
    },
  },
  {
    name: "manage_development_project",
    description: "Manage the dev-project registry. action=list / add(name, path) / remove(name).",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string" },
        name: { type: "string" },
        path: { type: "string" },
      },
      required: ["action"],
    },
  },
  {
    name: "run_local_workflow",
    description: "Start a long-running local command as a tracked background task. Requires one-time approval.",
    inputSchema: {
      type: "object",
      properties: {
        command: { type: "string" },
        cwd: { type: "string" },
        name: { type: "string" },
      },
      required: ["command"],
    },
  },
  {
    name: "local_dev_server",
    description: "Manage local dev servers as background tasks. action=start(command, cwd?, name?) requires approval; action=stop(taskId)/status(taskId?)/list.",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string" },
        taskId: { type: "string" },
        command: { type: "string" },
        cwd: { type: "string" },
        name: { type: "string" },
      },
      required: ["action"],
    },
  },
  {
    name: "list_development_tasks",
    description: "List tracked background tasks with liveness status.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_development_task",
    description: "Show one tracked background task.",
    inputSchema: {
      type: "object",
      properties: { taskId: { type: "string" } },
      required: ["taskId"],
    },
  },
  {
    name: "read_development_task_logs",
    description: "Read the log output of a tracked background task (default last 200 lines).",
    inputSchema: {
      type: "object",
      properties: {
        taskId: { type: "string" },
        head: { type: "number" },
        tail: { type: "number" },
      },
      required: ["taskId"],
    },
  },
  {
    name: "cancel_development_task",
    description: "Stop a tracked background task (kills its process tree).",
    inputSchema: {
      type: "object",
      properties: { taskId: { type: "string" } },
      required: ["taskId"],
    },
  },
];

function textResult(text) {
  return { content: [{ type: "text", text: String(text) }] };
}

function errorTextResult(text) {
  return { isError: true, content: [{ type: "text", text: String(text) }] };
}

function normalizeForCompare(value) {
  const resolved = path.resolve(value);
  return process.platform === "win32" ? resolved.toLowerCase() : resolved;
}

function isInsideOrEqual(targetPath, directoryPath) {
  const target = normalizeForCompare(targetPath);
  let directory = normalizeForCompare(directoryPath);
  if (target === directory) {
    return true;
  }
  if (!directory.endsWith(path.sep)) {
    directory += path.sep;
  }
  return target.startsWith(directory);
}

function uniqueResolvedPaths(values) {
  const seen = new Set();
  const results = [];
  for (const value of values) {
    const resolved = path.resolve(value);
    const key = normalizeForCompare(resolved);
    if (!seen.has(key)) {
      seen.add(key);
      results.push(resolved);
    }
  }
  return results;
}

async function pathExists(value) {
  try {
    await fs.access(value);
    return true;
  } catch {
    return false;
  }
}

async function initializeAllowedDirectoriesFile({ repoRoot, configFile } = {}) {
  if (!repoRoot || !configFile) throw new Error("FILESYSTEM_TOOL_PATHS_REQUIRED");
  const configDir = path.dirname(configFile);
  await fs.mkdir(configDir, { recursive: true });

  if (!(await pathExists(configFile))) {
    const content = [
      "# One writable directory per line. Blank lines and lines starting with # are ignored.",
      "# Changes take effect immediately; no MCP bridge restart is required.",
      path.resolve(repoRoot),
      "",
    ].join("\n");
    await fs.writeFile(configFile, content, "utf8");
  }
}

export async function getAllowedDirectories({ repoRoot, configFile } = {}) {
  await initializeAllowedDirectoriesFile({ repoRoot, configFile });

  const candidates = [path.resolve(repoRoot)];
  const raw = await fs.readFile(configFile, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    candidates.push(path.resolve(expandEnvironmentVariables(trimmed)));
  }

  const existingDirectories = [];
  for (const candidate of uniqueResolvedPaths(candidates)) {
    try {
      const stat = await fs.stat(candidate);
      if (stat.isDirectory()) {
        existingDirectories.push(candidate);
      }
    } catch {
      // Ignore missing whitelist entries. The approval helper validates new entries.
    }
  }

  return existingDirectories;
}

function expandEnvironmentVariables(value) {
  return value.replace(/%([^%]+)%/g, (_, name) => process.env[name] || `%${name}%`);
}

export async function getWritablePermissionCheck(targetPath, allowedDirectories) {
  const resolved = await resolveMutationTarget(targetPath, allowedDirectories);
  if (resolved.error) return resolved.error;
  if (resolved.allowed) return { allowed: true, targetPath: resolved.path, directoriesToApprove: [] };

  const approvalDirectory = path.dirname(resolved.path);
  return {
    allowed: false,
    targetPath: resolved.path,
    directoriesToApprove: [approvalDirectory],
  };
}

async function resolveMutationTarget(targetPath, allowedDirectories) {
  const lexicalPath = path.resolve(targetPath);
  const lexicalAllowedRoot = allowedDirectories.find((directory) => isInsideOrEqual(lexicalPath, directory));
  const policyRoot = lexicalAllowedRoot || path.parse(lexicalPath).root;
  try {
    const identity = await resolvePathIdentity(lexicalPath, { workspaceRoot: policyRoot });
    assertMutationPathIdentity(identity);
    const physicalAllowedRoots = await Promise.all(allowedDirectories.map((directory) => fs.realpath(directory)));
    return {
      path: identity.physicalPath,
      allowed: physicalAllowedRoots.some((directory) => isInsideOrEqual(identity.physicalPath, directory)),
    };
  } catch (error) {
    if (error?.code !== "REPARSE_PATH_WRITE_DENIED") throw error;
    return {
      error: {
        allowed: false,
        code: error.code,
        targetPath: lexicalPath,
        resolvedPath: error.details?.resolvedPath || null,
        directoriesToApprove: [],
      },
    };
  }
}

async function getWritablePermissionForTargets(targets, allowedDirectories) {
  const deniedDirectories = [];
  const normalizedTargets = [];

  for (const target of targets) {
    const resolved = await resolveMutationTarget(target.path, allowedDirectories);
    if (resolved.error) return resolved.error;
    normalizedTargets.push(resolved.path);
    if (resolved.allowed) {
      continue;
    }

    const approvalBase = target.kind === "directory" ? resolved.path : path.dirname(resolved.path);
    deniedDirectories.push(approvalBase);
  }

  return {
    allowed: deniedDirectories.length === 0,
    targetPaths: normalizedTargets,
    directoriesToApprove: uniqueResolvedPaths(deniedDirectories),
  };
}

export function buildPermissionRequiredResult({ operation, targetPaths, directoriesToApprove }) {
  const directories = uniqueResolvedPaths(directoriesToApprove || []);

  const text = [
    "需要授权后才能执行本次本地文件修改操作。",
    "",
    `工具: ${operation}`,
    "目标路径:",
    ...targetPaths.map((targetPath) => `  - ${path.resolve(targetPath)}`),
    "",
    "建议授权目录:",
    ...directories.map((directory) => `  - ${directory}`),
    "",
    "请在网页授权面板中选择“仅本次”或“始终允许此目录”。",
    "选择“始终允许此目录”后会永久写入本机白名单，立即生效且无需重启服务。",
  ].join("\n");

  return errorTextResult(text);
}

export function buildPermissionMarker(request) {
  return [
    "WEB_AGENT_PERMISSION_REQUEST",
    JSON.stringify({
      version: 1,
      kind: "web_agent_permission_request",
      requestId: request.requestId,
      operation: request.operation,
      toolName: request.toolName || request.operation,
      targetPaths: request.targetPaths,
      directoriesToApprove: request.directoriesToApprove,
      suggestedApprovalRoot: request.suggestedApprovalRoot,
      argsHash: request.argsHash,
      expiresAt: request.expiresAt,
    }),
    "END_WEB_AGENT_PERMISSION_REQUEST",
  ].join("\n");
}

async function buildPermissionRequiredResultWithMarker({
  operation,
  targetPaths,
  directoriesToApprove,
  args,
  permissionStoreDir,
}) {
  const request = await createPermissionRequest({
    storeDir: permissionStoreDir,
    operation,
    targetPaths,
    directoriesToApprove,
    args,
  });
  const result = buildPermissionRequiredResult({ operation, targetPaths, directoriesToApprove });
  result.content[0].text = `${result.content[0].text}\n\n${buildPermissionMarker(request)}`;
  return result;
}

async function hasOneTimePermission({ operation, targetPaths, args, permissionStoreDir }) {
  const permission = args?._webAgentPermission || args?.__webAgentPermission;
  if (!permission || typeof permission !== "object") {
    return false;
  }
  const consumed = await consumePermissionToken({
    storeDir: permissionStoreDir,
    requestId: permission.requestId,
    token: permission.token,
    operation,
    targetPaths,
    argsHash: calculateArgsHash(args),
  });
  return consumed.allowed;
}

function requireString(args, key) {
  const value = args?.[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing required string argument: ${key}`);
  }
  return value;
}

const decodedWindowsPathEscapeReplacements = {
  "\x08": "\\b",
  "\x09": "\\t",
  "\x0a": "\\n",
  "\x0b": "\\v",
  "\x0c": "\\f",
  "\x0d": "\\r",
};

function repairDecodedWindowsPathEscapes(value) {
  return value.replace(/[\x08\x09\x0a\x0b\x0c\x0d]/g, (character) => decodedWindowsPathEscapeReplacements[character]);
}

function normalizeToolPathArgs(name, args) {
  if (!args || typeof args !== "object" || Array.isArray(args)) {
    return args;
  }

  const normalized = { ...args };
  const repairStringField = (key) => {
    if (typeof normalized[key] === "string") {
      normalized[key] = repairDecodedWindowsPathEscapes(normalized[key]);
    }
  };

  switch (name) {
    case "read_text_file":
    case "read_media_file":
    case "write_file":
    case "edit_file":
    case "delete_file":
    case "create_directory":
    case "list_directory":
    case "list_directory_with_sizes":
    case "directory_tree":
    case "search_files":
    case "search_content":
    case "git_status":
    case "git_diff":
    case "get_file_info":
      repairStringField("path");
      break;
    case "compare_files":
      repairStringField("path_a");
      repairStringField("path_b");
      break;
    case "execute_command":
      repairStringField("cwd");
      break;
    case "apply_patch":
      if (Array.isArray(normalized.ops)) {
        normalized.ops = normalized.ops.map((op) =>
          op && typeof op === "object" && typeof op.path === "string"
            ? { ...op, path: repairDecodedWindowsPathEscapes(op.path) }
            : op
        );
      }
      break;
    case "read_multiple_files":
      if (Array.isArray(normalized.paths)) {
        normalized.paths = normalized.paths.map((item) =>
          typeof item === "string" ? repairDecodedWindowsPathEscapes(item) : item
        );
      }
      break;
    case "manage_text_transfer":
      repairStringField("path");
      break;
    case "git_workflow":
      repairStringField("path");
      break;
    case "android_development":
      repairStringField("apk");
      break;
    case "python_development":
      repairStringField("script");
      repairStringField("path");
      break;
    case "manage_development_project":
      repairStringField("path");
      break;
    case "move_file":
      repairStringField("source");
      repairStringField("destination");
      break;
  }

  return normalized;
}

function getMutationTargets(name, args) {
  switch (name) {
    case "write_file":
    case "edit_file":
    case "delete_file":
      return [{ path: requireString(args, "path"), kind: "file" }];
    case "create_directory":
      return [{ path: requireString(args, "path"), kind: "directory" }];
    case "apply_patch": {
      if (!Array.isArray(args?.ops)) {
        return null;
      }
      return args.ops
        .filter((op) => op && typeof op.path === "string" && op.path.trim())
        .map((op) => ({ path: op.path, kind: "file" }));
    }
    case "move_file":
      return [
        { path: requireString(args, "source"), kind: "directory" },
        { path: requireString(args, "destination"), kind: "directory" },
      ];
    default:
      return null;
  }
}

async function authorizeMutation(name, args, allowedDirectories, options = {}) {
  const targets = getMutationTargets(name, args);
  if (!targets) {
    return null;
  }

  const permission = await getWritablePermissionForTargets(targets, allowedDirectories);
  if (permission.code === "REPARSE_PATH_WRITE_DENIED") {
    return errorTextResult([
      "REPARSE_PATH_WRITE_DENIED: 不允许通过符号链接或 junction 执行写入。",
      `请求路径: ${permission.targetPath}`,
      permission.resolvedPath ? `真实路径: ${permission.resolvedPath}` : null,
      "请改用真实路径重新发起操作；工作区外路径会进入一次性授权流程。",
    ].filter(Boolean).join("\n"));
  }
  if (permission.allowed) {
    return null;
  }

  const approved = await hasOneTimePermission({
    operation: name,
    targetPaths: permission.targetPaths,
    args,
    permissionStoreDir: options.permissionStoreDir,
  });
  if (approved) {
    return null;
  }

  return buildPermissionRequiredResultWithMarker({
    operation: name,
    targetPaths: permission.targetPaths,
    directoriesToApprove: permission.directoriesToApprove,
    args,
    permissionStoreDir: options.permissionStoreDir,
  });
}

function applyLineLimit(text, { head, tail } = {}) {
  const hasHead = Number.isFinite(head);
  const hasTail = Number.isFinite(tail);
  if (!hasHead && !hasTail) {
    return text;
  }
  if (hasHead && hasTail) {
    throw new Error("Use either head or tail, not both.");
  }

  const lines = text.split(/\r?\n/);
  if (hasHead) {
    return lines.slice(0, Math.max(0, Number(head))).join("\n");
  }
  return lines.slice(-Math.max(0, Number(tail))).join("\n");
}

async function ensureTextFileSize(filePath) {
  const stat = await fs.stat(filePath);
  if (!stat.isFile()) {
    throw new Error(`Path is not a file: ${filePath}`);
  }
  if (stat.size > maxTextReadBytes) {
    throw new Error(`Text file is too large (${stat.size} bytes). Limit is ${maxTextReadBytes} bytes.`);
  }
}

async function readTextFile(args) {
  const filePath = path.resolve(requireString(args, "path"));
  await ensureTextFileSize(filePath);
  const text = await fs.readFile(filePath, "utf8");
  return textResult(applyLineLimit(text, args));
}

async function readMultipleFiles(args) {
  if (!Array.isArray(args?.paths)) {
    throw new Error("Missing required array argument: paths");
  }

  const sections = [];
  for (const item of args.paths) {
    if (typeof item !== "string" || !item.trim()) {
      sections.push("Invalid path entry.");
      continue;
    }
    const filePath = path.resolve(item);
    try {
      await ensureTextFileSize(filePath);
      const text = await fs.readFile(filePath, "utf8");
      sections.push(`--- ${filePath} ---\n${text}`);
    } catch (error) {
      sections.push(`--- ${filePath} ---\nERROR: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return textResult(sections.join("\n\n"));
}

async function readMediaFile(args) {
  const filePath = path.resolve(requireString(args, "path"));
  const stat = await fs.stat(filePath);
  if (!stat.isFile()) {
    throw new Error(`Path is not a file: ${filePath}`);
  }
  if (stat.size > maxMediaReadBytes) {
    throw new Error(`Media file is too large (${stat.size} bytes). Limit is ${maxMediaReadBytes} bytes.`);
  }

  const data = await fs.readFile(filePath);
  const mimeType = mimeTypes.get(path.extname(filePath).toLowerCase()) || "application/octet-stream";
  const base64 = data.toString("base64");
  if (mimeType.startsWith("image/")) {
    return { content: [{ type: "image", data: base64, mimeType }] };
  }
  return textResult(JSON.stringify({ path: filePath, mimeType, data: base64 }, null, 2));
}

async function writeFile(args, allowedDirectories, options = {}) {
  const filePath = requireString(args, "path");
  const content = typeof args?.content === "string" ? args.content : String(args?.content ?? "");
  const resolved = path.resolve(filePath);
  await fs.mkdir(path.dirname(resolved), { recursive: true });
  await appendWriteAudit(options.auditFile, {
    operation: "write_file",
    path: resolved,
    size: Buffer.byteLength(content, "utf8"),
  });
  await fs.writeFile(resolved, content, "utf8");
  return textResult(`Successfully wrote ${Buffer.byteLength(content, "utf8")} bytes to ${resolved}`);
}

function normalizeEdits(args) {
  if (Array.isArray(args?.edits)) {
    return args.edits.map((edit, index) => {
      if (typeof edit?.oldText !== "string" || typeof edit?.newText !== "string") {
        throw new Error(`Invalid edit at index ${index}. Each edit needs oldText and newText.`);
      }
      return { oldText: edit.oldText, newText: edit.newText };
    });
  }

  if (typeof args?.oldText === "string" && typeof args?.newText === "string") {
    return [{ oldText: args.oldText, newText: args.newText }];
  }

  throw new Error("edit_file requires edits array or oldText/newText.");
}

async function editFile(args, allowedDirectories, options = {}) {
  const filePath = requireString(args, "path");
  const resolved = path.resolve(filePath);
  await ensureTextFileSize(resolved);
  const edits = normalizeEdits(args);
  const original = await fs.readFile(resolved, "utf8");
  let updated = original;
  let applied = 0;

  for (const edit of edits) {
    if (!updated.includes(edit.oldText)) {
      throw new Error(`Could not find oldText for edit ${applied + 1}.`);
    }
    updated = updated.replace(edit.oldText, edit.newText);
    applied += 1;
  }

  if (args?.dryRun) {
    return textResult(`Dry run: would apply ${applied} edit(s) to ${resolved}.`);
  }

  await appendWriteAudit(options.auditFile, { operation: "edit_file", path: resolved, editCount: applied });
  await fs.writeFile(resolved, updated, "utf8");
  return textResult(`Successfully applied ${applied} edit(s) to ${resolved}.`);
}

async function deleteFile(args, allowedDirectories, options = {}) {
  const filePath = requireString(args, "path");
  const resolved = path.resolve(filePath);
  const stat = await fs.stat(resolved);
  if (!stat.isFile()) {
    throw new Error(`Path is not a file; directories cannot be deleted: ${resolved}`);
  }
  await appendWriteAudit(options.auditFile, { operation: "delete_file", path: resolved, size: stat.size });
  await fs.unlink(resolved);
  return textResult(`Successfully deleted file ${resolved}`);
}

async function createDirectory(args, allowedDirectories, options = {}) {
  const directoryPath = requireString(args, "path");
  const resolved = path.resolve(directoryPath);
  await appendWriteAudit(options.auditFile, { operation: "create_directory", path: resolved });
  await fs.mkdir(resolved, { recursive: true });
  return textResult(`Successfully created directory ${resolved}`);
}

async function listDirectory(args) {
  const directoryPath = path.resolve(requireString(args, "path"));
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  entries.sort((a, b) => {
    if (a.isDirectory() !== b.isDirectory()) {
      return a.isDirectory() ? -1 : 1;
    }
    return a.name.localeCompare(b.name, "zh-Hans-CN");
  });
  return textResult(
    entries
      .map((entry) => `${entry.isDirectory() ? "[DIR]" : "[FILE]"} ${entry.name}`)
      .join("\n")
  );
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let index = 0;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  return `${value.toFixed(value >= 10 ? 1 : 2)} ${units[index]}`;
}

async function listDirectoryWithSizes(args) {
  const directoryPath = path.resolve(requireString(args, "path"));
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  entries.sort((a, b) => a.name.localeCompare(b.name, "zh-Hans-CN"));

  const lines = [];
  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);
    const stat = await fs.stat(fullPath);
    lines.push(
      `${entry.isDirectory() ? "[DIR]" : "[FILE]"} ${entry.name}  ${entry.isDirectory() ? "-" : formatBytes(stat.size)}`
    );
  }
  return textResult(lines.join("\n"));
}

async function directoryTree(args) {
  const root = path.resolve(requireString(args, "path"));
  const maxDepth = Number.isFinite(args?.maxDepth) ? Math.max(0, Number(args.maxDepth)) : 5;
  let visited = 0;

  async function walk(currentPath, depth) {
    visited += 1;
    const stat = await fs.stat(currentPath);
    const node = {
      name: path.basename(currentPath) || currentPath,
      path: currentPath,
      type: stat.isDirectory() ? "directory" : "file",
    };

    if (!stat.isDirectory() || depth >= maxDepth || visited >= maxTreeEntries) {
      return node;
    }

    const entries = await fs.readdir(currentPath, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name, "zh-Hans-CN"));
    node.children = [];
    for (const entry of entries) {
      if (visited >= maxTreeEntries) {
        node.truncated = true;
        break;
      }
      node.children.push(await walk(path.join(currentPath, entry.name), depth + 1));
    }
    return node;
  }

  return textResult(JSON.stringify(await walk(root, 0), null, 2));
}

async function moveFile(args, allowedDirectories, options = {}) {
  const source = requireString(args, "source");
  const destination = requireString(args, "destination");
  const resolvedSource = path.resolve(source);
  const resolvedDestination = path.resolve(destination);
  await appendWriteAudit(options.auditFile, {
    operation: "move_file",
    source: resolvedSource,
    destination: resolvedDestination,
  });
  await fs.mkdir(path.dirname(resolvedDestination), { recursive: true });
  await fs.rename(resolvedSource, resolvedDestination);
  return textResult(`Successfully moved ${resolvedSource} to ${resolvedDestination}`);
}

function wildcardToRegExp(pattern) {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".");
  return new RegExp(`^${escaped}$`, "i");
}

function matchesPattern(filePath, root, pattern) {
  const relative = path.relative(root, filePath);
  if (pattern.includes("*") || pattern.includes("?")) {
    return wildcardToRegExp(pattern).test(path.basename(filePath)) || wildcardToRegExp(pattern).test(relative);
  }
  const needle = pattern.toLowerCase();
  return path.basename(filePath).toLowerCase().includes(needle) || relative.toLowerCase().includes(needle);
}

function isExcluded(filePath, root, excludePatterns) {
  const relative = path.relative(root, filePath);
  return excludePatterns.some((pattern) => wildcardToRegExp(pattern).test(relative));
}

async function searchFiles(args) {
  const root = path.resolve(requireString(args, "path"));
  const pattern = requireString(args, "pattern");
  const excludePatterns = Array.isArray(args?.excludePatterns) ? args.excludePatterns.filter(Boolean).map(String) : [];
  const results = [];

  async function walk(currentPath) {
    if (results.length >= maxSearchResults) {
      return;
    }
    const entries = await fs.readdir(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      if (results.length >= maxSearchResults) {
        return;
      }
      const fullPath = path.join(currentPath, entry.name);
      if (isExcluded(fullPath, root, excludePatterns)) {
        continue;
      }
      if (matchesPattern(fullPath, root, pattern)) {
        results.push(fullPath);
      }
      if (entry.isDirectory()) {
        await walk(fullPath);
      }
    }
  }

  await walk(root);
  return textResult(results.length ? results.join("\n") : "No matches found.");
}

const defaultContentSearchExcludes = Object.freeze(["node_modules", ".git", ".hg", ".svn"]);
const maxContentSearchLineLength = 400;

function compileContentSearchRegex(pattern) {
  try {
    return new RegExp(pattern, "i");
  } catch (error) {
    throw new Error(`Invalid regex pattern: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function searchContent(args) {
  const root = path.resolve(requireString(args, "path"));
  const pattern = requireString(args, "pattern");
  const isRegex = args?.isRegex !== false;
  const regex = isRegex ? compileContentSearchRegex(pattern) : null;
  const needle = isRegex ? null : pattern.toLowerCase();
  const include = typeof args?.include === "string" && args.include.trim() ? args.include.trim() : null;
  const excludePatterns = [
    ...(Array.isArray(args?.excludePatterns) ? args.excludePatterns.filter(Boolean).map(String) : []),
    ...defaultContentSearchExcludes,
  ];
  const limit = Number.isFinite(args?.maxResults)
    ? Math.max(1, Math.min(Number(args.maxResults), maxSearchResults))
    : maxSearchResults;
  const matches = [];
  const rootStat = await fs.stat(root);
  if (!rootStat.isDirectory()) {
    throw new Error(`Path is not a directory: ${root}`);
  }

  async function scanFile(filePath) {
    const stat = await fs.stat(filePath);
    if (!stat.isFile() || stat.size > maxTextReadBytes) {
      return;
    }
    const text = await fs.readFile(filePath, "utf8");
    if (text.includes("\u0000")) {
      return;
    }
    const lines = text.split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const matched = regex
        ? regex.test(line)
        : line.toLowerCase().includes(needle);
      if (!matched) {
        continue;
      }
      const trimmed = line.length > maxContentSearchLineLength
        ? `${line.slice(0, maxContentSearchLineLength)}...`
        : line;
      matches.push(`${filePath}:${index + 1}: ${trimmed}`);
      if (matches.length >= limit) {
        return;
      }
    }
  }

  async function walk(currentPath) {
    if (matches.length >= limit) {
      return;
    }
    const entries = await fs.readdir(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      if (matches.length >= limit) {
        return;
      }
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        if (isExcluded(fullPath, root, excludePatterns)) {
          continue;
        }
        await walk(fullPath);
        continue;
      }
      if (include && !wildcardToRegExp(include).test(entry.name)) {
        continue;
      }
      if (isExcluded(fullPath, root, excludePatterns)) {
        continue;
      }
      await scanFile(fullPath);
    }
  }

  await walk(root);
  if (!matches.length) {
    return textResult("No matches found.");
  }
  const suffix = matches.length >= limit ? ` (result limit ${limit} reached)` : "";
  return textResult([`Found ${matches.length} match(es)${suffix}:`, ...matches].join("\n"));
}

const maxDiffLinesForLcs = 3000;
const maxDiffOutputLines = 400;

function buildLcsEditScript(linesA, linesB) {
  const rows = linesA.length;
  const cols = linesB.length;
  const width = cols + 1;
  const table = new Int32Array((rows + 1) * width);
  for (let i = rows - 1; i >= 0; i -= 1) {
    for (let j = cols - 1; j >= 0; j -= 1) {
      table[i * width + j] = linesA[i] === linesB[j]
        ? table[(i + 1) * width + j + 1] + 1
        : Math.max(table[(i + 1) * width + j], table[i * width + j + 1]);
    }
  }
  const script = [];
  let i = 0;
  let j = 0;
  while (i < rows && j < cols) {
    if (linesA[i] === linesB[j]) {
      script.push({ type: "equal", line: linesA[i] });
      i += 1;
      j += 1;
    } else if (table[(i + 1) * width + j] >= table[i * width + j + 1]) {
      script.push({ type: "remove", line: linesA[i] });
      i += 1;
    } else {
      script.push({ type: "add", line: linesB[j] });
      j += 1;
    }
  }
  while (i < rows) {
    script.push({ type: "remove", line: linesA[i] });
    i += 1;
  }
  while (j < cols) {
    script.push({ type: "add", line: linesB[j] });
    j += 1;
  }
  return script;
}

function buildNaiveEditScript(linesA, linesB) {
  const script = [];
  const shared = Math.min(linesA.length, linesB.length);
  for (let index = 0; index < shared; index += 1) {
    if (linesA[index] === linesB[index]) {
      script.push({ type: "equal", line: linesA[index] });
    } else {
      script.push({ type: "remove", line: linesA[index] });
      script.push({ type: "add", line: linesB[index] });
    }
  }
  for (let index = shared; index < linesA.length; index += 1) {
    script.push({ type: "remove", line: linesA[index] });
  }
  for (let index = shared; index < linesB.length; index += 1) {
    script.push({ type: "add", line: linesB[index] });
  }
  return script;
}

function formatDiffScript(script) {
  const lines = [];
  let lineA = 1;
  let lineB = 1;
  let added = 0;
  let removed = 0;
  for (const entry of script) {
    if (entry.type === "equal") {
      lines.push(`  ${entry.line}`);
      lineA += 1;
      lineB += 1;
    } else if (entry.type === "remove") {
      lines.push(`- ${entry.line}`);
      lineA += 1;
      removed += 1;
    } else {
      lines.push(`+ ${entry.line}`);
      lineB += 1;
      added += 1;
    }
  }
  return { lines, added, removed };
}

async function compareFiles(args) {
  const pathA = path.resolve(requireString(args, "path_a"));
  const pathB = path.resolve(requireString(args, "path_b"));
  await ensureTextFileSize(pathA);
  await ensureTextFileSize(pathB);
  const [textA, textB] = await Promise.all([
    fs.readFile(pathA, "utf8"),
    fs.readFile(pathB, "utf8"),
  ]);
  if (textA === textB) {
    return textResult("Files are identical.");
  }
  const linesA = textA.split(/\r?\n/);
  const linesB = textB.split(/\r?\n/);
  const script = linesA.length <= maxDiffLinesForLcs && linesB.length <= maxDiffLinesForLcs
    ? buildLcsEditScript(linesA, linesB)
    : buildNaiveEditScript(linesA, linesB);
  const { lines, added, removed } = formatDiffScript(script);
  const truncated = lines.length > maxDiffOutputLines;
  const shown = truncated ? lines.slice(0, maxDiffOutputLines) : lines;
  const summary = [
    `A: ${pathA} (${linesA.length} lines)`,
    `B: ${pathB} (${linesB.length} lines)`,
    `+${added} added / -${removed} removed`,
  ].join("\n");
  const note = truncated ? `\n(diff truncated to first ${maxDiffOutputLines} lines)` : "";
  return textResult([summary, "", ...shown, note].filter((value) => value !== undefined).join("\n"));
}

function normalizePatchOps(args) {
  if (!Array.isArray(args?.ops) || !args.ops.length) {
    throw new Error("apply_patch requires a non-empty ops array.");
  }
  const seen = new Set();
  return args.ops.map((op, index) => {
    if (!op || typeof op !== "object" || Array.isArray(op)) {
      throw new Error(`Invalid op at index ${index}.`);
    }
    const action = op.action;
    if (!["create", "update", "delete"].includes(action)) {
      throw new Error(`Invalid action at index ${index}: ${String(action)}`);
    }
    const opPath = typeof op.path === "string" && op.path.trim() ? op.path : null;
    if (!opPath) {
      throw new Error(`Missing path at op index ${index}.`);
    }
    const key = normalizeForCompare(path.resolve(opPath));
    if (seen.has(key)) {
      throw new Error(`Duplicate op path: ${opPath}`);
    }
    seen.add(key);
    const normalized = { action, path: opPath };
    if (action === "create") {
      if (typeof op.content !== "string") {
        throw new Error(`create op at index ${index} requires content.`);
      }
      normalized.content = op.content;
    }
    if (action === "update") {
      if (!Array.isArray(op.edits) || !op.edits.length) {
        throw new Error(`update op at index ${index} requires a non-empty edits array.`);
      }
      normalized.edits = op.edits.map((edit, editIndex) => {
        if (typeof edit?.oldText !== "string" || typeof edit?.newText !== "string") {
          throw new Error(`Invalid edit ${editIndex} at op ${index}. Each edit needs oldText and newText.`);
        }
        return { oldText: edit.oldText, newText: edit.newText };
      });
    }
    return normalized;
  });
}

async function applyPatch(args, allowedDirectories, options = {}) {
  const ops = normalizePatchOps(args);
  const resolvedOps = ops.map((op) => ({ ...op, resolvedPath: path.resolve(op.path) }));

  // Pre-validate every op against the current disk state before writing anything.
  const prepared = [];
  for (const op of resolvedOps) {
    if (op.action === "create") {
      if (await pathExists(op.resolvedPath)) {
        throw new Error(`create target already exists: ${op.resolvedPath}`);
      }
      prepared.push(op);
      continue;
    }
    const stat = await fs.stat(op.resolvedPath);
    if (!stat.isFile()) {
      throw new Error(`op target is not a file: ${op.resolvedPath}`);
    }
    if (stat.size > maxTextReadBytes) {
      throw new Error(`op target is too large (${stat.size} bytes): ${op.resolvedPath}`);
    }
    if (op.action === "update") {
      const original = await fs.readFile(op.resolvedPath, "utf8");
      let updated = original;
      for (const edit of op.edits) {
        if (!updated.includes(edit.oldText)) {
          throw new Error(`Could not find oldText in ${op.resolvedPath}: ${edit.oldText.slice(0, 80)}`);
        }
        updated = updated.replace(edit.oldText, edit.newText);
      }
      prepared.push({ ...op, updated });
      continue;
    }
    prepared.push(op);
  }

  if (args?.dryRun) {
    return textResult(`Dry run: would apply ${prepared.length} op(s) to ${new Set(prepared.map((op) => op.resolvedPath)).size} file(s).`);
  }

  const applied = [];
  for (const op of prepared) {
    if (op.action === "create") {
      await appendWriteAudit(options.auditFile, {
        operation: "apply_patch",
        action: "create",
        path: op.resolvedPath,
        size: Buffer.byteLength(op.content, "utf8"),
      });
      await fs.mkdir(path.dirname(op.resolvedPath), { recursive: true });
      await fs.writeFile(op.resolvedPath, op.content, "utf8");
      applied.push(`created ${op.resolvedPath}`);
    } else if (op.action === "update") {
      await appendWriteAudit(options.auditFile, {
        operation: "apply_patch",
        action: "update",
        path: op.resolvedPath,
        editCount: op.edits.length,
      });
      await fs.writeFile(op.resolvedPath, op.updated, "utf8");
      applied.push(`updated ${op.resolvedPath} (${op.edits.length} edit(s))`);
    } else {
      await appendWriteAudit(options.auditFile, {
        operation: "apply_patch",
        action: "delete",
        path: op.resolvedPath,
      });
      await fs.unlink(op.resolvedPath);
      applied.push(`deleted ${op.resolvedPath}`);
    }
  }
  return textResult([`Successfully applied ${applied.length} op(s):`, ...applied].join("\n"));
}

async function runGit(gitArgs, cwd, { includeStderr = false, timeout = 30000 } = {}) {
  try {
    const { stdout, stderr } = await execFileAsync("git", gitArgs, {
      cwd,
      timeout,
      maxBuffer: maxGitOutputBytes,
      windowsHide: true,
      env: { ...process.env, GIT_PAGER: "cat", PAGER: "cat", TERM: "dumb" },
    });
    if (!includeStderr) return stdout;
    return [stdout, stderr].filter((part) => part && part.trim()).join("\n");
  } catch (error) {
    const detail = error?.stderr?.trim() || error?.stdout?.trim() || error?.message || String(error);
    throw new Error(`git ${gitArgs.join(" ")} failed: ${detail}`);
  }
}

async function gitStatus(args) {
  const repoPath = path.resolve(requireString(args, "path"));
  const output = await runGit(["--no-pager", "status", "--porcelain=v1", "-b"], repoPath);
  const lines = output.split(/\r?\n/).filter((line) => line.trim());
  const branch = lines.find((line) => line.startsWith("##")) || "";
  const changes = lines.filter((line) => !line.startsWith("##"));
  if (!branch && changes.length === 0) {
    return textResult("No changes (working tree clean).");
  }
  const parts = [branch, changes.length === 0 ? "No changes (working tree clean)." : changes.join("\n")];
  return textResult(parts.filter(Boolean).join("\n"));
}

async function gitDiff(args) {
  const repoPath = path.resolve(requireString(args, "path"));
  const gitArgs = ["--no-pager", "diff"];
  if (args?.staged === true) {
    gitArgs.push("--cached");
  }
  gitArgs.push("--");
  if (typeof args?.file === "string" && args.file.trim()) {
    gitArgs.push(args.file.trim());
  }
  let output;
  try {
    output = await runGit(gitArgs, repoPath);
  } catch (error) {
    const statArgs = ["--no-pager", "diff", "--stat"];
    if (args?.staged === true) {
      statArgs.push("--cached");
    }
    statArgs.push("--");
    if (typeof args?.file === "string" && args.file.trim()) {
      statArgs.push(args.file.trim());
    }
    const stat = await runGit(statArgs, repoPath).catch(() => "");
    return textResult(
      [
        `Full patch unavailable on this machine (${error.message}). Falling back to diff --stat:`,
        stat.trim() || "No differences.",
      ].join("\n")
    );
  }
  return textResult(output.trim() || "No differences.");
}

async function loadCommandWhitelist(configFile) {
  const whitelistFile = path.join(path.dirname(configFile), "command-whitelist.json");
  try {
    const raw = await fs.readFile(whitelistFile, "utf8");
    const parsed = JSON.parse(raw);
    const entries = Array.isArray(parsed) ? parsed : parsed?.commands;
    if (Array.isArray(entries)) {
      const cleaned = entries
        .filter((entry) => typeof entry === "string" && entry.trim())
        .map((entry) => entry.trim().toLowerCase().replace(/\s+/g, " "));
      if (cleaned.length) return cleaned;
    }
  } catch {
    // fall through to defaults
  }
  try {
    await fs.mkdir(path.dirname(whitelistFile), { recursive: true });
    await fs.writeFile(
      whitelistFile,
      JSON.stringify({ commands: DEFAULT_COMMAND_WHITELIST }, null, 2) + "\n",
      "utf8"
    );
  } catch {
    // best-effort seeding only
  }
  return DEFAULT_COMMAND_WHITELIST;
}

function isCommandWhitelisted(command, entries) {
  const normalized = command.trim().toLowerCase().replace(/\s+/g, " ");
  return entries.some((entry) => normalized === entry || normalized.startsWith(`${entry} `));
}

async function authorizeSpecial(name, args, targetPaths, options = {}) {
  const approved = await hasOneTimePermission({
    operation: name,
    targetPaths,
    args,
    permissionStoreDir: options.permissionStoreDir,
  });
  if (approved) return null;
  return buildPermissionRequiredResultWithMarker({
    operation: name,
    targetPaths,
    directoriesToApprove: [],
    args,
    permissionStoreDir: options.permissionStoreDir,
  });
}

async function executeCommand(args, context, options = {}) {
  const command = requireString(args, "command").trim();
  if (!command) {
    throw new Error("Missing required string argument: command");
  }
  const cwd = args?.cwd && String(args.cwd).trim() ? path.resolve(String(args.cwd)) : context.repoRoot;
  const timeoutMs = Math.min(Math.max(Number(args?.timeoutMs) || 60000, 1000), 300000);
  for (const rule of DENIED_COMMAND_RULES) {
    if (rule.pattern.test(command)) {
      throw new Error(`命令被拒绝：${rule.reason}`);
    }
  }
  const whitelist = await loadCommandWhitelist(context.configFile);
  if (!isCommandWhitelisted(command, whitelist)) {
    const denied = await authorizeSpecial("execute_command", { ...args, command }, [cwd], options);
    if (denied) return denied;
  }
  const isWindows = process.platform === "win32";
  const shell = isWindows ? process.env.ComSpec || "cmd.exe" : "/bin/sh";
  const shellArgs = isWindows ? ["/d", "/s", "/c", command] : ["-c", command];
  let stdout = "";
  let stderr = "";
  let timedOut = false;
  let failed = null;
  try {
    const result = await execFileAsync(shell, shellArgs, {
      cwd,
      timeout: timeoutMs,
      maxBuffer: maxCommandOutputBytes,
      windowsHide: true,
    });
    stdout = result.stdout || "";
    stderr = result.stderr || "";
  } catch (error) {
    stdout = error?.stdout || "";
    stderr = error?.stderr || "";
    timedOut = Boolean(error?.killed);
    failed = error;
  }
  await appendWriteAudit(options.auditFile, {
    operation: "execute_command",
    command,
    cwd,
    exit: failed ? failed.code ?? "error" : 0,
  });
  const sections = [];
  if (stdout.trim()) sections.push(stdout.trimEnd());
  if (stderr.trim()) sections.push(`[stderr]\n${stderr.trimEnd()}`);
  if (timedOut) {
    sections.push(`[命令超时：超过 ${timeoutMs}ms 被终止]`);
  } else if (failed) {
    sections.push(`[命令失败：exit ${failed.code ?? failed.message}]`);
  }
  return textResult(sections.join("\n") || "(no output)");
}

async function gitCommit(args, options = {}) {
  const repoPath = path.resolve(requireString(args, "path"));
  const message = requireString(args, "message");
  const files = Array.isArray(args?.files)
    ? args.files.filter((file) => typeof file === "string" && file.trim()).map((file) => file.trim())
    : [];
  const addArgs = files.length ? ["add", "--", ...files] : ["add", "-A"];
  await runGit(addArgs, repoPath);
  let output;
  try {
    output = await runGit(["--no-pager", "commit", "-m", message], repoPath, { includeStderr: true });
  } catch (error) {
    if (/nothing to commit|no changes added/i.test(error.message)) {
      return textResult("Nothing to commit (working tree clean).");
    }
    throw error;
  }
  const hash = (await runGit(["rev-parse", "--short", "HEAD"], repoPath)).trim();
  await appendWriteAudit(options.auditFile, { operation: "git_commit", path: repoPath, hash, message });
  return textResult([`Committed ${hash}`, output.trim()].filter(Boolean).join("\n"));
}

async function gitPush(args, options = {}) {
  const repoPath = path.resolve(requireString(args, "path"));
  const denied = await authorizeSpecial("git_push", args, [repoPath], options);
  if (denied) return denied;
  const pushArgs = ["--no-pager", "push"];
  if (typeof args?.remote === "string" && args.remote.trim()) pushArgs.push(args.remote.trim());
  if (typeof args?.branch === "string" && args.branch.trim()) pushArgs.push(args.branch.trim());
  const output = await runGit(pushArgs, repoPath, { includeStderr: true, timeout: 120000 });
  await appendWriteAudit(options.auditFile, {
    operation: "git_push",
    path: repoPath,
    remote: typeof args?.remote === "string" ? args.remote : null,
    branch: typeof args?.branch === "string" ? args.branch : null,
  });
  return textResult(output.trim() || "Push completed.");
}

async function getFileInfo(args) {
  const targetPath = path.resolve(requireString(args, "path"));
  const stat = await fs.stat(targetPath);
  return textResult(
    JSON.stringify(
      {
        path: targetPath,
        type: stat.isDirectory() ? "directory" : "file",
        size: stat.size,
        sizeHuman: stat.isDirectory() ? "-" : formatBytes(stat.size),
        created: stat.birthtime.toISOString(),
        modified: stat.mtime.toISOString(),
        accessed: stat.atime.toISOString(),
        readonly: (stat.mode & 0o200) === 0,
      },
      null,
      2
    )
  );
}

function listAllowedDirectoriesResult(allowedDirectories) {
  return textResult(
    [
      "Mutating filesystem tools are permission-gated.",
      "Allowed directories can be changed without restarting the service.",
      "Other targets require a matching one-time permission token.",
      "Write operations are recorded in the configured product audit file.",
      "",
      "Allowed directories:",
      ...allowedDirectories.map((directory) => `  - ${directory}`),
    ].join("\n")
  );
}

const maxTransferChunkBytes = 49152;
const maxTransferTotalBytes = 50 * 1024 * 1024;
const maxFetchBytes = 1024 * 1024;

function configDirOf(context) {
  return path.dirname(context.configFile);
}

async function readJsonStore(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

async function writeJsonStore(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(value, null, 2) + "\n", "utf8");
}

async function runShellCaptured(command, cwd, timeoutMs) {
  const isWindows = process.platform === "win32";
  const shell = isWindows ? process.env.ComSpec || "cmd.exe" : "/bin/sh";
  const shellArgs = isWindows ? ["/d", "/s", "/c", command] : ["-c", command];
  let stdout = "";
  let stderr = "";
  let timedOut = false;
  let failed = null;
  try {
    const result = await execFileAsync(shell, shellArgs, {
      cwd,
      timeout: timeoutMs,
      maxBuffer: maxCommandOutputBytes,
      windowsHide: true,
    });
    stdout = result.stdout || "";
    stderr = result.stderr || "";
  } catch (error) {
    stdout = error?.stdout || "";
    stderr = error?.stderr || "";
    timedOut = Boolean(error?.killed);
    failed = error;
  }
  return { stdout, stderr, timedOut, failed };
}

function formatCapturedResult({ stdout, stderr, timedOut, failed }, timeoutMs) {
  const sections = [];
  if (stdout.trim()) sections.push(stdout.trimEnd());
  if (stderr.trim()) sections.push(`[stderr]\n${stderr.trimEnd()}`);
  if (timedOut) {
    sections.push(`[命令超时：超过 ${timeoutMs}ms 被终止]`);
  } else if (failed) {
    sections.push(`[命令失败：exit ${failed.code ?? failed.message}]`);
  }
  return textResult(sections.join("\n") || "(no output)");
}

async function runProcessCaptured(file, args, { cwd, timeoutMs = 10000 } = {}) {
  let stdout = "";
  let stderr = "";
  let failed = null;
  try {
    const result = await execFileAsync(file, args, {
      cwd,
      timeout: timeoutMs,
      maxBuffer: 512 * 1024,
      windowsHide: true,
    });
    stdout = result.stdout || "";
    stderr = result.stderr || "";
  } catch (error) {
    stdout = error?.stdout || "";
    stderr = error?.stderr || "";
    failed = error;
  }
  return { stdout, stderr, failed };
}

function clampTimeout(value, fallback = 60000) {
  return Math.min(Math.max(Number(value) || fallback, 1000), 300000);
}

function pingResult(context) {
  return textResult(
    JSON.stringify(
      {
        ok: true,
        service: "web-agents-local-core",
        time: new Date().toISOString(),
        uptimeSec: Math.round(process.uptime()),
        toolCount: toolDefinitions.length,
        platform: process.platform,
        repoRoot: context.repoRoot,
      },
      null,
      2
    )
  );
}

function todoStoreFile(context) {
  return path.join(configDirOf(context), "todo-store.json");
}

async function todoRead(context) {
  const store = await readJsonStore(todoStoreFile(context), { todos: [] });
  const todos = Array.isArray(store?.todos) ? store.todos : [];
  if (!todos.length) {
    return textResult("(todo 列表为空)");
  }
  return textResult(JSON.stringify({ todos }, null, 2));
}

async function todoWrite(args, context, options = {}) {
  if (!Array.isArray(args?.todos)) {
    throw new Error("Missing required array argument: todos");
  }
  const todos = args.todos.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`todos[${index}] 必须是对象`);
    }
    const content = typeof item.content === "string" ? item.content.trim() : "";
    if (!content) {
      throw new Error(`todos[${index}].content 不能为空`);
    }
    const status = item.status || "pending";
    if (!["pending", "in_progress", "completed"].includes(status)) {
      throw new Error(`todos[${index}].status 必须是 pending/in_progress/completed`);
    }
    return {
      id: typeof item.id === "string" && item.id.trim() ? item.id.trim() : `todo-${index + 1}`,
      content,
      status,
    };
  });
  await writeJsonStore(todoStoreFile(context), { todos });
  await appendWriteAudit(options.auditFile, { operation: "todo_write", count: todos.length });
  return textResult(`已保存 ${todos.length} 条 todo。`);
}

async function loadAllowedOrigins(configFile) {
  const file = path.join(path.dirname(configFile), "allowed-origins.json");
  const store = await readJsonStore(file, null);
  if (store === null) {
    await writeJsonStore(file, { origins: [] });
    return [];
  }
  const origins = Array.isArray(store) ? store : Array.isArray(store?.origins) ? store.origins : [];
  return origins.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim().toLowerCase());
}

async function webFetch(args, context, options = {}) {
  const url = requireString(args, "url");
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(`不支持的协议：${parsed.protocol}`);
  }
  const origin = parsed.origin.toLowerCase();
  const allowedOrigins = await loadAllowedOrigins(context.configFile);
  if (!allowedOrigins.includes(origin)) {
    const denied = await authorizeSpecial("web_fetch", { ...args, url }, [origin], options);
    if (denied) return denied;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  let response;
  try {
    response = await fetch(parsed.toString(), {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "web-agent-local-core/1.0" },
    });
  } catch (error) {
    return errorTextResult(`web_fetch 失败：${error.message}`);
  } finally {
    clearTimeout(timer);
  }
  const contentType = response.headers.get("content-type") || "";
  const buffer = Buffer.from(await response.arrayBuffer());
  const truncated = buffer.length > maxFetchBytes;
  const rawText = (truncated ? buffer.subarray(0, maxFetchBytes) : buffer).toString("utf8");
  let body = rawText;
  if (String(args?.raw) !== "true" && /html/i.test(contentType)) {
    body = rawText
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/[ \t]+/g, " ")
      .replace(/\n\s*\n+/g, "\n")
      .trim();
  }
  const maxLength = Math.min(Math.max(Number(args?.maxLength) || 20000, 500), 100000);
  const clipped = body.length > maxLength;
  const text = [
    `URL: ${response.url || url}`,
    `HTTP ${response.status} ${response.statusText || ""}`.trim(),
    `Content-Type: ${contentType || "(unknown)"}`,
    "",
    clipped ? body.slice(0, maxLength) : body,
  ].join("\n");
  const notes = [];
  if (truncated) notes.push(`[响应超过 ${maxFetchBytes} 字节，已截断]`);
  if (clipped) notes.push(`[内容超过 maxLength=${maxLength}，已截断]`);
  return textResult(notes.length ? `${text}\n\n${notes.join("\n")}` : text);
}

function transfersDir(context) {
  return path.join(configDirOf(context), "transfers");
}

function transferSessionFiles(context, sessionId) {
  if (!/^[a-zA-Z0-9_-]+$/.test(sessionId)) {
    throw new Error("Invalid sessionId");
  }
  const dir = transfersDir(context);
  return {
    metaFile: path.join(dir, `${sessionId}.json`),
    partFile: path.join(dir, `${sessionId}.part`),
  };
}

async function authorizeSinglePath(targetPath, kind, allowedDirectories, name, args, options) {
  const permission = await getWritablePermissionForTargets(
    [{ path: targetPath, kind: kind === "directory" ? "directory" : "file" }],
    allowedDirectories
  );
  if (permission.code === "REPARSE_PATH_WRITE_DENIED") {
    return errorTextResult(`REPARSE_PATH_WRITE_DENIED: 不允许通过符号链接或 junction 执行写入。请求路径: ${permission.targetPath}`);
  }
  if (permission.allowed) {
    return null;
  }
  const approved = await hasOneTimePermission({
    operation: name,
    targetPaths: permission.targetPaths,
    args,
    permissionStoreDir: options.permissionStoreDir,
  });
  if (approved) {
    return null;
  }
  return buildPermissionRequiredResultWithMarker({
    operation: name,
    targetPaths: permission.targetPaths,
    directoriesToApprove: permission.directoriesToApprove,
    args,
    permissionStoreDir: options.permissionStoreDir,
  });
}

async function manageTextTransfer(args, allowedDirectories, context, options = {}) {
  const action = requireString(args, "action");
  if (action === "cancel") {
    const sessionId = requireString(args, "sessionId");
    const { metaFile, partFile } = transferSessionFiles(context, sessionId);
    await fs.rm(metaFile, { force: true });
    await fs.rm(partFile, { force: true });
    return textResult(JSON.stringify({ ok: true, cancelled: { sessionId } }, null, 2));
  }
  if (action === "begin") {
    const targetPath = path.resolve(requireString(args, "path"));
    const expectedBytes = Number(args?.expectedBytes);
    if (!Number.isFinite(expectedBytes) || expectedBytes < 1 || expectedBytes > maxTransferTotalBytes) {
      throw new Error(`expectedBytes 必须在 1 到 ${maxTransferTotalBytes} 之间`);
    }
    const expectedSha256 = requireString(args, "expectedSha256");
    if (!/^[0-9a-fA-F]{64}$/.test(expectedSha256)) {
      throw new Error("expectedSha256 必须是 64 位十六进制字符串");
    }
    const denied = await authorizeSinglePath(targetPath, "file", allowedDirectories, "manage_text_transfer", { ...args, path: targetPath }, options);
    if (denied) return denied;
    const sessionId = `xfer-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const { metaFile, partFile } = transferSessionFiles(context, sessionId);
    await fs.mkdir(transfersDir(context), { recursive: true });
    await writeJsonStore(metaFile, {
      path: targetPath,
      expectedBytes,
      expectedSha256: expectedSha256.toLowerCase(),
      nextIndex: 0,
      receivedBytes: 0,
    });
    await fs.writeFile(partFile, "", "utf8");
    return textResult(JSON.stringify({ ok: true, transfer: { sessionId, nextChunkIndex: 0, chunkBytes: maxTransferChunkBytes } }, null, 2));
  }
  if (action === "append") {
    const sessionId = requireString(args, "sessionId");
    const content = args?.content;
    if (typeof content !== "string") {
      throw new Error("Missing required string argument: content");
    }
    const chunkIndex = Number(args?.chunkIndex);
    const { metaFile, partFile } = transferSessionFiles(context, sessionId);
    const meta = await readJsonStore(metaFile, null);
    if (!meta) {
      return errorTextResult(`TEXT_TRANSFER_SESSION_NOT_FOUND: ${sessionId}`);
    }
    if (!Number.isInteger(chunkIndex) || chunkIndex !== meta.nextIndex) {
      return errorTextResult(`TEXT_TRANSFER_CHUNK_OUT_OF_ORDER: 期望 chunkIndex=${meta.nextIndex}，收到 ${chunkIndex}`);
    }
    const chunkBytes = Buffer.byteLength(content, "utf8");
    if (chunkBytes > maxTransferChunkBytes) {
      return errorTextResult(`TEXT_TRANSFER_CHUNK_TOO_LARGE: 本块 ${chunkBytes} 字节，上限 ${maxTransferChunkBytes}`);
    }
    await fs.appendFile(partFile, content, "utf8");
    const receivedBytes = (meta.receivedBytes || 0) + chunkBytes;
    if (receivedBytes > meta.expectedBytes) {
      return errorTextResult(`TEXT_TRANSFER_SIZE_MISMATCH: 已接收 ${receivedBytes} 字节，超过声明的 ${meta.expectedBytes}`);
    }
    meta.nextIndex = chunkIndex + 1;
    meta.receivedBytes = receivedBytes;
    await writeJsonStore(metaFile, meta);
    return textResult(JSON.stringify({ ok: true, transfer: { nextChunkIndex: meta.nextIndex, writtenBytes: receivedBytes } }, null, 2));
  }
  if (action === "commit") {
    const sessionId = requireString(args, "sessionId");
    const { metaFile, partFile } = transferSessionFiles(context, sessionId);
    const meta = await readJsonStore(metaFile, null);
    if (!meta) {
      return errorTextResult(`TEXT_TRANSFER_SESSION_NOT_FOUND: ${sessionId}`);
    }
    const partBuffer = await fs.readFile(partFile);
    if (partBuffer.length !== meta.expectedBytes) {
      return errorTextResult(`TEXT_TRANSFER_SIZE_MISMATCH: 实际 ${partBuffer.length} 字节，声明 ${meta.expectedBytes} 字节`);
    }
    const actualHash = createHash("sha256").update(partBuffer).digest("hex");
    if (actualHash !== meta.expectedSha256) {
      return errorTextResult(`TEXT_TRANSFER_HASH_MISMATCH: 实际 ${actualHash}，声明 ${meta.expectedSha256}`);
    }
    await fs.mkdir(path.dirname(meta.path), { recursive: true });
    await fs.writeFile(meta.path, partBuffer);
    await appendWriteAudit(options.auditFile, {
      operation: "manage_text_transfer",
      path: meta.path,
      bytes: partBuffer.length,
      sha256: actualHash,
    });
    await fs.rm(metaFile, { force: true });
    await fs.rm(partFile, { force: true });
    return textResult(JSON.stringify({ ok: true, committed: { path: meta.path, bytes: partBuffer.length, sha256: actualHash } }, null, 2));
  }
  throw new Error(`Unknown manage_text_transfer action: ${action}`);
}

function workspaceContext(context, allowedDirectories) {
  return textResult(
    JSON.stringify(
      {
        repoRoot: context.repoRoot,
        configFile: context.configFile,
        allowedDirectories,
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        pid: process.pid,
        uptimeSec: Math.round(process.uptime()),
        toolCount: toolDefinitions.length,
      },
      null,
      2
    )
  );
}

function projectStoreFile(context) {
  return path.join(configDirOf(context), "dev-projects.json");
}

async function loadProjects(context) {
  const store = await readJsonStore(projectStoreFile(context), { projects: [] });
  return Array.isArray(store?.projects) ? store.projects : [];
}

async function saveProjects(context, projects) {
  await writeJsonStore(projectStoreFile(context), { projects });
}

async function listLocalWorkspaces(context, allowedDirectories) {
  const projects = await loadProjects(context);
  const lines = ["Allowed directories:", ...allowedDirectories.map((directory) => `  - ${directory}`)];
  if (projects.length) {
    lines.push("", "Registered development projects:");
    for (const project of projects) {
      lines.push(`  - ${project.name}: ${project.path}`);
    }
  } else {
    lines.push("", "Registered development projects: （无登记项目）");
  }
  return textResult(lines.join("\n"));
}

async function inspectDevelopmentEnvironment() {
  async function probe(label, file, args) {
    const result = await runProcessCaptured(file, args, { timeoutMs: 8000 });
    const firstLine = (result.stdout || result.stderr || "").split(/\r?\n/).find((line) => line.trim());
    return `${label}: ${result.failed && !firstLine ? `不可用（${result.failed.code ?? result.failed.message}）` : firstLine || "不可用"}`;
  }
  const lines = await Promise.all([
    probe("node", "node", ["-v"]),
    probe("npm", "npm", ["-v"]),
    probe("py", "py", ["--version"]),
    probe("python", "python", ["--version"]),
    probe("java", "java", ["-version"]),
    probe("javac", "javac", ["-version"]),
    probe("git", "git", ["--version"]),
    probe("adb", "adb", ["version"]),
  ]);
  return textResult(
    [
      `platform: ${process.platform} (${process.arch})`,
      `runtime: node ${process.version}`,
      "",
      ...lines,
    ].join("\n")
  );
}

async function nodeDevelopment(args, context, options = {}) {
  const action = requireString(args, "action");
  const cwd = args?.cwd && String(args.cwd).trim() ? path.resolve(String(args.cwd)) : context.repoRoot;
  const timeoutMs = clampTimeout(args?.timeoutMs, 120000);
  if (action === "version") {
    const nodeVersion = await runProcessCaptured("node", ["-v"], { timeoutMs: 8000 });
    const npmVersion = await runProcessCaptured("npm", ["-v"], { timeoutMs: 15000 });
    return textResult(
      [
        `node: ${(nodeVersion.stdout || "").trim() || "不可用"}`,
        `npm: ${(npmVersion.stdout || "").trim() || "不可用"}`,
      ].join("\n")
    );
  }
  if (action === "npm_run" || action === "npm_install" || action === "npm_test") {
    let command;
    if (action === "npm_run") {
      const script = requireString(args, "script");
      if (!/^[a-zA-Z0-9:_.-]+$/.test(script)) {
        throw new Error(`Invalid npm script name: ${script}`);
      }
      command = `npm run ${script}`;
    } else if (action === "npm_install") {
      command = "npm install";
    } else {
      command = "npm test";
    }
    const denied = await authorizeSpecial("node_development", { ...args, command }, [cwd], options);
    if (denied) return denied;
    const captured = await runShellCaptured(command, cwd, timeoutMs);
    await appendWriteAudit(options.auditFile, { operation: "node_development", action, command, cwd, exit: captured.failed ? captured.failed.code ?? "error" : 0 });
    return formatCapturedResult(captured, timeoutMs);
  }
  throw new Error(`Unknown node_development action: ${action}`);
}

function stripUnsafeCommandChars(value) {
  return String(value).replace(/[&|<>^]/g, "");
}

async function pythonDevelopment(args, context, options = {}) {
  const action = requireString(args, "action");
  const cwd = args?.cwd && String(args.cwd).trim() ? path.resolve(String(args.cwd)) : context.repoRoot;
  const timeoutMs = clampTimeout(args?.timeoutMs, 120000);
  if (action === "python_version") {
    let version = await runProcessCaptured("py", ["--version"], { timeoutMs: 10000 });
    if (version.failed) {
      version = await runProcessCaptured("python", ["--version"], { timeoutMs: 10000 });
    }
    const line = (version.stdout || version.stderr || "").trim() || "不可用";
    return textResult(line);
  }
  if (action === "script_run" || action === "pytest_run") {
    let command;
    let scriptPath = null;
    if (action === "script_run") {
      scriptPath = path.resolve(cwd, stripUnsafeCommandChars(requireString(args, "script")));
      if (!(await fs.stat(scriptPath).then((stat) => stat.isFile()).catch(() => false))) {
        return errorTextResult(`脚本不存在：${scriptPath}`);
      }
      const extraArgs = Array.isArray(args?.args)
        ? args.args.map((item) => stripUnsafeCommandChars(item)).filter((item) => item.trim()).join(" ")
        : "";
      command = `py "${scriptPath}"${extraArgs ? ` ${extraArgs}` : ""}`;
    } else {
      const target = args?.path && String(args.path).trim() ? stripUnsafeCommandChars(String(args.path)) : "";
      command = `py -m pytest${target ? ` "${target}"` : ""}`;
    }
    const denied = await authorizeSpecial("python_development", { ...args, command }, [cwd], options);
    if (denied) return denied;
    const captured = await runShellCaptured(command, cwd, timeoutMs);
    await appendWriteAudit(options.auditFile, { operation: "python_development", action, command, cwd, exit: captured.failed ? captured.failed.code ?? "error" : 0 });
    return formatCapturedResult(captured, timeoutMs);
  }
  throw new Error(`Unknown python_development action: ${action}`);
}

async function javaDevelopment(args, context, options = {}) {
  const action = requireString(args, "action");
  const cwd = args?.cwd && String(args.cwd).trim() ? path.resolve(String(args.cwd)) : context.repoRoot;
  const timeoutMs = clampTimeout(args?.timeoutMs, 300000);
  if (action === "version") {
    const java = await runProcessCaptured("java", ["-version"], { timeoutMs: 10000 });
    const javac = await runProcessCaptured("javac", ["-version"], { timeoutMs: 10000 });
    return textResult(
      [
        `java: ${(java.stdout || java.stderr || "").split(/\r?\n/).find((line) => line.trim()) || "不可用"}`,
        `javac: ${(javac.stdout || javac.stderr || "").split(/\r?\n/).find((line) => line.trim()) || "不可用"}`,
      ].join("\n")
    );
  }
  if (action === "gradle_task") {
    const tasks = Array.isArray(args?.tasks)
      ? args.tasks.map((item) => stripUnsafeCommandChars(item)).filter((item) => item.trim())
      : ["assembleDebug"];
    if (!tasks.length) {
      tasks.push("assembleDebug");
    }
    const isWindows = process.platform === "win32";
    const wrapper = isWindows ? "gradlew.bat" : "./gradlew";
    const command = `${wrapper} ${tasks.join(" ")}`;
    const denied = await authorizeSpecial("java_development", { ...args, command }, [cwd], options);
    if (denied) return denied;
    const captured = await runShellCaptured(command, cwd, timeoutMs);
    await appendWriteAudit(options.auditFile, { operation: "java_development", action: "gradle_task", command, cwd, exit: captured.failed ? captured.failed.code ?? "error" : 0 });
    return formatCapturedResult(captured, timeoutMs);
  }
  throw new Error(`Unknown java_development action: ${action}`);
}

async function androidDevelopment(args, context, options = {}) {
  const action = requireString(args, "action");
  const serial = args?.serial && String(args.serial).trim() ? String(args.serial).trim() : null;
  const serialArgs = serial ? ["-s", serial] : [];
  const timeoutMs = clampTimeout(args?.timeoutMs, 120000);
  if (action === "devices") {
    const result = await runProcessCaptured("adb", ["devices", "-l"], { timeoutMs: 15000 });
    return textResult([`adb devices${serial ? ` (-s ${serial})` : ""}:`, (result.stdout || result.stderr || "").trim() || "(no devices)"].join("\n"));
  }
  if (action === "logcat") {
    const lines = Math.min(Math.max(Number(args?.lines) || 200, 10), 5000);
    const result = await runProcessCaptured("adb", [...serialArgs, "logcat", "-d", "-t", String(lines)], { timeoutMs: 60000, maxBuffer: undefined });
    const output = (result.stdout || result.stderr || "").trim() || "(no output)";
    return textResult(output.length > maxTextReadBytes ? `${output.slice(0, maxTextReadBytes)}\n[输出已截断]` : output);
  }
  if (action === "install") {
    const apkPath = path.resolve(requireString(args, "apk"));
    if (!(await fs.stat(apkPath).then((stat) => stat.isFile()).catch(() => false))) {
      return errorTextResult(`APK 不存在：${apkPath}`);
    }
    const denied = await authorizeSpecial("android_development", { ...args, apk: apkPath }, [apkPath], options);
    if (denied) return denied;
    const result = await runProcessCaptured("adb", [...serialArgs, "install", "-r", apkPath], { timeoutMs });
    await appendWriteAudit(options.auditFile, { operation: "android_development", action: "install", apk: apkPath, serial });
    return textResult([`adb install -r ${apkPath}${serial ? ` (-s ${serial})` : ""}:`, (result.stdout || result.stderr || "").trim() || "(no output)"].join("\n"));
  }
  if (action === "shell") {
    const command = stripUnsafeCommandChars(requireString(args, "command"));
    const denied = await authorizeSpecial("android_development", { ...args, command }, [], options);
    if (denied) return denied;
    const result = await runProcessCaptured("adb", [...serialArgs, "shell", command], { timeoutMs });
    await appendWriteAudit(options.auditFile, { operation: "android_development", action: "shell", command, serial });
    return textResult((result.stdout || result.stderr || "").trim() || "(no output)");
  }
  throw new Error(`Unknown android_development action: ${action}`);
}

async function gitWorkflow(args, options = {}) {
  const action = requireString(args, "action");
  const repoPath = path.resolve(requireString(args, "path"));
  if (action === "status") {
    return gitStatus({ path: repoPath });
  }
  if (action === "log") {
    const limit = Math.min(Math.max(Number(args?.limit) || 10, 1), 200);
    const output = await runGit(["--no-pager", "log", "--oneline", "-n", String(limit)], repoPath);
    return textResult(output.trim() || "(no commits)");
  }
  if (action === "add_files") {
    const files = Array.isArray(args?.files)
      ? args.files.filter((file) => typeof file === "string" && file.trim()).map((file) => file.trim())
      : [];
    await runGit(files.length ? ["add", "--", ...files] : ["add", "-A"], repoPath);
    await appendWriteAudit(options.auditFile, { operation: "git_workflow", action: "add_files", path: repoPath, files: files.length || "all" });
    return textResult(`已暂存 ${files.length ? files.length : "全部改动"} 个文件。`);
  }
  if (action === "commit") {
    return gitCommit({ ...args, path: repoPath }, options);
  }
  if (action === "push") {
    return gitPush({ ...args, path: repoPath }, options);
  }
  throw new Error(`Unknown git_workflow action: ${action}`);
}

async function manageDevelopmentProject(args, context, options = {}) {
  const action = requireString(args, "action");
  if (action === "list") {
    const projects = await loadProjects(context);
    if (!projects.length) {
      return textResult("（无登记项目）");
    }
    return textResult(projects.map((project) => `- ${project.name}: ${project.path}`).join("\n"));
  }
  if (action === "add") {
    const name = requireString(args, "name");
    const projectPath = path.resolve(requireString(args, "path"));
    if (!(await fs.stat(projectPath).then((stat) => stat.isDirectory()).catch(() => false))) {
      return errorTextResult(`目录不存在：${projectPath}`);
    }
    const projects = await loadProjects(context);
    const existing = projects.find((project) => project.name === name);
    if (existing) {
      existing.path = projectPath;
    } else {
      projects.push({ name, path: projectPath });
    }
    await saveProjects(context, projects);
    await appendWriteAudit(options.auditFile, { operation: "manage_development_project", action: "add", name, path: projectPath });
    return textResult(`已登记项目 ${name}: ${projectPath}`);
  }
  if (action === "remove") {
    const name = requireString(args, "name");
    const projects = await loadProjects(context);
    const next = projects.filter((project) => project.name !== name);
    if (next.length === projects.length) {
      return errorTextResult(`未找到项目：${name}`);
    }
    await saveProjects(context, next);
    await appendWriteAudit(options.auditFile, { operation: "manage_development_project", action: "remove", name });
    return textResult(`已移除项目 ${name}`);
  }
  throw new Error(`Unknown manage_development_project action: ${action}`);
}

function devTasksDir(context) {
  return path.join(configDirOf(context), "dev-tasks");
}

function devTasksRegistryFile(context) {
  return path.join(devTasksDir(context), "tasks.json");
}

async function loadDevTasks(context) {
  const store = await readJsonStore(devTasksRegistryFile(context), { tasks: [] });
  return Array.isArray(store?.tasks) ? store.tasks : [];
}

async function saveDevTasks(context, tasks) {
  await fs.mkdir(devTasksDir(context), { recursive: true });
  await writeJsonStore(devTasksRegistryFile(context), { tasks });
}

function isPidAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    if (process.platform === "win32") {
      return true; // Windows 无法同步探测，保守认为存活，由 kill 结果修正
    }
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function devTaskLogFile(context, taskId) {
  const safe = taskId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(devTasksDir(context), `dev-${safe}.log`);
}

async function startDevTask({ name, command, cwd }, context, options = {}) {
  const denied = await authorizeSpecial("run_local_workflow", { command, cwd }, [cwd], options);
  if (denied) return denied;
  for (const rule of DENIED_COMMAND_RULES) {
    if (rule.pattern.test(command)) {
      throw new Error(`命令被拒绝：${rule.reason}`);
    }
  }
  const taskId = `dev-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const logFile = devTaskLogFile(context, taskId);
  await fs.mkdir(devTasksDir(context), { recursive: true });
  const isWindows = process.platform === "win32";
  const shell = isWindows ? process.env.ComSpec || "cmd.exe" : "/bin/sh";
  const shellArgs = isWindows ? ["/d", "/s", "/c", command] : ["-c", command];
  const fd = fsSync.openSync(logFile, "a");
  const child = spawn(shell, shellArgs, {
    cwd,
    detached: !isWindows,
    stdio: ["ignore", fd, fd],
    windowsHide: true,
  });
  child.on("error", () => {});
  child.unref();
  fsSync.closeSync(fd);
  const entry = {
    taskId,
    name: name || command.slice(0, 60),
    command,
    cwd,
    pid: child.pid,
    logFile,
    status: "running",
    startedAt: new Date().toISOString(),
  };
  const tasks = await loadDevTasks(context);
  tasks.unshift(entry);
  await saveDevTasks(context, tasks.slice(0, 50));
  await appendWriteAudit(options.auditFile, { operation: "run_local_workflow", taskId, command, cwd, pid: child.pid });
  return textResult(JSON.stringify({ ok: true, task: entry }, null, 2));
}

async function listDevelopmentTasks(context) {
  const tasks = await loadDevTasks(context);
  if (!tasks.length) {
    return textResult("（无开发任务）");
  }
  return textResult(
    tasks
      .map((task) => {
        const alive = task.status === "running" && isPidAlive(task.pid);
        const status = task.status === "running" && !alive ? "exited" : task.status;
        return `- ${task.taskId} [${status}] ${task.name} (pid ${task.pid}, startedAt ${task.startedAt})`;
      })
      .join("\n")
  );
}

async function getDevelopmentTask(args, context) {
  const taskId = requireString(args, "taskId");
  const tasks = await loadDevTasks(context);
  const task = tasks.find((item) => item.taskId === taskId);
  if (!task) {
    return errorTextResult(`未找到任务：${taskId}`);
  }
  const alive = task.status === "running" && isPidAlive(task.pid);
  return textResult(JSON.stringify({ ...task, alive: Boolean(alive) }, null, 2));
}

async function readDevelopmentTaskLogs(args, context) {
  const taskId = requireString(args, "taskId");
  const task = (await loadDevTasks(context)).find((item) => item.taskId === taskId);
  if (!task) {
    return errorTextResult(`未找到任务：${taskId}`);
  }
  let content;
  try {
    content = await fs.readFile(task.logFile, "utf8");
  } catch {
    return textResult("（暂无日志）");
  }
  let text = content;
  if (text.length > maxTextReadBytes) {
    text = text.slice(-maxTextReadBytes);
  }
  text = applyLineLimit(text, { head: args?.head, tail: args?.tail ?? 200 });
  return textResult(text || "（暂无日志）");
}

async function cancelDevelopmentTask(args, context, options = {}) {
  const taskId = requireString(args, "taskId");
  const tasks = await loadDevTasks(context);
  const task = tasks.find((item) => item.taskId === taskId);
  if (!task) {
    return errorTextResult(`未找到任务：${taskId}`);
  }
  if (task.status === "running") {
    if (process.platform === "win32") {
      await runProcessCaptured("taskkill", ["/PID", String(task.pid), "/T", "/F"], { timeoutMs: 15000 });
    } else {
      try {
        process.kill(-task.pid, "SIGTERM");
      } catch {
        try {
          process.kill(task.pid, "SIGTERM");
        } catch {}
      }
    }
    task.status = "cancelled";
    task.endedAt = new Date().toISOString();
    await saveDevTasks(context, tasks);
    await appendWriteAudit(options.auditFile, { operation: "cancel_development_task", taskId, pid: task.pid });
    return textResult(`已终止任务 ${taskId} (pid ${task.pid})。`);
  }
  return textResult(`任务 ${taskId} 当前状态是 ${task.status}，无需终止。`);
}

async function runLocalWorkflow(args, context, options = {}) {
  const command = requireString(args, "command");
  const cwd = args?.cwd && String(args.cwd).trim() ? path.resolve(String(args.cwd)) : context.repoRoot;
  return startDevTask({ name: args?.name && String(args.name).trim() ? String(args.name).trim() : null, command, cwd }, context, options);
}

async function localDevServer(args, context, options = {}) {
  const action = requireString(args, "action");
  if (action === "start") {
    const command = requireString(args, "command");
    const cwd = args?.cwd && String(args.cwd).trim() ? path.resolve(String(args.cwd)) : context.repoRoot;
    const name = args?.name && String(args.name).trim() ? String(args.name).trim() : `server:${command.slice(0, 40)}`;
    return startDevTask({ name, command, cwd }, context, options);
  }
  if (action === "stop") {
    return cancelDevelopmentTask({ taskId: requireString(args, "taskId") }, context, options);
  }
  if (action === "status") {
    if (args?.taskId && String(args.taskId).trim()) {
      return getDevelopmentTask({ taskId: String(args.taskId) }, context);
    }
    return listDevelopmentTasks(context);
  }
  if (action === "list") {
    return listDevelopmentTasks(context);
  }
  throw new Error(`Unknown local_dev_server action: ${action}`);
}

async function callToolImpl(name, args = {}, context = {}) {
  const toolArgs = normalizeToolPathArgs(name, args);
  const repoRoot = context.repoRoot;
  const configFile = context.configFile;
  const permissionOptions = {
    permissionStoreDir: context.permissionStoreDir,
    auditFile: context.auditFile,
  };
  const allowedDirectories = await getAllowedDirectories({ repoRoot, configFile });
  const permissionResult = context.controllerCapability === CONTROLLER_TOOL_CAPABILITY
    ? null
    : await authorizeMutation(name, toolArgs, allowedDirectories, permissionOptions);
  if (permissionResult) {
    return permissionResult;
  }

  switch (name) {
    case "read_text_file":
      return readTextFile(toolArgs);
    case "read_media_file":
      return readMediaFile(toolArgs);
    case "read_multiple_files":
      return readMultipleFiles(toolArgs);
    case "write_file":
      return writeFile(toolArgs, allowedDirectories, permissionOptions);
    case "edit_file":
      return editFile(toolArgs, allowedDirectories, permissionOptions);
    case "delete_file":
      return deleteFile(toolArgs, allowedDirectories, permissionOptions);
    case "create_directory":
      return createDirectory(toolArgs, allowedDirectories, permissionOptions);
    case "list_directory":
      return listDirectory(toolArgs);
    case "list_directory_with_sizes":
      return listDirectoryWithSizes(toolArgs);
    case "directory_tree":
      return directoryTree(toolArgs);
    case "move_file":
      return moveFile(toolArgs, allowedDirectories, permissionOptions);
    case "search_files":
      return searchFiles(toolArgs);
    case "search_content":
      return searchContent(toolArgs);
    case "compare_files":
      return compareFiles(toolArgs);
    case "apply_patch":
      return applyPatch(toolArgs, allowedDirectories, permissionOptions);
    case "git_status":
      return gitStatus(toolArgs);
    case "git_diff":
      return gitDiff(toolArgs);
    case "execute_command":
      return executeCommand(toolArgs, context, permissionOptions);
    case "git_commit":
      return gitCommit(toolArgs, permissionOptions);
    case "git_push":
      return gitPush(toolArgs, permissionOptions);
    case "ping":
      return pingResult(context);
    case "todo_read":
      return todoRead(context);
    case "todo_write":
      return todoWrite(toolArgs, context, permissionOptions);
    case "web_fetch":
      return webFetch(toolArgs, context, permissionOptions);
    case "manage_text_transfer":
      return manageTextTransfer(toolArgs, allowedDirectories, context, permissionOptions);
    case "workspace_context":
      return workspaceContext(context, allowedDirectories);
    case "list_local_workspaces":
      return listLocalWorkspaces(context, allowedDirectories);
    case "inspect_development_environment":
      return inspectDevelopmentEnvironment();
    case "node_development":
      return nodeDevelopment(toolArgs, context, permissionOptions);
    case "python_development":
      return pythonDevelopment(toolArgs, context, permissionOptions);
    case "java_development":
      return javaDevelopment(toolArgs, context, permissionOptions);
    case "android_development":
      return androidDevelopment(toolArgs, context, permissionOptions);
    case "git_workflow":
      return gitWorkflow(toolArgs, permissionOptions);
    case "manage_development_project":
      return manageDevelopmentProject(toolArgs, context, permissionOptions);
    case "run_local_workflow":
      return runLocalWorkflow(toolArgs, context, permissionOptions);
    case "local_dev_server":
      return localDevServer(toolArgs, context, permissionOptions);
    case "list_development_tasks":
      return listDevelopmentTasks(context);
    case "get_development_task":
      return getDevelopmentTask(toolArgs, context);
    case "read_development_task_logs":
      return readDevelopmentTaskLogs(toolArgs, context);
    case "cancel_development_task":
      return cancelDevelopmentTask(toolArgs, context, permissionOptions);
    case "get_file_info":
      return getFileInfo(toolArgs);
    case "list_allowed_directories":
      return listAllowedDirectoriesResult(allowedDirectories);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export function createFilesystemTools({
  repoRoot,
  configFile,
  permissionStoreDir,
  auditFile,
} = {}) {
  if (!repoRoot || !configFile || !permissionStoreDir || !auditFile) {
    throw new Error("FILESYSTEM_TOOL_PATHS_REQUIRED");
  }
  const runtime = {
    repoRoot: path.resolve(repoRoot),
    configFile: path.resolve(configFile),
    permissionStoreDir: path.resolve(permissionStoreDir),
    auditFile: path.resolve(auditFile),
  };
  return {
    definitions: toolDefinitions,
    call(name, args = {}, context = {}) {
      return callToolImpl(name, args, { ...runtime, ...context });
    },
  };
}
