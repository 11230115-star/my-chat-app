const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('有新用戶連線了！ID:', socket.id);
    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });
    socket.on('disconnect', () => {
        console.log('用戶已離開:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`伺服器已在 Port ${PORT} 啟動`);
});