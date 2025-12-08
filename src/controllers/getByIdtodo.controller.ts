import { Request, Response } from "express";
import { getTodoById } from "../prisma-models/todo.model";
// import { getTodoById } from "../models/todo.model";

export const getByIdTodoController = async (req: Request, res: Response) => {
  const params = req.params;
  const todoId = params.todoId;
  const todoIdNum = parseInt(todoId as string);

  const todo = await getTodoById(todoIdNum);

  res.json({
    message: "Todo fetched",
    data: todo,
  });
};