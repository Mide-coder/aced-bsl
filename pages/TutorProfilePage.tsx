"use client";
// ACED — TutorProfilePage
// TODO: Implement tutor profile with:
//   - Header card: avatar (initials), display name, rating, sessions, response time
//   - Bio paragraph
//   - Subject tags
//   - XRPL-Verified Grades section with VerifiedBadge components
//   - Teaching clip player (TeachingClipPlayer component)
//   - Student reviews section
//   - Booking card (sticky sidebar): rate, course selector, duration, session note, PaystackButton
//   - Escrow explainer: how booking works timeline
//
// Components used: VerifiedBadge, PaystackButton, EscrowTimeline, TeachingClipPlayer
// Data: MOCK_TUTOR (replace with API call)

export default function TutorProfilePage() {
  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* TODO: Profile header, badges, teaching clip, reviews, booking sidebar */}
        <h1 className="text-2xl font-heading font-bold text-aced-text">Tutor Profile</h1>
        <p className="text-sm text-gray-400">TODO: Build out the tutor profile page</p>
      </div>
    </div>
  );
}
