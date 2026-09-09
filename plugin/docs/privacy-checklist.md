# Privacy Checklist

发布到 Git 前检查：

```powershell
rg "Users|AppData|trycloudflare|ngrok-free|TOKEN|authtoken|secret|password|cookie"
```

确认没有：

- 本机用户名
- 真实本地路径
- 临时公网隧道地址
- 固定隧道域名
- token / authtoken / secret
- 浏览器 cookie
- 私人项目资料

推荐只提交：

- `.example` 文件
- 通用文档
- 脱敏脚本
- 占位符路径

