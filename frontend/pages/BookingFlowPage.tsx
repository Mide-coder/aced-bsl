"use client";
// ACED — BookingFlowPage
// Book a tutor: session mode, date/time, payment, identity reveal

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, ArrowLeft, Calendar, Clock, ShieldCheck,
  CheckCircle, Loader2, Eye, Lock, CreditCard, Video, MapPin
} from "lucide-react";
import { SessionModePicker } from "../components/SessionModePicker";
import { PaystackButton } from "../components/PaystackButton";

const MOCK_TUTOR = {
  displayName: "Scholar_X42",
  course: "CSC301",
  ratePerHour: 3500,
};

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

type BookingStep = "mode" | "schedule" | "pay" | "success";

export default function BookingFlowPage() {
  const router = useRouter();
  const [step, setStep] = useState<BookingStep>("mode");
  const [sessionMode, setSessionMode] = useState<"online" | "in_person">("online");
  const [sessionDetails, setSessionDetails] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("1");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const total = MOCK_TUTOR.ratePerHour * Number(duration);

  function handlePaymentSuccess(ref: string) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 1500);
  }

  const STEPS_CONFIG = [
    { key: "mode" as const, label: "Session Mode" },
    { key: "schedule" as const, label: "Schedule" },
    { key: "pay" as const, label: "Payment" },
  ];
  const currentStepIdx = STEPS_CONFIG.findIndex((s) => s.key === step);

  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Back */}
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-gray-400 hover:text-aced-royal transition-colors">
          <ArrowLeft size={14} /> Back to tutor
        </button>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-bold text-aced-text">Book a Session</h1>
          <p className="text-sm text-gray-400 mt-1">
            with <span className="font-mono font-bold text-aced-royal">{MOCK_TUTOR.displayName}</span> for{" "}
            <span className="font-mono font-bold text-aced-text">{MOCK_TUTOR.course}</span>
          </p>
        </div>

        {/* Step indicator (not on success) */}
        {step !== "success" && (
          <div className="flex gap-2">
            {STEPS_CONFIG.map((s, i) => {
              const isActive = s.key === step;
              const isDone = i < currentStepIdx;
              return (
                <div key={s.key} className="flex-1">
                  <div className={`h-1.5 rounded-full transition-all ${
                    isActive ? "bg-aced-royal" : isDone ? "bg-aced-green" : "bg-gray-100"
                  }`} />
                  <p className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${
                    isActive ? "text-aced-royal" : isDone ? "text-aced-green" : "text-gray-300"
                  }`}>
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Step content */}
        <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-6 space-y-5 animate-in fade-in duration-300" key={step}>

          {/* Step 1: Session Mode */}
          {step === "mode" && (
            <SessionModePicker
              onModeSelect={(mode, details) => {
                setSessionMode(mode);
                setSessionDetails(details);
              }}
            />
          )}

          {/* Step 2: Schedule */}
          {step === "schedule" && (
            <div className="space-y-5">
              <div>
                <h2 className="font-heading font-bold text-aced-text">Pick a Date & Time</h2>
                <p className="text-xs text-gray-400 mt-1">Choose when you want the session.</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
                  <Calendar size={11} /> Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-[var(--radius-aced)] border border-gray-200 text-sm outline-none focus:border-aced-royal focus:ring-2 focus:ring-aced-royal/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
                  <Clock size={11} /> Time Slot
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`py-2.5 rounded-[var(--radius-aced)] border-2 text-xs font-bold transition-all ${
                        time === t
                          ? "border-aced-royal bg-aced-royal/5 text-aced-royal"
                          : "border-gray-100 text-gray-500 hover:border-gray-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Duration</label>
                <div className="flex gap-2">
                  {["1", "2", "3"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`flex-1 py-3 rounded-[var(--radius-aced)] border-2 text-sm font-bold transition-all ${
                        duration === d
                          ? "border-aced-royal bg-aced-royal/5 text-aced-royal"
                          : "border-gray-100 text-gray-500 hover:border-gray-200"
                      }`}
                    >
                      {d}hr — ₦{(MOCK_TUTOR.ratePerHour * Number(d)).toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Session Note (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="What topics do you need help with?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-3 rounded-[var(--radius-aced)] border border-gray-200 text-sm outline-none focus:border-aced-royal resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === "pay" && (
            <div className="space-y-5">
              <div>
                <h2 className="font-heading font-bold text-aced-text">Confirm & Pay</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Funds are held in escrow and released only after the session.
                </p>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-[var(--radius-aced)] p-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tutor</span>
                  <span className="font-bold text-aced-text">{MOCK_TUTOR.displayName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Course</span>
                  <span className="font-mono font-bold text-aced-royal">{MOCK_TUTOR.course}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Mode</span>
                  <span className="font-bold text-aced-text flex items-center gap-1">
                    {sessionMode === "online" ? <Video size={12} /> : <MapPin size={12} />}
                    {sessionMode === "online" ? "Online (Meet)" : "In Person"}
                  </span>
                </div>
                {sessionDetails && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{sessionMode === "online" ? "Link" : "Location"}</span>
                    <span className="text-xs text-gray-600 text-right max-w-[200px] truncate">{sessionDetails}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Date & Time</span>
                  <span className="font-bold text-aced-text">{date || "Today"} · {time || "4:00 PM"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-bold text-aced-text">{duration} hour{Number(duration) > 1 ? "s" : ""}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                  <span className="font-bold text-aced-text">Total</span>
                  <span className="text-xl font-heading font-bold text-aced-royal">₦{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Identity reveal note */}
              <div className="bg-aced-blue/5 border border-aced-blue/20 rounded-[var(--radius-aced)] p-4 flex items-start gap-3">
                <Eye size={18} className="text-aced-blue shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-aced-text">Identity reveals after tutor accepts</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Both you and the tutor will see each other&apos;s real names once the booking is confirmed.
                    During search, only pseudonyms are shown.
                  </p>
                </div>
              </div>

              <PaystackButton amount={total} label={`Pay ₦${total.toLocaleString()} (Escrow)`} onSuccess={handlePaymentSuccess} />

              <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                <ShieldCheck size={12} className="text-aced-green" />
                funds held in escrow
              </div>
            </div>
          )}

          {/* Success */}
          {step === "success" && (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 bg-aced-green/10 rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-500">
                <CheckCircle size={32} className="text-aced-green" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-aced-text">Booking Confirmed!</h2>
                <p className="text-sm text-gray-500 mt-2">
                  Your payment of <span className="font-bold text-aced-royal">₦{total.toLocaleString()}</span> is
                  locked in escrow. Waiting for tutor acceptance.
                </p>
              </div>
              <div className="bg-gray-50 rounded-[var(--radius-aced)] p-5 space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-aced-green" />
                  <span className="text-sm text-aced-text">Payment secured in escrow</span>
                </div>
                <div className="flex items-center gap-3">
                  <Loader2 size={16} className="text-aced-gold animate-spin" />
                  <span className="text-sm text-aced-gold">Waiting for tutor to accept</span>
                </div>
                <div className="flex items-center gap-3 opacity-40">
                  <Lock size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-400">Real names reveal on acceptance</span>
                </div>
                <div className="flex items-center gap-3 opacity-40">
                  <Lock size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-400">Session happens</span>
                </div>
                <div className="flex items-center gap-3 opacity-40">
                  <Lock size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-400">Funds released after completion</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/student")}
                  className="flex-1 py-3 bg-aced-royal text-white font-bold rounded-[var(--radius-aced)] hover:bg-aced-blue transition-colors"
                >
                  Go to Dashboard
                </button>
              </div>
              <button
                onClick={() => router.push("/booking-confirmed")}
                className="w-full py-3 bg-aced-blue/10 text-aced-blue font-bold rounded-[var(--radius-aced)] hover:bg-aced-blue/20 transition-colors text-sm border border-aced-blue/20"
              >
                Simulate Tutor Acceptance → Identity Reveal
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        {step !== "success" && (
          <div className="flex gap-3">
            {currentStepIdx > 0 && (
              <button
                onClick={() => setStep(STEPS_CONFIG[currentStepIdx - 1].key)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-[var(--radius-aced)] text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>
            )}
            <button
              onClick={() => {
                if (currentStepIdx < STEPS_CONFIG.length - 1) {
                  setStep(STEPS_CONFIG[currentStepIdx + 1].key);
                }
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-aced-royal text-white font-bold rounded-[var(--radius-aced)] hover:bg-aced-blue transition-colors shadow-lg shadow-aced-royal/20"
            >
              {currentStepIdx < STEPS_CONFIG.length - 1 ? (
                <><ArrowRight size={14} /> Continue</>
              ) : null}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}