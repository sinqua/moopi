export {}
const mysql = require("mysql2");
require('dotenv').config();
let db;

try {
    db = mysql.createConnection({
        user : process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE
});
} catch (err) {
    console.error(err);
}


module.exports = db;