const route = require('express').Router()
const passport = require('passport')

const user = require('../controllers/user.controller')

route.post('/reg', user.reg)

route.post('/login', passport.authenticate('basic', {session: false}),user.login)

module.exports = route