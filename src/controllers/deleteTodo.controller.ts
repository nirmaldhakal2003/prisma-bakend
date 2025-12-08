import { Request, Response } from "express";
import { deleteTodo } from "../prisma-models/todo.model";
// import { deleteTodo } from "../models/todo.model";

export const deleteTodoController = async (req: Request, res: Response) => {
  const params = req.params;
  const todoId = params.todoId;
  const todoIdNum = parseInt(todoId as string);

  const deletedTodo = await deleteTodo(todoIdNum);

  res.json({
    message: "Todo deleted successfully",
    data: deletedTodo,
  });
};