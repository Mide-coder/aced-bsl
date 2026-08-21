"use client";
// ACED — TutorProfilePage

import { Star, Clock, BookOpen, MessageSquare, ShieldCheck, ExternalLink, Calendar } from "lucide-react";
import { VerifiedBadge } from "../components/VerifiedBadge";
import { PaystackButton } from "../components/PaystackButton";
import { EscrowTimeline } from "../components/EscrowTimeline";
import { TeachingClipPlayer } from "../components/TeachingClipPlayer";
import Link from "next/link";

const MOCK_TUTOR = {
  displayName: "Scholar_X42",
  bio: "Final year CSC student @ UNILAG. Specialise in Data Structures, Algorithms, and Systems Programming. Tutored 30+ students this semester — all passed.",
  ratePerHour: 3500,
  rating: 4.9,
  reviewCount: 31,
  sessionsCompleted: 47,
  responseTime: "< 1 hour",
  subjects: ["Data Structures", "Algorithms", "Operating Systems", "Java", "Python"],
  badges: [
    { courseCode: "CSC301", grade: "A", txHash: "a3f2b1c4d5e6f7a8b9c0d1e2f3a4b5c6" },
    { courseCode: "CSC401", grade: "A", txHash: "b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9" },
    { courseCode: "CSC201", grade: "A" },
  ],
  reviews: [
    { reviewer: "Student_47", rating: 5, text: "Explained recursion in a way that finally clicked. Highly recommend.", date: "3 days ago" },
    { reviewer: "Anon_23",    rating: 5, text: "Very patient, broke down the algorithms step by step. Worth every naira.", date: "1 week ago" },
    { reviewer: "Scholar_09", rating: 4, text: "Great session, could be slightly more structured but overall excellent.", date: "2 weeks ago" },
  ],
};

export default function TutorProfilePage() {
  const t = MOCK_TUTOR;

  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── LEFT: Profile ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Header card */}
            <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-aced-royal to-aced-blue flex items-center justify-center text-white font-bold font-mono text-xl shrink-0">
                  {t.displayName.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-heading font-bold text-aced-text">{t.displayName}</h1>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-aced-gold fill-aced-gold" />
                      <span className="text-sm font-bold text-aced-text">{t.rating}</span>
                      <span className="text-sm text-gray-400">({t.reviewCount} reviews)</span>
                    </div>
                    <span className="text-gray-200">·</span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <BookOpen size={13} /> {t.sessionsCompleted} sessions
                    </div>
                    <span className="text-gray-200">·</span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={13} /> Responds {t.responseTime}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm">{t.bio}</p>

              {/* Subjects */}
              <div className="flex flex-wrap gap-1.5">
                {t.subjects.map(s => (
                  <span key={s} className="text-xs font-bold bg-aced-royal/10 text-aced-royal px-3 py-1 rounded-full uppercase tracking-wider">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified Badges */}
            <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-aced-green" />
                <h2 className="font-heading font-bold text-aced-text">XRPL-Verified Grades</h2>
              </div>
              <p className="text-xs text-gray-400">These grades are minted as NFTs on the XRPL Testnet — click any badge to verify on-chain.</p>
              <div className="flex flex-wrap gap-2">
                {t.badges.map(b => (
                  <VerifiedBadge key={b.courseCode} courseCode={b.courseCode} grade={b.grade} txHash={b.txHash} size="lg" />
                ))}
              </div>
              {/* Static tx example */}
              <div className="bg-gray-50 rounded-[var(--radius-aced)] p-3 flex items-center gap-2 text-xs text-gray-500 font-mono">
                <span className="text-gray-400">Latest Tx:</span>
                <span>a3f2b1c4d5e6f7a8…</span>
                <a href="https://testnet.xrpl.org" target="_blank" rel="noopener noreferrer" className="ml-auto text-aced-blue hover:underline flex items-center gap-1">
                  View on XRPL <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Teaching Clip */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">🎬</span>
                <h2 className="font-heading font-bold text-aced-text">Teaching Clip</h2>
              </div>
              <TeachingClipPlayer tutorName={t.displayName} subject="Data Structures" duration="1:45" />
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-6 space-y-4">
              <h2 className="font-heading font-bold text-aced-text">Student Reviews</h2>
              <div className="space-y-4">
                {t.reviews.map((r, i) => (
                  <div key={i} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-aced-blue/10 flex items-center justify-center text-aced-blue text-xs font-bold">
                        {r.reviewer.slice(0, 1)}
                      </div>
                      <span className="text-sm font-bold text-aced-text">{r.reviewer}</span>
                      <div className="flex items-center gap-0.5 ml-auto">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Star key={j} size={11} className="text-aced-gold fill-aced-gold" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{r.date}</span>
                    </div>
                    <p className="text-sm text-gray-500 ml-9">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Booking card ── */}
          <div className="space-y-4">
            <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-6 space-y-5 sticky top-24">
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-aced-royal">₦{t.ratePerHour.toLocaleString()}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">per hour · escrow protected</p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Course</label>
                  <select className="w-full px-4 py-3 rounded-[var(--radius-aced)] border border-gray-200 text-sm outline-none focus:border-aced-royal bg-white">
                    {t.badges.map(b => <option key={b.courseCode}>{b.courseCode}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Duration</label>
                  <select className="w-full px-4 py-3 rounded-[var(--radius-aced)] border border-gray-200 text-sm outline-none focus:border-aced-royal bg-white">
                    <option>1 hour — ₦{t.ratePerHour.toLocaleString()}</option>
                    <option>2 hours — ₦{(t.ratePerHour * 2).toLocaleString()}</option>
                    <option>3 hours — ₦{(t.ratePerHour * 3).toLocaleString()}</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Session Note (optional)</label>
                  <textarea
                    rows={2}
                    placeholder="What topics do you need help with?"
                    className="w-full px-4 py-3 rounded-[var(--radius-aced)] border border-gray-200 text-sm outline-none focus:border-aced-royal resize-none"
                  />
                </div>
              </div>

                      <Link href="/booking" className="block">
                <PaystackButton amount={t.ratePerHour} label={`Book & Pay ₦${t.ratePerHour.toLocaleString()}`} />
              </Link>

              <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                <ShieldCheck size={12} className="text-aced-green" />
                Funds held in escrow · released after session
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-[var(--radius-aced)] text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                <MessageSquare size={14} /> Message tutor first
              </button>
            </div>

            {/* Escrow explainer */}
            <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-5 space-y-3">
              <h3 className="font-heading font-bold text-sm text-aced-text flex items-center gap-2">
                <Calendar size={14} className="text-aced-royal" /> How booking works
              </h3>
              <EscrowTimeline currentStep="requested" txHash="a3f2b1c4…" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}