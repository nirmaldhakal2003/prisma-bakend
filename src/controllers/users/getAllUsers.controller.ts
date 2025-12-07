import { Request, Response } from 'express';
import { z } from 'zod';

const GetAllUsersSchema = z.object({
    username: z.string().min(2).max(50).optional(),
    password: z.string().min(6).max(15).optional(),
});

export type TGetAllUsersSchema = z.infer<typeof GetAllUsersSchema>;

export async function getAllUsersController(req: Request, res: Response) {
    const body = req.body;
    // validation
    const parsedData = GetAllUsersSchema.safeParse(body);
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
        message: "fetched all users",
    });
}