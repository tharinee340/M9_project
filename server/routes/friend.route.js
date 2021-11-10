const route = require('express').Router()

const friend = require('../controllers/friend.controller')

route.post('/add',friend.add)

route.get('/list',friend.list)

route.get('/search',friend.search)

module.exports = route