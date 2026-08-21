# ACED — Developer Guide

> **XRPL-verified pseudonymous peer tutoring marketplace for Nigerian university students.**

---

## 1. Quick Start

```bash
# Install dependencies
npm install

# Start dev server (port 3001)
npm run dev

# Build for production
npm run build
```

Open **http://localhost:3001** in your browser.

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Utilities | clsx + tailwind-merge (via `cn()` helper) |
| UI Primitives | Radix UI (Slot) |
| Payment | Paystack (test mode placeholder) |
| Blockchain | XRPL Testnet (grade verification NFTs) |

---

## 3. Project Structure

```
aced-baseline/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (Fredoka + Inter fonts)
│   ├── ClientLayout.tsx          # Client wrapper (RouteLoader)
│   ├── globals.css               # ACED design tokens + Tailwind config
│   ├── loading.tsx               # Root loading animation
│   ├── page.tsx                  # Home → LandingPage
│   ├── auth/page.tsx             # AuthPage
│   ├── student/page.tsx          # StudentDashboard
│   ├── tutor-dashboard/page.tsx  # TutorDashboard
│   ├── search/page.tsx           # CourseSearchPage
│   ├── tutor/page.tsx            # TutorProfilePage
│   ├── booking/page.tsx          # BookingFlowPage
│   ├── booking-confirmed/page.tsx # BookingConfirmedPage
│   ├── become-tutor/page.tsx     # BecomeTutorPage
│   └── admin/page.tsx            # AdminDashboard
│
├── pages/                        # Page components (actual UI)
│   ├── LandingPage.tsx
│   ├── AuthPage.tsx
│   ├── StudentDashboard.tsx
│   ├── TutorDashboard.tsx
│   ├── CourseSearchPage.tsx
│   ├── TutorProfilePage.tsx
│   ├── BookingFlowPage.tsx
│   ├── BookingConfirmedPage.tsx
│   ├── BecomeTutorPage.tsx
│   └── AdminDashboard.tsx
│
├── components/                   # Reusable UI components
│   ├── RouteLoader.tsx           # Top progress bar on route change
│   ├── PageTransition.tsx        # Fade + slide animation wrapper
│   ├── TutorCard.tsx             # Search result card
│   ├── VerifiedBadge.tsx         # Green XRPL verification pill
│   ├── BookingStatusBadge.tsx    # Status pill (requested/paid/etc.)
│   ├── EscrowTimeline.tsx        # 5-step escrow stepper
│   ├── PaystackButton.tsx        # Payment button (mock mode)
│   ├── SessionModePicker.tsx     # Online vs in-person selector
│   ├── TeachingClipPlayer.tsx    # 2-min video player (voice+screen)
│   ├── TranscriptUpload.tsx      # Drag-and-drop upload
│   └── Skeleton.tsx              # Loading skeleton components
│
├── lib/
│   └── utils.ts                  # cn() helper
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── .gitignore
```

---

## 4. Design System

### 4.1 Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `aced-royal` | `#1a3bcc` | Primary brand, CTAs, active states |
| `aced-blue` | `#2563eb` | Interactive elements, links, hover states |
| `aced-green` | `#16a34a` | Success, verified badges, completed |
| `aced-red` | `#dc2626` | Errors, danger, cancelled |
| `aced-gold` | `#ca8a04` | Warning, pending, ratings, gold stars |
| `aced-text` | `#0f172a` | Deep navy, headings, body text |

### 4.2 Layout Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-aced` | `12px` | Buttons, inputs, cards |
| `--radius-aced-lg` | `24px` | Large cards, modals |
| `--shadow-aced` | `0 4px 12px rgba(0,0,0,0.08)` | Card elevation |

### 4.3 Typography

- **Headings**: Fredoka (font-heading) — warm, rounded, student-friendly
- **Body**: Inter — clean, readable
- Usage: `<h1 className="font-heading font-bold text-aced-text">`

### 4.4 Surfaces

- `bg-page-gradient` — main page background (subtle radial gradient)
- `bg-card` / `bg-white` — card surfaces
- `bg-aced-text` — dark panels (hero, video player)

### 4.5 Component Patterns

- All cards use `rounded-[var(--radius-aced-lg)] border border-gray-100 shadow-[var(--shadow-aced)]`
- Buttons use `rounded-[var(--radius-aced)]`
- Inputs use `rounded-[var(--radius-aced)] border border-gray-200`
- Badges use `rounded-full` with color-specific bg/text/border

---

## 5. Page Guide

### 5.1 Landing Page (`/`)
**Purpose**: Marketing page to convert visitors to signups.

**Sections**:
- **Header**: ACED logo, nav (Find Tutors, Become a Tutor, About), Sign In / Get Started
- **Hero**: Dark bg, "From Struggle to Straight A's" headline, course search bar, two CTAs
- **How It Works**: 3-step cards (Search → Book & Pay → Ace Exams)
- **Why ACED**: 4-feature grid (Verified, Campus Tutors, Pay After, WhatsApp)
- **Trust Strip**: Piloted at FUNAAB, Paystack, SSL, Nigerian Students
- **Stats**: 500+ sessions, 50+ tutors, 4.8 rating, 8 campuses
- **Testimonials**: Student quotes with ratings
- **Pricing**: 3 tiers (Intro ₦1k-2.5k, Standard ₦2.5k-4k, Premium ₦4k+)
- **Footer**: Brand, Product links, Company links, Legal, Social

**Animation**: Framer Motion `whileInView` for scroll reveals.

---

### 5.2 Auth Page (`/auth`)
**Purpose**: Registration and login with pseudonymous identity.

**Key Feature**: Two name fields —
- **Display Name** (pseudonym): Shown publicly in search. e.g. "Scholar_X42"
- **Full Name**: Collected at signup but only revealed after a session is booked.

**Left Panel** (lg+): Dark bg with "Study smarter. Stay anonymous." + feature bullets
**Right Panel**: Toggle Register/Login

**Register Flow**:
1. Role selector (Student / Tutor)
2. Display Name input (pseudonym)
3. Full Name input (private until booking)
4. University Email
5. Password (with show/hide)
6. Create Account

**Login Flow**: Email + Password only.

**Dev Bypass**: Set `NEXT_PUBLIC_DEV_BYPASS=true` in `.env.local` to skip auth.

---

### 5.3 Student Dashboard (`/student`)
**Purpose**: Manage bookings, view escrow status, track spending.

**Layout**:
- Header: "Hey, Anon_47 👋" + Find Tutor button
- Become a Tutor CTA banner
- Stats grid: Total Sessions, Completed, Upcoming, Total Spent
- Left 2/3: Bookings list with status badges
- Right 1/3: Active escrow timeline + payment history

**Interactions**:
- Click booking → expand escrow details
- Click "accepted" booking → navigate to /booking-confirmed
- Click completed booking → leave a review

---

### 5.4 Tutor Dashboard (`/tutor-dashboard`)
**Purpose**: Manage teaching profile, accept bookings, track earnings.

**Layout**:
- Header: Display name, verified badge, view switcher (tutor/student)
- Earnings grid: This Week, This Month, All Time, Pending
- Left 1/3: Profile completion, transcript upload, verification status
- Right 2/3: Booking requests with accept/decline/complete buttons

**Key Features**:
- Profile completion progress (5 steps)
- Transcript upload with XRPL verification status
- Dual-role: switch to student view → /student

---

### 5.5 Course Search (`/search`)
**Purpose**: Find tutors by course code, filter by price/verification.

**Layout**:
- Search bar with clear button
- Course quick-filter chips (CSC201, CSC301, etc.)
- Toggle-able filter sidebar: max rate, sort by, XRPL verified only
- Results grid: TutorCard components (3-col on lg, 2-col on sm)
- Empty state with message

**TutorCard displays**: Avatar (initials), display name, rating, rate/hour, subjects, verified badges, Book Session button.

---

### 5.6 Tutor Profile (`/tutor`)
**Purpose**: Detailed tutor view before booking.

**Layout** (2-column on lg):
- Left 2/3:
  - Header card: avatar, name, rating, sessions, response time, bio, subjects
  - XRPL-Verified Grades with clickable badges
  - Teaching Clip player (voice + screen, no face)
  - Student Reviews
- Right 1/3 (sticky):
  - Rate card with course/duration selectors
  - Book & Pay button (Paystack)
  - Escrow explainer timeline

---

### 5.7 Booking Flow (`/booking`)
**Purpose**: 3-step booking process.

**Steps**:
1. **Session Mode**: Online (Google Meet link) or In-Person (approved campus locations)
2. **Schedule**: Date picker, time slot grid, duration (1-3 hrs), session note
3. **Payment**: Summary card, identity reveal note, PaystackButton

**Success State**: Booking confirmed, escrow locked, "Simulate Tutor Acceptance" button → /booking-confirmed

---

### 5.8 Booking Confirmed (`/booking-confirmed`)
**Purpose**: Identity reveal screen after tutor accepts.

**Key Animation**:
- Pseudonym shown first (e.g. "Scholar_X42")
- After 800ms: reveals real full name (e.g. "Adebayo Ogunlesi")
- After 1600ms: session details appear

**Content**:
- Identity reveal card with "Identity Revealed" badge
- Session details: course, date/time, duration
- Session mode: Meet link or campus location
- Escrow timeline
- Actions: Go to Dashboard, Message tutor

---

### 5.9 Become a Tutor (`/become-tutor`)
**Purpose**: Upgrade existing student account to tutor.

**4-Step Flow**:
1. **Profile**: Bio textarea
2. **Transcript**: Upload PDF/image
3. **Teaching Clip**: Upload/record 2-min video (voice + screen, no face)
4. **Set Rate**: Course multi-select, hourly rate input

**Success State**: Profile created, awaiting admin verification → /tutor-dashboard

---

### 5.10 Admin Dashboard (`/admin`)
**Purpose**: Review tutor transcript submissions, mint XRPL NFTs.

**Layout**:
- Header: pending/verified counts
- Pending verifications table: tutor, email, course, grade, submitted, preview, status, actions
- Transcript image preview modal
- Verify & Mint button (simulates 2s XRPL mint)
- Reject button
- Success modal with tx hash + XRPL link

---

## 6. Key Concepts

### 6.1 Pseudonymous Identity
- Users register with a **display name** (pseudonym) — used for search, public profile
- **Full name** is collected at signup but only revealed after both parties commit to a booking
- This protects student privacy while enabling accountability

### 6.2 Escrow System
- Student pays via Paystack → funds locked in escrow
- Tutor accepts → identity revealed to both parties
- Session happens → student marks complete
- Funds released to tutor → escrow cleared

### 6.3 XRPL Verification
- Tutors upload transcripts
- Admin verifies grades on-chain
- NFT badge minted on XRPL Testnet
- Students can click badges to verify on-chain

### 6.4 Dual Role
- Users can be both student and tutor
- View switcher on tutor dashboard toggles between views
- Same account, no second login needed

---

## 7. Environment Variables

Create `.env.local`:

```env
# Dev bypass — skip auth and go straight to dashboard
NEXT_PUBLIC_DEV_BYPASS=true
```

---

## 8. Data

All pages currently use **mock data** (MOCK_BOOKINGS, MOCK_TUTORS, etc.). To connect to a real backend:

1. Replace mock arrays with API calls (fetch/axios)
2. Add authentication (JWT/session)
3. Connect to database (Supabase, PlanetScale, etc.)
4. Integrate real Paystack SDK
5. Connect to XRPL for NFT minting

---

## 9. Design Decisions

| Decision | Rationale |
|----------|-----------|
| Fredoka for headings | Warm, rounded, approachable — fits student audience |
| Pseudonymous by default | Privacy-first for Nigerian campus culture |
| Campus locations hardcoded | Safety — only approved public locations |
| Teaching clips: voice+screen only | No face needed — reduces barrier, focuses on teaching |
| Escrow before session | Builds trust — tutors paid only after delivery |
| Full name only after booking | Privacy until commitment — prevents misuse |
| NGN currency | Built for Nigerian students, local pricing |
| WhatsApp reminders | Students live on WhatsApp — no extra app needed |

---

## 10. Routes Summary

| Route | Page | Auth Required |
|-------|------|---------------|
| `/` | Landing Page | No |
| `/auth` | Register / Login | No |
| `/student` | Student Dashboard | Yes |
| `/tutor-dashboard` | Tutor Dashboard | Yes |
| `/search` | Course Search | No |
| `/tutor` | Tutor Profile | No |
| `/booking` | Booking Flow | Yes |
| `/booking-confirmed` | Identity Reveal | Yes |
| `/become-tutor` | Become a Tutor | Yes |
| `/admin` | Admin Dashboard | Yes (admin) |
