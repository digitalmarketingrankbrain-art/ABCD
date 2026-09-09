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

Phases 1–12 (all design phases) are approved. **Phase 13 (Development) is underway.** Milestones 1–3 (Project Setup, Design System, Public Layout) are approved; Milestone 4 (Homepage) is built and delivered for approval. See `PROGRESS.md`'s Phase 13 Milestone Tracker for the full 17-milestone list and `docs/phases/phase-13-development-log.md` for full build detail per milestone.

**What exists in the repo right now:**
- Working Next.js 15.5.25 (App Router) + TypeScript + Tailwind CSS v4 scaffold, Phase 4 design tokens as CSS variables, self-hosted fonts.
- A full reusable UI component library in `src/components/ui/` (Button, StatusBadge, Card, Input, Select, FormField, Alert, Breadcrumbs, Pagination, EmptyState, ErrorState, Modal, Tabs, Accordion, Toast, DataTable) plus `src/lib/utils.ts`'s `cn()` helper. **Every later milestone should import and reuse these rather than writing new one-off UI.**
- `src/components/layout/header.tsx` + `footer.tsx` — the real Header (mega menu, mobile nav, Verify as a distinct link) and Footer (five-column, Complaints & Appeals / Report Fraud kept non-buried) from Phase 5, driven by `src/lib/nav.ts`. Wired via `src/app/(public)/layout.tsx`.
- `src/app/(public)/page.tsx` is now the **real homepage** (Milestone 4) — all 10 Phase 5 sections, built from `src/components/home/*` and placeholder data in `src/lib/programs.ts`/`src/lib/news.ts`. Every page it *links to* (Programs, About, Resources, Verify, News, Training, Contact) still 404s — Milestones 5–6 build those.
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
