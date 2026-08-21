import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"; // must be imported before routes are registered
import helmet from "helmet";
import { MulterError } from "multer";
import morgan from "morgan";
import { env } from "./config/env";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import usersRoutes from "./routes/users.routes";
import verificationRoutes from "./routes/verification.routes";
import xrplRoutes from "./routes/xrpl.routes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());
  app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/auth", authRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/verification", verificationRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/xrpl", xrplRoutes);

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  // Centralized error handler. express-async-errors (imported above) forwards
  // rejected promises from async route handlers here automatically.
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof MulterError) {
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    }
    // Our upload.middleware fileFilter rejects with a plain Error for
    // unsupported mime types — Multer surfaces that the same way.
    if (err.message?.startsWith("Unsupported file type")) {
      return res.status(400).json({ error: err.message });
    }

    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}
