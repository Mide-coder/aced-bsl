import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { hashPassword, verifyPassword } from "../utils/password";
import { signAccessToken } from "../utils/jwt";
import { toPublicUser } from "../utils/publicUser";
import { LoginInput, RegisterInput } from "../types/schemas";

export async function register(req: Request, res: Response) {
  const { pseudonym, email, password, role } = req.body as RegisterInput;

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { pseudonym }] },
  });
  if (existing) {
    return res.status(409).json({ error: "Email or pseudonym already in use" });
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: { pseudonym, email, passwordHash, role },
  });

  return res.status(201).json(toPublicUser(user));
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as LoginInput;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ error: "Incorrect email or password" });
  }

  const accessToken = signAccessToken(user.id);
  return res.json({
    accessToken,
    tokenType: "bearer",
    user: toPublicUser(user),
  });
}

export async function me(req: Request, res: Response) {
  // req.user is guaranteed by requireAuth middleware
  return res.json(req.user);
}
