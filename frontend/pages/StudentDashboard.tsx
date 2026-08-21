"use client";
// ACED — StudentDashboard

import { Search, BookOpen, Clock, CheckCircle, CreditCard, ArrowRight, Star, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { BookingStatusBadge } from "../components/BookingStatusBadge";
import { EscrowTimeline } from "../components/EscrowTimeline";
import { useState } from "react";
import Link from "next/link";

const MOCK_BOOKINGS = [
  {
    id: "BK001",
    tutor: "Scholar_X42",
    course: "CSC301",
    subject: "Data Structures",
    date: "Today, 4:00 PM",
    duration: "2 hours",
    amount: 7000,
    status: "paid" as const,
    txHash: "a3f2b1c4d5e6f7a8",
  },
  {
    id: "BK002",
    tutor: "ProTutor_77",
    course: "MTH201",
    subject: "Calculus",
    date: "Tomorrow, 10:00 AM",
    duration: "1 hour",
    amount: 2800,
    status: "accepted" as const,
    txHash: undefined,
  },
  {
    id: "BK003",
    tutor: "AceIt_Chem",
    course: "CHM201",
    subject: "Organic Chemistry",
    date: "15 Aug, 2:00 PM",
    duration: "3 hours",
    amount: 9000,
    status: "completed" as const,
    txHash: "b4c5d6e7f8a9b0c1",
  },
  {
    id: "BK004",
    tutor: "MathWiz_33",
    course: "MTH301",
    subject: "Linear Algebra",
    date: "10 Aug, 11:00 AM",
    duration: "1 hour",
    amount: 3200,
    status: "released" as const,
    txHash: "c5d6e7f8a9b0c1d2",
  },
];

const MOCK_PAYMENTS = [
  { id: "PAY001", description: "CSC301 — Scholar_X42", date: "Today", amount: 7000, type: "escrow_lock" },
  { id: "PAY002", description: "CHM201 — AceIt_Chem (released)", date: "15 Aug", amount: 9000, type: "released" },
  { id: "PAY003", description: "MTH301 — MathWiz_33 (released)", date: "10 Aug", amount: 3200, type: "released" },
];

export default function StudentDashboard() {
  const router = useRouter();
  const [activeBooking, setActiveBooking] = useState<string | null>("BK001");

  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-aced-text">Hey, Anon_47 👋</h1>
            <p className="text-sm text-gray-400">Your learning sessions</p>
          </div>
          <a href="/search" className="inline-flex items-center gap-2 bg-aced-royal text-white font-bold px-5 py-3 rounded-[var(--radius-aced)] hover:bg-aced-blue transition-colors text-sm shadow-md">
            <Search size={15} /> Find Tutor
          </a>
        </div>

        {/* Become a Tutor CTA */}
        <div className="bg-gradient-to-r from-aced-royal to-aced-blue rounded-[var(--radius-aced-lg)] p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <p className="font-heading font-bold text-white">Become a Tutor</p>
              <p className="text-xs text-white/60">Upload your transcript, record a teaching clip, and start earning.</p>
            </div>
          </div>
          <Link href="/become-tutor" className="inline-flex items-center gap-2 bg-white text-aced-royal font-bold px-5 py-3 rounded-[var(--radius-aced)] hover:bg-gray-100 transition-colors text-sm shrink-0">
            Get Started <ArrowRight size={14} />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: BookOpen,     color: "text-aced-royal",  bg: "bg-aced-royal/10",  label: "Total Sessions",   value: "4" },
            { icon: CheckCircle,  color: "text-aced-green",  bg: "bg-aced-green/10",  label: "Completed",        value: "2" },
            { icon: Clock,        color: "text-aced-gold",   bg: "bg-aced-gold/10",   label: "Upcoming",         value: "2" },
            { icon: CreditCard,   color: "text-aced-blue",   bg: "bg-aced-blue/10",   label: "Total Spent",      value: "₦22,000" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={20} className={s.color} />
                </div>
                <div>
                  <p className="text-xl font-heading font-bold text-aced-text">{s.value}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Bookings list ── */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="font-heading font-bold text-aced-text">My Bookings</h2>
            {MOCK_BOOKINGS.map(b => (
              <div
                key={b.id}
                onClick={() => {
                  if (b.status === "accepted") {
                    router.push("/booking-confirmed");
                  } else {
                    setActiveBooking(b.id);
                  }
                }}
                className={`bg-white rounded-[var(--radius-aced-lg)] border p-4 cursor-pointer transition-all hover:shadow-md ${activeBooking === b.id ? "border-aced-royal shadow-md" : "border-gray-100"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aced-royal to-aced-blue flex items-center justify-center text-white font-bold font-mono text-xs shrink-0">
                      {b.tutor.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-aced-text">{b.tutor}</p>
                      <p className="text-xs text-gray-400">{b.course} · {b.subject}</p>
                    </div>
                  </div>
                  <BookingStatusBadge status={b.status} />
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-400 ml-[52px]">
                  <span className="flex items-center gap-1"><Clock size={11} /> {b.date}</span>
                  <span>{b.duration}</span>
                  <span className="ml-auto font-bold text-aced-text">₦{b.amount.toLocaleString()}</span>
                </div>
                {b.status === "completed" && (
                  <button className="mt-3 flex items-center gap-1.5 text-xs text-aced-gold font-bold hover:underline ml-[52px]">
                    <Star size={11} className="fill-aced-gold" /> Leave a review
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* ── Right: escrow + payments ── */}
          <div className="space-y-4">

            {/* Active escrow */}
            {activeBooking && (() => {
              const b = MOCK_BOOKINGS.find(x => x.id === activeBooking)!;
              return (
                <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-5 space-y-4">
                  <h3 className="font-heading font-bold text-sm text-aced-text">Escrow Status</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{b.course} · {b.tutor}</span>
                    <BookingStatusBadge status={b.status} />
                  </div>
                  <EscrowTimeline currentStep={b.status === "released" ? "released" : b.status === "completed" ? "completed" : b.status === "paid" ? "paid" : b.status === "accepted" ? "accepted" : "requested"} txHash={b.txHash} />
                </div>
              );
            })()}

            {/* Payment history */}
            <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-5 space-y-3">
              <h3 className="font-heading font-bold text-sm text-aced-text">Payment History</h3>
              {MOCK_PAYMENTS.map(p => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-xs font-semibold text-aced-text">{p.description}</p>
                    <p className="text-[10px] text-gray-400">{p.date}</p>
                  </div>
                  <span className={`text-sm font-bold ${p.type === "released" ? "text-aced-green" : "text-aced-royal"}`}>
                    {p.type === "released" ? "–" : "🔒"} ₦{p.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}