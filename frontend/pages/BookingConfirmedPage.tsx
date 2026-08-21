"use client";
// ACED — BookingConfirmedPage
// Shown to the student the moment the tutor accepts.
// Pseudonym is replaced with the tutor's real full name — the identity reveal screen.

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle, Eye, ShieldCheck, Video, MapPin,
  Calendar, Clock, ArrowRight, ExternalLink, Loader2,
  MessageCircle, Star, UserCheck
} from "lucide-react";
import { EscrowTimeline } from "../components/EscrowTimeline";

const MOCK_BOOKING = {
  id: "BK001",
  // Before acceptance: only pseudonym shown
  tutorPseudonym: "Scholar_X42",
  // After acceptance: real name revealed
  tutorFullName: "Adegboye Ayomide",
  tutorVerified: true,
  course: "CSC301",
  subject: "Data Structures",
  sessionMode: "online" as "online" | "in_person",
  meetLink: "https://meet.google.com/abc-defg-hij",
  campusLocation: "",
  campusBuilding: "",
  date: "22 Aug, 2026",
  time: "4:00 PM",
  duration: "2 hours",
  amount: 7000,
  escrowStatus: "accepted" as const,
};

export default function BookingConfirmedPage() {
  const router = useRouter();
  const [revealed, setRevealed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Simulate the reveal animation
  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), 800);
    const t2 = setTimeout(() => setShowDetails(true), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const b = MOCK_BOOKING;

  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Reveal header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-6 space-y-5 text-center"
        >
          {/* Identity reveal icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-aced-royal to-aced-blue flex items-center justify-center mx-auto shadow-lg shadow-aced-royal/20"
          >
            <Eye size={32} className="text-white" />
          </motion.div>

          {/* Reveal message */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-1.5 bg-aced-blue/10 text-aced-blue text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3"
            >
              <Eye size={11} /> Identity Revealed
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="text-3xl font-heading font-bold text-aced-text"
            >
              {revealed ? b.tutorFullName : b.tutorPseudonym}
            </motion.h1>

            {revealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 }}
                className="flex items-center justify-center gap-2 mt-2"
              >
                {b.tutorVerified && (
                  <span className="inline-flex items-center gap-1 bg-aced-green/10 text-aced-green text-xs font-bold px-2.5 py-1 rounded-full">
                    <ShieldCheck size={12} /> XRPL Verified Tutor
                  </span>
                )}
                <span className="inline-flex items-center gap-1 bg-aced-royal/10 text-aced-royal text-xs font-bold px-2.5 py-1 rounded-full">
                  <Star size={12} className="fill-aced-gold text-aced-gold" /> 4.9
                </span>
              </motion.div>
            )}

            {!revealed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xs text-gray-400 mt-2"
              >
                Revealing tutor identity…
              </motion.p>
            )}
          </div>

          {/* Pseudonym → Real Name transition */}
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-aced-blue/5 border border-aced-blue/20 rounded-[var(--radius-aced)] p-4 flex items-center gap-3"
            >
              <UserCheck size={18} className="text-aced-blue shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-aced-text">
                  You&apos;re now matched with <span className="text-aced-royal">{b.tutorFullName}</span>
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Previously shown as <span className="font-mono">{b.tutorPseudonym}</span> — names revealed once both sides committed.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Session details */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-6 space-y-5"
          >
            <h2 className="font-heading font-bold text-aced-text">Session Details</h2>

            {/* Course */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Course</span>
              <span className="font-mono font-bold text-aced-royal">{b.course} — {b.subject}</span>
            </div>

            {/* Date & Time */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center gap-1.5">
                <Calendar size={13} /> Date & Time
              </span>
              <span className="text-sm font-bold text-aced-text">{b.date} · {b.time}</span>
            </div>

            {/* Duration */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center gap-1.5">
                <Clock size={13} /> Duration
              </span>
              <span className="text-sm font-bold text-aced-text">{b.duration}</span>
            </div>

            {/* Session mode */}
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Session Mode</p>
              {b.sessionMode === "online" ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-aced-royal/5 border border-aced-royal/20 rounded-[var(--radius-aced)] p-4">
                    <Video size={20} className="text-aced-royal shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-aced-text">Online — Google Meet</p>
                      <p className="text-xs text-gray-400 mt-0.5">Click below to join when the session starts</p>
                    </div>
                  </div>
                  <a
                    href={b.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-aced-royal text-white font-bold rounded-[var(--radius-aced)] hover:bg-aced-blue transition-colors text-sm"
                  >
                    <Video size={14} /> Join Google Meet
                    <ExternalLink size={12} />
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-aced-green/5 border border-aced-green/20 rounded-[var(--radius-aced)] p-4">
                  <MapPin size={20} className="text-aced-green shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-aced-text">In Person</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {b.campusLocation || "Engineering Building"} · {b.campusBuilding || "Room 204"}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Approved campus location — public area only
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Escrow status */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-aced-text flex items-center gap-2">
                <ShieldCheck size={16} className="text-aced-green" /> Escrow Status
              </h2>
              <span className="text-lg font-heading font-bold text-aced-royal">₦{b.amount.toLocaleString()}</span>
            </div>
            <EscrowTimeline currentStep={b.escrowStatus} />
          </motion.div>
        )}

        {/* Actions */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-3"
          >
            <button
              onClick={() => router.push("/student")}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-aced-royal text-white font-bold rounded-[var(--radius-aced)] hover:bg-aced-blue transition-colors shadow-lg shadow-aced-royal/20"
            >
              Go to Dashboard <ArrowRight size={14} />
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-[var(--radius-aced)] text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <MessageCircle size={14} /> Message {revealed ? b.tutorFullName.split(" ")[0] : b.tutorPseudonym}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}