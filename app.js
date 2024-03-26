const express = require("express");
const path = require("path");

const app = express();

// 정적 파일을 제공하기 위해 express.static 미들웨어를 사용합니다.
app.use(express.static(path.join(__dirname, "public")));

// 루트 URL에 접속하면 index.html 파일을 제공합니다.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "payment.html"));
});

app.get("/payments/success", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "success.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
