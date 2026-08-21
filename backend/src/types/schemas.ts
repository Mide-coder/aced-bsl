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
