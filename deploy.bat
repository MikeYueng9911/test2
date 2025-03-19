@echo off
echo === 萨姆·奥尔特曼传记网站部署脚本 ===
echo 此脚本将帮助您将网站部署到GitHub Pages
echo.

REM 检查git是否安装
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo 错误: 没有安装Git。请先安装Git再运行此脚本。
    exit /b 1
)

REM 获取GitHub仓库URL
set /p repo_url=https://github.com/MikeYueng9911/test2.git (例如: https://github.com/username/repo.git): 

if "%repo_url%"=="" (
    echo 错误: 仓库URL不能为空
    exit /b 1
)

REM 初始化Git仓库
echo 初始化Git仓库...
git init

REM 添加所有文件
echo 添加文件到Git...
git add .

REM 提交更改
echo 提交更改...
git commit -m "Initial commit: 萨姆·奥尔特曼传记网站"

REM 添加远程仓库
echo 添加远程仓库...
git remote add origin %repo_url%

REM 推送到远程仓库
echo 推送到远程仓库...
git push -u origin main || git push -u origin master

echo.
echo === 部署完成! ===
echo 请在GitHub仓库设置中启用GitHub Pages功能:
echo 1. 访问 %repo_url:~0,-4%/settings/pages
echo 2. 在Source部分选择'main'或'master'分支
echo 3. 点击Save按钮
echo 4. 几分钟后，您的网站将在GitHub Pages上线
echo.
echo 感谢使用此部署脚本!

pause 