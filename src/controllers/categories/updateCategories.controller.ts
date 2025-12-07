import { Request, Response } from "express";

type updateCategoryInput = {
    name?: string;
    description?: string;
}

export async function updateCategoriesController(req:Request, res:Response  ) {
    const categoryId = Number (req.params.categoryId);
    const body = req.body as updateCategoryInput;
}