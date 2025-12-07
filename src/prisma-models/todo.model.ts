import { TAssignTaskToUserSchema } from "../controllers/assignTaskToUser.controller";
import { Prisma, TaskStatus } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";



export async function createTodo(data: Prisma.tasksCreateInput) {

    if (!data.status) {
        throw new Error(`Please Send Valid Message`)
    }
    const createdTask = await prisma.tasks.create({
        data: {
            title: data.title,
            description: data.description || null,
            status: data.status,
        },
    });

    return createdTask
}

export async function getAllTodos(whereInput: {
    title: string,
    status?: TaskStatus,
    completedAt?: string
},
{
   
}) {

    let tempWhereInput: Prisma.tasksWhereInput = {};

    if (whereInput.status) {
        tempWhereInput.status = whereInput.status;
    }

    if (whereInput.completedAt) {
        tempWhereInput.completed_at = {
            gte: new Date(whereInput.completedAt)
        }
    }

    if (whereInput.title){
        tempWhereInput.title = {
            contains: whereInput.title
        }
    }

    const tasks = await prisma.tasks.findMany({
        where:tempWhereInput
    });

    return tasks;
}

export async function assignTaskToUser(data: TAssignTaskToUserSchema) {
    const task = await prisma.tasks.update({
        where:{
            id: data.taskId,
        },
        data:{
           user_id : data.userId,
        },

    })
    return task;
    
}