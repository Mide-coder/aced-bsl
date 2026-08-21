"use client";
// ACED — AuthPage (Register / Login toggle)
// TODO: Implement full auth page with:
//   - Toggle between Register and Login modes
//   - Role selector (student / tutor) — register only
//   - Display Name input (pseudonym for search) — register only
//   - Full Name input (only revealed after booking) — register only
//   - University Email input
//   - Password input with show/hide toggle
//   - Left brand panel: "Study smarter. Stay anonymous." + feature bullets
//   - Dev bypass: redirect to dashboard if NEXT_PUBLIC_DEV_BYPASS=true
//
// Validation: displayName + fullName required on register
// Design: split-screen on lg, left panel bg-aced-text, right form bg-gray-50/50

import { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "student" | "tutor";
type Mode = "login" | "register";

export default function AuthPage() {
  const [mode, setMode]           = useState<Mode>("register");
  const [role, setRole]           = useState<Role>("student");
  const [displayName, setDisplayName] = useState("");
  const [fullName, setFullName]     = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Implement registration / login logic
    console.log({ mode, role, displayName, fullName, email, password });
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left brand panel */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-aced-text">
        <div className="text-center space-y-4 max-w-sm">
          <h1 className="text-4xl font-heading font-bold text-white">
            Study smarter.<br />
            <span className="text-aced-blue">Stay anonymous.</span>
          </h1>
          <p className="text-white/60 text-sm">TODO: Add feature bullets here</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-gray-50/50">
        <div className="w-full max-w-md space-y-6 py-8">
          <h2 className="text-2xl font-heading font-bold text-aced-text">
            {mode === "register" ? "Join ACED" : "Welcome back"}
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-[var(--radius-aced)] px-4 py-3 text-sm text-aced-red">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* TODO: Role selector, display name, full name, email, password, submit */}
            <p className="text-sm text-gray-400">TODO: Build out the form fields</p>
            <button type="submit" className="w-full py-4 bg-aced-royal text-white font-bold rounded-[var(--radius-aced)]">
              {mode === "register" ? "Create Account" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
