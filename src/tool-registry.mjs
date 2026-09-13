const REQUIRED_METADATA_FIELDS = Object.freeze([
  "readOnly",
  "mutating",
  "destructive",
  "reversible",
  "openWorld",
  "idempotent",
]);

export class ToolRegistryError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = "ToolRegistryError";
    this.code = code;
    this.details = details;
  }
}

function requireToolName(value) {
  if (typeof value !== "string" || !value.trim()) {
    throw new ToolRegistryError("INVALID_TOOL_NAME", "Tool names must be non-empty strings.");
  }
  return value.trim();
}

export function validateToolMetadata(metadata, { toolName = "unknown" } = {}) {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new ToolRegistryError(
      "TOOL_METADATA_REQUIRED",
      `Tool ${toolName} has no explicit permission metadata.`,
      { toolName }
    );
  }

  const missing = REQUIRED_METADATA_FIELDS.filter(
    (field) => !Object.hasOwn(metadata, field) || typeof metadata[field] !== "boolean"
  );
  if (missing.length) {
    throw new ToolRegistryError(
      "TOOL_METADATA_INCOMPLETE",
      `Tool ${toolName} is missing boolean metadata: ${missing.join(", ")}.`,
      { toolName, missing }
    );
  }
  if (metadata.readOnly === metadata.mutating) {
    throw new ToolRegistryError(
      "TOOL_METADATA_CONFLICT",
      `Tool ${toolName} must be exactly one of readOnly or mutating.`,
      { toolName }
    );
  }
  if (metadata.destructive && !metadata.mutating) {
    throw new ToolRegistryError(
      "TOOL_METADATA_CONFLICT",
      `Tool ${toolName} cannot be destructive without being mutating.`,
      { toolName }
    );
  }

  return Object.freeze(
    Object.fromEntries(REQUIRED_METADATA_FIELDS.map((field) => [field, metadata[field]]))
  );
}

function normalizePathArguments(pathArguments, toolName) {
  if (pathArguments === undefined) return Object.freeze([]);
  if (!Array.isArray(pathArguments)) {
    throw new ToolRegistryError(
      "INVALID_PATH_ARGUMENTS",
      `Tool ${toolName} pathArguments must be an array.`,
      { toolName }
    );
  }
  return Object.freeze(pathArguments.map((item) => {
    const normalized = typeof item === "string" ? { argument: item } : { ...item };
    if (typeof normalized.argument !== "string" || !normalized.argument.trim()) {
      throw new ToolRegistryError(
        "INVALID_PATH_ARGUMENTS",
        `Tool ${toolName} has an invalid path argument descriptor.`,
        { toolName }
      );
    }
    return Object.freeze({
      argument: normalized.argument.trim(),
      many: Boolean(normalized.many),
      subtree: Boolean(normalized.subtree),
      role: typeof normalized.role === "string" ? normalized.role : "target",
    });
  }));
}

function normalizeDefinition(name, definition) {
  const toolName = requireToolName(name);
  const descriptor = definition?.metadata ? definition : { metadata: definition };
  return Object.freeze({
    name: toolName,
    metadata: validateToolMetadata(descriptor.metadata, { toolName }),
    pathArguments: normalizePathArguments(descriptor.pathArguments, toolName),
  });
}

function entriesFromDefinitions(definitions) {
  if (definitions instanceof Map) return [...definitions.entries()];
  if (Array.isArray(definitions)) {
    return definitions.map((entry) => {
      if (Array.isArray(entry) && entry.length === 2) return entry;
      if (entry && typeof entry === "object" && typeof entry.name === "string") {
        return [entry.name, entry];
      }
      throw new ToolRegistryError("INVALID_TOOL_DEFINITION", "Invalid tool definition entry.");
    });
  }
  if (definitions && typeof definitions === "object") return Object.entries(definitions);
  throw new ToolRegistryError("INVALID_TOOL_DEFINITIONS", "Tool definitions must be an object, Map, or array.");
}

export class ToolRegistry {
  #tools = new Map();

  constructor(definitions = {}) {
    for (const [name, definition] of entriesFromDefinitions(definitions)) {
      this.register(name, definition);
    }
  }

  register(name, definition, { replace = false } = {}) {
    const descriptor = normalizeDefinition(name, definition);
    if (!replace && this.#tools.has(descriptor.name)) {
      throw new ToolRegistryError(
        "TOOL_ALREADY_REGISTERED",
        `Tool ${descriptor.name} is already registered.`,
        { toolName: descriptor.name }
      );
    }
    this.#tools.set(descriptor.name, descriptor);
    return descriptor;
  }

  has(name) {
    return typeof name === "string" && this.#tools.has(name.trim());
  }

  getDescriptor(name) {
    const toolName = requireToolName(name);
    const descriptor = this.#tools.get(toolName);
    if (!descriptor) {
      throw new ToolRegistryError(
        "UNKNOWN_TOOL",
        `Tool ${toolName} is not registered; execution is denied.`,
        { toolName }
      );
    }
    // Validate again so corrupted or externally supplied registries fail closed at use time.
    validateToolMetadata(descriptor.metadata, { toolName });
    return descriptor;
  }

  get(name) {
    return this.getDescriptor(name).metadata;
  }

  resolve(name) {
    try {
      const descriptor = this.getDescriptor(name);
      return { allowed: true, descriptor, metadata: descriptor.metadata };
    } catch (error) {
      if (!(error instanceof ToolRegistryError)) throw error;
      return { allowed: false, code: error.code, reason: error.message, details: error.details };
    }
  }

  extractPathSpecs(name, args = {}) {
    const descriptor = this.getDescriptor(name);
    const specs = [];
    for (const pathArgument of descriptor.pathArguments) {
      const value = args?.[pathArgument.argument];
      const values = pathArgument.many ? value : [value];
      if (!Array.isArray(values)) continue;
      for (const item of values) {
        if (typeof item !== "string" || !item.trim()) continue;
        specs.push({
          path: item,
          subtree: pathArgument.subtree,
          role: pathArgument.role,
          argument: pathArgument.argument,
        });
      }
    }
    return specs;
  }

  extractPaths(name, args = {}) {
    return this.extractPathSpecs(name, args).map((spec) => spec.path);
  }

  list() {
    return [...this.#tools.values()];
  }
}

const READ_ONLY = Object.freeze({
  readOnly: true,
  mutating: false,
  destructive: false,
  reversible: true,
  openWorld: false,
  idempotent: true,
});

const DEFAULT_DEFINITIONS = Object.freeze({
  read_text_file: { metadata: READ_ONLY, pathArguments: ["path"] },
  read_media_file: { metadata: READ_ONLY, pathArguments: ["path"] },
  read_multiple_files: { metadata: READ_ONLY, pathArguments: [{ argument: "paths", many: true }] },
  write_file: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: true,
      reversible: true,
      openWorld: false,
      idempotent: true,
    },
    pathArguments: ["path"],
  },
  edit_file: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: true,
      reversible: true,
      openWorld: false,
      idempotent: false,
    },
    pathArguments: ["path"],
  },
  delete_file: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: true,
      reversible: false,
      openWorld: false,
      idempotent: true,
    },
    pathArguments: ["path"],
  },
  create_directory: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: false,
      reversible: true,
      openWorld: false,
      idempotent: true,
    },
    pathArguments: [{ argument: "path", subtree: true }],
  },
  list_directory: { metadata: READ_ONLY, pathArguments: ["path"] },
  list_directory_with_sizes: { metadata: READ_ONLY, pathArguments: ["path"] },
  directory_tree: { metadata: READ_ONLY, pathArguments: [{ argument: "path", subtree: true }] },
  move_file: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: true,
      reversible: true,
      openWorld: false,
      idempotent: false,
    },
    pathArguments: [
      { argument: "source", role: "source" },
      { argument: "destination", role: "destination" },
    ],
  },
  search_files: { metadata: READ_ONLY, pathArguments: [{ argument: "path", subtree: true }] },
  search_content: { metadata: READ_ONLY, pathArguments: [{ argument: "path", subtree: true }] },
  git_status: { metadata: READ_ONLY, pathArguments: [{ argument: "path", subtree: true }] },
  git_diff: { metadata: READ_ONLY, pathArguments: [{ argument: "path", subtree: true }] },
  execute_command: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: true,
      reversible: false,
      openWorld: true,
      idempotent: false,
    },
    pathArguments: [{ argument: "cwd", subtree: true }],
  },
  git_commit: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: false,
      reversible: true,
      openWorld: false,
      idempotent: false,
    },
    pathArguments: [{ argument: "path", subtree: true }],
  },
  git_push: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: true,
      reversible: false,
      openWorld: true,
      idempotent: false,
    },
    pathArguments: [{ argument: "path", subtree: true }],
  },
  compare_files: { metadata: READ_ONLY, pathArguments: ["path_a", "path_b"] },
  apply_patch: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: true,
      reversible: true,
      openWorld: false,
      idempotent: false,
    },
    pathArguments: [],
  },
  get_file_info: { metadata: READ_ONLY, pathArguments: ["path"] },
  list_allowed_directories: { metadata: READ_ONLY, pathArguments: [] },
  ping: { metadata: READ_ONLY, pathArguments: [] },
  todo_read: { metadata: READ_ONLY, pathArguments: [] },
  todo_write: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: false,
      reversible: true,
      openWorld: false,
      idempotent: true,
    },
    pathArguments: [],
  },
  web_fetch: {
    metadata: {
      readOnly: true,
      mutating: false,
      destructive: false,
      reversible: true,
      openWorld: true,
      idempotent: true,
    },
    pathArguments: [],
  },
  manage_text_transfer: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: true,
      reversible: true,
      openWorld: false,
      idempotent: false,
    },
    pathArguments: ["path"],
  },
  workspace_context: { metadata: READ_ONLY, pathArguments: [] },
  list_local_workspaces: { metadata: READ_ONLY, pathArguments: [] },
  inspect_development_environment: { metadata: READ_ONLY, pathArguments: [] },
  node_development: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: false,
      reversible: true,
      openWorld: true,
      idempotent: false,
    },
    pathArguments: [{ argument: "cwd", subtree: true }],
  },
  python_development: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: false,
      reversible: true,
      openWorld: true,
      idempotent: false,
    },
    pathArguments: [{ argument: "cwd", subtree: true }],
  },
  java_development: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: false,
      reversible: true,
      openWorld: true,
      idempotent: false,
    },
    pathArguments: [{ argument: "cwd", subtree: true }],
  },
  android_development: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: false,
      reversible: true,
      openWorld: true,
      idempotent: false,
    },
    pathArguments: [],
  },
  git_workflow: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: true,
      reversible: false,
      openWorld: true,
      idempotent: false,
    },
    pathArguments: [{ argument: "path", subtree: true }],
  },
  manage_development_project: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: false,
      reversible: true,
      openWorld: false,
      idempotent: false,
    },
    pathArguments: [],
  },
  run_local_workflow: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: false,
      reversible: true,
      openWorld: true,
      idempotent: false,
    },
    pathArguments: [{ argument: "cwd", subtree: true }],
  },
  local_dev_server: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: false,
      reversible: true,
      openWorld: true,
      idempotent: false,
    },
    pathArguments: [{ argument: "cwd", subtree: true }],
  },
  list_development_tasks: { metadata: READ_ONLY, pathArguments: [] },
  get_development_task: { metadata: READ_ONLY, pathArguments: [] },
  read_development_task_logs: { metadata: READ_ONLY, pathArguments: [] },
  cancel_development_task: {
    metadata: {
      readOnly: false,
      mutating: true,
      destructive: false,
      reversible: true,
      openWorld: false,
      idempotent: true,
    },
    pathArguments: [],
  },
});

export const TOOL_METADATA_FIELDS = REQUIRED_METADATA_FIELDS;
export const DEFAULT_TOOL_DEFINITIONS = DEFAULT_DEFINITIONS;
export const defaultToolRegistry = new ToolRegistry(DEFAULT_DEFINITIONS);

export function createToolRegistry(definitions = DEFAULT_DEFINITIONS) {
  return new ToolRegistry(definitions);
}

export function getToolMetadata(name, registry = defaultToolRegistry) {
  return registry.get(name);
}
