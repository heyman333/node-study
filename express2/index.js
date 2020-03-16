const express = require("express");
const app = express();
const user = require("./routes/user");

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use("/user", user);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
