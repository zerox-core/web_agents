# Troubleshooting

## ChatGPT 报 Invalid Host

通常是 ChatGPT 还在连接旧的临时域名。

解决：

- 更新 MCP URL
- 如果界面不能修改 URL，删除旧连接后重新添加
- 长期使用固定域名

## DevSpace 返回 502

通常是本地 DevSpace 服务或隧道没有正常工作。

检查：

```powershell
Test-NetConnection -ComputerName 127.0.0.1 -Port 7676
```

## ChatGPT 显示 We couldn't connect your account

这通常不是项目目录错误，而是 ChatGPT 无法通过公网 MCP URL 连接到本地 DevSpace。

先检查本地服务：

```powershell
Get-NetTCPConnection -LocalPort 7676 -ErrorAction SilentlyContinue
```

如果本地端口正在监听，再看隧道日志。

Cloudflare Tunnel 如果反复出现类似：

```text
failed to dial a quic connection
timeout: no recent network activity
```

可以把隧道协议从默认 QUIC 改成 HTTP/2：

```powershell
cloudflared tunnel --protocol http2 --url http://127.0.0.1:7676 --no-autoupdate
```

然后把新的 `https://.../mcp` 地址重新填到 ChatGPT。

注意：直接访问 `http://127.0.0.1:7676/mcp` 返回 `401 Unauthorized` 通常是正常的，表示 DevSpace 有授权保护，不代表服务坏了。

## Gemini 显示 Server Connected 但没有工具

可能是：

- 后端没有返回工具
- MCP SuperAssistant UI 兼容问题
- 工具 schema 字段不兼容

检查本地服务是否能列出工具。

## ngrok 页面显示 warning

如果访问固定 ngrok 域名时返回 warning HTML，而不是 MCP JSON / SSE 响应，ChatGPT 可能无法使用。

建议改用自己的域名。

## 不要提交个人信息

提交前搜索：

```powershell
rg "Users|AppData|trycloudflare|ngrok-free|TOKEN|authtoken|secret|Profile [0-9]|127\\.0\\.0\\.1:[0-9]+"
```
