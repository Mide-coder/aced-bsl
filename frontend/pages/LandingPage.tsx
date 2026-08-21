"use client";
// ACED — Landing Page
// TODO: Implement full landing page with:
//   - Header with ACED logo, nav links, Sign In / Get Started buttons
//   - Hero section: headline "From Struggle to Straight A's", search bar, CTAs
//   - How It Works: 3-step flow (Search → Book & Pay → Ace Your Exams)
//   - Why ACED: feature grid (Verified, Campus Tutors, Pay After Matched, WhatsApp)
//   - Trust strip: Piloted at FUNAAB, Payments by Paystack, SSL Secured
//   - Stats & Testimonials: 500+ sessions, 50+ tutors, 4.8 avg rating
//   - Pricing: Introductory ₦1k-2.5k, Standard ₦2.5k-4k, Premium ₦4k+
//   - Footer: product links, company, legal, social icons
//
// Design tokens: use bg-page-gradient, font-heading (Fredoka), text-aced-royal, text-aced-text
// Animation: use framer-motion whileInView for scroll reveals

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-page-gradient">
      {/* Header now handled by global Navbar in ClientLayout */}


      {/* TODO: Hero, How It Works, Why ACED, Stats, Pricing, Footer */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-heading font-bold text-aced-text mb-4">
          From Struggle to <span className="text-aced-royal">Straight A&apos;s.</span>
        </h1>
        <p className="text-gray-500 text-lg">
          Aced connects you with verified tutors from your own campus.
        </p>
      </div>
    </div>
  );
}
