**简体中文** | [English](README.en.md)

# Web Agents

Web Agents 是 web_Agent 插件产品与共享文件安全底座的单分支仓库：`main` 分支的根目录是共享底座 @web-agents/local-core，`plugin/` 目录是 web_Agent 浏览器插件产品，两者同分支存放、独立测试、独立发布。多模型圆桌工作台 TableLLM 已迁移至独立仓库 [zhuxice-ctrl/web_agent_tablellm](https://github.com/zhuxice-ctrl/web_agent_tablellm)，其 `tablellm` 分支完整历史与 `tablellm-v*` 标签一并迁移。

## 仓库结构

| 正式分支 | 当前版本 | 主要职责 | Core 依赖 |
| --- | --- | --- | --- |
| [`main`](https://github.com/zhuxice-ctrl/web_agents/tree/main) 根目录 | `local-core 1.0.1` | 路径、权限、事务和文件工具共享底座 | 独立底座 |
| [`main`](https://github.com/zhuxice-ctrl/web_agents/tree/main) 的 `plugin/` 目录 | `web_Agent 1.0.2` | 浏览器扩展、本地文件系统 MCP、插件网关 | `local-core 1.0.1` |
| 已迁移 → [web_agent_tablellm](https://github.com/zhuxice-ctrl/web_agent_tablellm) | `TableLLM 1.0.1` | 多模型圆桌界面、调度器和浏览器运行时（独立仓库） | `local-core 1.0.0` |

```text
main
  ├─ /（仓库根目录）= @web-agents/local-core 共享底座
  └─ plugin/ = web_Agent 插件（通过 local-core-v* 标签引用 Core）
```

独立仓库 web_agent_tablellm（圆桌产品）同样通过本仓库的 `local-core-v*` 标签引用 Core。

仓库永久保留的远端分支只有 `main` 一条。历史版本通过 `local-core-v*`、`webagent-v*` 标签保存，不使用永久版本分支；`tablellm-v*` 标签已随圆桌迁移至独立仓库。

## 如何选择分支

默认克隆得到 `main`，适合开发或审计共享 Core：

```powershell
git clone https://github.com/zhuxice-ctrl/web_agents.git
cd web_agents
npm ci
npm test
```

开发插件进入 `plugin/` 目录：

```powershell
cd plugin
npm ci
npm run start:plugin
```

开发圆桌请克隆独立仓库：

```powershell
git clone https://github.com/zhuxice-ctrl/web_agent_tablellm.git
cd web_agent_tablellm
npm ci
npm run start:roundtable
```

不同产品应使用独立工作目录，避免在同一个工作树中反复切换分支时混入本地配置、浏览器数据或未提交文件。

## 版本兼容

| 产品 | 产品版本 | 固定 Core 版本 | 发布标签 |
| --- | --- | --- | --- |
| Local Core | `1.0.1` | - | `local-core-v1.0.1` |
| web_Agent | `1.0.2` | `1.0.1` | `webagent-v1.0.2` |
| TableLLM | `1.0.1` | `1.0.0` | `tablellm-v1.0.1`（[web_agent_tablellm](https://github.com/zhuxice-ctrl/web_agent_tablellm)） |

产品通过不可变标签引用 Core。Core 发布新版本后，插件和圆桌分别升级依赖并运行各自完整测试，不要求同时升级。

## Local Core

`@web-agents/local-core` 是 web_Agent 插件与 TableLLM 圆桌共享的文件系统安全与事务基础。它负责：

- 规范化 Windows 路径、扩展路径前缀和大小写。
- 解析真实物理路径，并阻止目录连接点绕过写入边界。
- 对相同文件或目录子树的修改进行并发锁定。
- 生成、批准、拒绝和消费一次性或任务级权限。
- 执行原子写入、备份、事务提交、幂等恢复和冲突保护回滚。
- 提供带权限元数据和审计记录的文件系统工具。
- 提供受权限控制的单文件 `delete_file`，但不开放递归目录删除。

Core 不包含浏览器界面、模型网页适配器、HTTP 服务、工作区选择界面或产品运行时。

## 安装

运行环境：Windows、Linux 或 macOS，以及 Node.js 24 或更高版本。

推荐固定到发布标签：

```json
{
  "dependencies": {
    "@web-agents/local-core": "https://github.com/zhuxice-ctrl/web_agents/archive/refs/tags/local-core-v1.0.1.tar.gz"
  }
}
```

随后运行：

```powershell
npm install
```

不要让产品直接依赖 `main` 的浮动提交，也不要把 Core 源码复制进产品分支。

## 公开模块

| 导入路径 | 用途 |
| --- | --- |
| `@web-agents/local-core/paths` | 路径规范化、精确锁和子树锁 |
| `@web-agents/local-core/real-paths` | 真实路径解析与修改身份校验 |
| `@web-agents/local-core/atomic-file` | 原子文件和 JSON 写入 |
| `@web-agents/local-core/permissions` | 产品可注入的权限请求协调器 |
| `@web-agents/local-core/permission-store` | 权限请求、批准和令牌持久化 |
| `@web-agents/local-core/transactions` | 文件事务、备份、回滚和执行幂等性 |
| `@web-agents/local-core/tool-registry` | 工具元数据验证与默认注册表 |
| `@web-agents/local-core/filesystem-tools` | 文件读取、搜索、修改和删除工具实现 |

## 安全边界

Core 默认采用失败关闭策略：未知工具、缺少权限元数据、授权路径与物理路径不一致、跨工作区回滚和连接点写入都会被拒绝。

权限令牌绑定请求、任务、工具、路径和参数摘要，不能挪用于其他操作。事务回滚会核对当前文件哈希；如果用户在事务之后修改了文件，Core 会保留后续编辑并生成恢复副本，而不是静默覆盖。

产品仍需负责：

- 决定哪些用户输入构成明确路径意图。
- 显示授权界面并收集批准或拒绝操作。
- 选择工作区、会话、浏览器和模型网页。
- 保护 HTTP、浏览器扩展和其他传输边界。

## 测试

安装依赖并运行全部 Core 测试：

```powershell
npm ci
npm test
```

测试覆盖原子写入、Windows 路径、并发锁、权限令牌、真实路径、工具元数据、文件删除、事务恢复和产品依赖隔离。

## 发布与开发规则

- 补丁版本保持现有公开导出兼容。
- 次版本可以增加导出或可选行为。
- 主版本可以修改权限或文件系统契约。
- 共享能力先在 `main` 完成测试，再创建 `local-core-vX.Y.Z` 标签。
- `plugin/` 与 web_agent_tablellm 仓库的 `tablellm` 分支只通过固定标签升级 Core，产品间不共享源码目录。
- 临时功能分支合入后删除，长期远端分支始终只有 main 一条。
- 禁止提交本机绝对路径、授权白名单、账号信息、令牌或真实会话数据。

## 许可证

[MIT](LICENSE)
