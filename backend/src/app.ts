import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"; // must be imported before routes are registered
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import authRoutes from "./routes/auth.routes";
import xrplRoutes from "./routes/xrpl.routes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());
  app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/auth", authRoutes);
  app.use("/api/xrpl", xrplRoutes);

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  // Centralized error handler. express-async-errors (imported above) forwards
  // rejected promises from async route handlers here automatically.
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}
