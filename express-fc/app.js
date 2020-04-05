const express = require("express");
const logger = require("morgan")

const admin = require("./routes/admin")
const app = express();
const port = 3000

const testMiddleware = (req, res, next) => { 
  console.log("first middleware!!")
  next()
}

app.get("/", (req, res) => { 
  res.send("express start!")
})

app.use(logger("dev"))

app.use("/admin",testMiddleware,  admin)


app.listen(port, () => { 
  console.log(`express is running on port ${port}`)
})
