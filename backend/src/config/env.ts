import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(4000),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 characters"),
  JWT_EXPIRES_IN: z.string().default("1h"),

  XRPL_NETWORK: z.string().default("wss://s.altnet.rippletest.net:51233"),
  // Platform "issuer" wallet seed used to mint verified credential NFTs.
  // Leave blank in dev to auto-generate + fund a fresh testnet wallet on first mint.
  XRPL_ISSUER_SEED: z.string().optional(),

  CORS_ORIGIN: z.string().default("http://localhost:3000"),

  // Cloudinary (transcript + video verification uploads)
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),

  // Upload limits
  TRANSCRIPT_MAX_FILE_MB: z.coerce.number().default(10),
  VIDEO_MAX_FILE_MB: z.coerce.number().default(100),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  process.exit(1);
}

export const env = parsed.data;
