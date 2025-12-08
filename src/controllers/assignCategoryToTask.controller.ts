import { Request, Response } from "express";
import { assignCategoryToTask } from "../prisma-models/todo.model";

export type AssignCategoryToTaskInput = {
  categoryId: number;
  taskId: number;
};

export async function assignCategoryToTaskController(
  req: Request,
  res: Response
) {
  const body = req.body as AssignCategoryToTaskInput;

  const assigned = await assignCategoryToTask(body);

  res.json({
    data: assigned,
    message: "Assigned category to task",
  });
}