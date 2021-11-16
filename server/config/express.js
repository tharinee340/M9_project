const express = require('express')
const main = require('../routes/main.route')
const passport = require('./passport')
const app = express()
const cors = require('cors')


module.exports = () => {

    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(express.static('images'))
    app.use(cors())
    passport()

    app.use('/auth', main)
    
    const listen = (port) => {
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        })
    }

    return {listen}
}


