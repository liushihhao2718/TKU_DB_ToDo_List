var db_options = {
    host: '',
    port: 3306,
    user: '',
    password: '',
    database: ''
};
var mysql = require('mysql'),
    db = null;
var connection = mysql.createConnection(db_options);
connection.connect();
exports.db = connection;
