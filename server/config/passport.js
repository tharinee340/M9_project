const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const bcrypt = require('bcrypt')
const connect = require('../config/database')



module.exports = () => {

    passport.use(passport.initialize())

    passport.use(new BasicStrategy((username, password, done) => {
        const sql = "SELECT * FROM user WHERE user_name = ? LIMIT 1"
        connect.query(sql, [username], (err, result) => {
            if(err) throw err
    
            if(result.length === 0){
                done(null, false);
            }else {
                const userPassword = result[0].user_password;
                if(!bcrypt.compareSync(password, userPassword)){
                    return done(null, {
                        error: true
                    })
                }else {
                    done(null, {
                        id: result[0].user_id,
                        username: result[0].user_name
                    })
                }
            }
        })
    }));

    passport.use(new JwtStrategy({
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : 'userAccount',
    }, (payload, done) => {
        if(!payload){
            done(null, error)
        }else{
            done(null, payload)
        }
    }));

}