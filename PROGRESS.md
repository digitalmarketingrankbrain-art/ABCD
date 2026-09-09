# Progress Tracker — Accreditation Platform

Working project name: **accreditation-platform** (placeholder — final brand name is decided in Phase 4).
Reference (functional/structural inspiration only, not visual/copy): https://www.uafaccreditation.org/

This file is the single source of truth for phase status. Update the **Status**, **Date**, and **Notes** columns as work progresses. Do not skip ahead — each phase requires explicit approval before the next begins (see `HANDOVER.md`).

## Legend
- `Not started`
- `In progress`
- `Delivered — awaiting approval`
- `Approved`
- `Approved with changes`

## Phase Tracker

| # | Phase | Status | Date | Deliverable file | Notes |
|---|-------|--------|------|-------------------|-------|
| 1 | Discovery & Requirements | Approved | 2026-09-09 | `docs/phases/phase-1-discovery.md` | Approved with placeholder assumptions carried forward |
| 2 | Information Architecture & Sitemap | Approved | 2026-09-09 | `docs/phases/phase-2-ia-sitemap.md` | Approved with placeholder assumptions carried forward |
| 3 | Content Strategy & Copy | Approved | 2026-09-09 | `docs/phases/phase-3-content-strategy.md` | Approved with placeholder assumptions carried forward |
| 4 | Brand & Design System | Approved | 2026-09-09 | `docs/phases/phase-4-design-system.md` | Approved with placeholder name/assumptions carried forward |
| 5 | Homepage UX/UI | Approved | 2026-09-09 | `docs/phases/phase-5-homepage.md` | Approved; no visual mockup rendered, written spec only |
| 6 | Internal Public Pages | Approved | 2026-09-09 | `docs/phases/phase-6-public-pages.md` | Approved; legal body text explicitly deferred to real legal review |
| 7 | Verification Experience | Approved | 2026-09-09 | `docs/phases/phase-7-verification.md` | Approved with 2 open questions carried forward |
| 8 | Applicant Portal UX | Approved | 2026-09-09 | `docs/phases/phase-8-applicant-portal.md` | Approved with 2 open questions carried forward |
| 9 | Assessor Portal | Approved | 2026-09-09 | `docs/phases/phase-9-assessor-portal.md` | Approved with 2 open questions carried forward |
| 10 | Admin Platform | Approved | 2026-09-09 | `docs/phases/phase-10-admin-platform.md` | Approved with 2 open questions carried forward |
| 11 | Technical Architecture | Approved | 2026-09-09 | `docs/phases/phase-11-architecture.md` | Approved with 3 open questions carried forward |
| 12 | Database & Data Model | Approved | 2026-09-09 | `docs/phases/phase-12-data-model.md` | Approved; all prior open questions resolved via schema defaults |
| 13 | Development | In progress | 2026-09-09 | `docs/phases/phase-13-development-log.md` | Milestone 1 (Project Setup) delivered — awaiting approval; 16 milestones remain |

### Phase 13 Milestone Tracker

| # | Milestone | Status | Notes |
|---|-----------|--------|-------|
| 1 | Project setup | Approved | Next.js 15.5.25 + TS + Tailwind v4 scaffolded, Phase 4 tokens wired via CSS variables, fonts self-hosted via next/font, build+dev verified working. No git repo initialized yet (not requested). One unresolved moderate/high npm audit finding — see milestone notes. |
| 2 | Design system (component library) | Delivered — awaiting approval | 16 reusable UI primitives built (`src/components/ui/`) implementing Phase 4's visual rules; showcase page at `/design-system-preview`; build/typecheck/lint all clean. |
| 3 | Public layout (header/footer/nav shell) | Not started | |
| 4 | Homepage | Not started | |
| 5 | Public pages | Not started | |
| 6 | Verification | Not started | |
| 7 | Authentication | Not started | |
| 8 | Applicant portal | Not started | |
| 9 | Assessor portal | Not started | |
| 10 | Admin portal | Not started | |
| 11 | Database (Prisma schema + migrations) | Not started | |
| 12 | APIs | Not started | |
| 13 | Document system | Not started | |
| 14 | Notifications | Not started | |
| 15 | Payments | Not started | |
| 16 | Audit logging | Not started | |
| 17 | Security hardening | Not started | |
| 14 | Testing | Not started | | `docs/phases/phase-14-testing.md` | |
| 15 | Final Polish & Launch | Not started | | `docs/phases/phase-15-launch.md` | |

## Open Questions Log

Running list of unresolved questions raised across phases (also see "Questions / Decisions Needed" inside each phase doc). Move items here once raised so they aren't lost across sessions.

| Raised in | Question | Status |
|-----------|----------|--------|
| Phase 1 | Is this a real accreditation body launching a real service, or a portfolio/demo build? Affects how much legal/compliance rigor and real institutional facts are required. | Open |
| Phase 1 | What accreditation programs/scopes will the org actually offer (e.g. management systems, certification bodies, inspection bodies, labs, personnel certification)? | Open |
| Phase 1 | Jurisdiction(s) of operation and any real regulatory/legal constraints to respect? | Open |
| Phase 1 | Any existing brand assets, name, or domain already decided, or fully greenfield? | Open |
| Phase 1 | Expected scale (handful of accredited bodies vs. thousands) — affects portal and directory design assumptions. | Open |

## Session Log

Chronological log of substantive work sessions. Append, don't rewrite history.

- **2026-09-09** — Project initialized. Directory structure created. Phase 1 (Discovery & Requirements) drafted and delivered for approval. `HANDOVER.md` and this tracker created.
- **2026-09-09** — New session resumed project from `HANDOVER.md`. Phase 1 approved (user said "continue" without answering open questions — placeholder assumptions carried forward per Phase 1's own default). Phase 2 (Information Architecture & Sitemap) drafted and delivered for approval.
- **2026-09-09** — Phase 2 approved (user said "continue", placeholders carried forward again). Phase 3 (Content Strategy & Trustworthy Copy) drafted and delivered for approval — page-by-page content briefs + full homepage copy, no fabricated credibility claims included.
- **2026-09-09** — Phase 3 approved (user said "continue"). Phase 4 (Brand & Design System) drafted and delivered for approval — proposed working name "Meridian Accreditation Board," full colour/typography/component/responsive system, deliberately anti-SaaS-template direction.
- **2026-09-09** — Phase 4 approved (user said "ok continue"). Phase 5 (Homepage UX/UI) drafted and delivered for approval — full section-by-section (12 sections) layout, content, CTA, interaction, and mobile-behaviour spec, tied to Phase 3 copy and Phase 4 design tokens.
- **2026-09-09** — Phase 5 approved (user said "continue"). Phase 6 (Internal Public Pages) drafted and delivered for approval — layout/sections/copy/CTA/trust elements for About, Governance, Impartiality & Ethics, Accreditation overview, full process page, program template, Resources, Training, Contact, FAQs, Complaints & Appeals, Report Fraud, and Legal page structures. Legal body text explicitly flagged as out of scope pending real legal review.
- **2026-09-09** — Phase 6 approved (user said "continue"). Phase 7 (Verification Experience) drafted and delivered for approval — URL structure (`/verify/[reference]`), search page with empty/error states, and full verification detail page with all 5 status states (Active/Suspended/Withdrawn/Expired/Not Found), each with explicit color+icon+label+plain-language copy. Not Found deliberately given a structurally different layout so it can never be mistaken for a valid result.
- **2026-09-09** — Phase 7 approved (user said "continue"). Phase 8 (Applicant Portal UX) drafted and delivered for approval — canonical 7-stage application lifecycle (Draft→Submitted→Initial Review→Document Review→Assessment→Decision→Accredited/Declined) with all stages visible to the applicant; dashboard, applications list/detail with shared ApplicationTimeline component, document upload/versioning/inline comments, invoices, case-scoped messages, accreditation/renewal reusing the application-flow pattern, profile/security.
- **2026-09-09** — Phase 8 approved (user said "continue"). Phase 9 (Assessor Portal) drafted and delivered for approval — access strictly scoped to an assessor's own assignments; dashboard, structured (non-free-text) competence records, calendar-based availability, assignments list with accept/decline, and a checklist-driven assessment workspace (Overview/Documents/Checklist/Findings/Evidence/Report tabs) designed for handling many concurrent assessments.
- **2026-09-09** — Phase 9 approved (user said "continue"). Phase 10 (Admin Platform) drafted and delivered for approval — clarity/efficiency/traceability-first admin console: dense table-based lists throughout, mandatory reason fields on every status-changing action, RBAC-scoped UI (not just API), a structurally distinct "Record Decision" action enforcing the assessor/decision-maker separation, verification-record curation screen with a "preview public page" action, and full audit log / users-roles / settings / reporting sections.
- **2026-09-09** — Phase 10 approved (user said "continue"). Phase 11 (Technical Architecture) drafted and delivered for approval — first implementation-decision phase. Stack: Next.js (App Router)+TS, Tailwind, Next.js Route Handlers/Server Actions (no separate NestJS service — evaluated as unnecessary complexity at assumed scale), PostgreSQL via Prisma with enum-typed status fields, managed auth provider (WorkOS/Clerk, vendor TBD) for credentials/MFA/sessions with custom RBAC+record-scoping in-app, S3/R2 private storage with signed URLs, Resend email, Inngest for scheduled/background jobs, Stripe for payments, Vercel hosting, Upstash Ratelimit + Cloudflare Turnstile for abuse protection. Verification pages are dynamically rendered with active cache invalidation on status change, never long-TTL cached. Audit log is append-only at the DB grant level, written transactionally alongside every mutation via a centralized data-access layer.
- **2026-09-09** — Phase 11 approved (user said "continue"). Phase 12 (Database & Data Model) drafted and delivered for approval — last design phase before coding. ~25 entities defined with fields/relationships/constraints: enum-typed statuses throughout, Application stage transitions enforced against an explicit allowed-transition map, Decision.decided_by_user_id structurally forbidden from equaling the assigned assessor (governance separation enforced at the schema/constraint level, not just policy), immutable DocumentVersion rows, VerificationRecord as a thin admin-controlled curation layer (is_published, certificate_document_visible) reading live-filtered fields from AccreditationRecord rather than duplicating them, and AuditLog with INSERT-only DB grants. OrganisationMembership table supports multi-user applicant orgs from day one even though v1 assumes single-login, avoiding a future migration.
- **2026-09-09** — Phase 12 approved (user said "continue"). Phase 13 (Development) started — first milestone (Project Setup) built and verified: Next.js 15.5.25 (App Router) + TypeScript + Tailwind CSS v4, Phase 4 design tokens wired as CSS variables (`src/app/globals.css`), Source Serif 4 / IBM Plex Sans / IBM Plex Mono self-hosted via `next/font/google`. `npm run build` and `npm run dev` both verified working (dev server auto-shifted to port 3002 since 3000 was occupied by an unrelated process in this environment). Found and fixed a critical RCE (CVE, React Flight protocol deserialization) in the initially-pinned Next.js 15.5.4 by upgrading to 15.5.25 — one moderate/high postcss advisory remains, bundled inside Next's own internal build tooling, only resolvable by an untested Next 16 major upgrade; left as a known/flagged issue rather than force-upgrading blind. No git repository initialized yet (not requested by user). Delivered for approval before continuing to Milestone 2 (design system component library).
- **2026-09-09** — Milestone 1 approved (user said "continue"; git-init question left unanswered so git remains uninitialized — flagged again). Milestone 2 (Design system component library) built: 16 components in `src/components/ui/` (Button, StatusBadge, Card, Input, Select, FormField, Alert, Breadcrumbs, Pagination, EmptyState, ErrorState, Modal, Tabs, Accordion, Toast/ToastProvider, DataTable), each implementing a specific Phase 4 rule (6px-radius non-pill buttons, pill-only status badges with mandatory icon+label, flat cards with hover-only shadow, left-border alerts instead of full-bleed banners, numbered pagination, structurally distinct EmptyState vs. ErrorState per Phase 7's "never let a system failure look like no-results" rule, focus-trapped accessible Modal, underline Tabs, sticky-header mono-aligned DataTable). Added `cn()` utility (clsx+tailwind-merge), `class-variance-authority` for variants, `lucide-react` for the line-icon set. ToastProvider wired into root layout. Built a temporary `/design-system-preview` route rendering every component together for visual review — not a public route. Fixed one strict-mode TS error (Modal focus trap) and one dead-prop lint warning (DataTable sort direction, now actually drives the sort-icon rotation) found during verification. `npm run build`, `typecheck`, and `lint` all pass with zero errors/warnings; dev server fetch-tested both routes for runtime errors (none found). Delivered for approval before Milestone 3 (public layout: header/footer/nav).
