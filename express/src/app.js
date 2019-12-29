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

app.get("/dynamic", (req, res) => {
  let lis = "";
  for (let i = 0; i < 5; i++) {
    lis = lis + "<li>list</li>";
  }
  const output = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    hello dynamic!
    <ul>
      ${lis}
    </ul>
  </body>
</html>
  `;
  res.send(output);
});

app.listen(3000, () => {
  console.log("Connected 3000 port!");
});
