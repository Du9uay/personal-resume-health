#!/bin/bash
# 局域网部署启动脚本

echo "======================================"
echo "  财经商贸个人简历 - 局域网部署"  
echo "======================================"

# 检查Python3是否安装
if ! command -v python3 &> /dev/null; then
    echo "❌ 未找到Python3，请先安装Python3"
    exit 1
fi

# 启动服务器
python3 start_server.py