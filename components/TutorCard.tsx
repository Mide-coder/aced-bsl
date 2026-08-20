"use client";
// ACED — TutorCard
// Search results card: display name, verified badges, rate, rating, book button

import { Star, BookOpen } from "lucide-react";
import { VerifiedBadge } from "./VerifiedBadge";

interface TutorCardProps {
  displayName: string;
  badges: { courseCode: string; grade: string; txHash?: string }[];
  ratePerHour: number;
  rating: number;
  reviewCount: number;
  subjects: string[];
  onClick?: () => void;
}

export function TutorCard({
  displayName,
  badges,
  ratePerHour,
  rating,
  reviewCount,
  subjects,
  onClick,
}: TutorCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card rounded-[var(--radius-aced-lg)] border border-gray-100 shadow-[var(--shadow-aced)] p-5 space-y-4 hover:border-aced-blue/30 hover:shadow-md transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-aced-royal to-aced-blue flex items-center justify-center text-white font-bold font-mono text-sm shrink-0">
            {displayName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-heading font-bold text-aced-text">{displayName}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={12} className="text-aced-gold fill-aced-gold" />
              <span className="text-xs font-bold text-aced-text">{rating.toFixed(1)}</span>
              <span className="text-xs text-gray-400">({reviewCount})</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-heading font-bold text-aced-royal text-lg">₦{ratePerHour.toLocaleString()}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">per hour</p>
        </div>
      </div>

      {/* Subjects */}
      <div className="flex flex-wrap gap-1.5">
        {subjects.map((s) => (
          <span key={s} className="inline-flex items-center gap-1 text-[10px] font-bold text-aced-blue bg-aced-blue/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
            <BookOpen size={9} /> {s}
          </span>
        ))}
      </div>

      {/* Verified badges */}
      <div className="flex flex-wrap gap-1.5">
        {badges.map((b) => (
          <VerifiedBadge key={b.courseCode} courseCode={b.courseCode} grade={b.grade} txHash={b.txHash} size="sm" />
        ))}
      </div>

      {/* Book CTA */}
      <button
        onClick={(e) => { e.stopPropagation(); onClick?.(); }}
        className="w-full py-2.5 bg-aced-royal text-white font-bold rounded-[var(--radius-aced)] text-sm hover:bg-aced-blue transition-colors group-hover:shadow-md"
      >
        Book Session
      </button>
    </div>
  );
}
