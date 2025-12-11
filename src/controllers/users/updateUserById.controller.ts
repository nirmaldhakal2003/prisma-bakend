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
 const paramsUserId = Number(req.params.userId);
  const userId = req.user?.id;
  if(!userId){
    res.status(401).json({
      message: "you are not authorized "
    });
    return;
  }

  if (paramsUserId !== userId) {
    res.status(403).json({
      message: "you can only view your user details",
    });
    return;
  }
const body = req.body;
  const user = await updateUserById(userId, body);

  res.json({
    data: user,
    message: "User updated!",
  });
}