import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { verifyAccessToken } from "../utils/jwt";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: {
        id: string;
        pseudonym: string;
        email: string;
        role: string;
        xrplWalletAddress: string | null;
        xrplWalletSeed: string | null;
        isVerifiedTutor: boolean;
      };
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or malformed Authorization header" });
  }

  const token = header.slice("Bearer ".length);
  const payload = verifyAccessToken(token);

  if (!payload) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });

  if (!user) {
    return res.status(401).json({ error: "User no longer exists" });
  }

  req.user = {
    id: user.id,
    pseudonym: user.pseudonym,
    email: user.email,
    role: user.role,
    xrplWalletAddress: user.xrplWalletAddress,
    xrplWalletSeed: user.xrplWalletSeed,
    isVerifiedTutor: user.isVerifiedTutor,
  };

  next();
}
