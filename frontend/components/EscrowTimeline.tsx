"use client";
// ACED — EscrowTimeline
// Visual stepper: Requested → Accepted → Paid → Completed → Released

import { Check, Clock, ExternalLink } from "lucide-react";

export type EscrowStep = "requested" | "accepted" | "paid" | "completed" | "released";

interface Step {
  key: EscrowStep;
  label: string;
  desc: string;
}

const STEPS: Step[] = [
  { key: "requested",  label: "Requested",  desc: "Student sent a booking request" },
  { key: "accepted",   label: "Accepted",   desc: "Tutor confirmed the session" },
  { key: "paid",       label: "Paid",       desc: "Funds locked in escrow" },
  { key: "completed",  label: "Completed",  desc: "Session delivered" },
  { key: "released",   label: "Released",   desc: "Tutor paid — escrow cleared" },
];

const ORDER: EscrowStep[] = ["requested", "accepted", "paid", "completed", "released"];

interface EscrowTimelineProps {
  currentStep: EscrowStep;
  txHash?: string;
  timestamps?: Partial<Record<EscrowStep, string>>;
}

export function EscrowTimeline({ currentStep, txHash, timestamps }: EscrowTimelineProps) {
  const currentIdx = ORDER.indexOf(currentStep);

  return (
    <div className="space-y-0">
      {STEPS.map((step, i) => {
        const isPast    = i < currentIdx;
        const isCurrent = i === currentIdx;
        const isFuture  = i > currentIdx;

        return (
          <div key={step.key} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10
                ${isPast    ? "bg-aced-green text-white"                         : ""}
                ${isCurrent ? "bg-aced-royal text-white timeline-dot-active"     : ""}
                ${isFuture  ? "bg-gray-100 text-gray-300 border border-gray-200" : ""}
              `}>
                {isPast
                  ? <Check size={14} strokeWidth={3} />
                  : isCurrent
                  ? <Clock size={14} />
                  : <span className="text-xs font-bold">{i + 1}</span>
                }
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-0.5 flex-1 my-1 min-h-[24px] ${isPast ? "bg-aced-green/40" : "bg-gray-100"}`} />
              )}
            </div>

            <div className="pb-5 pt-0.5 flex-1">
              <div className="flex items-center gap-2">
                <p className={`font-heading font-bold text-sm ${isFuture ? "text-gray-300" : isCurrent ? "text-aced-royal" : "text-aced-green"}`}>
                  {step.label}
                </p>
                {isCurrent && (
                  <span className="text-[9px] font-bold bg-aced-royal/10 text-aced-royal px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Current
                  </span>
                )}
              </div>
              <p className={`text-xs mt-0.5 ${isFuture ? "text-gray-300" : "text-gray-500"}`}>{step.desc}</p>
              {timestamps?.[step.key] && (
                <p className="text-[10px] text-gray-400 mt-0.5">{timestamps[step.key]}</p>
              )}
              {step.key === "paid" && txHash && (
                <a
                  href={`https://testnet.xrpl.org/transactions/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-aced-blue hover:underline mt-1"
                >
                  Tx: {txHash.slice(0, 8)}… <ExternalLink size={9} />
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
