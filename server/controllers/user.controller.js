const database = require('../config/database')

exports.reg = function(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if(!username || !password || !email){
        return res.status(400).json({
            message: 'Please fill data!'
        })
    }else{
        const sqlCheck = "SELECT * FROM user WHERE user_name = ? OR user_email = ? LIMIT 1";
        database.query(sqlCheck,[username, email], (err, result) => {
            if(err) throw err

            if (result.length == 1) {
                if(result[0].user_name === username){
                    return res.status(400).json({
                        message: 'Username is already used'
                    })
                }else{
                    return res.status(400).json({
                        message: 'Email is already used'
                    })
                }
            }else{
                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(password, salt);

                const sql = "INSERT INTO user (user_name, user_password, user_email) VALUES (?, ?, ?)"
                database.query(sql,[username, hash, email], (err, result) => {
                    if(err) throw err

                    return res.status(200).json({
                        message: 'Register successfully'
                    });
                })
            }
        })
    }
};

exports.login = function(req, res) {
    if(req.user.error){
        return res.status(400).json({
            message: 'Invalid username or password'
        })
    } else {
        const{username, id} = req.user;
        const token = jwt.sign({username, id}, 'userAccount');
        return res.status(200).json({id, username, token})
    }
};