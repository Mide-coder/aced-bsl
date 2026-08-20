"use client";
// ACED — CourseSearchPage
// TODO: Implement course/tutor search with:
//   - Search bar with clear button
//   - Course quick-filter chips (CSC201, CSC301, MTH201, etc.)
//   - Filter sidebar: max rate, sort by, XRPL verified only toggle
//   - Results grid: TutorCard components (3-col on lg)
//   - Empty state: "No tutors found" with emoji and message
//   - Clicking a card navigates to /tutor (tutor profile)
//
// Components used: TutorCard
// Data: MOCK_TUTORS, COURSES, SORT_OPTIONS (replace with API calls)

export default function CourseSearchPage() {
  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* TODO: Search bar, course filters, filter sidebar, results grid */}
        <h1 className="text-2xl font-heading font-bold text-aced-text">Find Tutors</h1>
        <p className="text-sm text-gray-400">TODO: Build out the search page</p>
      </div>
    </div>
  );
}
