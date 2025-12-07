import { Request, Response } from 'express';
import { z } from 'zod';

const SignUpUserSchema = z.object({
    email: z.string().email(),
    username: z.string().min(2).max(50),
    password: z.string().min(6).max(15),

})

export type TSignUpUserSchema = z.infer<typeof SignUpUserSchema>

export async function signupUserController(req: Request, res: Response) {
    const body = req.body;

    // validation
    const parsedData = SignUpUserSchema.safeParse(body);
    if (!parsedData.success){
        // throw new error(`message`)
        res.status(400).json({
            message : "invalid data",
            errors : parsedData.error
        });
        return;
    }

    // data is valid
    res.json({
        data: parsedData.data,
        message: "user signed up successfully",
    });
}