const route = require('express').Router()
const user = require('./user.route')
const friend = require('./friend.route')
const chat = require('./chat.route')
const call = require('./call.route')

route.use('/users', user)

route.use('/friend', friend)

route.use('/chat', chat)

route.use('/call', call)


module.exports = route