import { Request, Response } from 'express';
import { z } from 'zod';
import { loginUser } from '../../prisma-models/user.model';

const LoginUserSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(6).max(15),
});

export type TLoginUserSchema = z.infer<typeof LoginUserSchema>;


export async function loginUserController(req: Request, res: Response) {
    const body = req.body;

    // validation
    const parsedData = LoginUserSchema.safeParse(body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "invalid data",
            errors: parsedData.error
        });
        return;
    }
    // data is valid
    const user = await loginUser(parsedData.data);
    res.json({
        data: user,
        message: "logged in",
    });
}