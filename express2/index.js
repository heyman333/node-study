const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const morgan = require("morgan");

const app = express();

app.use("/", express.static("public"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/user", user);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
