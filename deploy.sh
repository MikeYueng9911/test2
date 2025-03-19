#!/bin/bash

# 部署到GitHub Pages的简单脚本

# 颜色变量
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 显示欢迎信息
echo -e "${GREEN}=== 萨姆·奥尔特曼传记网站部署脚本 ===${NC}"
echo "此脚本将帮助您将网站部署到GitHub Pages"
echo ""

# 检查git是否安装
if ! [ -x "$(command -v git)" ]; then
  echo -e "${YELLOW}错误: 没有安装Git。请先安装Git再运行此脚本。${NC}" >&2
  exit 1
fi

# 获取GitHub仓库URL
read -p "请输入您的GitHub仓库URL (例如: https://github.com/username/repo.git): " repo_url

if [ -z "$repo_url" ]; then
  echo -e "${YELLOW}错误: 仓库URL不能为空${NC}"
  exit 1
fi

# 初始化Git仓库
echo -e "${GREEN}初始化Git仓库...${NC}"
git init

# 添加所有文件
echo -e "${GREEN}添加文件到Git...${NC}"
git add .

# 提交更改
echo -e "${GREEN}提交更改...${NC}"
git commit -m "Initial commit: 萨姆·奥尔特曼传记网站"

# 添加远程仓库
echo -e "${GREEN}添加远程仓库...${NC}"
git remote add origin $repo_url

# 推送到远程仓库
echo -e "${GREEN}推送到远程仓库...${NC}"
git push -u origin main || git push -u origin master

echo ""
echo -e "${GREEN}=== 部署完成! ===${NC}"
echo "请在GitHub仓库设置中启用GitHub Pages功能:"
echo "1. 访问 $repo_url/settings/pages"
echo "2. 在Source部分选择'main'或'master'分支"
echo "3. 点击Save按钮"
echo "4. 几分钟后，您的网站将在GitHub Pages上线"
echo ""
echo "感谢使用此部署脚本!" 