import { Application } from "express";
import { getAllCategoriesController } from "../controllers/categories/getAllCategories.controller";
import { createCategoryController } from "../controllers/categories/createCategory.controller";
import { deleteCategoryController } from "../controllers/categories/deleteCategory.controller";
import { getCategoryByIdController } from "../controllers/categories/getCategoriesById.controller";
import { updatecategoryController } from "../controllers/categories/updateCategories.controller";

export function createCategoryRouter(app: Application) {
  app.get("/categories", getAllCategoriesController);
  app.get("/categories/:categoryId", getCategoryByIdController);
  app.post("/categories", createCategoryController);
  app.put("/categories/:categoryId", updatecategoryController);
  app.delete("/categories/:categoryId", deleteCategoryController);
}