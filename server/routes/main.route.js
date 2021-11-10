const route = require('express').Router()
const user = require('./user.route')

route.use('/routes', user)


module.exports = route