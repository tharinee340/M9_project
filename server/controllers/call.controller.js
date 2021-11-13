const database = require('../config/database')

exports.getCall = (req,res) => {
    const id = req.body.id
    const id2 = req.body.id2
    database.query('SELECT * FROM messages WHERE (user_id1 = ? AND user_id2 = ?) OR (user_id1 = ? AND user_id2 = ?)',[id,id2,id2,id],(err,results)=>{
        if(err) throw err
        return res.send({
            data:results
        })
    })
}