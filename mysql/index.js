const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "2G7fe*-351",
  database: "test",
});

module.exports = pool;
