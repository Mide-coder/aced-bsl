import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { toPublicUser } from "../utils/publicUser";
import { normalizeCourseCode } from "../utils/courseCode";
import { AddCourseInterestInput, UpdateProfileInput } from "../types/schemas";

export async function updateProfile(req: Request, res: Response) {
  const { pseudonym, hourlyRateKobo } = req.body as UpdateProfileInput;

  if (hourlyRateKobo !== undefined && req.user!.role !== "tutor") {
    return res
      .status(400)
      .json({ error: "Only tutors can set an hourly rate" });
  }

  if (pseudonym !== undefined) {
    const taken = await prisma.user.findFirst({
      where: { pseudonym, NOT: { id: req.user!.id } },
    });
    if (taken) {
      return res.status(409).json({ error: "Pseudonym already in use" });
    }
  }

  const updated = await prisma.user.update({
    where: { id: req.user!.id },
    data: {
      ...(pseudonym !== undefined && { pseudonym }),
      ...(hourlyRateKobo !== undefined && { hourlyRateKobo }),
    },
  });

  return res.json(toPublicUser(updated));
}

/**
 * Adds a course to the caller's profile. Type is inferred from role — tutors
 * declare courses they teach, students declare courses they're weak in —
 * callers never pass `type` directly.
 */
export async function addCourseInterest(req: Request, res: Response) {
  const { courseCode } = req.body as AddCourseInterestInput;
  const normalized = normalizeCourseCode(courseCode);
  const type = req.user!.role === "tutor" ? "teaching" : "learning";

  const interest = await prisma.courseInterest.upsert({
    where: {
      userId_courseCode_type: {
        userId: req.user!.id,
        courseCode: normalized,
        type,
      },
    },
    update: {}, // already exists — no-op, just return it
    create: { userId: req.user!.id, courseCode: normalized, type },
  });

  return res.status(201).json(interest);
}

export async function listMyCourseInterests(req: Request, res: Response) {
  const interests = await prisma.courseInterest.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: "asc" },
  });
  return res.json(interests);
}

export async function removeCourseInterest(req: Request, res: Response) {
  const { id } = req.params;

  const interest = await prisma.courseInterest.findUnique({ where: { id } });
  if (!interest || interest.userId !== req.user!.id) {
    return res.status(404).json({ error: "Course interest not found" });
  }

  await prisma.courseInterest.delete({ where: { id } });
  return res.status(204).send();
}
