"use client";
// ACED — BookingFlowPage
// TODO: Implement multi-step booking flow with:
//   - Step 1: Session mode (SessionModePicker) — online (Meet link) or in-person (campus location)
//   - Step 2: Schedule — date picker, time slot grid, duration selector, session note
//   - Step 3: Payment — summary card, identity reveal note, PaystackButton
//   - Success state — booking confirmed, escrow locked, "Simulate Tutor Acceptance" button
//   - Step indicator with progress bar
//   - Back/Continue navigation
//
// Components used: SessionModePicker, PaystackButton
// Data: MOCK_TUTOR, TIME_SLOTS (replace with API calls)
// Navigation: /booking-confirmed on success

import { ArrowLeft } from "lucide-react";

export default function BookingFlowPage() {
  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* TODO: Step indicator, mode picker, schedule, payment, success */}
        <h1 className="text-2xl font-heading font-bold text-aced-text">Book a Session</h1>
        <p className="text-sm text-gray-400">TODO: Build out the booking flow</p>
      </div>
    </div>
  );
}
