$ErrorActionPreference = "Stop"

$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "Web AI Local MCP Bridge" -ForegroundColor Cyan
Write-Host ""
Write-Host "This is a template project."
Write-Host "Copy config.example.json to config.local.json and edit it first."
Write-Host ""
Write-Host "Read docs:"
Write-Host "  docs/chatgpt-devspace.md"
Write-Host "  docs/gemini-mcp-superassistant.md"
Write-Host "  docs/fixed-domain.md"
Write-Host "  docs/troubleshooting.md"

