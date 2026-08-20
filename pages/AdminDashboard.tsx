"use client";
// ACED — AdminDashboard
// TODO: Implement admin dashboard with:
//   - Header: pending/verified counts
//   - Pending verifications table: tutor, email, course, grade, submitted, transcript preview, status, actions
//   - Transcript image preview modal
//   - Verify & Mint button (simulates XRPL NFT mint, 2s delay)
//   - Reject button
//   - Success modal: NFT minted, tx hash, view on XRPL link
//   - Done/completed verifications section
//
// Data: MOCK_SUBMISSIONS with status: pending | verifying | verified | rejected

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* TODO: Verification table, preview modal, mint/reject actions */}
        <h1 className="text-2xl font-heading font-bold text-aced-text">Admin Dashboard</h1>
        <p className="text-sm text-gray-400">TODO: Build out the admin verification panel</p>
      </div>
    </div>
  );
}
