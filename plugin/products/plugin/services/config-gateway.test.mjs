import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { once } from "node:events";

import {
  buildGatewayConfig,
  createConfigGatewayServer,
  evaluatePermission,
  getAllowedRoots,
} from "./config-gateway.mjs";

test("getAllowedRoots includes repo root and configured existing directories", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-config-"));
  const repoRoot = path.join(tempRoot, "repo");
  const extraRoot = path.join(tempRoot, "extra");
  const missingRoot = path.join(tempRoot, "missing");
  const configFile = path.join(tempRoot, "allowed.txt");

  await fs.mkdir(repoRoot, { recursive: true });
  await fs.mkdir(extraRoot, { recursive: true });
  await fs.writeFile(configFile, `${extraRoot}\n${missingRoot}\n`, "utf8");

  const roots = await getAllowedRoots({ repoRoot, configFile });
  assert.deepEqual(roots, [path.resolve(repoRoot), path.resolve(extraRoot)]);
});

test("evaluatePermission requires confirmation for outside mutation in standard mode", () => {
  const allowedRoots = [path.resolve("F:/web_agents")];
  const outside = path.resolve("F:/reverse/output.md");

  const decision = evaluatePermission({
    allowedRoots,
    mode: "standard",
    toolName: "write_file",
    targetPath: outside,
  });

  assert.equal(decision.operation, "write");
  assert.equal(decision.requiresConfirmation, true);
  assert.equal(decision.insideAllowedRoot, false);
});

test("buildGatewayConfig returns extension-compatible config", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-config-"));
  const repoRoot = path.join(tempRoot, "repo");
  const configFile = path.join(tempRoot, "allowed.txt");

  await fs.mkdir(repoRoot, { recursive: true });
  await fs.writeFile(configFile, `${repoRoot}\n`, "utf8");

  const config = await buildGatewayConfig({
    repoRoot,
    configFile,
    gatewayUrl: "http://127.0.0.1:3007",
  });

  assert.equal(config.ok, true);
  assert.equal(config.mcp.serverUri, "http://127.0.0.1:3006/sse");
  assert.equal(config.permissions.enforcement, "gateway");
  assert.deepEqual(config.permissions.allowedRoots, [path.resolve(repoRoot)]);
});

test("config gateway serves /config and /permission/evaluate", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agent-config-"));
  const repoRoot = path.join(tempRoot, "repo");
  const outsideRoot = path.join(tempRoot, "outside");
  const configFile = path.join(tempRoot, "allowed.txt");

  await fs.mkdir(repoRoot, { recursive: true });
  await fs.mkdir(outsideRoot, { recursive: true });
  await fs.writeFile(configFile, `${repoRoot}\n`, "utf8");

  const server = createConfigGatewayServer({ repoRoot, configFile, host: "127.0.0.1", port: 0 });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");

  try {
    const { port } = server.address();
    const baseUrl = `http://127.0.0.1:${port}`;
    const config = await fetch(`${baseUrl}/config`).then((response) => response.json());
    assert.equal(config.ok, true);
    assert.equal(config.permissions.enforcement, "gateway");

    const decision = await fetch(`${baseUrl}/permission/evaluate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolName: "write_file", path: path.join(outsideRoot, "note.md") }),
    }).then((response) => response.json());

    assert.equal(decision.requiresConfirmation, true);
  } finally {
    server.close();
  }
});
