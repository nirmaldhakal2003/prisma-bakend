import { Request, Response } from "express";
import { z } from "zod";
import { createUser } from "../../prisma-models/user.model";
import { hashPassword } from "../../lib/hash";

const SignUpUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(15),
  role: z.enum(["USER", "ADMIN", "SUPER_ADMIN"]),
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

  // hash the password
  const hashedPassword = await hashPassword(parsedData.data.password);

  console.log("hashed password length", hashedPassword.length);

  // data is valid
  const user = await createUser({
    // username: parsedData.data.username,
    // email: parsedData.data.email,
    // password: hashedPassword
    ...parsedData.data,
    password: hashedPassword,
  });

  res.json({
    message: "User signed up successfully!",
    data: user,
  });
}