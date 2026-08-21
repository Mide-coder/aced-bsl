"use client";
// ACED — PaystackButton
// Styled payment trigger — Paystack test mode (visual placeholder)

import { CreditCard, Lock, Loader2 } from "lucide-react";
import { useState } from "react";

interface PaystackButtonProps {
  amount: number;
  label?: string;
  onSuccess?: (ref: string) => void;
  disabled?: boolean;
}

export function PaystackButton({ amount, label, onSuccess, disabled }: PaystackButtonProps) {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    if (disabled || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const mockRef = `PSK_TEST_${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
      onSuccess?.(mockRef);
    }, 1500);
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-aced-royal text-white font-bold rounded-[var(--radius-aced)] text-base hover:bg-aced-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-aced-royal/20"
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Processing…
        </>
      ) : (
        <>
          <Lock size={16} />
          <CreditCard size={16} />
          {label ?? `Pay ₦${amount.toLocaleString()} (Escrow)`}
        </>
      )}
    </button>
  );
}
