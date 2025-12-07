import { Request, Response } from 'express';
import { z } from 'zod';

const deleteUserSchema = z.object({
    id: z.string().uuid(),
});
export type TDeleteUserSchema = z.infer<typeof deleteUserSchema>;



export async function deleteUserController(req: Request, res: Response) {
    const body = req.body;
    // validation
    const parsedData = deleteUserSchema.safeParse(body);
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
        message: "deleted user by id",
    });
}