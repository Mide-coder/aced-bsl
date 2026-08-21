"use client";
// ACED — VerifiedBadge
// Green badge showing course code + optional XRPL explorer link

import { ShieldCheck, ExternalLink } from "lucide-react";

interface VerifiedBadgeProps {
  courseCode: string;
  grade?: string;
  txHash?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "text-[10px] px-2 py-0.5 gap-1",
  md: "text-xs px-2.5 py-1 gap-1.5",
  lg: "text-sm px-3 py-1.5 gap-2",
};

const iconSizes = { sm: 10, md: 12, lg: 14 };

export function VerifiedBadge({ courseCode, grade, txHash, size = "md" }: VerifiedBadgeProps) {
  const label = grade ? `Verified ${grade} in ${courseCode}` : `Verified: ${courseCode}`;

  const badge = (
    <span className={`inline-flex items-center ${sizes[size]} bg-aced-green/10 text-aced-green font-bold rounded-full border border-aced-green/20 font-mono`}>
      <ShieldCheck size={iconSizes[size]} className="shrink-0" />
      {label}
      {txHash && <ExternalLink size={iconSizes[size] - 2} className="ml-0.5 opacity-60" />}
    </span>
  );

  if (txHash) {
    return (
      <a
        href={`https://testnet.xrpl.org/transactions/${txHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
        title="View on XRPL Testnet"
      >
        {badge}
      </a>
    );
  }

  return badge;
}
