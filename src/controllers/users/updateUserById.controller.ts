import { Request, Response } from 'express';
import { z } from 'zod';

const updateUserByIdSchema = z.object({
    id: z.string().uuid(),
    username: z.string().min(2).max(50).optional(),
    password: z.string().min(6).max(15).optional(),
});

export type TUpdateUserByIdSchema = z.infer<typeof updateUserByIdSchema>;


export async function updateUserByIdController(req: Request, res: Response) {
    const body = req.body;
    // validation
    const parsedData = updateUserByIdSchema.safeParse(body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "invalid data",
            errors: parsedData.error
        });
        return;
    }
    // data is valid
    res.json({
        data: parsedData.data,
        message: "updated user by id",
    });
}