var http = require("http");
var url = require("url");
var qs = require("querystring");
var template = require("./lib/template.js");
const db = require("./lib/db");
const topic = require("./lib/topic");

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === "/") {
    if (queryData.id === undefined) {
      topic.home(request, response);
    } else {
      db.query("SELECT * FROM topic", (err, topics) => {
        if (err) {
          throw err;
        }

        db.query(
          `SELECT * FROM topic LEFT JOIN author on topic.author_id=author.id WHERE topic.id=?`,
          [queryData.id],
          (err2, topic) => {
            if (err2) {
              throw err2;
            }

            const title = topic[0].title;
            const desc = topic[0].description;
            const list = template.list(topics);
            const id = topic[0].id;
            const author_name = topic[0].name;
            const html = template.HTML(
              title,
              list,
              `<h2>${title}</h2>
              ${desc}
              <p>by <i>${author_name}</i></p>
              `,
              `<a href="/create">Create</a>
                <a href="/update?id=${queryData.id}">Update</a>
                <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${queryData.id}">
                  <input type="submit" value="Delete">
                </form>`
            );

            response.writeHead(200);
            response.end(html);
          }
        );
      });
    }
  } else if (pathname === "/create") {
    db.query("SELECT * FROM topic", (err, topics) => {
      db.query("SELECT * FROM author", (err2, authors) => {
        if (err || err2) {
          throw err;
        }

        let author_names = "";
        authors.map((author, index) => {
          author_names += `<option value=${authors[index].id}>${author.name}</option>`;
        });

        const title = "WEB - Create";
        const list = template.list(topics);
        const html = template.HTML(
          title,
          list,
          `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
              <select name="author"> 
                ${author_names}
              </select>
            <p>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `,
          `<a href="/create">Create</a>`
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === "/create_process") {
    let body = [];
    request.on("data", function(chunk) {
      body.push(chunk);
    });
    request.on("end", function() {
      body = Buffer.concat(body).toString();
      const post = qs.parse(body);
      const title = post.title;
      const description = post.description;
      const author = post.author;

      db.query(
        "INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, NOW(), ?)",
        [title, description, author],
        (err, result) => {
          if (err) {
            throw err;
          }
          response.writeHead(302, { Location: `/?id=${result.insertId}` });
          response.end();
        }
      );
    });
  } else if (pathname === "/update") {
    db.query("SELECT * FROM topic", (error, topics) => {
      if (error) {
        throw error;
      }

      db.query(
        "SELECT * FROM topic WHERE id=?",
        [queryData.id],
        (error2, topic) => {
          if (error2) {
            throw error2;
          }

          db.query("SELECT * FROM author", (error3, authors) => {
            if (error3) {
              throw error3;
            }

            const id = topic[0].id;
            const title = topic[0].title;
            const description = topic[0].description;
            const list = template.list(topics);

            let author_names = "";
            authors.map((author, index) => {
              const selected =
                authors[index].id === topic[0].author_id ? "selected" : "";

              author_names += `<option value=${authors[index].id} ${selected}>${author.name}</option>`;
            });

            const html = template.HTML(
              title,
              list,
              `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${id}">
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
            <p>
              <select name="author">
                ${author_names}
              </select>
            </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
              `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
            );
            response.writeHead(200);
            response.end(html);
          });
        }
      );
    });
  } else if (pathname === "/update_process") {
    let body = "";
    request.on("data", function(data) {
      body = body + data;
    });
    request.on("end", function() {
      const post = qs.parse(body);
      const id = post.id;
      const title = post.title;
      const description = post.description;
      const authorId = post.author;

      db.query(
        "UPDATE topic set title=?, description=?, author_id=? WHERE id=?",
        [title, description, authorId, id],
        error => {
          if (error) {
            throw error;
          }
          response.writeHead(302, { Location: `/?id=${id}` });
          response.end();
        }
      );
    });
  } else if (pathname === "/delete_process") {
    var body = "";
    request.on("data", function(data) {
      body = body + data;
    });
    request.on("end", function() {
      const post = qs.parse(body);
      const id = post.id;
      db.query("DELETE FROM topic where id=?", [id], err => {
        if (err) {
          throw err;
        }

        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
