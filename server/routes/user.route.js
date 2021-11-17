const route = require('express').Router()
const passport = require('passport')
const multer = require('multer')

const userController = require('../controllers/user.controller')

//multer upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: function (req ,file, cb) {
        // cb(null, Date.now() + "--" + file.originalname);
        cb(null, file.originalname)
    }   
})

const upload = multer({ storage: storage })

route.post('/reg/upload', upload.single('image'), (req, res) => {
    console.log('req file',req.file)
    return res.status(200).json(req.file)
})

route.post('/reg', userController.reg)

route.post('/login', passport.authenticate('basic', {session: false}), userController.login)

route.get('/get_user/:id', passport.authenticate('jwt',{session: false}), userController.getuser)

route.post('/new_socket', passport.authenticate('jwt',{session: false}), userController.newsocket)



module.exports = route
