const route = require('express').Router()

const friendController = require('../controllers/friend.controller')

route.post('/add',friendController.add)

route.post('/list',friendController.list)

route.post('/search',friendController.search)

route.post('/confirm',friendController.confirm)

route.post('/delete',friendController.delete)

module.exports = route