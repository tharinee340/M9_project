const route = require('express').Router()

const chatController = require('../controllers/chat.controller')

route.post('/getmessages', chatController.getmessages)

route.post('/searchmessages', chatController.searchmessages)

route.delete('/clearchat/:id/:id2', chatController.clearchat)

module.exports = route