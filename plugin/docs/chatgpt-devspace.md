# ChatGPT + DevSpace Local

ChatGPT 网页端访问本地文件，需要一个公网可访问的 MCP 地址。

常见结构：

```text
ChatGPT -> HTTPS tunnel -> DevSpace Local -> local filesystem
```

## 步骤

1. 启动 DevSpace Local。
2. 确认本地服务监听：

```text
http://127.0.0.1:7676/mcp
```

3. 使用 Cloudflare Tunnel、ngrok、或自己的固定域名把它暴露成 HTTPS。
4. 在 ChatGPT 的自定义 MCP / Developer Mode / Apps 页面添加该 URL。

示例：

```text
https://gpt-mcp.example.com/mcp
```

## 临时隧道

`trycloudflare.com` 很方便，但地址可能每次变化。

优点：

- 免费
- 不需要域名

缺点：

- URL 不固定
- ChatGPT 里可能需要删除旧连接再重新添加

## 固定域名

长期使用建议配置：

```text
https://gpt-mcp.your-domain.com/mcp
```

详见 [固定域名方案](fixed-domain.md)。

