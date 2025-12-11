import { AssignCategoryToTaskInput } from "../controllers/assignCategoryToTask.controller";
import { TAssignTaskToUserSchema } from "../controllers/assignTaskToUser.controller";
import { Prisma, TaskStatus } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

export async function createTodo(data: Prisma.tasksCreateInput) {
  if (!data.status) {
    throw new Error(`Please send valid status`);
  }

  const createdTask = await prisma.tasks.create({
    data: {
      title: data.title,
      description: data.description || null,
      status: data.status,
    },
  });

  return createdTask;
}

type TGetAllTodosWhereInput = {
  status?: TaskStatus;
  completedAt?: string;
  title?: string;
};

type TGetAllTodosPaginationInput = {
  page: number;
  perPage: number;
};

export async function getAllTodos(
  whereInput: TGetAllTodosWhereInput,
  pagination: TGetAllTodosPaginationInput
) {
  let tempWhereInput: Prisma.tasksWhereInput = {};

  if (whereInput.status) {
    tempWhereInput.status = whereInput.status;
  }

  if (whereInput.completedAt) {
    tempWhereInput.completed_at = {
      gte: new Date(whereInput.completedAt),
    };
  }

  if (whereInput.title) {
    tempWhereInput.title = {
      contains: whereInput.title,
    };
  }

  /**
   
  {
    status: "IN_PROGRESS",

  if (whereInput.status) {
    completed_at: {
      gte: new Date("2025-11-01")
    }
  }
    

  if (whereInput.status) {
   */
  // perPage = 10
  // total =35
  // page = 1
  // 10

  // page: 1    2   3   4
  // skip: 0    10  20  30
  // formula: (pageNum - 1) * perPage

  const totalTasks = await prisma.tasks.count({
    where: tempWhereInput,
  });

  const tasks = await prisma.tasks.findMany({
    where: tempWhereInput,
    take: pagination.perPage,
    skip: (pagination.page - 1) * pagination.perPage,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          username: true,
        },
      },
      task_categories: {
        select: {
          category: true,
        },
      },
    },
  });
  return { tasks, totalTasks };
}

export async function deleteTodo(id: number) {
  const taskFound = await prisma.tasks.findFirst({
    where: {
      id,
    },
  });
  if (!taskFound) {
    throw new Error(`Task with id - ${id} not found`);
  }

  const deletedTask = await prisma.tasks.delete({
    where: {
      id,
    },
  });
  return deletedTask;
}

export async function getTodoById(id: number) {
  const task = await prisma.tasks.findFirst({
    where: {
      id,
    },
  });

  if (!task) {
    throw new Error(`Task with id - ${id} not found`);
  }

  return task;
}

export async function updateTodo(id: number, data: Prisma.tasksUpdateInput) {
  await getTodoById(id);

  const updated = await prisma.tasks.update({
    where: {
      id,
    },
    data: data,
  });

  return updated;
}

export async function assignCategoryToTask(data: AssignCategoryToTaskInput) {
  const assigned = await prisma.task_categories.create({
    data: {
      task_id: data.taskId,
      category_id: data.categoryId,
    },
    include: {
      task: true,
      category: true,
    },
  });

  return assigned;
}

export async function assignTaskToUser(data: TAssignTaskToUserSchema) {
  const task = await prisma.tasks.update({
    where: {
      id: data.taskId,
    },
    data: {
      user_id: data.userId,
    },
  });
  return task;
}