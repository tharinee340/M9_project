const mysql = require('mysql2')

const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project'
}); 
 
// conn.connect(function(err) {
//   if (err) throw err;
//   console.log('Database is connected successfully !');
// });

module.exports = connect;