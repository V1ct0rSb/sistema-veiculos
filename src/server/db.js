// db.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "senha123",
  database: "sistema_gerenciamento",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connection = pool.promise();

module.exports = connection;
