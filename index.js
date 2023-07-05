const express = require('express')
const app = express()
const http = require('http').Server(app)

const port = 4000

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
})

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('message', (data) => {
        console.log(data)
        socketIO.emit('messageResponse', data)
    })
    socket.on('disconnect', () => {
        console.log(`🔥: ${socket.id} user disconnected`);
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: "hello world"
    })
})

http.listen(port, console.log(`listening on port ${port}`))