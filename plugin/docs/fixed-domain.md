# 固定域名方案

如果使用临时隧道，ChatGPT 的 MCP URL 可能每次变化。

推荐长期方案：

```text
https://gpt-mcp.your-domain.com/mcp
```

## 一个域名可以做很多事

买一个主域名即可，例如：

```text
example.com
```

然后创建多个子域名：

```text
wiki.example.com
gpt-mcp.example.com
data.example.com
api.example.com
```

这些子域名不需要再次购买。

## Cloudflare Tunnel

适合长期固定地址。

基本流程：

1. 购买域名。
2. 把域名 DNS 托管到 Cloudflare。
3. 创建 Cloudflare Tunnel。
4. 添加 Public Hostname：

```text
gpt-mcp.example.com -> http://127.0.0.1:7676
```

5. ChatGPT 中填写：

```text
https://gpt-mcp.example.com/mcp
```

## ngrok 免费域名注意

ngrok 免费固定域名可能有浏览器 warning 页面。

某些 MCP 客户端无法添加：

```text
ngrok-skip-browser-warning
```

这种情况下 ChatGPT 可能不能正常连接。生产或长期使用建议使用自有域名。

