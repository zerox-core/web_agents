# Document Collaboration Mode

文档协作模式用于替代“终端把 A 模型回复复制给 B 模型”的低效流程。

核心思路：

```text
终端 Agent -> 给网页模型发送短指令
网页模型 -> 使用本地文件工具读取会话目录
网页模型 -> 追加写入 chat.md / outbox/*.md
终端 Agent -> 只检测文件是否变化，并决定下一步
```

终端只做调度，不搬运长回复。多个网页模型通过同一个会话文件夹交流。

## 会话目录

推荐每次任务单独创建一个会话目录：

```text
agent-sessions/
  20260629-123456-task-title/
    task.json
    protocol.md
    chat.md
    blackboard.md
    outbox/
      gpt-controller.md
      gpt3.md
      gemini.md
      deepseek.md
      zhipu.md
    model-notes/
```

文件用途：

- `task.json`：当前目标、状态、轮次、参与模型。
- `protocol.md`：给网页模型看的读写规则。
- `chat.md`：共享讨论区，所有模型按时间追加内容。
- `outbox/*.md`：每个模型本轮输出。终端用它判断模型是否真的写了文件。
- `blackboard.md`：旧流程兼容文件，可保留但不作为主交流区。

## protocol.md 内容

`protocol.md` 应告诉模型：

- 先读 `task.json`、`chat.md`。
- 不要覆盖别人内容。
- 每次发言追加到 `chat.md` 末尾。
- 同时把本轮完整输出写入自己的 `outbox/<model>.md`。
- 输出末尾写状态：

```text
STATE: CONTINUE
STATE: STOP
STATE: BUILD
```

状态含义：

- `CONTINUE`：继续协作。
- `STOP`：信息足够，可以汇总。
- `BUILD`：可以进入执行/施工阶段，需要用户确认。

## 总控模型

如果启用总控模型，总控不应该固定轮次，而是像一个 agent 一样判断下一步：

```text
ACTION: ASK
MODELS: GPT3, Gemini, DeepSeek
REASON: ...
QUESTION: ...
```

可选动作：

- `ASK`：询问一个或多个 worker 模型。
- `STOP`：停止讨论，进入总结。
- `BUILD`：停止讨论，等待用户确认执行。

## 终端等待逻辑

终端发送短指令后，记录这些文件的大小和修改时间：

```text
chat.md
outbox/<model>.md
```

如果文件变化，认为模型完成本轮。

如果网页有回复但文件没变化，说明模型没有成功调用本地文件工具，可以临时退回“网页转述模式”。

如果超时，终端应把控制权还给用户，不要卡死。

## 推荐命令

```text
/collab file     使用文档协作模式
/collab relay    使用网页转述备用模式
/where           查看当前会话文件位置
/board           查看 chat.md 末尾
/final           汇总当前会话
```

## 隐私注意

不要提交真实会话目录、`chat.md`、`outbox`、浏览器 profile 名、临时公网域名或本地绝对路径。

开源仓库里只保留通用模板和示例配置。
