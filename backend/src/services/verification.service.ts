import crypto from "crypto";
import { mintCredentialNFT, MintCredentialParams } from "./xrpl.service";

/**
 * Metadata for a verified credential — used both for the XRPL NFToken URI
 * and for the deterministic SHA-256 fallback hash.
 */
export interface CredentialMetadata {
  tutorId: string;
  courseCode: string;
  grade: string;
  university: string;
  verifiedAt: number; // unix timestamp (seconds)
}

export interface OnchainResult {
  status: "verified_onchain";
  xrplTxHash: string;
  explorerUrl: string;
  credentialHash: null;
}

export interface HashFallbackResult {
  status: "verified_hash_fallback";
  xrplTxHash: null;
  explorerUrl: null;
  credentialHash: string;
}

export type MintOrFallbackResult = OnchainResult | HashFallbackResult;

/**
 * Attempt to mint a credential NFT on XRPL testnet. If anything goes wrong
 * (network error, timeout, faucet failure, tx rejected), fall back to a
 * deterministic SHA-256 hash of the same credential metadata.
 *
 * This function NEVER throws — it always returns a valid result.
 *
 * @param metadata  Credential metadata to mint or hash.
 * @param mintFn    Optional override for the mint function (for testing). Defaults to mintCredentialNFT.
 */
export async function mintOrFallback(
  metadata: CredentialMetadata,
  mintFn: (params: MintCredentialParams) => Promise<{ nftokenId: string; txHash: string }> = mintCredentialNFT
): Promise<MintOrFallbackResult> {
  try {
    console.log(
      `[verification] Attempting XRPL NFToken mint for tutor=${metadata.tutorId} course=${metadata.courseCode}`
    );

    const { txHash } = await mintFn({
      courseCode: metadata.courseCode,
      grade: metadata.grade,
      // We don't have a proofUri here — the transcript is already uploaded.
      // Use a placeholder that still encodes the verification context.
      proofUri: `aced://verified/${metadata.tutorId}/${metadata.courseCode}`,
    });

    const explorerUrl = `https://testnet.xrpl.org/transactions/${txHash}`;

    console.log(
      `[verification] ✅ On-chain mint succeeded — txHash=${txHash}`
    );

    return {
      status: "verified_onchain",
      xrplTxHash: txHash,
      explorerUrl,
      credentialHash: null,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(
      `[verification] ⚠️  XRPL mint failed (${message}) — falling back to SHA-256 hash`
    );

    const hash = computeCredentialHash(metadata);

    console.log(
      `[verification] ✅ Hash fallback ready — credentialHash=${hash}`
    );

    return {
      status: "verified_hash_fallback",
      xrplTxHash: null,
      explorerUrl: null,
      credentialHash: hash,
    };
  }
}

/**
 * Deterministic SHA-256 hash of credential metadata.
 * Same inputs always produce the same hex string — critical for audit/re-verify.
 */
export function computeCredentialHash(metadata: CredentialMetadata): string {
  const payload = JSON.stringify(metadata, Object.keys(metadata).sort());
  return crypto.createHash("sha256").update(payload).digest("hex");
}
