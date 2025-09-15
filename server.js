const express = require('express');
const path = require('path');

const app = express();
const PORT = 4004;

// 设置静态文件目录
app.use(express.static('.'));

// 主路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(PORT, '127.0.0.1', () => {
    console.log(`财经商贸项目服务器运行在 http://127.0.0.1:${PORT}/`);
    console.log('按 Ctrl+C 停止服务器');
});