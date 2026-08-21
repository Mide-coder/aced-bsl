"use client";
// ACED — CourseSearchPage

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { TutorCard } from "../components/TutorCard";

const MOCK_TUTORS = [
  { displayName: "Scholar_X42",  badges: [{ courseCode: "CSC301", grade: "A", txHash: "a3f2b1c4" }], ratePerHour: 3500, rating: 4.9, reviewCount: 31, subjects: ["Data Structures", "Algorithms"] },
  { displayName: "ProTutor_77",  badges: [{ courseCode: "SWE301", grade: "A", txHash: "b4c5d6e7" }, { courseCode: "CSC401", grade: "B+" }], ratePerHour: 2800, rating: 4.6, reviewCount: 12, subjects: ["Operating Systems", "Networks"] },
  { displayName: "CodeNinja_99", badges: [{ courseCode: "MTE301", grade: "A", txHash: "c5d6e7f8" }], ratePerHour: 4000, rating: 5.0, reviewCount: 7,  subjects: ["Algorithms", "System Design"] },
  { displayName: "TechSage_45",  badges: [{ courseCode: "GST201", grade: "A" }],                     ratePerHour: 2500, rating: 4.3, reviewCount: 19, subjects: ["C Programming", "OOP"] },
  { displayName: "DevMaster_08", badges: [{ courseCode: "PRM301", grade: "A", txHash: "d6e7f8a9" }], ratePerHour: 3200, rating: 4.7, reviewCount: 15, subjects: ["Data Structures", "Java"] },
  { displayName: "AlgoQueen_22", badges: [{ courseCode: "ABG301", grade: "A", txHash: "e7f8a9b0" }], ratePerHour: 3800, rating: 4.8, reviewCount: 22, subjects: ["Algorithms", "Python"] },
];

const COURSES = ["CSC201", "CSC301", "CSC401", "MTH201", "MTH301", "PHY101", "CHM201", "ENG201"];
const SORT_OPTIONS = ["Highest Rated", "Lowest Price", "Most Reviews", "Verified Only"];

export default function CourseSearchPage() {
  const router = useRouter();
  const [query, setQuery]   = useState("CSC301");
  const [maxRate, setMaxRate] = useState("");
  const [sortBy, setSortBy] = useState("Highest Rated");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = MOCK_TUTORS.filter(t => {
    if (maxRate && t.ratePerHour > Number(maxRate)) return false;
    if (verifiedOnly && t.badges.every(b => !b.txHash)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Search bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by course code or subject…"
              className="w-full pl-11 pr-4 py-4 rounded-[var(--radius-aced)] border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-aced-royal/20 focus:border-aced-royal outline-none text-sm"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-5 py-4 rounded-[var(--radius-aced)] border font-bold text-sm transition-colors ${showFilters ? "bg-aced-royal text-white border-aced-royal" : "bg-white border-gray-200 text-gray-600 hover:border-aced-royal/30"}`}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        {/* Course quick filters */}
        <div className="flex gap-2 flex-wrap">
          {COURSES.map(c => (
            <button
              key={c}
              onClick={() => setQuery(c)}
              className={`text-xs font-mono font-bold px-3 py-1.5 rounded-full border transition-colors ${query === c ? "bg-aced-royal text-white border-aced-royal" : "bg-white text-gray-500 border-gray-200 hover:border-aced-royal/30"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* ── FILTER SIDEBAR ── */}
          {showFilters && (
            <aside className="w-64 shrink-0 space-y-6">
              <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-5 space-y-5">
                <h3 className="font-heading font-bold text-aced-text">Filters</h3>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Max Rate (₦/hr)</label>
                  <input
                    type="number"
                    placeholder="e.g. 4000"
                    value={maxRate}
                    onChange={(e) => setMaxRate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[var(--radius-aced)] border border-gray-200 text-sm outline-none focus:border-aced-royal"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[var(--radius-aced)] border border-gray-200 text-sm outline-none focus:border-aced-royal bg-white"
                  >
                    {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                    className={`w-10 h-6 rounded-full transition-colors relative ${verifiedOnly ? "bg-aced-green" : "bg-gray-200"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${verifiedOnly ? "left-5" : "left-1"}`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">XRPL Verified only</span>
                </label>

                <button
                  onClick={() => { setMaxRate(""); setSortBy("Highest Rated"); setVerifiedOnly(false); }}
                  className="text-xs text-aced-red hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            </aside>
          )}

          {/* ── RESULTS ── */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                <span className="font-bold text-aced-text">{filtered.length}</span> tutors found for <span className="font-mono font-bold text-aced-royal">{query || "all courses"}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((t, i) => (
                <TutorCard key={i} {...t} onClick={() => router.push("/tutor")} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-20 gap-3 text-center">
                <p className="text-4xl">🔍</p>
                <p className="font-heading font-bold text-aced-text">No tutors found</p>
                <p className="text-sm text-gray-400">Try a different course code or clear your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}