const express = require("express");
const admin = require("./routes/admin")
const app = express();
const port = 3000

app.get("/", (req, res) => { 
  res.send("express start!")
})

app.use("/admin", admin)

app.listen(port, () => { 
  console.log(`express is running on port ${port}`)
})