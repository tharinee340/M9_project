const express = require("express");
const router = express.Router();
const db = require("./config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post('/register',(req,res,next)=>{
    db.query(`SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(req.body.username)});`,(err, result) => {
          if (result.length) {
            return res.status(409).send({
              msg: "This user is already in use!",
            });
          } else {
            // username is available
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                return res.status(500).send({
                  msg: err,
                });
              } else {
                // has hashed pw => add to database
                db.query(`INSERT INTO users (username, email, password) VALUES ('${req.body.username}', ${db.escape(req.body.email)}, ${db.escape(hash)})`,(err, result) => {
                    if (err) {
                      throw err;
                    }
                    return res.status(201).send({
                      msg: "The user has been registerd with us!",
                    });
                  }
                );
              }
            });
          }
        }
      );
})

router.post('/login',(req,res,next)=>{
    db.query(`SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,(err, result) => {
          // user does not exists
          if (err) {
            throw err;
          }
          if (!result.length) {
            return res.status(401).send({
              msg: "Email or password is incorrect!",
            });
          }
          // check password
          bcrypt.compare(req.body.password,result[0]["password"],(bErr, bResult) => {
              // wrong password
              if (bErr) {
                throw bErr;
              }
              if (bResult) {
                const token = jwt.sign(
                  { id: result[0].id },
                  "the-super-strong-secrect",
                  { expiresIn: "1h" }
                );
                db.query(`UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`);
                return res.status(200).send({
                  msg: "Logged in!",
                  token,
                  user: result[0],
                });
              }
              return res.status(401).send({
                msg: "Username or password is incorrect!",
              });
            }
          );
        }
      );
})

module.exports = router