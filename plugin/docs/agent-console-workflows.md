# 终端 Agent 中控

本页描述一种可选工作流：用 Playwright 控制已经登录的网页 AI，让多个网页模型在一个终端里协作。

它不是官方 API，也不是稳定的 SDK。网页结构改变、登录状态变化、模型选择器变化，都可能导致选择器需要调整。

## 目标

支持两类协作方式：

- 主控模式：ChatGPT 作为 coordinator，GPT3 / Gemini / DeepSeek / Zhipu 作为 worker agent。
- 会商模式：多个网页模型像聊天室一样平等讨论，再整理共识。
- 文档协作模式：多个网页模型读写同一个会话目录，而不是由终端复制长回复。

## 推荐命令设计

```text
直接输入文字                 创建/补充当前任务，并按当前工作流推进
Enter / 继续                 推进下一步
/auto                       按目标持续推进，直到完成/准备执行/需要用户确认
/final                      基于会话文档汇总
/new 任务内容               新建会话
/resume                     恢复历史会话

/gpt 你好                   只发给 ChatGPT
/gpt3 你好                  只发给第二个 ChatGPT 账号
/gemini 你好                只发给 Gemini
/ds 你好                    只发给 DeepSeek
/zhipu 你好                 只发给 Zhipu

/use                        勾选参与模型
/mode                       选择总控模型，none 表示普通聊天室
/collab file                文档协作模式，推荐默认
/collab relay               网页转述模式，备用
/where                      查看当前会话文件位置
/models                     查看当前网页模型识别结果
/reset                      关闭模型页签，重新打开干净页面
/read path                  读取本地文件内容到终端查看
/help                       显示帮助
/quit                       退出
```

中文命令可以按需增加，例如 `/清场`、`/全部`、`/智谱`。

## 主控模式

主控模式适合大多数工作任务。

流程：

```text
1. 总控模型读取当前会话文档。
2. 总控判断下一步是 ASK、STOP 还是 BUILD。
3. 如果 ASK，只询问当前真正需要的 worker 模型。
4. Worker 模型读写同一份会话文档。
5. 总控再次读取文档并判断是否继续。
6. 目标足够清楚、信息足够或需要执行时停下。
```

不要固定“必须跑几轮”。Agent 工作流应该像正常协作一样：完成目标就停，需要用户确认就停。

推荐 prompt 结构：

```text
你是多模型 agent 工作流的 coordinator（负责人）。
用户任务：...

请先拆解任务，并给当前启用的 worker agent 分派工作。
输出：
1. 总目标
2. 关键约束
3. 给每个 worker 的任务
4. 期望返回格式
```

Worker prompt：

```text
你是多模型工作流里的 worker agent：{name}。
用户原始任务：...
Coordinator 的任务分派：...

请只执行分派给你的那部分工作。
输出：
- 结论
- 依据
- 风险/不确定点
- 建议的下一步
- 是否需要其他 agent 补充
```

## 会商模式

会商模式适合少数需要多视角碰撞的问题，例如架构争议、产品方向、复杂取舍。

流程：

```text
1. 参与模型按顺序读取会话文档。
2. 每个模型把本轮意见追加到 chat.md。
3. 每轮结束后根据 STATE 判断是否继续。
4. 全部模型都认为 STOP，或任一模型提出 BUILD 时停下。
```

会商模式也不建议硬跑固定轮次。可以保留轮次命令作为兼容入口，但默认应由目标完成状态决定是否继续。

## 文档协作模式

推荐默认使用文档协作模式。终端只给网页模型发送短指令，让模型通过本地文件工具打开会话目录：

```text
agent-sessions/<session>/
  task.json
  protocol.md
  chat.md
  outbox/
```

模型把意见写进 `chat.md` 和自己的 `outbox/*.md`。终端检测文件变化后继续调度。

详见 [文档协作模式](document-collaboration.md)。

## 备用账号

如果同一网页模型有多个付费账号，建议懒加载备用账号：

```text
1. 启动时只打开主账号。
2. 检测到额度/限制提示后，再打开备用账号。
3. 将同一条消息发送给备用账号。
```

常见检测词：

```text
quota
limit
rate
try again later
too many
capacity
额度
上限
限制
稍后
```

网页端没有稳定的额度 API，因此只能做启发式检测。

## 第二个 ChatGPT 账号

可以把另一个 Edge profile 里的 ChatGPT 账号命名为 `gpt3`，作为 worker agent 使用：

```json
{
  "agentConsole": {
    "selectedAssistants": ["gpt3", "gemini", "deepseek"],
    "gptAccounts": [
      { "name": "GPT - main", "model": "gpt", "profileDirectory": "Profile 1" },
      { "name": "GPT3", "model": "gpt3", "profileDirectory": "Profile 2" }
    ]
  }
}
```

注意：这仍然是网页自动化，不是 API。Edge 普通窗口占用 profile 时，终端可能无法接管对应账号；脚本应提示用户关闭普通 Edge 后再启动，而不是强行关闭用户窗口。

## 模型识别

终端可以从网页文本里启发式识别当前模型，例如：

```text
Gemini Pro
Gemini Flash
DeepSeek R1
DeepSeek V3
GLM
GPT-4o
```

如果检测到 Gemini Flash，建议提示用户确认是否已经从 Pro 降级。

## 安全边界

- 不要自动关闭用户正在使用的普通浏览器窗口。
- 不要把真实 profile 名、账号名、token、临时公网域名提交到公开仓库。
- 不要默认打开所有备用账号；备用账号应按需打开。
- 不要承诺网页自动化 100% 稳定。

## 限制

- 网页 DOM 改版会导致输入框、发送按钮、回复区域选择器失效。
- 不同账号之间没有天然共享上下文，需要脚本把必要摘要传过去。
- 网页端模型切换、额度限制、登录弹窗都只能通过页面文本或 UI 状态推断。
