'user strict';
var mysql = require('mysql');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;

//local mysql db connection
var Connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     :  process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

module.exports = Connection;