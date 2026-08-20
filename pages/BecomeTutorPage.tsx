"use client";
// ACED — BecomeTutorPage
// TODO: Implement tutor profile creation with:
//   - 4-step flow: Profile → Transcript → Teaching Clip → Set Rate
//   - Step 1: Bio textarea
//   - Step 2: TranscriptUpload component
//   - Step 3: Video upload/record area with tips
//   - Step 4: Course multi-select chips, hourly rate input
//   - Step indicator with progress
//   - Success state: profile created, awaiting verification
//   - Existing student account stays — no second login
//
// Components used: TranscriptUpload
// Data: COURSE_OPTIONS (replace with API call)
// Navigation: /tutor-dashboard on success

import { ArrowLeft } from "lucide-react";

export default function BecomeTutorPage() {
  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* TODO: 4-step tutor profile creation flow */}
        <h1 className="text-2xl font-heading font-bold text-aced-text">Become a Tutor</h1>
        <p className="text-sm text-gray-400">TODO: Build out the tutor application flow</p>
      </div>
    </div>
  );
}
