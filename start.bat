if not "%minimized%"=="" goto :minimized 
set minimized=true
@echo off
cd "D:\EmSight Zoho API Test\emsight-node"

start /min PowerShell.exe /C "npm start"
goto :EOF
:minimized