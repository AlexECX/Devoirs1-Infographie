@echo off
if %1. ==. GOTO auto_port
start http://127.0.0.1:%1/Travaux/main.html
Exit /b

:auto_port
start http://127.0.0.1:8009/Travaux/main.html
Exit /b


