var db_options = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'DB_Project'
};
var mysql = require('mysql'), db = null;
var connection = mysql.createConnection(db_options);
connection.connect();
exports.db = connection;