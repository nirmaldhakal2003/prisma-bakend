import express from "express";
import { createTodoRouter } from "./routers/todo.router";
import { create } from "domain";
import { createUserRouter } from "./routers/user.router";
import { createCategory } from "./prisma-models/category.model";
import { createCategoryRouter } from "./routers/category.router";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "hello from express updated!",
  });
});

createTodoRouter(app);
createUserRouter(app);
createCategoryRouter(app);


app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
