const http = require("http");
const path = require("path");
const fs = require("fs");

const todopath = path.join(__dirname, "/db/todo.json");
const server = http.createServer((req, res) => {
  console.log(` req-url : ${req.url} | method : ${req.method}`);
  //  welcome route
  if (req.url == "/" && req.method == "GET") {
    res.writeHead(200, {
      // "content-type": "application/json",
      "content-type": "text/html",
      // email: "mewo@gmail.com",
    });

    // res.setHeader("content-type", "text/plain");
    // res.statusCode = 201;
    // res.setHeader("email", "mewo1@gmail.com");

    // res.end(JSON.stringify(data));
    res.end(`<h1>Welcome To Our Server</h1> `);
  }
  //get all todo
  else if (req.url == "/todo/all" && req.method == "GET") {
    //get todo
    const todoCollection = fs.readFileSync(todopath, { encoding: "utf-8" });

    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(todoCollection);
  }

  if (req.url == "/todo/create" && req.method == "POST") {
    let data = "";

    req.on("data", (chuck) => {
      data += chuck;
    });

    req.on("end", () => {
      // console.log(data);
      const { id, task, email } = JSON.parse(data);
      //read todo
      const todoCollection = fs.readFileSync(todopath, { encoding: "utf-8" });

      const todoArray = JSON.parse(todoCollection);

      const newTodo = {
        id: todoArray.length,
        task,
        email,
        createdAt: new Date().toISOString(),
        status: "not-started",
      };
      todoArray.push(newTodo);
      console.log(todoArray);

      const newData = JSON.stringify(todoArray, null, 2);
      fs.writeFileSync(todopath, newData, { encoding: "utf-8" });
      // console.log(todo);
      res.end(JSON.stringify(newTodo, null, 2));
    });
  }
  // get a single todo by id
  else if (req.url.startsWith("/todo/single/") && req.method == "GET") {
    const todo = JSON.parse(fs.readFileSync(todopath, { encoding: "utf-8" }));

    const isExist = todo.find((td) => td.id == req.url.split("/")[3]);

    if (!isExist) {
      res.writeHead(400, { "content-type": "application/json" });

      res.end(JSON.stringify({ status: false, message: "Not Found" }));
    } else {
      res.writeHead(200, { "content-type": "application/json" });

      res.end(
        JSON.stringify({ status: true, message: "Found", data: isExist })
      );
    }
  } else if (req.url == "/todo/:id/:status" && req.method == "PATCH") {
    res.end("Updating Todo status");
  } else if (req.url == "/todo/delete/:id" && req.method == "DELETE") {
    res.end("Deleting a To do");
  } else {
    res.end("404.Route Not Found");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("🚩 Server Running Mammmmmaaaaaaaaa 😃");
});

/**
 * /todo/all            - GET       - Send All Todo
 * /todo/single/:id     - GET       - Get Single Todo
 * /todo/:status        - GET       - Get Todo by status
 * /todo/create         - POST      - Create a Todo
 * /todo/update/:id     - PUT       - Update  todo
 * /todo/:id/:status - PATCH     - update status
 * /todo/delete/:id     - delete    - update status
 */
