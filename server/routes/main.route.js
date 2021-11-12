const route = require('express').Router()
const user = require('./user.route')
const friend = require('./friend.route')
const chat = require('./chat.route')

route.use('/users', user)

route.use('/friend', friend)

route.use('/chat', chat)


module.exports = route