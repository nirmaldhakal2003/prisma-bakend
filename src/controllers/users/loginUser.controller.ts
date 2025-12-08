import { Request, Response } from "express";
import { z } from "zod";
import { loginUser } from "../../prisma-models/user.model";

const LoginUserSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(15),
});

export type TLoginUserSchema = z.infer<typeof LoginUserSchema>;

export async function loginUserController(req: Request, res: Response) {
  const body = req.body;

  const parsedData = LoginUserSchema.safeParse(body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: parsedData.error,
    });
    return;
  }

  // data valid
  const user = await loginUser(parsedData.data);

  res.json({
    message: "Logged in!",
    data: user,
  });
}