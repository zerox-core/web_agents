# webAgents Skill

`webagents` 是给 Codex 使用的本地 Skill，用来组织多模型讨论、集体协作和 Codex 主控会商。

本机安装位置：

```text
F:\CodexHome\skills\webagents
```

推荐终端入口：

```powershell
cd F:\web_agents
.\scripts\council.ps1 "如何确定一个项目真实的开发路线，从设计到落地"
```

可选参数：

```powershell
.\scripts\council.ps1 "问题" -Models gpt,deepseek,doubao,gemini -Rounds 5
.\scripts\council.ps1 "问题" -Models gpt,deepseek -Rounds 3
```

默认行为：

- 主控：Codex
- 参与方：GPT、DeepSeek、豆包、Gemini
- 最大轮数：5
- 输出语言：中文
- 会话目录：`agent-sessions/<timestamp>-council/`

工作方式：

1. 脚本创建会话目录。
2. `prompts/` 里生成给各模型的第一轮提示词。
3. Codex 或用户把提示词发给对应模型。
4. 模型回复保存到 `replies/`。
5. Codex 把关键信息追加到 `transcript.md`。
6. 信息足够后写入 `final.md`。

当前版本优先使用文件协作，不默认做浏览器自动化。网页自动化可以后续接入，但不能作为稳定性前提。

浏览器自动化第一版入口：

```powershell
.\scripts\council-browser.ps1 -DryRun
.\scripts\council-browser.ps1 -KeepOpen
.\scripts\council-browser.ps1 -Submit
.\scripts\council-browser.ps1 -Submit -Collect
```

详见 [webAgents Browser Automation](webagents-browser-automation.md)。
