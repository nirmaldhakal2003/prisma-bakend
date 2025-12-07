import { Request, Response } from "express";
import { deleteTodo } from "../models/todo.model";

export const deleteTodoController = (req: Request, res: Response) => {
  const params = req.params;
  const todoId = params.todoId;
  const todoIdNum = parseInt(todoId as string);

  const deletedTodo = deleteTodo(todoIdNum);

  res.json({
    message: "Todo deleted successfully",
    data: deletedTodo,
  });
};
