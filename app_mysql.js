const express = require("express");
const pool = require("./mysql-test/mysql/index");
const sql = require("./mysql-test/mysql/mysql");
const mysql = require("./mysql-test/mysql/mysql");

const app = express();

app.listen(3000, () => {
  console.log("3000번 포트에서 서버가 실행중입니당");
});

app.get("/api/test", async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();
    const subjects = await connection.query(sql.subjectList);
    console.log("test1의 subjects 데이터:", subjects[0]);
    res.send(subjects[0]);
  } catch (error) {
    console.error("오류!오류!:", error);
    res.status(500).send("서버 오류입니다!");
  } finally {
    if (connection) {
      pool.releaseConnection(connection);
    }
  }
});

app.delete("/api/test/delete/:subjectId", async (req, res) => {
  const {subjectId} = req.params;

  try {
    const result = await pool.query(sql.subjectDelete, subjectId);
    res.send(result);
  } catch (error) {
    console.error("오류!오류!:", error);
    res.status(500).send("서버 오류입니다!");
  }
});
