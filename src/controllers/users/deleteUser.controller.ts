import { Request, Response } from "express";
import { deleteUser } from "../../prisma-models/user.model";

export async function deleteUserController(req: Request, res: Response) {
  const userId = Number(req.params.userId);

  const deletedUser = await deleteUser(userId);

  res.json({
    data: deletedUser,
    message: "User deleted!",
  });
}