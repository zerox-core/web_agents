# webAgents Browser Automation

This is the first browser automation layer for webAgents council sessions.

It reads generated prompt files from `agent-sessions/<session>/prompts/` and opens the matching web model pages:

- `gpt` -> ChatGPT
- `deepseek` -> DeepSeek
- `doubao` -> Doubao
- `gemini` -> Gemini

## Recommended Flow

Create a council session:

```powershell
cd F:\web_agents
.\scripts\council.ps1 "如何确定一个项目真实的开发路线，从设计到落地"
```

Preview where prompts will be sent:

```powershell
.\scripts\council-browser.ps1 -DryRun
```

Open browser pages and insert prompts without sending:

```powershell
.\scripts\council-browser.ps1 -KeepOpen
```

Insert and submit prompts:

```powershell
.\scripts\council-browser.ps1 -Submit
```

Insert, submit, wait for replies, and save them back to the council session:

```powershell
.\scripts\council-browser.ps1 -Submit -Collect
```

Send to selected models only:

```powershell
.\scripts\council-browser.ps1 -Models gpt,deepseek -Submit
```

Use a longer wait when models are slow:

```powershell
.\scripts\council-browser.ps1 -Models gpt,deepseek -Submit -Collect -ReplyTimeoutMs 300000
```

## Browser Profile

The script uses a separate persistent browser profile by default:

```text
F:\web_agents\.webagents-browser-profile
```

Log in to ChatGPT, DeepSeek, Doubao, and Gemini once in this automated profile. The cookies remain local and must not be committed.

## Dependency

Live browser automation requires Playwright:

```powershell
npm install -D playwright
```

`-DryRun` does not require Playwright and is safe for offline verification.

## Safety Defaults

- The script defaults to insert-only mode.
- Add `-Submit` only when you want it to click send.
- Add `-Collect` only when you want it to wait for visible replies and write `replies/round-XX-model.md`.
- If a provider page changes and no composer is found, the script stops with an error instead of guessing blindly.
- If no send button is found with `-Submit`, it uses Enter as a fallback.
- If reply collection fails, the script writes `replies/round-XX-model.error.md`.

## Limitations

This is webpage automation, not an official provider API. Login screens, model picker changes, rate limits, captcha, DOM changes, streaming UI changes, and regional blocks can interrupt the run.
