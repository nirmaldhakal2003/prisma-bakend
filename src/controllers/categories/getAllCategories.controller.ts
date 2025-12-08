import { Request, Response } from "express";
import { getAllCategories } from "../../prisma-models/category.model";

export async function getAllCategoriesController(req: Request, res: Response) {
  const categories = await getAllCategories();
  res.json({
    data: categories,
    message: "Fetched all categories",
  });
}