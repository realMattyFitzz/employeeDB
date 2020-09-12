require('dotenv').config();

// get the client
const mysql = require('mysql');
// create the connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 8080,
    user: process.env.DB_USER, 
    password: "",
    database: process.env.DB_NAME
});

module.exports = connection;