"use client";
// ACED — AuthPage (Register / Login toggle)

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, BookOpen, Users, ArrowRight } from "lucide-react";

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
  const devBypass = process.env.NEXT_PUBLIC_DEV_BYPASS === "true";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (mode === "register" && !displayName.trim()) {
      setError("Choose a display name (this is your pseudonym — no real name needed).");
      return;
    }
    if (mode === "register" && !fullName.trim()) {
      setError("Please enter your full name. It is only shared after a session is booked.");
      return;
    }
    setLoading(true);
    if (devBypass) {
      // Dev bypass: skip auth, go straight to the dashboard
      const dest = role === "tutor" ? "/tutor-dashboard" : "/student";
      router.push(dest);
      return;
    }
    setTimeout(() => { setLoading(false); }, 1500); // mock
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">

      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex relative bg-aced-text overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-aced-royal/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 space-y-8 max-w-sm">
          <div className="w-16 h-16 bg-gradient-to-br from-aced-royal to-aced-blue rounded-2xl rotate-6 flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-2xl font-mono">AC</span>
          </div>
          <h1 className="text-4xl font-heading font-bold text-white leading-tight">
            Study smarter.<br /><span className="text-aced-blue">Stay anonymous.</span>
          </h1>
          <div className="space-y-5">
            {[
              { icon: ShieldCheck, color: "text-aced-green", text: "XRPL-verified tutor grades" },
              { icon: Users,       color: "text-aced-blue",  text: "No real names until you choose" },
              { icon: BookOpen,    color: "text-aced-gold",  text: "Escrow — tutors paid after sessions" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-4 text-white/80">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Icon size={18} className={item.color} />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-aced-blue/20 blur-[100px] rounded-full" />
      </div>

      {/* ── Right form ── */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-gray-50/50 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 py-8">

          {/* Logo (mobile) */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-aced-royal to-aced-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-mono">AC</span>
            </div>
            <span className="font-heading font-bold text-xl text-aced-royal">ACED</span>
          </div>

          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-[var(--radius-aced)] p-1">
            {(["register", "login"] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(null); }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-[var(--radius-aced)] transition-all capitalize ${mode === m ? "bg-white shadow-sm text-aced-royal" : "text-gray-500"}`}
              >
                {m === "register" ? "Create Account" : "Sign In"}
              </button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={mode}
          >
            <h2 className="text-2xl font-heading font-bold text-aced-text">
              {mode === "register" ? "Join ACED" : "Welcome back"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {mode === "register"
                ? "Choose a display name and enter your full name."
                : "Sign in to your ACED account."}
            </p>
          </motion.div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-[var(--radius-aced)] px-4 py-3 text-sm text-aced-red">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Role selector — register only */}
            {mode === "register" && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">I am a…</label>
                <div className="grid grid-cols-2 gap-3">
                  {(["student", "tutor"] as Role[]).map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-3 px-4 rounded-[var(--radius-aced)] border-2 text-sm font-bold transition-all flex items-center justify-center gap-2 capitalize ${role === r ? "border-aced-royal bg-aced-royal/5 text-aced-royal" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                    >
                      {r === "student" ? <BookOpen size={15} /> : <Users size={15} />}
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Display name — register only */}
            {mode === "register" && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Display Name (pseudonym)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Scholar_X42"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-5 py-4 rounded-[var(--radius-aced)] border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-aced-royal/20 focus:border-aced-royal outline-none text-sm placeholder:text-gray-300"
                />
                <p className="text-[10px] text-gray-400 ml-1">This is what other users see — not your real name.</p>
              </div>
            )}

            {/* Full name — register only */}
            {mode === "register" && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-5 py-4 rounded-[var(--radius-aced)] border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-aced-royal/20 focus:border-aced-royal outline-none text-sm placeholder:text-gray-300"
                />
                <p className="text-[10px] text-gray-400 ml-1">Only visible to the other party after a session is booked.</p>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">University Email</label>
              <input
                type="email"
                placeholder="you@uniben.edu.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-[var(--radius-aced)] border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-aced-royal/20 focus:border-aced-royal outline-none text-sm placeholder:text-gray-300"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 rounded-[var(--radius-aced)] border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-aced-royal/20 focus:border-aced-royal outline-none text-sm placeholder:text-gray-300 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-aced-royal text-white font-bold rounded-[var(--radius-aced)] hover:bg-aced-blue transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-base shadow-lg shadow-aced-royal/20"
            >
              {loading
                ? <span className="animate-pulse">Processing…</span>
                : mode === "register"
                ? <><ArrowRight size={16} /> Create Account</>
                : <><ArrowRight size={16} /> Sign In</>
              }
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            {mode === "register" ? "Already on ACED? " : "New here? "}
            <button
              onClick={() => { setMode(mode === "register" ? "login" : "register"); setError(null); }}
              className="text-aced-royal font-bold hover:underline"
            >
              {mode === "register" ? "Sign in" : "Create account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}