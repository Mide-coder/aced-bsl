"use client";
// ACED — TutorDashboard

import { ShieldCheck, CheckCircle, Clock, AlertCircle, TrendingUp, Users, Star, Upload, BookOpen } from "lucide-react";
import { BookingStatusBadge } from "../components/BookingStatusBadge";
import { TranscriptUpload } from "../components/TranscriptUpload";
import { VerifiedBadge } from "../components/VerifiedBadge";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PROFILE_STEPS = [
  { label: "Account created",   done: true },
  { label: "Display name set",  done: true },
  { label: "Transcript uploaded", done: true },
  { label: "Grade verified (XRPL)", done: false },
  { label: "First booking received", done: false },
];

const BOOKING_REQUESTS = [
  { id: "BR001", student: "Anon_47",  course: "CSC301", date: "Today 4PM",   duration: "2hr", amount: 7000,  status: "requested" as const },
  { id: "BR002", student: "Anon_92",  course: "CSC301", date: "Tomorrow 10AM", duration: "1hr", amount: 3500,  status: "requested" as const },
  { id: "BR003", student: "Anon_15",  course: "CSC401", date: "18 Aug 2PM",  duration: "3hr", amount: 10500, status: "accepted"  as const },
  { id: "BR004", student: "Anon_63",  course: "CSC301", date: "10 Aug",      duration: "1hr", amount: 3500,  status: "completed" as const },
];

const EARNINGS = [
  { label: "This Week",  value: "₦14,000" },
  { label: "This Month", value: "₦31,500" },
  { label: "All Time",   value: "₦87,200" },
  { label: "Pending",    value: "₦17,500" },
];

export default function TutorDashboard() {
  const [showUpload, setShowUpload] = useState(false);
  const [viewMode, setViewMode] = useState<"tutor" | "student">("tutor");
  const completedSteps = PROFILE_STEPS.filter(s => s.done).length;
  const pct = Math.round((completedSteps / PROFILE_STEPS.length) * 100);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-heading font-bold text-aced-text">Scholar_X42</h1>
            <p className="text-sm text-gray-400">Your tutoring hub</p>
          </div>
          <div className="flex items-center gap-3">
            {/* View switcher for dual-role */}
            <div className="flex bg-gray-100 rounded-[var(--radius-aced)] p-1">
              {(["tutor", "student"] as const).map(v => (
                <button
                  key={v}
                  onClick={() => {
                    setViewMode(v);
                    if (v === "student") router.push("/student");
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-[var(--radius-aced)] transition-all capitalize ${viewMode === v ? "bg-white shadow-sm text-aced-royal" : "text-gray-500"}`}
                >
                  {v === "tutor" ? <ShieldCheck size={13} /> : <BookOpen size={13} />}
                  {v} view
                </button>
              ))}
            </div>
            <VerifiedBadge courseCode="CSC301" grade="A" txHash="a3f2b1c4" size="md" />
          </div>
        </div>

        {/* Earnings */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {EARNINGS.map((e, i) => (
            <div key={i} className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-5">
              <p className="text-2xl font-heading font-bold text-aced-royal">{e.value}</p>
              <p className="text-xs text-gray-400 mt-1">{e.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── LEFT: profile completion + transcript + verification ── */}
          <div className="space-y-4">

            {/* Profile completion */}
            <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-aced-text">Profile Completion</h3>
                <span className="text-sm font-bold text-aced-royal">{pct}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-aced-royal to-aced-blue rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
              <div className="space-y-2">
                {PROFILE_STEPS.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    {s.done
                      ? <CheckCircle size={15} className="text-aced-green shrink-0" />
                      : <div className="w-[15px] h-[15px] rounded-full border-2 border-gray-200 shrink-0" />
                    }
                    <span className={`text-sm ${s.done ? "text-aced-text" : "text-gray-400"}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transcript upload */}
            <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-sm text-aced-text">Transcript</h3>
                <button
                  onClick={() => setShowUpload(!showUpload)}
                  className="text-xs text-aced-royal font-bold hover:underline flex items-center gap-1"
                >
                  <Upload size={12} /> {showUpload ? "Cancel" : "Upload new"}
                </button>
              </div>
              {showUpload
                ? <TranscriptUpload onUpload={() => setShowUpload(false)} />
                : (
                  <div className="flex items-center gap-3 p-3 bg-aced-green/5 border border-aced-green/20 rounded-[var(--radius-aced)]">
                    <CheckCircle size={16} className="text-aced-green shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-aced-text">Transcript uploaded</p>
                      <p className="text-xs text-gray-400">Pending XRPL verification</p>
                    </div>
                  </div>
                )
              }
            </div>

            {/* Verification status */}
            <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-5 space-y-3">
              <h3 className="font-heading font-bold text-sm text-aced-text flex items-center gap-2">
                <ShieldCheck size={14} className="text-aced-green" /> Verification Status
              </h3>
              <div className="space-y-2">
                {[
                  { course: "CSC301", status: "verified",  txHash: "a3f2b1c4" },
                  { course: "CSC401", status: "pending",   txHash: undefined },
                  { course: "CSC201", status: "unverified", txHash: undefined },
                ].map((v, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-aced-text">{v.course}</span>
                    {v.status === "verified"
                      ? <VerifiedBadge courseCode={v.course} grade="A" txHash={v.txHash} size="sm" />
                      : v.status === "pending"
                      ? <span className="text-[10px] font-bold bg-aced-gold/10 text-aced-gold px-2 py-0.5 rounded-full">Pending</span>
                      : <span className="text-[10px] font-bold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Not submitted</span>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: booking requests ── */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-aced-text">Booking Requests</h2>
              <span className="text-xs font-bold bg-aced-royal/10 text-aced-royal px-3 py-1 rounded-full">
                {BOOKING_REQUESTS.filter(b => b.status === "requested").length} pending
              </span>
            </div>

            <div className="space-y-3">
              {BOOKING_REQUESTS.map(b => (
                <div key={b.id} className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold font-mono text-xs">
                        {b.student.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-aced-text">{b.student}</p>
                        <p className="text-xs text-gray-400">{b.course} · {b.date} · {b.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <BookingStatusBadge status={b.status} />
                      <p className="text-sm font-bold text-aced-royal mt-1">₦{b.amount.toLocaleString()}</p>
                    </div>
                  </div>

                  {b.status === "requested" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push("/booking-confirmed")}
                        className="flex-1 py-2 bg-aced-green text-white text-xs font-bold rounded-[var(--radius-aced)] hover:opacity-90 transition-opacity"
                      >
                        Accept
                      </button>
                      <button className="flex-1 py-2 bg-red-50 text-aced-red text-xs font-bold rounded-[var(--radius-aced)] border border-red-200 hover:bg-red-100 transition-colors">
                        Decline
                      </button>
                    </div>
                  )}
                  {b.status === "accepted" && (
                    <button className="w-full py-2 bg-aced-royal/10 text-aced-royal text-xs font-bold rounded-[var(--radius-aced)] hover:bg-aced-royal/20 transition-colors">
                      Mark Session Complete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}