import { Request, Response } from "express";
import { createCategory } from "../../prisma-models/category.model";

type createCategoryInput = {
    name: string;
    description?: string;
}

export async function createCategoryController(req:Request, res:Response) {
const body = req.body as createCategoryInput;

const category = await createCategory(body);
res.json({
  data: category,
  message: "category created",
});
}