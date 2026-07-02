# Bursary & NSFAS Finder

A comprehensive platform designed to match South African students with relevant bursaries, scholarships, and NSFAS funding based on their academic and financial profiles. The platform also assists in generating personalized motivation letters and tracking application documents.

## Features
- **Student Profile Matching**: Algorithmic matching against a database of South African bursaries based on income, grades, and demographics.
- **AI Letter Generation**: Uses Google Gemini to draft professional motivation letters tailored to the student and the specific bursary.
- **Document Tracking**: Keep track of required documents (ID, proof of income, matric results).
- **Admin Dashboard**: Bulk import student class lists via CSV to automatically calculate matches for an entire school.
- **White-Labeling**: Custom branding support for different schools or universities.
- **i18n Support**: Available in English, isiZulu, Afrikaans, and isiXhosa.
- **PWA/TWA Ready**: Configured for deployment as a Trusted Web Activity on the Google Play Store.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Database**: Vercel Postgres
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **AI**: Google Gemini API
- **Styling**: Tailwind CSS & Shadcn UI
- **Localization**: next-intl

## Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Environment Variables**: Copy `.env.example` to `.env.local` and fill in your keys (Clerk, Postgres, Gemini).
4. **Database Setup**:
   ```bash
   npx drizzle-kit push:pg
   npm run seed # (Requires adding a script to package.json to run src/db/seed.ts)
   ```
5. **Run the development server**:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000)

## Sales Pitch
Check out `PITCH.md` for a one-pager tailored for selling this software to high schools as a subscription service.
