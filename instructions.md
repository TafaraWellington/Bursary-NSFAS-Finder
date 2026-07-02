Bursary & NSFAS Finder – matches a student's grades, subjects, and financial situation to bursaries, NSFAS, and scholarships, then drafts the application. Sellable to schools, universities, and parents directly.

Let's build this one too. Here's the Antigravity plan for the Bursary & NSFAS Finder.

Step 1: Create the project
Select Project → New Project
New folder, e.g. bursary-finder-agent
Keep it dedicated so Antigravity's context stays focused on this app only.

Step 2: Kick off with an Implementation Plan prompt
Use Plan Mode and paste this first:

Build a bursary and funding finder web app for South African students. Requirements:

Student fills in a profile: grades/marks per subject, matric or current year of study, intended field of study, household income, province, and any special circumstances (disability, orphan, rural, first-generation student)
Backend matches the profile against a database of funding options: NSFAS eligibility rules, and a seed list of at least 15 well-known SA bursaries/scholarships (e.g. Sasol, Allan Gray, Investec, Funza Lushaka, provincial bursaries) with their eligibility criteria stored as structured data (JSON or DB table) so it's easy to add more later
Show the student a ranked list of what they qualify for, with a short reason why each one matched
For each match, generate a first-draft motivational/application letter using the student's profile, which they can edit
Use Node.js + Express backend, SQLite for storage, simple React frontend
Include a README on how to update the bursary database and deploy
Give me an implementation plan before writing code.

Step 3: Review the plan artifact
Check the eligibility-matching logic Antigravity proposes — flag anything like NSFAS thresholds so it doesn't hardcode stale figures without a way to update them. Adjust, then Proceed.

Step 4: Let it build, then verify
Approve terminal/install prompts. Review the Walkthrough artifact and test with a sample student profile.

Step 5: Iterate
"Add a way for the admin (school/university) to bulk-import a class list of students and see all their matches in one dashboard."
"Add a checklist per bursary showing required documents (ID, proof of income, matric results, etc.) with a progress tracker."
"Add reminder emails/WhatsApp alerts as bursary deadlines approach."
"Support isiZulu, Afrikaans, and Xhosa for the student-facing form."

Step 6: Package it to sell
"Generate a one-pager pitch for schools explaining how this helps their Grade 12s find funding, with a subscription pricing model per school."
"Add a white-label option so I can rebrand this for different universities' financial aid offices."

Want me to save this as an instructions.md file like the last one?

i would like to ust vercel

Good call — Vercel deploys serverless, so SQLite (file-based) won't persist between requests. Here's the adjusted plan using a Vercel-friendly stack.

Updated stack for Vercel
Next.js (frontend + API routes in one project — deploys natively on Vercel)
Vercel Postgres (or Neon/Supabase, both integrate easily) instead of SQLite, since serverless functions can't rely on a local file persisting
Everything else stays the same

Step 1: Create the project
Select Project → New Project in Antigravity
New folder, e.g. bursary-finder-agent

Step 2: Kick off with an Implementation Plan prompt
Use Plan Mode and paste this:

Build a bursary and funding finder web app for South African students, deployable on Vercel. Requirements:

Use Next.js (App Router) for both frontend and backend API routes
Use Vercel Postgres for storage (or Neon if easier to set up locally) — no SQLite, since this must run on Vercel's serverless functions
Student fills in a profile: grades/marks per subject, matric or current year of study, intended field of study, household income, province, and special circumstances (disability, orphan, rural, first-generation student)
Match the profile against a bursary database seeded with NSFAS eligibility rules and at least 15 well-known SA bursaries/scholarships (Sasol, Allan Gray, Investec, Funza Lushaka, provincial bursaries), stored as DB rows so admins can add more later
Show a ranked list of matches with a short reason why each matched
For each match, generate a first-draft motivational/application letter from the student's profile, editable before download
Include a .env.example for the database connection string
Include a README with steps to connect Vercel Postgres and deploy via the Vercel CLI or GitHub integration
Give me an implementation plan before writing code.

Step 3: Review the plan, then build
Check it's using Next.js API routes (not a separate Express server) and Postgres, not SQLite. Approve, let it build, review the Walkthrough.

Step 4: Connect Vercel Postgres
In the Antigravity terminal (or your own), you'll typically:

npm i -g vercel
vercel login
vercel link
vercel postgres create
vercel env pull
Ask the agent: "Walk me through connecting this project to Vercel Postgres and pulling the env vars."

Step 5: Deploy
vercel deploy
Then promote to production with vercel --prod once you've checked the preview URL.

Step 6: Iterate (same as before)
Bulk-import class lists for schools
Document checklists per bursary
Deadline reminders
Multi-language support

Want this saved as an instructions.md too?

i want to be able t create this for google play

Good news — since this is already a Next.js web app on Vercel, you don't need to rebuild it. Here are your options, fastest first.

Option comparison
Approach Effort Best when
TWA (Trusted Web Activity) Low You keep the Vercel web app as-is, wrap it for Play Store
Capacitor Medium You want some native features (push notifications, camera) beyond what a TWA offers
React Native rebuild High You want a fully native app experience, willing to rebuild UI

For a bursary finder, TWA is the right call — it's essentially your existing website in a Play Store listing, with a real app icon and offline splash screen. Let's go that route.

Step 1: Make your Next.js app a proper PWA first
In Antigravity, prompt:

Add PWA support to this Next.js app: a manifest.json with app name, icons (192x192 and 512x512), theme color, and a service worker for basic offline caching. Use next-pwa or the Next.js built-in approach.

Step 2: Deploy to Vercel and confirm it's PWA-installable
vercel --prod
Visit the production URL on an Android phone in Chrome, confirm you get an "Add to Home Screen" prompt — that confirms the manifest is valid.

Step 3: Generate the Android TWA project with Bubblewrap
Ask Antigravity:

Set up Bubblewrap CLI to generate an Android TWA project wrapping [your Vercel production URL]. Walk me through installing Bubblewrap, initializing the project, and configuring the app name, package ID (e.g. com.yourcompany.bursaryfinder), and icons.

This typically involves:

npm i -g @bubblewrap/cli
bubblewrap init --manifest https://your-app.vercel.app/manifest.json
bubblewrap build

Step 4: Set up Digital Asset Links (required for TWA)
This proves you own both the website and the app, so the app opens without a browser address bar. Ask:

Generate the assetlinks.json file I need to host at /.well-known/assetlinks.json on my Vercel app, using my Android app's package name and SHA256 signing certificate fingerprint.

Add that file to your Next.js public/.well-known/ folder and redeploy.

Step 5: Sign and build the release APK/AAB
Bubblewrap generates a .aab file (Android App Bundle) — that's what Google Play requires.

bubblewrap build
