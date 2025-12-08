import { Request, Response } from "express";
import { createCategory } from "../../prisma-models/category.model";

export type CreateCategoryInput = {
  name: string;
  description?: string;
};

export async function createCategoryController(req: Request, res: Response) {
  const body = req.body as CreateCategoryInput;

  const category = await createCategory(body);

  res.json({
    data: category,
    message: "Category created!",
  });
}