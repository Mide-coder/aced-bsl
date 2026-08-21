import { z } from "zod";

export const registerSchema = z.object({
  pseudonym: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  role: z.enum(["student", "tutor"]).default("student"),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const mintCredentialSchema = z.object({
  courseCode: z.string().min(2).max(20),
  grade: z.string().min(1).max(5),
  proofUri: z.string().url(),
  nftokenTaxon: z.number().int().nonnegative().default(0),
  transferFee: z.number().int().min(0).max(50000).default(0),
  sendToOwnWallet: z.boolean().default(true),
});
export type MintCredentialInput = z.infer<typeof mintCredentialSchema>;

export const updateProfileSchema = z
  .object({
    pseudonym: z.string().min(3).max(50).optional(),
    // Rate in kobo (NGN smallest unit) — tutors only, enforced in the controller
    // since it depends on req.user.role, not just the shape of the body.
    hourlyRateKobo: z.number().int().positive().max(100_000_000).optional(),
  })
  .refine(
    (data) => data.pseudonym !== undefined || data.hourlyRateKobo !== undefined,
    {
      message:
        "Provide at least one field to update (pseudonym or hourlyRateKobo)",
    }
  );
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const addCourseInterestSchema = z.object({
  courseCode: z.string().trim().min(2).max(20),
});
export type AddCourseInterestInput = z.infer<typeof addCourseInterestSchema>;

export const reviewVerificationSchema = z
  .object({
    status: z.enum(["verified", "rejected"]),
    rejectionReason: z.string().max(500).optional(),
  })
  .refine((data) => data.status !== "rejected" || !!data.rejectionReason, {
    message: "rejectionReason is required when rejecting",
    path: ["rejectionReason"],
  });
export type ReviewVerificationInput = z.infer<typeof reviewVerificationSchema>;
