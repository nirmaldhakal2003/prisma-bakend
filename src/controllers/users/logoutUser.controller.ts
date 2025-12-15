import { Request, Response } from "express";
export async function logoutUserController(req: Request, res: Response) {
  res.clearCookie("token");

  res.json({
    message: "You are logged out!",
  });
}