import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function getMeUserController(req: Request, res: Response) {
  const user = req.user;

  if (!user) {
    throw new Error(`You are not logged in!`);
  }

  const userFound = await prisma.users.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!userFound) {
    throw new Error(`You are not logged in!`);
  }

  res.json({
    message: "You are logged in!",
    data: {
      user: userFound,
    },
  });
}
