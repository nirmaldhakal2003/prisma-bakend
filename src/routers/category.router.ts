import { Application } from "express";
import { getAllCategoriesController } from "../controllers/categories/getAllCategories.controller";
import { getCategoriesByIdController } from "../controllers/categories/getCategoriesById.controller";
import { createCategoryController } from "../controllers/categories/createCategory.controller";
import { updateCategoriesController } from "../controllers/categories/updateCategories.controller";
import { deleteCategoriesController } from "../controllers/categories/deleteCategory.controller";
import { assignCategoryToTaskController } from "../controllers/categories/assignCategoryToTask.controller";

export function createCategoryRouter(app: Application) {
    app.get('/categories', getAllCategoriesController);
    app.get('/categories/:id', getCategoriesByIdController);
    app.post('/categories', createCategoryController);
    app.put('/categories/:id', updateCategoriesController);
    app.delete('/categories/:id', deleteCategoriesController);
    app.post("/todos/assign-category", assignCategoryToTaskController);
}