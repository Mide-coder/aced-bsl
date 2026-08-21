"use client";
// ACED — BookingConfirmedPage
// TODO: Implement identity reveal screen with:
//   - Animated reveal: pseudonym → full name transition (framer-motion)
//   - "Identity Revealed" badge
//   - Tutor verified badge + rating
//   - Session details: course, date/time, duration
//   - Session mode: online (Meet link) or in-person (campus location)
//   - Escrow status timeline (EscrowTimeline component)
//   - Action buttons: Go to Dashboard, Message tutor
//   - Delayed animations: reveal at 800ms, details at 1600ms
//
// Components used: EscrowTimeline
// Data: MOCK_BOOKING with tutorPseudonym, tutorFullName, session details

export default function BookingConfirmedPage() {
  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* TODO: Identity reveal, session details, escrow timeline, actions */}
        <h1 className="text-2xl font-heading font-bold text-aced-text">Booking Confirmed</h1>
        <p className="text-sm text-gray-400">TODO: Build out the identity reveal screen</p>
      </div>
    </div>
  );
}
