import { Request, Response } from "express";
import { updateCategory } from "../../prisma-models/category.model";

export type UpdateCategoryInput = {
  name?: string;
  description?: string;
};

export async function updatecategoryController(req: Request, res: Response) {
  const categoryId = Number(req.params.categoryId);

  const body = req.body as UpdateCategoryInput;

  const category = await updateCategory(categoryId, body);

  res.json({
    data: category,
    message: "Category updated!",
  });
}