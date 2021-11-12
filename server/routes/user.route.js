const route = require('express').Router()
const passport = require('passport')

const userController = require('../controllers/user.controller')

route.post('/reg', userController.reg)

route.post('/login', passport.authenticate('basic', {session: false}), userController.login)

route.get('/get_user/:id', userController.getuser)

module.exports = route
