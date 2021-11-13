const route = require('express').Router()

const callController = require('../controllers/call.controller')

route.post('/getCall',callController.getCall)


module.exports = route