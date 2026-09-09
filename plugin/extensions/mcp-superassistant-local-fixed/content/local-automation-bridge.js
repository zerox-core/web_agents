(() => {
  "use strict";

  const gatewayUrl = "http://127.0.0.1:3017";
  const provider = "grok";
  const inputSelectors = [
    "textarea[aria-label*='Ask Grok']",
    "textarea[placeholder*='Ask']",
    "[data-testid='composer-input']",
    "[contenteditable='true'][role='textbox']",
    "div[contenteditable='true']",
  ];
  const submitSelectors = [
    "button[data-testid='send-button']",
    "button[aria-label*='Send']",
    "button[title*='Send']",
    "button[type='submit']",
  ];
  const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
  let stopped = false;

  function isGrokPage() {
    const host = window.location.hostname.toLowerCase();
    return host === "grok.com"
      || host.endsWith(".grok.com")
      || ((host === "x.com" || host.endsWith(".x.com") || host === "twitter.com" || host.endsWith(".twitter.com"))
        && window.location.pathname.startsWith("/i/grok"));
  }

  function isVisible(element) {
    if (!element || element.disabled) return false;
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
  }

  function findVisible(selectors) {
    for (const selector of selectors) {
      const matches = [...document.querySelectorAll(selector)].filter(isVisible);
      if (matches.length) return matches.at(-1);
    }
    return null;
  }

  async function request(pathname, options = {}, attempts = 4) {
    let lastError;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      try {
        const response = await fetch(`${gatewayUrl}${pathname}`, {
          cache: "no-store",
          ...options,
          headers: {
            Accept: "application/json",
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...options.headers,
          },
        });
        const body = await response.json();
        if (!response.ok || body.ok === false) throw new Error(body.error || `HTTP_${response.status}`);
        return body;
      } catch (error) {
        lastError = error;
        if (attempt + 1 < attempts) {
          const delay = Math.min(2_000, 150 * (2 ** attempt)) + Math.floor(Math.random() * 100);
          await sleep(delay);
        }
      }
    }
    throw lastError;
  }

  function setInputValue(input, value) {
    input.focus();
    if (input instanceof HTMLTextAreaElement || input instanceof HTMLInputElement) {
      const prototype = input instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
      setter ? setter.call(input, value) : (input.value = value);
    } else {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(input);
      selection?.removeAllRanges();
      selection?.addRange(range);
      if (!document.execCommand("insertText", false, value)) input.textContent = value;
    }
    input.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: value }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  async function submitPrompt(prompt) {
    const input = findVisible(inputSelectors);
    if (!input) throw new Error("GROK_INPUT_NOT_FOUND");
    setInputValue(input, prompt);
    await sleep(150);
    const submit = findVisible(submitSelectors);
    if (submit) {
      submit.click();
      return;
    }
    input.dispatchEvent(new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      which: 13,
      bubbles: true,
      cancelable: true,
    }));
  }

  function imageUrl(image) {
    return image.currentSrc || image.src || "";
  }

  function isGeneratedImage(image) {
    const url = imageUrl(image);
    if (!url || /avatar|emoji|icon|logo|\.svg(?:\?|$)/i.test(url)) return false;
    const rect = image.getBoundingClientRect();
    return image.naturalWidth >= 256 || image.naturalHeight >= 256 || rect.width >= 200 || rect.height >= 200;
  }

  async function waitForGeneratedImage(previousUrls, timeoutMs) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      const candidates = [...document.images]
        .filter(isGeneratedImage)
        .filter((image) => !previousUrls.has(imageUrl(image)));
      if (candidates.length) {
        const image = candidates.at(-1);
        if (!image.complete) await image.decode().catch(() => {});
        return image;
      }
      await sleep(750);
    }
    throw new Error("GROK_IMAGE_TIMEOUT");
  }

  function bytesToBase64(bytes) {
    const chunkSize = 32_768;
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
    }
    return btoa(binary);
  }

  async function readImage(image) {
    const response = await fetch(imageUrl(image), { credentials: "include", cache: "no-store" });
    if (!response.ok) throw new Error(`GROK_IMAGE_FETCH_${response.status}`);
    const blob = await response.blob();
    const mimeType = blob.type || "image/png";
    if (!/^image\/(?:png|jpe?g|webp|gif)$/i.test(mimeType)) throw new Error("GROK_IMAGE_TYPE_UNSUPPORTED");
    return { mimeType, base64: bytesToBase64(new Uint8Array(await blob.arrayBuffer())) };
  }

  async function postResult(taskId, result) {
    return request(`/automation/tasks/${encodeURIComponent(taskId)}/result`, {
      method: "POST",
      body: JSON.stringify(result),
    });
  }

  async function executeTask(task) {
    try {
      const previousUrls = new Set([...document.images].map(imageUrl).filter(Boolean));
      await submitPrompt(`Generate an image from this prompt:\n\n${task.payload.prompt}`);
      const timeoutMs = Math.max(10_000, Math.min(180_000, Number(task.payload.timeoutMs) || 120_000));
      const image = await waitForGeneratedImage(previousUrls, timeoutMs);
      const data = await readImage(image);
      const saved = await request("/save-gpt-image", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          sessionId: task.sessionId,
          workspaceRoot: task.workspaceRoot,
          targetDirectory: task.payload.targetDirectory,
          fileName: task.payload.fileName,
        }),
      });
      await postResult(task.taskId, {
        ok: true,
        provider,
        sessionId: task.sessionId,
        filePath: saved.filePath,
        bytes: saved.bytes,
        mimeType: saved.mimeType,
      });
    } catch (error) {
      await postResult(task.taskId, {
        ok: false,
        error: {
          code: error instanceof Error && /^[A-Z0-9_]+$/.test(error.message) ? error.message : "GROK_AUTOMATION_FAILED",
          message: error instanceof Error ? error.message : String(error),
        },
      }).catch(() => {});
    }
  }

  async function run() {
    while (!stopped) {
      try {
        const next = await request(`/automation/next?provider=${provider}&waitMs=20000`, {}, 2);
        if (next.task) await executeTask(next.task);
      } catch {
        await sleep(1_000 + Math.floor(Math.random() * 500));
      }
    }
  }

  if (!isGrokPage()) return;
  window.addEventListener("pagehide", () => { stopped = true; }, { once: true });
  run();
})();
