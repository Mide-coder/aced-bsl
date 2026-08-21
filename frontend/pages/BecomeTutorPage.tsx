"use client";
// ACED — BecomeTutorPage
// Create tutor profile on existing account: transcript upload, teaching clip, courses, rate

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, ArrowLeft, BookOpen, Upload, Video, DollarSign,
  CheckCircle, Loader2, Sparkles
} from "lucide-react";
import { TranscriptUpload } from "../components/TranscriptUpload";

const COURSE_OPTIONS = [
  "CSC201", "CSC301", "CSC401", "MTH201", "MTH301",
  "PHY101", "PHY201", "CHM201", "ENG201", "ACC201",
  "ECN301", "STA201",
];

type Step = "profile" | "transcript" | "video" | "courses";

const STEPS: { key: Step; label: string; icon: typeof BookOpen }[] = [
  { key: "profile",    label: "Profile",      icon: Sparkles },
  { key: "transcript", label: "Transcript",   icon: Upload },
  { key: "video",      label: "Teaching Clip", icon: Video },
  { key: "courses",    label: "Set Rate",     icon: DollarSign },
];

export default function BecomeTutorPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("profile");
  const [bio, setBio] = useState("");
  const [rate, setRate] = useState("3500");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [transcriptReady, setTranscriptReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const currentIdx = STEPS.findIndex((s) => s.key === step);

  function toggleCourse(c: string) {
    setSelectedCourses((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 2000);
  }

  if (success) {
    return (
      <div className="min-h-screen bg-page-gradient flex items-center justify-center p-6">
        <div className="bg-white rounded-[var(--radius-aced-lg)] shadow-2xl w-full max-w-md p-8 text-center space-y-5 animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-aced-green/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={32} className="text-aced-green" />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-bold text-aced-text">Tutor Profile Created!</h2>
            <p className="text-sm text-gray-500 mt-2">
              Your transcript and teaching clip are pending admin review.
              Once verified, your XRPL badge will be minted and your profile will go live.
            </p>
          </div>
          <div className="bg-gray-50 rounded-[var(--radius-aced)] p-4 text-left space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle size={14} className="text-aced-green" />
              <span className="text-aced-text">Profile created</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle size={14} className="text-aced-green" />
              <span className="text-aced-text">Transcript uploaded</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle size={14} className="text-aced-green" />
              <span className="text-aced-text">Teaching clip uploaded</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Loader2 size={14} className="text-aced-gold animate-spin" />
              <span className="text-aced-gold">Awaiting verification</span>
            </div>
          </div>
          <button
            onClick={() => router.push("/tutor-dashboard")}
            className="w-full py-3 bg-aced-royal text-white font-bold rounded-[var(--radius-aced)] hover:bg-aced-blue transition-colors"
          >
            Go to Tutor Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Header */}
        <div>
          <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-gray-400 hover:text-aced-royal transition-colors mb-4">
            <ArrowLeft size={14} /> Back
          </button>
          <h1 className="text-2xl font-heading font-bold text-aced-text">Become a Tutor</h1>
          <p className="text-sm text-gray-400 mt-1">
            Add your transcript, record a 2-min teaching clip, and set your rate.
            Your existing student account stays — no second login needed.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = s.key === step;
            const isDone = i < currentIdx;
            return (
              <button
                key={s.key}
                onClick={() => {
                  if (isDone || i <= currentIdx + 1) setStep(s.key);
                }}
                className={`flex-1 py-3 rounded-[var(--radius-aced)] border-2 text-center transition-all ${
                  isActive
                    ? "border-aced-royal bg-aced-royal/5"
                    : isDone
                    ? "border-aced-green/30 bg-aced-green/5"
                    : "border-gray-100 bg-white"
                }`}
              >
                <Icon size={16} className={`mx-auto mb-1 ${
                  isActive ? "text-aced-royal" : isDone ? "text-aced-green" : "text-gray-300"
                }`} />
                <p className={`text-[10px] font-bold uppercase tracking-wider ${
                  isActive ? "text-aced-royal" : isDone ? "text-aced-green" : "text-gray-400"
                }`}>
                  {s.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Step content */}
        <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 p-6 space-y-5 animate-in fade-in duration-300" key={step}>

          {/* Step 1: Profile */}
          {step === "profile" && (
            <div className="space-y-5">
              <div>
                <h2 className="font-heading font-bold text-aced-text">Your Tutor Bio</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Tell students what you teach and how you teach. Keep it short and confident.
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Bio</label>
                <textarea
                  rows={4}
                  placeholder="e.g. Final year CSC student. Specialise in Data Structures and Algorithms. Tutored 30+ students — all passed."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-3 rounded-[var(--radius-aced)] border border-gray-200 text-sm outline-none focus:border-aced-royal focus:ring-2 focus:ring-aced-royal/20 resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Transcript */}
          {step === "transcript" && (
            <div className="space-y-5">
              <div>
                <h2 className="font-heading font-bold text-aced-text">Upload Transcript</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Upload a clear photo or PDF of your transcript showing the grade for the courses you teach.
                </p>
              </div>
              <TranscriptUpload onUpload={() => setTranscriptReady(true)} />
              {transcriptReady && (
                <div className="flex items-center gap-2 text-sm text-aced-green animate-in fade-in duration-300">
                  <CheckCircle size={14} /> Transcript uploaded — ready to submit
                </div>
              )}
            </div>
          )}

          {/* Step 3: Teaching Clip */}
          {step === "video" && (
            <div className="space-y-5">
              <div>
                <h2 className="font-heading font-bold text-aced-text">Record Teaching Clip</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Record a 2-minute clip of yourself teaching a concept — screen + voice, no face needed.
                  This is what students trust most when choosing a tutor.
                </p>
              </div>

              {/* Video upload area */}
              {!videoReady ? (
                <div className="border-2 border-dashed border-gray-200 rounded-[var(--radius-aced)] p-8 flex flex-col items-center gap-3 hover:border-aced-blue/40 bg-white cursor-pointer transition-colors"
                  onClick={() => setVideoReady(true)}
                >
                  <div className="w-14 h-14 rounded-full bg-aced-royal/10 flex items-center justify-center">
                    <Video size={26} className="text-aced-royal" />
                  </div>
                  <div className="text-center">
                    <p className="font-heading font-bold text-aced-text">Upload or Record</p>
                    <p className="text-sm text-gray-400 mt-1">
                      MP4, WebM · max 50 MB · 2 minutes max
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-aced-royal/10 text-aced-royal px-3 py-1.5 rounded-full font-bold">
                      🎙️ Voice
                    </span>
                    <span className="text-xs bg-aced-blue/10 text-aced-blue px-3 py-1.5 rounded-full font-bold">
                      🖥️ Screen
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-400 px-3 py-1.5 rounded-full font-bold line-through">
                      📷 Face
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-aced-green/5 border border-aced-green/20 rounded-[var(--radius-aced)] p-5 space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-aced-green" />
                    <div>
                      <p className="font-bold text-sm text-aced-text">Teaching clip uploaded</p>
                      <p className="text-xs text-gray-400">1:45 · 12.3 MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setVideoReady(false)}
                    className="text-xs text-aced-red hover:underline"
                  >
                    Remove and re-upload
                  </button>
                </div>
              )}

              {/* Tips */}
              <div className="bg-gray-50 rounded-[var(--radius-aced)] p-4 space-y-2">
                <p className="text-xs font-bold text-aced-text">💡 Tips for a great clip:</p>
                <ul className="text-xs text-gray-500 space-y-1 ml-4 list-disc">
                  <li>Pick a concept you explain well — recursion, derivatives, etc.</li>
                  <li>Use screen sharing to show code or equations</li>
                  <li>Speak clearly and keep it under 2 minutes</li>
                  <li>No face needed — students care about your teaching, not your face</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 4: Courses & Rate */}
          {step === "courses" && (
            <div className="space-y-5">
              <div>
                <h2 className="font-heading font-bold text-aced-text">Courses & Rate</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Select the courses you tutor and set your hourly rate.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Courses You Teach
                </label>
                <div className="flex flex-wrap gap-2">
                  {COURSE_OPTIONS.map((c) => {
                    const selected = selectedCourses.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleCourse(c)}
                        className={`text-xs font-mono font-bold px-3 py-2 rounded-full border-2 transition-all ${
                          selected
                            ? "bg-aced-royal text-white border-aced-royal"
                            : "bg-white text-gray-500 border-gray-200 hover:border-aced-royal/30"
                        }`}
                      >
                        {selected && "✓ "}{c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Hourly Rate (₦)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="3500"
                    className="w-full pl-10 pr-4 py-3 rounded-[var(--radius-aced)] border border-gray-200 text-sm outline-none focus:border-aced-royal focus:ring-2 focus:ring-aced-royal/20"
                  />
                </div>
                <p className="text-[10px] text-gray-400 ml-1">
                  Recommended: ₦2,500–₦4,000/hr for verified tutors
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentIdx > 0 && (
            <button
              onClick={() => setStep(STEPS[currentIdx - 1].key)}
              className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-[var(--radius-aced)] text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={14} /> Previous
            </button>
          )}
          <button
            onClick={() => {
              if (currentIdx < STEPS.length - 1) {
                setStep(STEPS[currentIdx + 1].key);
              } else {
                handleSubmit();
              }
            }}
            disabled={submitting}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-aced-royal text-white font-bold rounded-[var(--radius-aced)] hover:bg-aced-blue transition-colors disabled:opacity-50 shadow-lg shadow-aced-royal/20"
          >
            {submitting ? (
              <><Loader2 size={16} className="animate-spin" /> Submitting…</>
            ) : currentIdx < STEPS.length - 1 ? (
              <><ArrowRight size={14} /> Continue</>
            ) : (
              <><Sparkles size={14} /> Submit for Review</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}