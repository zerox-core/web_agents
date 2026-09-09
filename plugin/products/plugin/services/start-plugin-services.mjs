import { once } from "node:events";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createFilesystemHttpServer } from "./filesystem-http-server.mjs";
import { createPluginGatewayServer } from "./plugin-gateway.mjs";

const serviceDir = path.dirname(fileURLToPath(import.meta.url));
const defaultProductRoot = path.resolve(serviceDir, "..");

async function listen(server, port, host) {
  server.listen(port, host);
  await once(server, "listening");
  return server.address().port;
}

async function closeServer(server) {
  if (!server.listening) return;
  server.closeAllConnections?.();
  server.closeAllSessions?.();
  server.close();
  await once(server, "close").catch(() => {});
}

export async function startPluginServices({
  productRoot = defaultProductRoot,
  host = "127.0.0.1",
  filesystemPort = 3006,
  gatewayPort = 3017,
} = {}) {
  const resolvedProductRoot = path.resolve(productRoot);
  const configDir = path.join(resolvedProductRoot, "config");
  const dataDir = path.join(resolvedProductRoot, "data");
  const filesystem = createFilesystemHttpServer({
    productRoot: resolvedProductRoot,
    configDir,
    dataDir,
  });
  const gateway = createPluginGatewayServer({
    productRoot: resolvedProductRoot,
    configDir,
    dataDir,
  });
  const ports = {};
  try {
    ports.filesystem = await listen(filesystem, filesystemPort, host);
    ports.gateway = await listen(gateway, gatewayPort, host);
  } catch (error) {
    await Promise.allSettled([closeServer(filesystem), closeServer(gateway)]);
    throw error;
  }

  let closed = false;
  return {
    productRoot: resolvedProductRoot,
    host,
    ports,
    async close() {
      if (closed) return;
      closed = true;
      await Promise.all([closeServer(filesystem), closeServer(gateway)]);
    },
  };
}

if (path.resolve(process.argv[1] || "") === fileURLToPath(import.meta.url)) {
  const services = await startPluginServices({
    productRoot: process.env.WEB_AGENTS_PLUGIN_ROOT || defaultProductRoot,
    host: process.env.WEB_AGENTS_PLUGIN_HOST || "127.0.0.1",
    filesystemPort: Number(process.env.WEB_AGENTS_FILESYSTEM_PORT || 3006),
    gatewayPort: Number(process.env.WEB_AGENT_GATEWAY_PORT || 3017),
  });
  console.log(`Web Agents plugin services ready: filesystem ${services.ports.filesystem}, gateway ${services.ports.gateway}`);
  const shutdown = async () => {
    await services.close();
    process.exit(0);
  };
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}
