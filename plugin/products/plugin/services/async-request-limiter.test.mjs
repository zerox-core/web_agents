import assert from "node:assert/strict";
import test from "node:test";

import { createAsyncRequestLimiter } from "./async-request-limiter.mjs";

function deferred() {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
}

test("request limiter rejects saturation and recovers after active work finishes", async () => {
  const limiter = createAsyncRequestLimiter({ concurrency: 2, maxQueue: 1 });
  const gate = deferred();
  const block = () => gate.promise;

  const firstThree = [limiter.run(block), limiter.run(block), limiter.run(block)];
  await assert.rejects(() => limiter.run(block), (error) => error?.code === "REQUEST_QUEUE_FULL");
  assert.deepEqual(limiter.snapshot(), { active: 2, waiting: 1, rejected: 1 });

  gate.resolve();
  await Promise.all(firstThree);
  assert.deepEqual(limiter.snapshot(), { active: 0, waiting: 0, rejected: 1 });
  await assert.doesNotReject(() => limiter.run(async () => "recovered"));
});
