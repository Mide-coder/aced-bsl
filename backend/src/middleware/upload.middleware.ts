import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import { env } from "../config/env";

const TRANSCRIPT_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
]);
const VIDEO_MIME_TYPES = new Set([
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);

const UPLOAD_TMP_DIR = path.join(process.cwd(), "tmp", "uploads");
fs.mkdirSync(UPLOAD_TMP_DIR, { recursive: true });

function makeFileFilter(allowed: Set<string>) {
  return (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (!allowed.has(file.mimetype)) {
      return cb(new Error(`Unsupported file type: ${file.mimetype}`));
    }
    cb(null, true);
  };
}

const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_TMP_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

export const uploadTranscript = multer({
  storage: diskStorage,
  limits: { fileSize: env.TRANSCRIPT_MAX_FILE_MB * 1024 * 1024 },
  fileFilter: makeFileFilter(TRANSCRIPT_MIME_TYPES),
});

export const uploadVideo = multer({
  storage: diskStorage,
  limits: { fileSize: env.VIDEO_MAX_FILE_MB * 1024 * 1024 },
  // NOTE: this only caps file size, not duration. Enforcing the "2 minute"
  // limit server-side would need probing the file (e.g. ffprobe), which
  // means bundling ffmpeg in the deploy environment — not wired up yet.
  // For now, duration is a client-side / UX constraint only.
  fileFilter: makeFileFilter(VIDEO_MIME_TYPES),
});
