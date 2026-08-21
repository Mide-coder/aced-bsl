import { NextFunction, Request, Response } from "express";

/** Must run after requireAuth — relies on req.user already being set. */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}
