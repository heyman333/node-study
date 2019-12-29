const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("hello homepage");
});

app.get("/login", (req, res) => {
  res.send("<strong>Login please!</strong>");
});

app.get("/rn", (req, res) => {
  res.send("<strong>RN SEOUL Image</strong><br /> <img src='/rns.png' />");
});

app.listen(3000, () => {
  console.log("Connected 3000 port!");
});
