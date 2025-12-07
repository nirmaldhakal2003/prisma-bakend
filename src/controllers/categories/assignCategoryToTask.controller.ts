import { Request, Response } from "express";
import { assignCategoryToTask } from "../../prisma-models/category.model";

type updateCategoryInput = {
    categoryId: number;
    taskId: number;
}

export async function assignCategoryToTaskController(req:Request, res:Response  ) {
    const body = req.body as updateCategoryInput;

    const assigned = await assignCategoryToTask(body);

    res.json({
        data: assigned,
        message: "category assigned to task",
    });
}