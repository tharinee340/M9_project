const route = require('express').Router()
const user = require('./user.route')
const friend = require('./friend.route')

route.use('/users', user)

route.use('/friend', friend)

module.exports = route