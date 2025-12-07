import { Request, Response } from "express";
import { getTodoById } from "../models/todo.model";

export const getByIdTodoController = (req: Request, res: Response) => {
  const params = req.params;
  const todoId = params.todoId;
  const todoIdNum = parseInt(todoId as string);

  const todo = getTodoById(todoIdNum);

  res.json({
    message: "Todo fetched",
    data: todo.data,
  });
};
