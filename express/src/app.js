const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello homepage");
});

app.get("/login", (req, res) => {
  res.send("<strong>Login please!</strong>");
});

app.listen(3000, () => {
  console.log("Connected 3000 port!");
});
