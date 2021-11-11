const database = require('../config/database')

exports.add = (req,res) => {
    const id = req.body.id
    const id2 = req.body.id2
    const sql2 = `INSERT INTO friends (user_id1,user_id2,status) VALUES ((?),(?),'pending')`
    database.query(sql2,[id,id2],(err,results)=>{
        if(err) throw err
        return res.send({
            error: false
        })
    })
}

exports.search = (req,res) => {
    const query = req.body.query
    const sql = `SELECT * FROM users WHERE username LIKE '%(?)%'`
    database.query(sql,[query],(err,results)=>{
        if(err)throw err
        return res.send({
            error: false,
            data:results
        })
    })
}

exports.list = (req,res) => {
    const id = req.body.id
    let friends = []
    const sql = `SELECT * FROM friends WHERE user_id1 LIKE '%${id}%' AND status = 'accepted'`
    database.query(sql,(err,results)=>{
        if(err)throw err
        results.forEach((result)=>{
            database.query('SELECT * FROM users WHERE id = (?)',[result.user_id2],(err,results)=>{
                if(err) throw err
                friends.push(results[0])
            })
        })  
    })
}

exports.listrequest = (req,res) => {

}

exports.confirm = (req,res) => {
    const id = req.body.id
    const id2 = req.body.id2
    const sql = `SELECT * FROM friends WHERE user_id1 = (?) AND user_id2 = (?)`
    database.query(sql,[id,id2],(err,results)=>{
        if(err) throw err
        let user_id = results[0].id
        database.query(`UPDATE friends SET status = 'accepted', friends_since = now() WHERE id = (?)`,[user_id],(err,results)=>{
            if(err) throw err
            return res.send({
                error:false
            })
        })
    })
}

exports.delete = (req,res) => {
    const id = req.body.id
    const id2 = req.body.id2
    const sql = `DELETE FROM friends WHERE user_id1 = (?) AND user_id2 = (?)`
    database.query(sql,[id,id2],(err,results)=>{
        if(err) throw err
        return res.send({
            error:false
        })
    })
}