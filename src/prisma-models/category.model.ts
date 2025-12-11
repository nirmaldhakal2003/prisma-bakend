import { CreateCategoryInput } from "../controllers/categories/createCategory.controller";
import { UpdateCategoryInput } from "../controllers/categories/updateCategories.controller";
import { prisma } from "../lib/prisma";

export async function getAllCategories() {
  const categories = await prisma.categories.findMany();
  return categories;
}

export async function getCategoryById(id: number) {
  const category = await prisma.categories.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new Error(`Category with id - ${id} not found!`);
  }

  return category;
}

export async function createCategory(data: CreateCategoryInput) {
  const createdCategory = await prisma.categories.create({
    data: {
      name: data.name,
      description: data.description || null,
    },
  });
  return createdCategory;
}

export async function updateCategory(id: number, data: UpdateCategoryInput) {
  const categoryFound = await getCategoryById(id);

  const updatedCategory = await prisma.categories.update({
    where: {
      id: categoryFound.id,
    },
    data: {
      name: data.name || categoryFound.name,
      description: data.description || null,
    },
  });
  return updatedCategory;
}

export async function deleteCategory(id: number) {
  const categoryFound = await getCategoryById(id);

  const deletedCategory = await prisma.categories.delete({
    where: {
      id: categoryFound.id,
    },
  });
  return deletedCategory;
}