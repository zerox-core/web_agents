import assert from "node:assert/strict";
import test from "node:test";

import { createAutomationTaskQueue } from "./automation-task-queue.mjs";

function validTask(clientRequestId, overrides = {}) {
  const base = {
    version: 1,
    type: "provider.generate_image",
    clientRequestId,
    sessionId: `session-${clientRequestId}`,
    provider: "grok",
    workspaceRoot: "F:/project",
    payload: {
      prompt: "Generate an image",
      targetDirectory: "F:/project/assets",
      fileName: "image.png",
    },
  };
  return {
    ...base,
    ...overrides,
    payload: { ...base.payload, ...overrides.payload },
  };
}

test("automation queue deduplicates, dispatches, and completes tasks", async (t) => {
  const queue = createAutomationTaskQueue({ capacity: 2, taskTimeoutMs: 1_000 });
  t.after(() => queue.close());

  const first = queue.submit(validTask("request-1"));
  assert.strictEqual(queue.submit(validTask("request-1")), first);
  assert.equal((await queue.take({ waitMs: 10 })).taskId, first.taskId);

  const completed = queue.complete(first.taskId, {
    ok: true,
    filePath: "F:/project/assets/image.png",
  });
  assert.equal(completed.state, "done");
  assert.equal(queue.get(first.taskId).result.filePath, "F:/project/assets/image.png");
});

test("automation queue wakes a waiting consumer as soon as a task arrives", async (t) => {
  const queue = createAutomationTaskQueue({ capacity: 2 });
  t.after(() => queue.close());

  const waiting = queue.take({ waitMs: 1_000 });
  const submitted = queue.submit(validTask("wake-request"));

  assert.equal((await waiting).taskId, submitted.taskId);
  assert.equal(await queue.take({ waitMs: 5 }), null);
});

test("automation queue routes waiting consumers by provider and session", async (t) => {
  const queue = createAutomationTaskQueue({ capacity: 4 });
  t.after(() => queue.close());

  const waitingChatGpt = queue.take({ provider: "chatgpt", sessionId: "chatgpt-a", waitMs: 1_000 });
  const waitingGrok = queue.take({ provider: "grok", sessionId: "grok-a", waitMs: 1_000 });
  const grokTask = queue.submit(validTask("grok-request", { sessionId: "grok-a" }));
  const chatGptTask = queue.submit(validTask("chatgpt-request", {
    provider: "chatgpt",
    sessionId: "chatgpt-a",
  }));

  assert.equal((await waitingGrok).taskId, grokTask.taskId);
  assert.equal((await waitingChatGpt).taskId, chatGptTask.taskId);
});

test("automation queue leaves non-matching tasks available", async (t) => {
  const queue = createAutomationTaskQueue({ capacity: 4 });
  t.after(() => queue.close());

  const task = queue.submit(validTask("grok-b", { sessionId: "grok-b" }));
  assert.equal(await queue.take({ provider: "grok", sessionId: "grok-a", waitMs: 5 }), null);
  assert.equal((await queue.take({ provider: "grok", sessionId: "grok-b", waitMs: 5 })).taskId, task.taskId);
});

test("automation queue rejects saturation and removes expired tasks", () => {
  let now = 1_000;
  const queue = createAutomationTaskQueue({
    capacity: 2,
    taskTimeoutMs: 100,
    retentionMs: 100,
    now: () => now,
    idFactory: (() => {
      let id = 0;
      return () => `task-${++id}`;
    })(),
  });

  const first = queue.submit(validTask("capacity-1"));
  queue.submit(validTask("capacity-2"));
  assert.throws(() => queue.submit(validTask("capacity-3")), (error) => error?.code === "AUTOMATION_QUEUE_FULL");

  now = 1_101;
  queue.sweep();
  assert.equal(queue.get(first.taskId).state, "error");
  assert.equal(queue.get(first.taskId).error.code, "AUTOMATION_TASK_TIMEOUT");

  now = 1_202;
  queue.sweep();
  assert.equal(queue.get(first.taskId), null);
  assert.doesNotThrow(() => queue.submit(validTask("capacity-3")));
  queue.close();
});
