const database = require('../config/database')

// add friend
exports.add = (req,res) => {
    const id = req.body.id
    const id2 = req.body.id2
    const sql = 'SELECT * FROM friends WHERE user_id1 = ? AND user_id2 = ?'
    database.query(sql,[id, id2], (err, result) => {
        if(err) throw err

        if(result.length == 1){
            return res.status(400).json({message:'Add request is on pending!'})
        }else{
            const sql2 = `INSERT INTO friends (user_id1,user_id2,status) VALUES (?, ?, 'pending')`
            database.query(sql2,[id,id2],(err,results)=>{
                if(err) throw err

                return res.status(200).json({message:'Send add request successfully!'})
            })
        }
    })


    
}
// search all users 
exports.search = (req,res) => {
    const query = req.body.query
    const sql = 'SELECT * FROM users WHERE username LIKE ?'
    const formatsql = database.format(sql, ['%'+query+'%'])
    database.query(formatsql,(err,results)=>{
        if(err)throw err
        return res.send({
            error: false,
            data:results
        })
    })
}

// show list friend of userid1
exports.list = (req,res) => {
    const id = req.params.id
    const sql = `SELECT * FROM friends INNER JOIN users ON friends.user_id2 = users.id WHERE user_id1 = ? AND status = 'accepted'`
    database.query(sql, [id], (err,result) => {
        if(err) throw err

        if(result.length == 0){
            return res.status(400).json({message:'no friend'})
        }else{
            return res.status(200).json(result)
        }
    })
}

// show pending list friend of userid1
exports.listrequest = (req,res) => {
    const id = req.params.id
    const sql = 'SELECT * FROM friends INNER JOIN users ON friends.user_id1 = users.id WHERE user_id2 = ? AND status = "pending"'
    database.query(sql, [id], (err, result) => {
        if(err) throw err

        if(result.length == 0){
            return res.status(400).json({message:'No pending request!'})
        }else{
            return res.status(200).json(result)
        }
    })
}

// update pending status to accept status (Be friend!)
exports.confirm = (req,res) => {
    const id = req.body.id
    const id2 = req.body.id2
    const sql = 'SELECT * FROM friends WHERE user_id1 = ? AND user_id2 = ?'
    database.query(sql,[id,id2],(err,results)=>{
        if(err) throw err
        let user_id = results[0].id
        database.query(`UPDATE friends SET status = 'accepted', friends_since = now() WHERE id = ?`,[user_id],(err,results)=>{
            if(err) throw err
            
            const sql2 = 'INSERT INTO friends (user_id1, user_id2, status, friends_since) VALUES (?, ?, ?, ?)'
            database.query(sql2,[id2, id, "accepted", now()], (err,result) => {
                if(err) throw err

                return res.status(200).json({message:'Add friend successfully!'})
            })
        })
    })
}
// delete friend of userid1
exports.delete = (req,res) => {
    const id = req.params.id
    const id2 = req.params.id2
    const sql = `DELETE FROM friends WHERE user_id1 = ? AND user_id2 = ?`
    database.query(sql,[id,id2],(err,results)=>{
        if(err) throw err 
        database.query(sql,[id2,id],(err,results)=>{
            if(err) throw err
    
            return res.status(200).json({message:'Delete successfully!'})
        })
    })
}