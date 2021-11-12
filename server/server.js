const express = require('./config/express')
const database = require('./config/database')
const app = express()
const io = require('socket.io')(8081, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

app.listen(8080)

io.on('connection',socket=>{
    socket.on('new_message',(id1,id2,message)=>{
        database.query('INSERT INTO messages (user_id1,user_id2,message,sendtime) VALUES (?,?,?,now())',[id1,id2,message],(err,results)=>{
            if(err) throw err
            io.emit('sent_message')
        })
    })
    socket.on('accept_request',()=>{
        io.emit('accept_request')
    })
    socket.on('new_request',()=>{
        io.emit('new_request')
    })
})