import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function logoutUserController(req: Request, res: Response) {
  const token = req.cookies.token as string;

  if (!token) {
    throw new Error(`You are not logged in!`);
  }

  const userFound = await prisma.userSession.findFirst({
    where: {
      session_id: token,
    },
  });

  if (!userFound) {
    throw new Error(`You are not logged in!`);
  }

  await prisma.userSessions.delete({
    where: {
      id: userFound.id,
    },
  });

  res.clearCookie("token");

  res.json({
    message: "You are logged out!",
  });
}