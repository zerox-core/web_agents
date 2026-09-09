@echo off
setlocal
chcp 65001 >nul
set "PRODUCT_ROOT=%~dp0"
pushd "%PRODUCT_ROOT%" >nul

rem Avoid starting a second copy when the plugin services are already running.
set "FILESYSTEM_PID="
set "GATEWAY_PID="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":3006 .*LISTENING"') do set "FILESYSTEM_PID=%%P"
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":3017 .*LISTENING"') do set "GATEWAY_PID=%%P"

if defined FILESYSTEM_PID if defined GATEWAY_PID (
  echo web_Agent services are already running.
  echo Filesystem MCP: http://127.0.0.1:3006/sse
  echo Gateway:        http://127.0.0.1:3017
  pause
  popd >nul
  exit /b 0
)

if defined FILESYSTEM_PID (
  echo ERROR: port 3006 is already in use, but port 3017 is not listening.
  echo Stop the process using port 3006, then run this script again.
  pause
  popd >nul
  exit /b 1
)

if defined GATEWAY_PID (
  echo ERROR: port 3017 is already in use, but port 3006 is not listening.
  echo Stop the process using port 3017, then run this script again.
  pause
  popd >nul
  exit /b 1
)

node "%PRODUCT_ROOT%services\start-plugin-services.mjs"
set "EXIT_CODE=%ERRORLEVEL%"
popd >nul
if not "%EXIT_CODE%"=="0" pause
exit /b %EXIT_CODE%
