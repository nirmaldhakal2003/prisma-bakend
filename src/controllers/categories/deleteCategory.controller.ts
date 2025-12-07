import { Request, Response } from "express";
import { deleteCategory } from "../../prisma-models/category.model";

export async function deleteCategoriesController(req: Request, res: Response) {
const categoryId = Number(req.params.categoryId);

const deletedCategory = await deleteCategory(categoryId);

res.json({
    data: deletedCategory,
    message: "category deleted",
});
}