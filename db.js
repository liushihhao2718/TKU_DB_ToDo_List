var db_options = {
    host: 'sql2.freesqldatabase.com',
    port: 3306,
    user: 'sql238638',
    password: 'zX6%gY7!',
    database: 'sql238638'
};
var mysql = require('mysql'),
    db = null;
var connection = mysql.createConnection(db_options);
connection.connect();
exports.db = connection;
