import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export async function accessControlCheckMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token as string;

  if (!token) {
    res.status(401).json({
      message: "You are not logged in!",
    });
    return;
  }

  const userSession = await prisma.userSession.findFirst({
    where: {
      session_id: token,
    },
    include: {
      user: true,
    },
  });
  if (!userSession) {
    res.status(401).json({
      message: "your session not found! please login again.",
    });
    return;
  }

  req.user = userSession.user;

  const role = userSession.user.role;

  if (role === "SUPER_ADMIN") {
    next();
  } else {
    res.status(403).json({
      message: "Forbidden! you are not allowed to access this.",
    });
    return;
  }
}