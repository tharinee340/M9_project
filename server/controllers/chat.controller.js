const database = require('../config/database')

exports.getmessages = (req,res) => {
    const id = req.body.id
    const id2 = req.body.id2
    database.query('SELECT * FROM messages WHERE (user_id1 = ? AND user_id2 = ?) OR (user_id1 = ? AND user_id2 = ?)',[id,id2,id2,id],(err,results)=>{
        if(err) throw err
        return res.send({
            data:results
        })
    })
}

exports.searchmessages = (req,res) => {
    const id = req.body.id
    const id2 = req.body.id2
    const query = req.body.query
    database.query('SELECT * FROM messages WHERE ((user_id1 = ? AND user_id2 = ?) OR (user_id1 = ? AND user_id2 = ?)) AND message LIKE ?',[id,id2,id2,id,'%'+query+'%'],(err,results)=>{
        if(err) throw err
        return res.send({
            data:results
        })
    })
}

exports.clearchat = (req,res) => {
    const id = req.params.id
    const id2 = req.params.id2
    database.query('DELETE FROM messages WHERE (user_id1 = ? AND user_id2 = ?) OR (user_id1 = ? AND user_id2 = ?)',[id,id2,id2,id],(err,results)=>{
        if(err) throw err
        return res.status(200).json({msg:'success'})
    })
}