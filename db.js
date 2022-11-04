const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "spoticfy"
});

module.exports = conn;
