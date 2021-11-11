const express = require('./config/express')
const app = express()
const io = require('socket.io')(5001, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

app.listen(8080)

io.on('connection',socket=>{
    console.log(socket.id)
    socket.on('load-requests',(username)=>{
        console.log(username)
    })
})