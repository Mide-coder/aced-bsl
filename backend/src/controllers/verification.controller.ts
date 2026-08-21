import { Request, Response } from "express";
import fs from "fs/promises";
import { prisma } from "../config/prisma";
import { uploadBuffer } from "../services/cloudinary.service";

async function cleanupTempFile(filePath: string) {
  try {
    await fs.unlink(filePath);
  } catch {
    // best effort — don't let cleanup failure mask the real error
  }
}

export async function uploadTranscript(req: Request, res: Response) {
  if (req.user!.role !== "tutor") {
    return res
      .status(400)
      .json({ error: "Only tutors submit transcript verification" });
  }
  if (!req.file) {
    return res
      .status(400)
      .json({ error: "No file uploaded (field name: 'file')" });
  }

  try {
    const buffer = await fs.readFile(req.file.path);
    const result = await uploadBuffer(buffer, {
      folder: `aced/transcripts/${req.user!.id}`,
      resourceType: "auto",
    });

    const record = await prisma.transcriptVerification.create({
      data: {
        userId: req.user!.id,
        fileUrl: result.url,
        fileType: req.file.mimetype,
      },
    });

    return res.status(201).json(record);
  } finally {
    await cleanupTempFile(req.file.path);
  }
}

export async function listMyTranscripts(req: Request, res: Response) {
  const records = await prisma.transcriptVerification.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: "desc" },
  });
  return res.json(records);
}

export async function uploadVideo(req: Request, res: Response) {
  if (req.user!.role !== "tutor") {
    return res
      .status(400)
      .json({ error: "Only tutors submit teaching-proof videos" });
  }
  if (!req.file) {
    return res
      .status(400)
      .json({ error: "No file uploaded (field name: 'file')" });
  }

  try {
    const buffer = await fs.readFile(req.file.path);
    const result = await uploadBuffer(buffer, {
      folder: `aced/videos/${req.user!.id}`,
      resourceType: "video",
    });

    const record = await prisma.videoVerification.create({
      data: {
        userId: req.user!.id,
        videoUrl: result.url,
        fileType: req.file.mimetype,
      },
    });

    return res.status(201).json(record);
  } finally {
    await cleanupTempFile(req.file.path);
  }
}

export async function listMyVideos(req: Request, res: Response) {
  const records = await prisma.videoVerification.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: "desc" },
  });
  return res.json(records);
}
