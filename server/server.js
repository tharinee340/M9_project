const express = require('./config/express')
const database = require('./config/database')
const app = express()
const multer = require('multer')


const io = require('socket.io')(8081, {
    cors: {
        origin: ['http://localhost:3000']
    }
})


app.listen(8080)

io.on('connection',socket=>{
    console.log('connected')
    socket.on('new_message',(id1,id2,message)=>{
        database.query('INSERT INTO messages (user_id1,user_id2,message,sendtime) VALUES (?,?,?,now())',[id1,id2,message],(err,results)=>{
            if(err) throw err
            io.emit('sent_message')
        })
    })
    socket.on('accept_request',()=>{
        console.log('accept')
        io.emit('accept_request')
    })

    socket.on('new_request',()=>{
        console.log('new')
        io.emit('new_request')
    })

    socket.on('delete_event',()=>{
        console.log('delete')
        io.emit('delete_event')
    })

    socket.on('delete_friend',()=>{
        console.log('deletefriend')
        io.emit('delete_friend')
    })
    

    //vd call
    socket.emit('me', socket.io);
    socket.on('end_call', (req, res) => {
        socket.broadcast.emit("callended");
    })
    socket.on("callUser", ({userToCall, signalData, from, name}) => {
         io.to(userToCall).emit("callUser", {signal: signalData, from, name})
    })
    socket.on("answercall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    })

})

