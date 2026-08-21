import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { mintOrFallback } from "../services/verification.service";
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
    // Attempt XRPL NFT mint with deterministic hash fallback.
    const mintResult = await mintOrFallback({
      tutorId: existing.userId,
      courseCode: "BROAD", // transcript-level verification, not course-specific
      grade: "VERIFIED",
      university: "ACED",
      verifiedAt: Math.floor(Date.now() / 1000),
    });

    // Persist whichever credential proof we got — on-chain tx hash or hash fallback.
    const updateData: Record<string, unknown> = {
      isVerifiedTutor: true,
    };

    await prisma.transcriptVerification.update({
      where: { id },
      data: {
        credentialNftTxHash: mintResult.xrplTxHash,
        credentialHash: mintResult.credentialHash,
      },
    });

    await prisma.user.update({
      where: { id: existing.userId },
      data: updateData,
    });

    console.log(
      `[admin] Verification ${id} approved — mint status: ${mintResult.status}`
    );
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
