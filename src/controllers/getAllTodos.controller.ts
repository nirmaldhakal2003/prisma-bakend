import { Request, Response } from "express";
import { getAllTodos } from "../prisma-models/todo.model";
import { TaskStatus } from "../generated/prisma/enums";
// import { getAllTodos, StatusType } from "../models/todo.model";

export const getAllTodosController = async (req: Request, res: Response) => {
  const query = req.query; // GET /todos?status=COMPLETED&completed_at=2025-11-01&title=database&page=2

  const status = query.status as TaskStatus;
  const completedAt = query.completed_at as string; // "yyyy-mm-dd"
  const title = query.title as string; // "database"

  const page = query.page || "1";
  const pageNum = Number(page);
  const perPage = 10;

  const todosRes = await getAllTodos(
    {
      status: status,
      completedAt,
      title,
    },
    {
      page: pageNum,
      perPage: perPage,
    }
  );

  res.json({
    message: "Todos fetched!",
    data: todosRes.tasks,
    pagination: {
      page: pageNum,
      perPage: perPage,
      total: todosRes.totalTasks,
    },
  });
};