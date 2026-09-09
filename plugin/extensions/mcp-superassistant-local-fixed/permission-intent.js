export const WEB_AGENT_EXPLICIT_PATH_INTENT_TTL_MS = 30 * 60 * 1000;

export function hasWebAgentWindowsAbsolutePath(text) {
  return /(?:^|[\s"'`(\[])\b[A-Za-z]:[\\/]/u.test(String(text || ""));
}

export function normalizeWebAgentIntentText(text) {
  return String(text || "").replace(/\//g, "\\").replace(/\\+/g, "\\").toLowerCase();
}

export function webAgentIntentCoversPermission(intent, permissionRequest) {
  const text = normalizeWebAgentIntentText(intent?.text);
  const directories = Array.isArray(permissionRequest?.directoriesToApprove)
    ? permissionRequest.directoriesToApprove
    : [];
  return Boolean(
    text
    && directories.length > 0
    && directories.every((directory) => text.includes(normalizeWebAgentIntentText(directory)))
  );
}
