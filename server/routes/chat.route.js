const route = require('express').Router()

const chatController = require('../controllers/chat.controller')

route.post('/getmessages',chatController.getmessages)

route.post('/searchmessages',chatController.searchmessages)

module.exports = route