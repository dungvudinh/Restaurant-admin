var mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost', 
    user:'root', 
    password:'', 
    database: "restaurant_database"
})

connection.connect((err, connection)=>
{
    if(err) console.log("connect to database fail!!!" + err);
    else console.log("connect to db successfully");
})

module.exports = connection;