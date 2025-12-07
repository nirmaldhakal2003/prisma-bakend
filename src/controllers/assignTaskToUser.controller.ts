import { Request, Response } from "express";


import{z} from 'zod'
import { assignTaskToUser } from "../prisma-models/todo.model";


const AssignTaskToUserSchema = z.object({
    taskId: z.number().min(1),
    userId: z.number().min(1)
})

export type TAssignTaskToUserSchema = z.infer<typeof AssignTaskToUserSchema>

export  async function assignTaskToUserController(req:Request, res:Response) {
    const body = req.body

    const parsedData = AssignTaskToUserSchema.safeParse(body);


    if(!parsedData.success){
        res.status(400).json({
            message: "invalide data",
            error: parsedData.error,
        })
        return;
    }

    const task = await assignTaskToUser
    
}