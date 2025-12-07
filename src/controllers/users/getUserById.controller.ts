import { Request, Response } from 'express';
import { z } from 'zod';

const getUserByIdSchema = z.object({
    id: z.string().uuid(),
    
});
export type TGetUserByIdSchema = z.infer<typeof getUserByIdSchema>;

export async function getUserByIdController(req: Request, res: Response) {
    const body = req.body;
    // validation
    const parsedData = getUserByIdSchema.safeParse(body);
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
        message: "fetched user by id",
    });
}