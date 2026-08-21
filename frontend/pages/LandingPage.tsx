"use client";
// ACED — Landing Page
// Hydrated with campus-focused content while preserving existing design language

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, ShieldCheck, ArrowRight,
  CheckCircle, CreditCard,
  GraduationCap, MapPin, Lock, MessageCircle
} from "lucide-react";
import { Navbar } from "../components/Navbar";


const STEPS = [
  {
    num: "01",
    icon: Search,
    title: "Search by Course Code",
    desc: "Type in a code like CSC201 or ACC202 and see every verified tutor on your campus who teaches it.",
  },
  {
    num: "02",
    icon: Lock,
    title: "Book & Pay Safely",
    desc: "Pick a time, pay securely through Paystack, and get a WhatsApp confirmation instantly.",
  },
  {
    num: "03",
    icon: GraduationCap,
    title: "Ace Your Exams",
    desc: "Meet your tutor, get unstuck, and walk into that exam hall actually ready.",
  },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    color: "text-aced-green",
    bg: "bg-aced-green/10",
    title: "Verified, Not Just Listed",
    desc: "Every tutor is checked against school ID and past academic record before they go live.",
  },
  {
    icon: MapPin,
    color: "text-aced-royal",
    bg: "bg-aced-royal/10",
    title: "Tutors From Your Campus",
    desc: "Learn from someone who sat the same exam, under the same lecturer, last session.",
  },
  {
    icon: CreditCard,
    color: "text-aced-blue",
    bg: "bg-aced-blue/10",
    title: "Pay After You're Matched",
    desc: "No upfront risk — you only pay once a tutor confirms your session.",
  },
  {
    icon: MessageCircle,
    color: "text-aced-green",
    bg: "bg-aced-green/10",
    title: "WhatsApp Reminders",
    desc: "Session confirmations and reminders sent straight to WhatsApp — no app-checking required.",
  },
];


const PRICING = [
  {
    tier: "Introductory",
    amount: "₦1,000 – ₦2,500",
    desc: "Per session · new tutors building reviews",
    features: ["Verified 100/200-level tutors", "45–60 min sessions", "WhatsApp reminders"],
    featured: false,
  },
  {
    tier: "Standard",
    amount: "₦2,500 – ₦4,000",
    desc: "Per session · experienced 300/400-level tutors",
    features: ["Top-rated tutors", "Exam-focused sessions", "Priority WhatsApp support"],
    featured: true,
  },
  {
    tier: "Premium",
    amount: "₦4,000+",
    desc: "Per session · grad students & subject specialists",
    features: ["Postgrad-level expertise", "Project & thesis support", "Flexible scheduling"],
    featured: false,
  },
];

export default function LandingPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-page-gradient overflow-x-hidden">

      {/* ── HEADER ── */}
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative bg-aced-text overflow-hidden">
        {/* Decorative blurs matching auth page left panel */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-aced-royal/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-aced-blue/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 gap-12 items-center">
          <div className="space-y-6 max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/20"
            >
              <span>🇳🇬</span> Built for Nigerian campuses
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-heading font-bold text-white leading-tight"
            >
              From Struggle to{" "}
              <span className="bg-gradient-to-r from-aced-royal to-aced-blue bg-clip-text text-transparent">
                Straight A&apos;s.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/60 max-w-lg leading-relaxed"
            >
              Aced connects you with verified tutors from your own campus — students and grads who&apos;ve already aced the course you&apos;re stuck on.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-3 flex-wrap"
            >
              <a href="/auth" className="inline-flex items-center gap-2 bg-aced-royal text-white font-bold px-6 py-4 rounded-[var(--radius-aced)] hover:bg-aced-blue transition-colors shadow-lg shadow-aced-royal/20">
                Find a Tutor <ArrowRight size={16} />
              </a>
              <a href="/auth" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-4 rounded-[var(--radius-aced)] border-2 border-white/20 hover:border-white/40 transition-colors">
                Become a Tutor
              </a>
            </motion.div>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-2 max-w-xl"
            >
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Enter course code e.g. CSC201"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 rounded-[var(--radius-aced)] border border-white/20 bg-white/10 text-white placeholder:text-white/40 shadow-sm focus:ring-2 focus:ring-aced-royal/20 focus:border-aced-royal outline-none text-sm"
                />
              </div>
              <a href="/search" className="inline-flex items-center gap-2 bg-aced-royal text-white font-bold px-6 py-4 rounded-[var(--radius-aced)] hover:bg-aced-blue transition-colors whitespace-nowrap shadow-lg shadow-aced-royal/20">
                Search
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="max-w-5xl mx-auto px-6 py-20 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <span className="inline-flex items-center gap-2 bg-aced-royal/10 text-aced-royal text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-aced-royal/20">
            How it works
          </span>
          <h2 className="text-4xl font-heading font-bold text-aced-text">Three steps between you and your next A</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            No endless scrolling. Just your course code and a tutor who&apos;s already been where you are.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-6 space-y-4 hover:shadow-md transition-shadow relative"
              >
                <span className="text-xs font-bold text-aced-royal tracking-widest">STEP {s.num}</span>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-aced-royal to-aced-blue flex items-center justify-center">
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="font-heading font-bold text-aced-text text-lg">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── WHY ACED ── */}
      <section id="why" className="bg-aced-royal/5">
        <div className="max-w-5xl mx-auto px-6 py-20 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-3"
          >
            <span className="inline-flex items-center gap-2 bg-aced-royal/10 text-aced-royal text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-aced-royal/20">
              Why Aced
            </span>
            <h2 className="text-4xl font-heading font-bold text-aced-text">Built by students, for students</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Every detail designed around how Nigerian university students actually study and pay.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-6 space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center`}>
                    <Icon size={22} className={f.color} />
                  </div>
                  <h3 className="font-heading font-bold text-aced-text text-base">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section id="trust" className="border-y border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
            <GraduationCap size={18} className="text-aced-royal" /> Piloted at FUNAAB
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
            <CreditCard size={18} className="text-aced-green" /> Payments by Paystack
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
            <Lock size={18} className="text-aced-blue" /> SSL Secured
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
            <span>🇳🇬</span> Trusted by Nigerian Students
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="bg-aced-royal/5">
        <div className="max-w-5xl mx-auto px-6 py-20 space-y-12">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-2 bg-aced-royal/10 text-aced-royal text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-aced-royal/20">
              Pricing
            </span>
            <h2 className="text-4xl font-heading font-bold text-aced-text">Session rates that fit a student budget</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Set by tutors, capped by Aced — so quality tutoring never costs more than it should.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PRICING.map((p, i) => (
              <div
                key={i}
                className={`rounded-[var(--radius-aced-lg)] p-7 border ${
                  p.featured
                    ? "bg-gradient-to-br from-aced-royal to-aced-blue text-white border-none relative shadow-lg"
                    : "bg-white border-gray-100 hover:shadow-md transition-shadow"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-aced-gold text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${p.featured ? "text-white/70" : "text-aced-royal"}`}>
                  {p.tier}
                </p>
                <p className="text-2xl font-heading font-bold mb-1">{p.amount}</p>
                <p className={`text-xs mb-5 ${p.featured ? "text-white/60" : "text-gray-400"}`}>{p.desc}</p>
                <ul className="space-y-2.5 mb-6">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={14} className={`mt-0.5 shrink-0 ${p.featured ? "text-white" : "text-aced-green"}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/auth"
                  className={`block w-full text-center font-bold py-3 rounded-[var(--radius-aced)] transition-colors ${
                    p.featured
                      ? "bg-white text-aced-royal hover:bg-gray-100"
                      : "bg-aced-royal text-white hover:bg-aced-blue"
                  }`}
                >
                  Find a Tutor
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-aced-text text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-aced-royal to-aced-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm font-mono">AC</span>
                </div>
                <span className="font-heading font-bold text-xl">ACED</span>
              </div>
              <p className="text-sm text-white/50 max-w-xs">
                Your Campus. Your Tutor. Your A. Connecting Nigerian university students with verified tutors, one course code at a time.
              </p>
              <div className="flex gap-3">
                <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-white/20 transition-colors cursor-pointer">📷</span>
                <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-white/20 transition-colors cursor-pointer">🐦</span>
                <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-white/20 transition-colors cursor-pointer">🎵</span>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Product</h4>
              <ul className="space-y-2.5">
                <li><a href="#how" className="text-sm text-white/60 hover:text-white transition-colors">Find Tutors</a></li>
                <li><a href="#why" className="text-sm text-white/60 hover:text-white transition-colors">Become a Tutor</a></li>
                <li><a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Company</h4>
              <ul className="space-y-2.5">
                <li><a href="#trust" className="text-sm text-white/60 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Campuses</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Legal</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-white/40">© 2026 Aced. All rights reserved.</span>
            <span className="text-xs text-white/40">Made with ❤️ for Nigerian Students.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}