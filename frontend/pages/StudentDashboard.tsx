"use client";
// ACED — StudentDashboard
// TODO: Implement student dashboard with:
//   - Header: greeting with display name, "Find Tutor" button
//   - Become a Tutor CTA banner (gradient bg, link to /become-tutor)
//   - Stats grid: Total Sessions, Completed, Upcoming, Total Spent
//   - Bookings list (left 2/3): tutor name, course, status badge, date, amount
//   - Escrow timeline (right 1/3): active booking escrow status
//   - Payment history (right 1/3): list of past payments with amounts
//   - Clicking "accepted" booking navigates to /booking-confirmed
//
// Components used: BookingStatusBadge, EscrowTimeline
// Data: MOCK_BOOKINGS and MOCK_PAYMENTS (replace with API calls)

import { Search, BookOpen, Clock, CheckCircle, CreditCard, ArrowRight, Star, GraduationCap } from "lucide-react";
import { BookingStatusBadge } from "../components/BookingStatusBadge";
import { EscrowTimeline } from "../components/EscrowTimeline";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* TODO: Header, CTA, Stats, Bookings list, Escrow sidebar, Payment history */}
        <h1 className="text-2xl font-heading font-bold text-aced-text">Student Dashboard</h1>
        <p className="text-sm text-gray-400">TODO: Build out the dashboard layout</p>
      </div>
    </div>
  );
}
