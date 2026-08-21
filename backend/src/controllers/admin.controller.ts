import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { ReviewVerificationInput } from "../types/schemas";

export async function listPendingTranscripts(_req: Request, res: Response) {
  const records = await prisma.transcriptVerification.findMany({
    where: { status: "pending" },
    orderBy: { createdAt: "asc" },
    include: { user: { select: { id: true, pseudonym: true, email: true } } },
  });
  return res.json(records);
}

export async function reviewTranscript(req: Request, res: Response) {
  const { id } = req.params;
  const { status, rejectionReason } = req.body as ReviewVerificationInput;

  const existing = await prisma.transcriptVerification.findUnique({
    where: { id },
  });
  if (!existing) {
    return res.status(404).json({ error: "Transcript verification not found" });
  }

  const updated = await prisma.transcriptVerification.update({
    where: { id },
    data: {
      status,
      rejectionReason: status === "rejected" ? rejectionReason : null,
      reviewedById: req.user!.id,
      reviewedAt: new Date(),
    },
  });

  // Approving a transcript is what flips a tutor's overall verified badge —
  // video verification is a separate, additive trust signal, not a gate here.
  if (status === "verified") {
    await prisma.user.update({
      where: { id: existing.userId },
      data: { isVerifiedTutor: true },
    });
  }

  return res.json(updated);
}

export async function listPendingVideos(_req: Request, res: Response) {
  const records = await prisma.videoVerification.findMany({
    where: { status: "pending" },
    orderBy: { createdAt: "asc" },
    include: { user: { select: { id: true, pseudonym: true, email: true } } },
  });
  return res.json(records);
}

export async function reviewVideo(req: Request, res: Response) {
  const { id } = req.params;
  const { status, rejectionReason } = req.body as ReviewVerificationInput;

  const existing = await prisma.videoVerification.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "Video verification not found" });
  }

  const updated = await prisma.videoVerification.update({
    where: { id },
    data: {
      status,
      rejectionReason: status === "rejected" ? rejectionReason : null,
      reviewedById: req.user!.id,
      reviewedAt: new Date(),
    },
  });

  return res.json(updated);
}
