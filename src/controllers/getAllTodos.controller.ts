import { Request, Response } from "express";
import { getAllTodos } from "../prisma-models/todo.model";
import { TaskStatus } from "../generated/prisma/enums";
// import { getAllTodos, StatusType } from "../models/todo.model";

export const getAllTodosController = async (req: Request, res: Response) => {
  const query = req.query;

  const status = query.status as TaskStatus;
  const completedAt = query.completedAt as 'yyyy-mm-dd';
  const title = query.title as string;

  // const pagination


  const todos = await getAllTodos({
    status: status,
    completedAt,
    title,
  },
  {
    page: query.page ? parseInt(query.page as string) : undefined,
  });

  res.json({
    message: "Todos fetched!",
    data: todos,
  });
};
