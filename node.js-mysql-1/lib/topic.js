const db = require("./db");
const template = require("./template");

exports.home = (request, response) => {
  db.query("SELECT * FROM topic", (err, topics) => {
    const title = "welcome";
    const desc = "Hello, Node.js";
    const list = template.list(topics);
    const html = template.HTML(
      title,
      list,
      `<h2>${title}</h2>${desc}`,
      `<a href="/create">Create</a>`
    );

    response.writeHead(200);
    response.end(html);
  });
};
