const route = require('express').Router()

const friendController = require('../controllers/friend.controller')

route.post('/add',friendController.add)

route.get('/list/:id',friendController.list) 

route.get('/listrequest/:id',friendController.listrequest) 

route.post('/search',friendController.search)

route.post('/confirm',friendController.confirm) 

route.delete('/delete/:id',friendController.delete)

module.exports = route