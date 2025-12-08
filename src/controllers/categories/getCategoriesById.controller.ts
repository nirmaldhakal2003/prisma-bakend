import { Request, Response } from "express";
import { getCategoryById } from "../../prisma-models/category.model";

export async function getCategoryByIdController(req: Request, res: Response) {
  const categoryId = Number(req.params.categoryId);

  const category = await getCategoryById(categoryId);

  res.json({
    data: category,
    message: "Category fetched!",
  });
}