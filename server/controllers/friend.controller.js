const database = require('../config/database')

exports.add = (req,res) => {
    const username = req.body.username
    //find id1
    const sql = `SELECT * FROM users WHERE username = ${username}`
    database.query(sql,(err,results)=>{
        if(err) throw err
        const id1 = results[0].id
        const id2 = req.body.id
        const timestamp = date.Now()
        const sql2 = `INSERT INTO friends (user_id1,user_id2,status,friends_since) VALUES (${id1},${id2},'pending',${timestamp})`
        database.query(sql2,(err,results)=>{
            if(err) throw err
            return res.send({
                error: false
            })
        })
    })
    return res.send({
        error: true
    })

}

exports.search = (req,res) => {
    const query = req.body.query
    const sql = `SELECT * FROM users WHERE username LIKE '%${query}%'`
    database.query(sql,(err,results)=>{
        if(err)throw err
        return res.send({
            error: false,
            data:results
        })
    })
}

exports.list = (req,res) => {
    const username = req.body.username
    const sql = `SELECT * FROM friends WHERE user_id1 LIKE '%${username}%'`
    database.query(sql,(err,results)=>{
        if(err)throw err
        const res = []
        for( let i = 0 ; i < results.length ; i++ ){
            database.query(`SELECT * FROM users WHERE id = ${results[i].id}`,(error,results)=>{
                if(error) throw error
                res.push(results)
            })
        }
        return res.send({
            error:false,
            data:res
        })
    })
}