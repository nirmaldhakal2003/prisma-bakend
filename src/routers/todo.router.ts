import { assignCategoryToTaskController } from "../controllers/assignCategoryToTask.controller";
import { assignTaskToUserController } from "../controllers/assignTaskToUser.controller";
import { createTodoController } from "../controllers/createTodo.controller";
import { deleteTodoController } from "../controllers/deleteTodo.controller";
import { getAllTodosController } from "../controllers/getAllTodos.controller";
import { getByIdTodoController } from "../controllers/getByIdtodo.controller";
import { updateTodoController } from "../controllers/updateTodo.controller";
import { Application } from "express";

export function createTodoRouter(app: Application) {
  app.post("/todos", createTodoController);
  app.get("/todos", getAllTodosController);
  app.delete("/todos/:todoId", deleteTodoController);
  app.get("/todos/:todoId", getByIdTodoController);
  app.put("/todos/:todoId", updateTodoController);

  app.post("/todos/assign-category", assignCategoryToTaskController);
  app.post("/todos/assign-task-to-user", assignTaskToUserController);
}