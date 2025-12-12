import { Request, Response } from "express";
import { z } from "zod";
import { loginUser } from "../../prisma-models/user.model";
import { comparePassword } from "../../lib/hash";
import { prisma } from "../../lib/prisma";

const LoginUserSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(15),
});

export type TLoginUserSchema = z.infer<typeof LoginUserSchema>;

export async function loginUserController(req: Request, res: Response) {
  const body = req.body;

  const parsedData = LoginUserSchema.safeParse(body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: parsedData.error,
    });
    return;
  }

  // data validation successful
  const user = await loginUser(parsedData.data);

  const randomNumberOfLength6 = Math.floor(Math.random() * 1000000);
  const randomString = randomNumberOfLength6.toString();

  await prisma.userSession.create({
    data: {
      user_id: user.id,
      session_id: randomString,
    },
  });

  res.cookie("token", randomString, {
    httpOnly: true,
    maxAge : 1 * 60 * 1000, // 1 minute paxi cookie expire hunxa.
    domain: "*.localhost", //one.localhost, two.localhost means subdomain ma cookies pass hunxa.
    secure: false, // production ma sadhai true huna parxa hai ta.
    sameSite: "lax", // hacker dekhi bachuxa.
    path: "/" , // kun path ma cookies send garna vanera ho. defauly "/" ho.
  });

  res.json({
    message: "Logged in!",
    data: { ...user, token: randomString },
  });
}