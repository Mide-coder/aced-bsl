"use client";
// ACED — Navbar
// Global navigation bar displayed on every page.
// Shows the ACED logo (aced-logo.png) and brand text.

import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/aced-logo.png"
            alt="ACED logo"
            width={36}
            height={36}
            className="transition-transform duration-200 group-hover:scale-105"
            priority
          />
          <span className="font-heading font-bold text-xl text-aced-royal tracking-tight">
            ACED
          </span>
        </Link>

        {/* Right-side nav items — placeholder for future links */}
        <nav className="flex items-center gap-4">
          <Link
            href="/search"
            className="text-sm font-medium text-gray-600 hover:text-aced-royal transition-colors"
          >
            Find Tutors
          </Link>
          <Link
            href="/auth"
            className="text-sm font-semibold px-4 py-2 rounded-[var(--radius-aced)] bg-aced-royal text-white hover:bg-aced-blue transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
