const route = require('express').Router()
const passport = require('passport')

const friendController = require('../controllers/friend.controller')

route.post('/add', passport.authenticate('jwt',{session: false}), friendController.add)

route.get('/list/:id', passport.authenticate('jwt',{session: false}), friendController.list) 

route.get('/listrequest/:id',passport.authenticate('jwt',{session: false}), friendController.listrequest) 

route.post('/search', passport.authenticate('jwt',{session: false}), friendController.search)

route.post('/confirm', passport.authenticate('jwt',{session: false}), friendController.confirm) 

route.delete('/delete/:id/:id2', passport.authenticate('jwt',{session: false}), friendController.delete)

module.exports = route