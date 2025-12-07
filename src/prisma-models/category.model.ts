import e from "express";
import { prisma } from "../lib/prisma";

export async function getAllCategories() {
    const categories = await prisma.category.findMany();

    return categories;
}

export async function getCategoryById(id: number) {
    const category = await prisma.category.findUnique({
        where: {
            id: id,
        },
    });

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
}

export async function createCategory(body: { name: string; description?: string; }) {
    prisma.category.create({
        data: {
            name: body.name,
            description: body.description,
        },
    });
}

export async function updateCategory(id: number, body: { name?: string; description?: string; }) {
    const category = await prisma.category.update({
        where: {
            id,
        },
        data: {
            name: body.name,
            description: body.description,
        },
    });

    return category;
}

export async function deleteCategory(id: number) {

    const categoryFound = await prisma.category.findUnique({
        where: {
            id,
        },
    });

    if (!categoryFound) {
        throw new Error("Category not found");
    }

    const deletedCategory = await prisma.category.delete({
        where: {
            id,
        },
    });

    return deletedCategory;
}

export async function assignCategoryToTask(data: { categoryId: number; taskId: number; }) {
    const assigned = await prisma.task_categories.create({
        data: {
            category_id: data.categoryId,
            task_id: data.taskId,
        },
    });

    return assigned;
}