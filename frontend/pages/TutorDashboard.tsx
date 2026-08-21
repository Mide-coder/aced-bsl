"use client";
// ACED — TutorDashboard
// TODO: Implement tutor dashboard with:
//   - Header: display name, verified badge, view switcher (tutor/student)
//   - Earnings grid: This Week, This Month, All Time, Pending
//   - Profile completion progress bar (5 steps)
//   - Transcript upload / status card
//   - Verification status: list of courses with verified/pending/unverified
//   - Booking requests (right 2/3): accept/decline buttons, mark complete
//   - Dual-role: view switcher sends student view to /student
//
// Components used: BookingStatusBadge, TranscriptUpload, VerifiedBadge
// Data: MOCK_BOOKINGS, PROFILE_STEPS, EARNINGS (replace with API calls)

import { ShieldCheck, BookOpen } from "lucide-react";

export default function TutorDashboard() {
  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* TODO: Header, earnings, profile completion, booking requests */}
        <h1 className="text-2xl font-heading font-bold text-aced-text">Tutor Dashboard</h1>
        <p className="text-sm text-gray-400">TODO: Build out the tutor hub</p>
      </div>
    </div>
  );
}
