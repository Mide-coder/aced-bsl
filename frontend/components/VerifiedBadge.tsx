"use client";
// ACED — VerifiedBadge
// Green badge showing course code + XRPL explorer link or credential hash fallback.
// Never shows both, never shows neither if verification succeeded.

import { ShieldCheck, ExternalLink, Hash } from "lucide-react";

interface VerifiedBadgeProps {
  courseCode: string;
  grade?: string;
  /** On-chain XRPL transaction hash — present when mint succeeded. */
  txHash?: string | null;
  /** SHA-256 credential hash — present when XRPL mint failed and fallback was used. */
  credentialHash?: string | null;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "text-[10px] px-2 py-0.5 gap-1",
  md: "text-xs px-2.5 py-1 gap-1.5",
  lg: "text-sm px-3 py-1.5 gap-2",
};

const iconSizes = { sm: 10, md: 12, lg: 14 };

export function VerifiedBadge({
  courseCode,
  grade,
  txHash,
  credentialHash,
  size = "md",
}: VerifiedBadgeProps) {
  // --- On-chain path ---
  if (txHash) {
    const label = grade ? `Verified ${grade} in ${courseCode}` : `Verified: ${courseCode}`;
    return (
      <a
        href={`https://testnet.xrpl.org/transactions/${txHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center ${sizes[size]} bg-aced-green/10 text-aced-green font-bold rounded-full border border-aced-green/20 font-mono hover:opacity-80 transition-opacity"
        title="View on XRPL Testnet"
      >
        <ShieldCheck size={iconSizes[size]} className="shrink-0" />
        {label}
        <ExternalLink size={iconSizes[size] - 2} className="ml-0.5 opacity-60" />
      </a>
    );
  }

  // --- Hash fallback path ---
  if (credentialHash) {
    const short = credentialHash.slice(0, 10);
    return (
      <span
        className={`inline-flex items-center ${sizes[size]} bg-aced-green/10 text-aced-green font-bold rounded-full border border-aced-green/20 font-mono`}
        title={`Full hash: ${credentialHash}`}
      >
        <Hash size={iconSizes[size]} className="shrink-0" />
        Credential Hash: {short}… — Mainnet ready
      </span>
    );
  }

  // Fallback: should not normally be reached if verification succeeded.
  return (
    <span
      className={`inline-flex items-center ${sizes[size]} bg-aced-green/10 text-aced-green font-bold rounded-full border border-aced-green/20 font-mono`}
    >
      <ShieldCheck size={iconSizes[size]} className="shrink-0" />
      Verified: {courseCode}
    </span>
  );
}
