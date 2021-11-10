const route = require('express').Router()

const friendController = require('../controllers/friend.controller')

route.post('/add',friendController.add)

route.get('/list',friendController.list)

route.get('/search',friendController.search)

module.exports = route