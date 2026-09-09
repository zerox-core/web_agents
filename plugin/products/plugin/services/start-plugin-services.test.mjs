import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { startPluginServices } from "./start-plugin-services.mjs";

test("plugin launcher owns only filesystem and gateway services", async (t) => {
  const productRoot = await fs.mkdtemp(path.join(os.tmpdir(), "web-agents-plugin-"));
  t.after(() => fs.rm(productRoot, { recursive: true, force: true }));
  const services = await startPluginServices({ productRoot, filesystemPort: 0, gatewayPort: 0 });
  t.after(() => services.close());
  assert.deepEqual(Object.keys(services.ports).sort(), ["filesystem", "gateway"]);
  const urls = [
    `http://127.0.0.1:${services.ports.filesystem}/health`,
    `http://127.0.0.1:${services.ports.gateway}/health`,
  ];
  const health = await Promise.all(urls.map((url) => fetch(url).then((response) => response.json())));
  assert.doesNotMatch(JSON.stringify(health), /roundtable|3020|9223|8931/i);

  await services.close();
  await Promise.all(urls.map((url) => assert.rejects(() => fetch(url))));
});
