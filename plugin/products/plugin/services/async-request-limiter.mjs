function limiterError(code) {
  const error = new Error(code);
  error.code = code;
  return error;
}

export function createAsyncRequestLimiter({ concurrency = 8, maxQueue = 64 } = {}) {
  if (!Number.isInteger(concurrency) || concurrency < 1) throw limiterError("INVALID_CONCURRENCY");
  if (!Number.isInteger(maxQueue) || maxQueue < 0) throw limiterError("INVALID_MAX_QUEUE");
  const queue = [];
  let active = 0;
  let rejected = 0;

  function drain() {
    while (active < concurrency && queue.length) {
      const entry = queue.shift();
      active += 1;
      Promise.resolve()
        .then(entry.operation)
        .then(entry.resolve, entry.reject)
        .finally(() => {
          active -= 1;
          drain();
        });
    }
  }

  return {
    run(operation) {
      if (typeof operation !== "function") return Promise.reject(limiterError("OPERATION_REQUIRED"));
      if (active >= concurrency && queue.length >= maxQueue) {
        rejected += 1;
        return Promise.reject(limiterError("REQUEST_QUEUE_FULL"));
      }
      return new Promise((resolve, reject) => {
        queue.push({ operation, resolve, reject });
        drain();
      });
    },
    snapshot() {
      return { active, waiting: queue.length, rejected };
    },
  };
}
