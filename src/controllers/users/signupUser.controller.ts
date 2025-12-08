import { Request, Response } from "express";
import { z } from "zod";
import { createUser } from "../../prisma-models/user.model";

const SignUpUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(15),
});

export type TSignUpUserSchema = z.infer<typeof SignUpUserSchema>;

export async function signUpUserController(req: Request, res: Response) {
  const body = req.body;

  // validation
  const parsedData = SignUpUserSchema.safeParse(body);

  if (!parsedData.success) {
    // throw new Error(`Invalid Data`)
    res.status(400).json({
      message: "Invalid data",
      errors: parsedData.error,
    });
    return;
  }

  // data is valid
  const user = await createUser(parsedData.data);

  res.json({
    message: "User signed up successfully!",
    data: user,
  });
}