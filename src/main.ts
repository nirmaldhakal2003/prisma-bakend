import http from "http";
import fs from "fs";
import path from "path";

// enum TodoStatus {
//   PENDING="PENDING",
//   IN_PROGRESS="IN_PROGRESS",
//   COMPLETED="COMPLETED"
// }

interface Todo {
  id: number;
  title: string;
  author: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
}
let todos: Todo[] = [];

const server = http.createServer(async (req, res) => {
  console.log("Request received", { url: req.url, method: req.method });

  let body = "";

  if (req.url === "/") {
    // root page
    console.log("root page");

    res.writeHead(200, "Home page sent successfully", {
      "Content-Type": "text/html",
    });

    // read the file

    const currentWorkingDirectory = process.cwd();
    console.log("current working directory", currentWorkingDirectory);
    const filePath = path.join(currentWorkingDirectory, "src/pages/index.html");

    const fileContent = fs.readFileSync(filePath);
    console.log("file content", fileContent.toString());

    res.write(fileContent.toString());
    res.end();
  } else if (req.url === "/contact-us") {
    // contact us page
    console.log("contact us page");
    res.writeHead(200, "Contact page sent successfully", {
      "Content-Type": "text/html",
    });
    res.write("<h1>Contact us Page</h1>");
    res.end();
  } else if (req.url === "/submit-form" && req.method === "POST") {
    console.log("submitting form");

    async function processData() {
      return new Promise((resolve, reject) => {
        req.on("data", (data) => {
          console.log("data received", data.toString());
          body += data;
          resolve(data);
        });
      });
    }

    await processData();

    async function processErorr() {
      return new Promise((resolve, reject) => {
        req.on("end", () => {
          console.log("All data received");
          resolve("All data received");
        });
      });
    }
    await processErorr();

    res.writeHead(201, "Form is submitted", {
      "Content-Type": "application/json",
    });
    res.write(
      JSON.stringify({
        message: "Form submitted successfully!",
        data: JSON.parse(body),
      })
    );
    console.log("response sent!");
    res.end();
  } else if (req.url === "/todos" && req.method === "POST") {
    //1.  todos data type
    let body = "";

    // 2. receive the data in req.body
    async function receiveData() {
      return new Promise((resolve, reject) => {
        req.on("data", (data) => {
          body += data.toString();
          resolve(data);
        });
      });
    }

    await receiveData();

    const bodyJson: Todo = JSON.parse(body);

    // 3. save the data

    todos.push(bodyJson);

    console.log("todos", todos);

    // 4. send the response
    res.writeHead(201, "Todos created successfully!", {
      "content-type": "application/json",
    });
    res.write(
      JSON.stringify({
        message: "Todo created!",
        data: bodyJson,
      })
    );
    res.end();
  } else if (req.url === "/todos" && req.method === "GET") {
    // get the data from array

    // send response
    res.writeHead(200, "Todos fetched", {
      "content-type": "application/json",
    });
    res.write(
      JSON.stringify({
        message: "todos fetched!",
        data: todos,
      })
    );
    res.end();
  } else if (req.url?.includes("/todos?id=") && req.method === "DELETE") {
    // '/todos?id=1'
    // params = http://localhost:3000/todos/:id
    // query http://localhost:3000/todos?id=1
    const url = req.url;
    console.log("delete a todo", url);

    const idNullable = url.split("=")[1]; // ['/todos?id', '1']

    console.log("id nullable", idNullable);

    if (!idNullable) {
      res.writeHead(400, "Id not valid", {
        "content-type": "application/json",
      });
      res.write(
        JSON.stringify({
          message: "Send the correct id!",
        })
      );
      res.end();
      return;
    }

    const idNum = parseInt(idNullable);

    // check if todo exists in the array by the same id
    const todoFound = todos.find((todo) => {
      if (todo.id === idNum) {
        return true;
      } else {
        return false;
      }
    });
    if (!todoFound) {
      res.writeHead(404, "Todo not found", {
        "content-type": "application/json",
      });
      res.write(
        JSON.stringify({
          message: "Todo not found!",
        })
      );
      res.end();
    }

    const updatedTodos = todos.filter((todo) => {
      if (todo.id === idNum) {
        return false;
      } else {
        return true;
      }
    });
    todos = updatedTodos;
    res.writeHead(200, "Todo deleted", {
      "content-type": "application/json",
    });
    res.write(
      JSON.stringify({
        message: "Todo deleted successfully!",
      })
    );
    res.end();
  }
});

server.listen(3000, () => {
  console.log("started server @ http://localhost:3000");
});
