const express = require("express");
const https = require("https");
const fs = require("fs");
const pool = require("./mysql/index");
const sql = require("./mysql/mysql");

const app = express();
const PORT = process.env.PORT || 3000;

const options = {
  key: fs.readFileSync(__dirname + "/tls/ohneul-chat.com.key"),
  cert: fs.readFileSync(__dirname + "/tls/ohneul-chat.crt"),
  ca: fs.readFileSync(__dirname + "/tls/ohneulCA.pem"),
};

const server = https.createServer(options, app);

server.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});

app.get("/", (req, res) => {
  res.send("HI EVERYONE!");
});

app.get("/api/test", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const subjects = await connection.query(sql.subjectList);
    console.log("test1의 subjects 데이터:", subjects[0]);
    res.send(subjects[0]);
  } catch (error) {
    console.error("오류!오류!:", error);
    res.status(500).send("서버 오류입니다!");
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
