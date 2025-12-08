import { Request, Response } from "express";
import { z } from "zod";
import { updateUserById } from "../../prisma-models/user.model";

const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(2).max(50).optional(),
  password: z.string().min(6).max(15).optional(),
});

export type TUpdateUserSchema = z.infer<typeof UpdateUserSchema>;

export async function updateUserByIdController(req: Request, res: Response) {
  const userId = Number(req.params.userId);

  const body = req.body;

  const parsedData = UpdateUserSchema.safeParse(body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: parsedData.error,
    });
    return;
  }

  const user = await updateUserById(userId, body);

  res.json({
    data: user,
    message: "User updated!",
  });
}