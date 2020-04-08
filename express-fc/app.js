const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser")

const admin = require("./routes/admin")
const app = express();
const port = 3000

const testMiddleware = (req, res, next) => { 
  console.log("first middleware!!")
  next()
}

app.use("/static", express.static("static"));
app.use(logger("dev"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin", testMiddleware, admin)


app.get("/", (req, res) => {
  res.send("express start!");
});

app.listen(port, () => { 
  console.log(`express is running on port ${port}`)
})
