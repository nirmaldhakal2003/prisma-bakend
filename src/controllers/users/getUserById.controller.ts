import { Request, Response } from "express";
import { getUserById } from "../../prisma-models/user.model";

export async function getUserByIdController(req: Request, res: Response) {
  const userId = Number(req.params.userId);

  const user = await getUserById(userId);

  res.json({
    data: user,
    message: "User fetched!",
  });
}