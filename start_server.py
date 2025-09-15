#!/usr/bin/env python3
"""
局域网服务器启动脚本
用于在局域网内部署个人简历网站
"""

import http.server
import socketserver
import socket
import os
import webbrowser
from pathlib import Path

# 设置端口
PORT = 8888

# 获取本机IP地址
def get_local_ip():
    try:
        # 创建一个UDP socket
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # 连接到一个公共DNS服务器
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except:
        return "127.0.0.1"

# 自定义请求处理器
class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # 添加CORS头，允许跨域访问
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        # 添加缓存控制
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()
    
    def log_message(self, format, *args):
        # 自定义日志格式
        print(f"[访问] {self.client_address[0]} - {format % args}")

def start_server():
    # 切换到网站根目录
    web_dir = Path(__file__).parent
    os.chdir(web_dir)
    
    # 获取本地IP
    local_ip = get_local_ip()
    
    print("=" * 60)
    print("🚀 财经商贸个人简历网站服务器")
    print("=" * 60)
    print(f"✅ 服务器正在启动...")
    print(f"📁 网站目录: {web_dir}")
    print("-" * 60)
    
    # 创建服务器
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        httpd.allow_reuse_address = True
        
        print(f"✨ 服务器启动成功！")
        print("-" * 60)
        print(f"🌐 访问地址:")
        print(f"   本机访问: http://localhost:{PORT}")
        print(f"   局域网访问: http://{local_ip}:{PORT}")
        print("-" * 60)
        print(f"📱 手机扫码访问:")
        print(f"   请确保手机与电脑在同一WiFi网络")
        print(f"   在手机浏览器输入: http://{local_ip}:{PORT}")
        print("-" * 60)
        print(f"⌨️  按 Ctrl+C 停止服务器")
        print("=" * 60)
        print("\n📝 访问日志:")
        
        # 自动在浏览器中打开
        try:
            webbrowser.open(f'http://localhost:{PORT}')
        except:
            pass
        
        try:
            # 启动服务器
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 服务器已停止")
            httpd.shutdown()

if __name__ == "__main__":
    try:
        start_server()
    except Exception as e:
        print(f"❌ 启动失败: {e}")
        print("💡 提示: 请检查端口8888是否被占用")