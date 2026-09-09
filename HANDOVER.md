# Handover — Accreditation Platform Project

Read this file first in any new session before doing anything else on this project. It exists so work can be picked up cold — by a future session, a different agent, or a teammate — without re-deriving context.

## What this project is

A premium, original, international accreditation organisation website and digital platform (public site + public verification system + secure applicant/assessor/admin portal). Built as an **original design and content system**, using an existing accreditation body's site as **functional/structural inspiration only**:

Reference: https://www.uafaccreditation.org/

**Not to be cloned:** visual design, branding, logo, exact wording, source code, proprietary assets, exact layouts.

## Ground rules (do not violate these)

1. **Phased approval process.** The project is built in 15 sequential phases (see `PROGRESS.md` for the full list and current status). Each phase must be: analyzed → drafted → shown to the user → explained → checked for assumptions/open questions → stopped → explicitly approved before the next phase starts. Never batch phases. Never silently proceed. Accepted approval phrases: "Approved", "Approve", "Yes", "Proceed", "Approved with changes". If changes are requested, revise only the current phase.
2. **No fabricated institutional facts.** Never invent or imply: government approval/recognition, international recognition, ILAC/IAF/APAC/other signatory status, ISO certification of the org itself, legal authority, membership counts, years of operation, number of accredited clients, or similar credibility claims — unless the user has explicitly provided/confirmed them. Missing facts are marked `[PLACEHOLDER — REQUIRES CONFIRMATION]` rather than guessed.
3. **Trustworthy-institution tone, not startup/SaaS tone.** Avoid hype, generic AI-website aesthetics, template feel, or over-designed startup polish. Target feeling: serious, independent, competent, transparent, international accreditation institution.
4. **Verification trust rules.** Public verification must never show a bare "Verified". Use explicit statuses (ACTIVE / SUSPENDED / WITHDRAWN / EXPIRED / NOT FOUND) with plain-language explanations. A "not found" result must never visually resemble a valid result.
5. **Security defaults.** Least privilege, RBAC, MFA for privileged accounts, private document storage with signed temporary URLs, audit logging, rate limiting, no cross-tenant data access (applicant-to-applicant, assessor-to-unassigned-record), no admin impersonation without strong controls + audit trail.
6. **Microcopy standard.** Errors/empty states must explain what happened → what it means → what to do next. No generic "Something went wrong."
7. **Component reuse.** Design and build with a shared component system (Header, Footer, Button, Card, StatusBadge, SearchBox, DataTable, DocumentCard, ApplicationTimeline, FileUploader, FormField, Alert, Modal, Breadcrumbs, Pagination, EmptyState, ErrorState), not one-off duplicated UI.
8. **No production code before UX/architecture approval.** Coding (Phase 13) only starts after Phases 1–12 are all approved.

## Where things live

- `PROGRESS.md` — phase-by-phase status tracker, open questions log, session log. **Update this at the end of every work session.**
- `docs/phases/phase-N-*.md` — the full deliverable document for each phase, saved as it's produced (mirrors what was shown in-chat).
- (Later phases) `docs/design-system/`, `src/`, etc. will be added once Phase 4 and Phase 13 begin — not created yet.

## Current state (as of 2026-09-09)

Phases 1–12 (all design phases) are approved. **Phase 13 (Development) is underway.** Milestones 1–9 (Project Setup, Design System, Public Layout, Homepage, Public Pages, Verification, Authentication, Applicant Portal, Assessor Portal) are approved; Milestone 10 (Admin Platform) is built and delivered for approval. See `PROGRESS.md`'s Phase 13 Milestone Tracker for the full 17-milestone list and `docs/phases/phase-13-development-log.md` for full build detail per milestone.

**This completes the entire UX build (Milestones 1–10).** Milestone 11 (Database) is next — the first milestone that replaces the in-memory placeholder stores used throughout Milestones 8–10 with a real Postgres schema per Phase 12. Everything built so far will need to be re-wired to real persistence at that point; nothing about the UI/UX itself should need to change, since the placeholder data shapes were deliberately modeled after the Phase 12 entities from the start.

**Demo login credentials** (seeded in `src/lib/auth/store.ts`, in-memory, resets on server restart): `applicant@example.com` / `assessor@example.com` / `admin@example.com`, all with password `Password123!`. Assessor and Admin will be forced into MFA setup on first login (real TOTP — scan the QR or enter the secret into any authenticator app); this is enforced by `src/middleware.ts`, not just described. The MFA-enrollment click-through itself hasn't been verified through an actual browser (no browser-automation tool in this environment) — worth trying it live if you get a chance. Logging in as `applicant@example.com` now lands on a real, functional dashboard (Milestone 8) — try uploading a document on the `MAB-APP-2026-0091` application (Documents tab) or sending a message; both are genuinely wired up, not mockups.

**A recurring lesson worth carrying into Milestone 10** (Admin portal, which will need the same sidebar + data-table patterns): when a Server Component needs to render a Client Component, watch for two distinct failure modes that surfaced during Milestone 8 despite clean builds/typechecks — (1) passing anything function-shaped (icons, `DataTable` column `render` callbacks) as a prop from server to client, and (2) importing a plain data constant *from* a `"use client"` file *into* server code. Both fail at runtime, not build time, and (2) doesn't even get caught by TypeScript. The fix for both is the same: keep the data plain and framework-agnostic in a file with no `"use client"` directive, and let the client component that needs icons/render-functions define them locally instead of receiving them as props from a server parent. Milestone 9 applied this proactively and hit zero boundary bugs — but did hit 6 instances of a *different* strict-mode gotcha: `record[computedKey] && record[computedKey].prop` doesn't narrow under `noUncheckedIndexedAccess` the way `if (x) x.prop` does; use `record[computedKey]?.prop` instead whenever the index is a variable, not a literal.

**A new lesson from Milestone 10, worth carrying into Milestone 11's data-layer rewrite**: never pass a full user/auth record as props into a Client Component. The admin Users page almost shipped `passwordHash` and `mfaSecret` into the client bundle by passing the raw `AuthUser[]` array to a table component — caught by re-reading the diff, not by any tool. When Milestone 11 introduces a real `User` table, apply the same discipline there: define a sanitized "public" projection type for anything that reaches a Client Component, and never pass the full database row across that boundary just because it was convenient to fetch.

**Testing Server Actions**: neither MFA-enrollment (Milestone 7) nor any of Milestones 9–10's mutations (accept/decline, save finding, submit report, add blackout, all the admin actions) have been click-tested through a real browser — Next.js Server Actions use an internal action-id + React Flight body encoding that curl can't practically replicate. Milestone 9 did manage to test the MFA-enrollment *login* path indirectly, by temporarily pre-seeding the demo assessor's MFA secret directly in `store.ts` (reverted before committing, confirmed via `git diff`) rather than going through the enrollment UI — that's a valid technique for testing what happens *after* enrollment, but doesn't test the enrollment click-through itself. If you get a chance to click through either flow in a real browser, that would close a real gap.

**Dev server runs on port 5000** (`npm run dev`/`npm run start` both default to `-p 5000` now, per the user's request) — open http://localhost:5000 to view it live. If a stale process is already holding port 5000 from a prior session, find it with `netstat -ano | grep ":5000"` and stop it (PowerShell `Stop-Process -Id <pid> -Force`) before restarting.

**What exists in the repo right now:**
- Working Next.js 15.5.25 (App Router) + TypeScript + Tailwind CSS v4 scaffold, Phase 4 design tokens as CSS variables, self-hosted fonts.
- A full reusable UI component library in `src/components/ui/` (Button, StatusBadge, Card, Input, Select, FormField, Alert, Breadcrumbs, Pagination, EmptyState, ErrorState, Modal, Tabs, Accordion, Toast, DataTable) plus `src/lib/utils.ts`'s `cn()` helper. **Every later milestone should import and reuse these rather than writing new one-off UI.**
- `src/components/layout/header.tsx` + `footer.tsx` — the real Header (mega menu, mobile nav, Verify as a distinct link) and Footer (five-column, Complaints & Appeals / Report Fraud kept non-buried) from Phase 5, driven by `src/lib/nav.ts`. Wired via `src/app/(public)/layout.tsx`.
- `src/app/(public)/page.tsx` is the **real homepage** (Milestone 4) — all 10 Phase 5 sections, built from `src/components/home/*` and placeholder data in `src/lib/programs.ts`/`src/lib/news.ts`.
- **26 internal public pages built (Milestone 5)**: About (3 pages), Accreditation (overview/process/programs index+detail/fees/apply), Resources (index+3 filtered views+detail), Training (index+detail), News (index+detail), Contact, FAQs, Complaints & Appeals, Report Fraud, Legal (3 pages), Become an Assessor. Placeholder data lives in `src/lib/resources.ts`/`training.ts`/`faqs.ts`.
- **`/verify` and `/verify/[reference]` built (Milestone 6)** — the platform's core trust feature. Both `force-dynamic` (never long-TTL cached). All 4 real statuses (Active/Suspended/Withdrawn/Expired) plus a structurally-distinct Not Found state, per Phase 7. Placeholder data in `src/lib/verification-records.ts`. Real backend/rate-limiting still pending Milestone 12 (APIs).
- **Real authentication built (Milestone 7)**: Auth.js v5, bcrypt password hashing, real TOTP MFA, session-based RBAC middleware gating everything under `/portal`. `/login`, `/register`, `/forgot-password`, `/reset-password` are all live and functional.
- **Real Applicant Portal built (Milestone 8)**: `/portal/applicant/{dashboard,applications,applications/[id],invoices,invoices/[id],accreditation,messages,profile,security}` — all functional against a placeholder per-user data store, with real Server Actions for document upload, messaging, application drafting/submission, and password change.
- **Real Assessor Portal built (Milestone 9)**: `/portal/assessor/{dashboard,competence,availability,assignments,assignments/[id],messages,profile}` — access strictly scoped to the assessor's own assignments, structured competence records, a 7-tab assessment workspace (Overview/Documents/Checklist/Findings/Evidence/Messages/Report) with per-criterion findings and Accept/Decline with a required decline reason. One assignment is deliberately linked to Milestone 8's applicant demo data so both portals share the same message thread.
- **Real Admin Platform built (Milestone 10)**: `/portal/admin/{dashboard,applications,applications/[id],organisations,organisations/[id],assessors,assessors/[id],accreditation-records,accreditation-records/[id],users,audit-logs}` — every status-changing action requires a reason and writes to a new append-only audit log; Applications has a structurally distinct "Record Decision" action (admin session is always the decider, never the assigned assessor); Accreditation Records has Suspend/Reinstate/Withdraw plus a verification-record curation panel (publish toggle, certificate-visibility toggle, live "Preview public page" link) that propagates to the real public `/verify` route immediately via `revalidatePath`.
- The entire public site, auth flow, and all three portals (Applicant/Assessor/Admin) now resolve. **This completes the full UX build.**
- A temporary, non-public preview route at `/design-system-preview` — remove or gate before production launch.
- No `(portal)` route group yet — comes with auth (Milestone 7) and the portal milestones (8–10).
- **Git is now initialized**, two commits so far (Phase 1–12 docs + Milestones 1–2; then Milestone 3). Standard git safety rules apply from here (never force-push, never skip hooks, new commits not amends, etc.) even though this is a solo/local repo so far.

**Known issue carried forward:** one moderate/high `npm audit` finding (postcss, bundled inside Next's own internal build tooling) — no non-breaking fix; revisit at Phase 14 or when Next 16 is separately evaluated.

Working name in use throughout the codebase: "Meridian Accreditation Board" (MAB) — still a placeholder; a name change at this point is a straightforward find-and-replace.

The user has been approving every phase/milestone via a bare "continue" without answering accumulated open questions (real org name/scopes/jurisdiction, vendor preferences — full list in `PROGRESS.md`). All have safe, reversible defaults in place, and that same "continue = proceed with the stated default" pattern was used to decide the git-init question after it was flagged twice. **How to resume development if this session ends:** read `PROGRESS.md`'s Phase 13 Milestone Tracker for the current milestone, then continue building the next Not-Started one in order — don't skip ahead, since later milestones are meant to import from `src/components/ui/` and `src/components/layout/` rather than reinvent them.

## How to resume this project in a new session

1. Read this file.
2. Read `PROGRESS.md` to see which phase is current and its status.
3. Read the latest `docs/phases/phase-N-*.md` for full context on the last delivered/approved phase.
4. Check the Open Questions Log in `PROGRESS.md` for anything still unresolved.
5. Continue from the current phase — do not restart or re-litigate approved phases without the user asking.
