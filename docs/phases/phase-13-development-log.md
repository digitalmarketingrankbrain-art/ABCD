# Phase 13 — Development Log

Builds on Phases 1–12 (all approved). This log records each development milestone as it's built, tested, and approved — per the project's rule that Phase 13 is built incrementally, not generated in one pass. See `PROGRESS.md`'s Phase 13 Milestone Tracker for the current status of all 17 milestones.

---

## Milestone 1 — Project Setup

**Objective:** Stand up a working Next.js + TypeScript + Tailwind project, wired to the Phase 4 design tokens, verified to build and run — no feature UI yet.

**What was built:**
- `package.json` — Next.js 15.5.25, React 19.1.1, TypeScript 5.7, Tailwind CSS v4, ESLint 9 (flat config via `eslint.config.mjs`).
- `tsconfig.json` — strict mode, `noUncheckedIndexedAccess`, `@/*` path alias to `src/*`.
- `next.config.ts` — minimal, `reactStrictMode: true`.
- `postcss.config.mjs` + `src/app/globals.css` — Tailwind v4's CSS-first config; Phase 4's full colour token set (`primary`, `secondary`, `accent`, `background`/`background-portal`, `surface`, `border`/`border-portal`, `text`/`text-muted`/`text-inverse`, and the four semantic success/warning/error/info pairs) defined as CSS custom properties and registered as Tailwind utilities via `@theme inline` — so `bg-primary`, `text-error-text`, etc. are usable immediately in components.
- `src/app/layout.tsx` — root layout; self-hosts Source Serif 4 (display), IBM Plex Sans (body/UI), and IBM Plex Mono (data) via `next/font/google`, exposed as CSS variables consumed by `globals.css`'s `--font-display`/`--font-sans`/`--font-mono`.
- `src/app/page.tsx` — temporary placeholder page (not the real homepage) confirming the pipeline renders correctly with the design tokens applied.
- `.gitignore`, `eslint.config.mjs`.

**Testing performed:**
- `npm install` — succeeded; found the pinned Next.js version (15.5.4) had a **critical RCE** (CVSS 10, React Flight protocol deserialization, GHSA-9qr9-h5gf-34mp) plus several other high/moderate advisories. Upgraded to 15.5.25 (latest 15.5.x patch) and re-audited — critical/high-in-`next`/`sharp` issues resolved.
- `npm run build` — production build succeeds, static homepage prerendered, no type errors.
- `npm run dev` — dev server starts and serves correctly (auto-shifted to port 3002 in this environment since port 3000 was already occupied by an unrelated process); fetched the rendered HTML and confirmed the design-token classes, font variables, and page title/metadata are all present and correct.

**Known issues:**
1. One remaining moderate/high `npm audit` finding: a `postcss` advisory bundled *inside* Next.js's own internal build tooling (`node_modules/next/node_modules/postcss`), not a direct project dependency. No fix is available without upgrading to Next 16 (a major, breaking version not yet evaluated against this project's config). Flagged for revisit at Phase 14 (Testing) or once Next 16 has been separately assessed — not blocking for continued development.
2. No git repository has been initialized in this project directory. Not requested by the user; flagging so version control can be set up deliberately (and so milestone-by-milestone history isn't lost) before too much code accumulates.

**Not yet built (intentionally, per the milestone order):** any `(public)` or `(portal)` route groups, any actual page content, the component library, Prisma/database, or auth — all scheduled for later milestones.

---

## Milestone 2 — Design System (Component Library)

**Objective:** Build the actual reusable component library implementing Phase 4's visual rules, so every later milestone (public pages, portals) consumes shared primitives instead of one-off markup.

**What was built (`src/components/ui/`):**
- `button.tsx` — `Button` with `primary`/`secondary`/`tertiary`/`destructive`/`destructive-outline`/`inverse`/`ghost` variants via `class-variance-authority`. 6px radius, never pill-shaped (Phase 4).
- `status-badge.tsx` — `StatusBadge`, always icon + colour + label, never colour alone. Exports `VERIFICATION_STATUS`, the exact tone/label mapping from Phase 7 (Active/Suspended/Withdrawn/Expired).
- `card.tsx` — `Card` + `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter`. Flat at rest; `interactive` prop adds a hover-only shadow, never a shadow at rest.
- `input.tsx`, `select.tsx` — form controls with visible 2px focus rings and an `invalid` state.
- `form-field.tsx` — `FormField` wrapper: label always above the field, required-marker, hint/error slot.
- `alert.tsx` — left-border-accent + tinted background + icon, per Phase 4's "not a full-bleed banner" rule.
- `breadcrumbs.tsx`, `pagination.tsx` — numbered pagination (no infinite scroll, per Phase 4).
- `empty-state.tsx`, `error-state.tsx` — deliberately distinct components, not the same component with a colour prop, because Phase 7 requires a system failure to never visually resemble a "no results" answer.
- `modal.tsx` — focus-trapped, Escape-to-close, restores focus to the trigger on close, rendered via `createPortal`.
- `tabs.tsx` — underline-style (not pill) tabs.
- `accordion.tsx` — used for FAQs (Phase 6).
- `toast.tsx` — `ToastProvider` + `useToast()`; confirmations auto-dismiss (5s default), anything needing acknowledgement passes `persistent: true`.
- `data-table.tsx` — sticky header, border-divider rows (no zebra striping), mono+right-aligned numeric/date columns, sortable-column affordance.
- `src/lib/utils.ts` — `cn()` helper (`clsx` + `tailwind-merge`).

`ToastProvider` wired into `src/app/layout.tsx` so any page can call `useToast()`.

**Verification page:** `src/app/design-system-preview/page.tsx` — a temporary, non-public route rendering every component together (buttons, all 5 status tones, cards, form fields with an error state, all 4 alert tones, breadcrumbs, pagination, empty/error states side by side, a working modal, tabs, an FAQ-style accordion, toast triggers, a data table using the real verification status badges, and the type/colour reference). Used to confirm the whole set renders and behaves correctly together, not just in isolation.

**Testing performed:**
- `npm run build` — initially failed on a `strict`/`noUncheckedIndexedAccess` type error in the Modal's focus-trap logic (`last` possibly `undefined`); fixed with an explicit guard. Rebuilt clean.
- `npm run typecheck` — clean.
- `npm run lint` — initially reported 150 errors/1469 warnings, all from `.next/**` build output being linted (ESLint flat config wasn't ignoring it by default); added an explicit `ignores` block to `eslint.config.mjs`. Also fixed one genuine warning (DataTable's `sortDirection` prop was accepted but unused — now drives the sort-icon rotation). Clean after both fixes.
- Started the dev server, fetched `/` and `/design-system-preview`, confirmed HTTP 200 and correct rendered content on both, and checked the dev server log for compile/runtime errors (none).

**Known issues:** none new. The Milestone 1 postcss advisory and missing git repo both remain open (see Milestone 1).

**Not yet built:** Header/Footer (Milestone 3 — public layout), SearchBox/DocumentCard/ApplicationTimeline/FileUploader (deferred to the portal/verification milestones where they have real context to be built against, rather than guessed at here).

---

## Milestone 3 — Public Layout

**Objective:** Build the real Header and Footer from Phase 5's spec, on top of the Milestone 2 component library, and wrap the public site in them via a route group.

**What was built:**
- `src/lib/nav.ts` — single source of truth for header mega-menu groups, the two simple header links (News, Contact), and the five footer link groups (Accreditation, About, Resources, Trust & Legal, Contact), derived from Phase 2's sitemap.
- `src/components/layout/header.tsx` — sticky header, click-triggered (not hover-only, for touch/accessibility parity per Phase 5) mega menu with one-line descriptions per link, "Verify" rendered as a visually distinct single link rather than folded into a dropdown, closes on outside-click/Escape. Desktop right side: "Log In" text link + primary "Verify an Accreditation" button. Full-screen mobile nav (hamburger-triggered) with the same descriptive-link groups and Log In/Verify pinned at the bottom, per Phase 5's mobile spec.
- `src/components/layout/footer.tsx` — five structured link columns on the dark `primary` surface (the deliberate large use of the dark colour per Phase 4), with Complaints & Appeals and Report Fraud kept as first-class links rather than nested under Contact. Collapses to an accordion per group on mobile.
- `src/app/(public)/layout.tsx` — wraps `children` with Header + Footer; `src/app/(public)/page.tsx` — the placeholder homepage moved here (still a placeholder; real homepage is Milestone 4).

**Bug caught and fixed:** the first draft of the header used `<Button asChild><Link>...</Link></Button>` to make button-styled links — `asChild` doesn't exist on this project's hand-built `Button` (no Radix Slot), and nesting a `Link` inside a `button` element is invalid HTML regardless. Fixed by exporting `buttonVariants` from `button.tsx` and applying the resulting classes directly to `Link` elements.

**Testing performed:**
- `npm run build`, `typecheck`, `lint` — all clean.
- Dev server started; fetched `/` and confirmed the header and footer both render with the expected content (mega menu groups, "Verify an Accreditation" CTA present, footer's "Complaints & Appeals" and "Report Fraud" links present). Confirmed `/design-system-preview` still renders correctly (unaffected — it sits outside the `(public)` route group). Confirmed an unbuilt route (`/accreditation`) correctly 404s rather than crashing.
- Noted unrelated `/api/oldclients/drive/sync/status` 404 requests appearing in the dev server log during testing — grepped the codebase and confirmed nothing in this project references that path; it's external network noise from something else in the environment probing the local port, not a bug in this app.

**Known issues:** same two carried from Milestones 1–2 (postcss advisory; git — now resolved, see below).

**Git:** initialized this milestone (previously flagged twice with no direct answer; treated the session-wide "continue → proceed with stated default" pattern as covering this too). First commit captured all Phase 1–12 docs plus Milestone 1–2 code; second commit captures Milestone 3.

**Not yet built:** actual content for any nav destination (About, Accreditation, Resources, etc. all still 404) — those arrive in Milestones 4–6.

---

## Milestone 4 — Homepage

**Objective:** Replace the placeholder with the real homepage from Phase 5's section-by-section spec, using Phase 3's copy and the Milestone 2/3 components throughout.

**What was built (`src/components/home/`):**
- `hero-motif.tsx` — abstract SVG reticle/grid graphic standing in for real photography (none exists yet), reused at two sizes (small below the CTAs on mobile, large beside the copy on desktop) per Phase 5's mobile-ordering rule.
- `hero.tsx`, `trust-strip.tsx`, `programs-section.tsx`, `why-it-matters.tsx`, `how-it-works.tsx`, `verification-section.tsx`, `transparency-section.tsx`, `training-section.tsx`, `notices-section.tsx`, `final-cta.tsx` — one component per Phase 5 section, assembled in `src/app/(public)/page.tsx`.
- `src/lib/programs.ts`, `src/lib/news.ts` — placeholder data (5 programs, 3 news items) built as the reusable source later milestones (program detail pages, news pages, eventually the admin CMS) will read from, rather than inlining content directly in the homepage components.

**Notable implementation decisions:**
- Verification section uses a real controlled `<input>` + client-side `router.push` to `/verify?q=...` — functional now, even though `/verify` itself doesn't exist until Milestone 6, so the interaction pattern is already correct rather than a static mockup to redo later.
- Trust Strip's 4th slot is simply not rendered (3 items in the array), not rendered-then-hidden or placeheld, per Phase 5's explicit rule against a visible placeholder inside a trust signal.
- Notices section tags the withdrawal-notice demo item as `STATUS_CHANGE` with a warning-toned badge, distinct from the two `ROUTINE` items, to exercise the "publish adverse notices too" trust principle from Phase 3 even in placeholder data.

**Testing performed:**
- `npm run build` initially failed with a stale-cache `MODULE_NOT_FOUND` error (`Cannot find module './611.js'`) unrelated to any new code — a leftover `.next` artifact from an earlier milestone's build. Cleared `.next` and rebuilt clean.
- `npm run typecheck`, `npm run lint` — clean.
- Dev server started; fetched `/` and grepped for all 10 section headings/markers — all present. Confirmed no server-side errors in the dev log (filtered out the same unrelated `/api/oldclients/...` environment noise seen in Milestone 3). Confirmed `/verify?q=test` still correctly 404s (expected — not built until Milestone 6).

**Known issues:** none new.

**Not yet built:** any of the pages the homepage links to (Programs, About, Resources, Verify, News, Training, Contact all still 404) — Milestones 5–6 build those.

---

## Milestone 5 — Public Pages

**Objective:** Build every internal public page the header/footer/homepage link to, per Phase 6's layout/content/trust-element spec.

**What was built:**
- `src/components/layout/page-header.tsx` — shared breadcrumbs + title + description + optional CTA-row block, reused by every page in this milestone.
- `src/components/layout/legal-page.tsx` — structural template for Privacy Policy / Terms of Use (Accessibility Statement kept as its own page instead, since its content — a real conformance target and honestly-listed limitations — needed to be explicit, not templated).
- About: `who-we-are`, `governance` (with a visible "Last reviewed" date), `impartiality-and-ethics`.
- Accreditation: overview page, `how-it-works` (full 7-stage process including the "if declined" path with anchor-linkable stages), `programs` index, `programs/[slug]` dynamic detail (sticky in-page section nav: Overview/Eligibility/Criteria/Process/Fees/Documents), `fees`, `apply` (routing page to auth, not a form).
- Resources: index + `policies`/`procedures`/`forms` filtered views + `[slug]` dynamic detail, via a shared `ResourceTable` component. `src/lib/resources.ts` holds 6 placeholder documents, each with a version and effective date per Phase 6's rule.
- Training: index + `[slug]` dynamic detail. `src/lib/training.ts` holds 2 placeholder courses.
- News: index + `[slug]` dynamic detail, reusing `src/lib/news.ts` from Milestone 4.
- `contact` — `ContactForm` client component: selecting "Complaint" or "Fraud" in the category dropdown shows an inline `Alert` linking to the dedicated page instead of silently accepting a misrouted message, per Phase 6.
- `faqs` — audience-tabbed (`Tabs`) accordion, backed by `src/lib/faqs.ts` (4 audiences).
- `complaints-and-appeals` — 5-step numbered process.
- `report-fraud` — `FraudReportForm` client component, anonymous-friendly (contact info optional), shows an honest post-submit message ("we may not be able to share investigation outcomes, but every report is logged and reviewed").
- `legal/privacy-policy`, `legal/terms-of-use` (via `LegalPage`), `legal/accessibility-statement` (bespoke, states a WCAG 2.1 AA target).
- `assessors/become-an-assessor` — expression-of-interest framing, explicit that this isn't a full application.

**Bugs caught and fixed:**
1. Two `react/no-unescaped-entities` lint errors (raw apostrophes in JSX text) — fixed with `&apos;`.
2. A real server/client boundary violation: `resources/fees` and the resource-listing pages originally built their `DataTable` `columns` config (which contains `render` callback *functions*) inside server-component pages and passed it into the client `DataTable`. Next.js correctly rejects this at build time — functions can't be serialized across the server/client boundary. Fixed by extracting `ResourceTable` and a new `FeesTable` as `"use client"` components that own their column definitions internally, so only plain data (the resources/programs arrays) crosses the boundary.

**Testing performed:**
- `npm run build` — hit and fixed both issues above; final build succeeds with 43 total routes, including statically-generated dynamic pages for every program/news/training slug (`generateStaticParams`).
- `npm run typecheck`, `npm run lint` — clean.
- Restarted the dev server (had to free port 5000 first — a stale process from the prior session's `npm run dev` was still holding it; identified via `netstat` and stopped via PowerShell `Stop-Process`) and curl-tested all 26 new routes: all return 200. Verified two intentionally-invalid dynamic slugs (`/accreditation/programs/not-a-real-program`, `/resources/not-a-real-resource`) correctly 404 rather than crashing. Spot-checked real content strings on 3 pages (FAQs, Report Fraud, Governance) to confirm actual copy renders, not just a 200 status. No errors in the dev server log.

**Known issues:** none new.

**Not yet built:** `/verify` and `/verify/[reference]` (Milestone 6 — the platform's highest-trust feature), `/login`/`/register` and anything portal-related (Milestone 7+).

---

## Milestone 6 — Verification

**Objective:** Build the platform's single highest-trust feature per Phase 7 — the public search and the verification detail page, with 5 unambiguous status states.

**What was built:**
- `src/lib/verification-records.ts` — placeholder `VerificationRecord[]` (5 records covering all 4 real statuses, plus two organisations with similar names to exercise the ambiguous-search/results-list path), `STATUS_EXPLANATION` (the exact plain-language copy per status from Phase 7), and `findByReference`/`searchRecords` helpers.
- `src/components/ui/status-badge.tsx` — extended with a `lg` size for the detail page's dominant top-of-page badge.
- `src/components/verify/search-form.tsx` — client component, autofocused (only here, not on the homepage's embedded search per Phase 5), Accreditation Number / Organisation Name mode toggle, submits via `router.push` to `/verify?q=&mode=`.
- `src/components/verify/results-list.tsx` — one row per match: org name, program, reference (mono), status badge.
- `src/app/(public)/verify/page.tsx` — the search page. `force-dynamic`. Number-mode exact match calls `redirect()` straight to the detail page; otherwise renders the results list or a distinct `EmptyState` (with a Report Fraud link) for no matches.
- `src/components/verify/verification-card.tsx` — the shared layout for the 4 real statuses: status badge (large, above the org name) → org name → reference → detail rows (program, linked back to its program page; effective/expiry/surveillance/renewal dates) → footer (copy-link, print, "Last verified" timestamp, certificate link or an honest "not publicly available" note).
- `src/components/verify/not-found-card.tsx` — deliberately a separate component, not `VerificationCard` with a different color: no org header, no populated date fields, no reused badge shape. This is the core anti-fraud design decision from Phase 7 — a Not Found result must be structurally incapable of being mistaken for a valid one, including in a screenshot.
- `src/components/verify/page-actions.tsx` — `CopyLinkButton` (clipboard, with a 2s "Link copied" confirmation state) and `PrintButton` (`window.print()`).
- `src/app/(public)/verify/[reference]/page.tsx` — `force-dynamic`; looks up the record and renders `VerificationCard` or `NotFoundCard` — deliberately never calls Next's `notFound()`, since a Not Found *result* is a first-class, designed page state here, not a broken route.

**Testing performed — this feature got a full functional pass, not just build/lint:**
- `npm run build` — clean; confirmed in the route table that `/verify` and `/verify/[reference]` are marked `ƒ Dynamic` (server-rendered per request), not statically prerendered — directly verifies the Phase 11 "never long-TTL cache a verification page" decision actually took effect.
- `npm run typecheck`, `npm run lint` — clean.
- Restarted the dev server (had to `Stop-Process` a stale process squatting on port 5000 again — same recurring issue as Milestone 5).
- Functional checks against the running server: search page loads; number-mode exact match returns a 307 redirect with `Cache-Control: no-store` confirmed via `curl -I`; all 4 statuses (`MAB-2026-00417` Active, `MAB-2025-00298` Suspended, `MAB-2022-00156` Withdrawn, `MAB-2020-00043` Expired) render their correct label and exact explanation copy; Not Found (`MAB-9999-99999`) returns HTTP 200 with the correct copy and — verified by grep — contains none of the success/warning/error badge CSS classes; both ambiguous-name searches ("Prairie", "Coastal") return exactly their 2 correct records, confirmed by counting unique `href` values rather than raw text occurrences (a naive text-count was inflated by Next's embedded RSC hydration payload duplicating visible strings — worth remembering for future verification passes); the program link on the detail page points to the correct program page; number-mode search with no match falls through to the same empty state as name-mode. No errors or warnings anywhere in the server log across the whole pass.

**Known issues:** none new. Recurring minor friction: a dev server from an earlier milestone's testing keeps being left running and squatting on port 5000 between milestones — worth just reusing the already-running instance via a hard refresh instead of restarting each time, where possible.

**Not yet built:** any real backend (search still runs against static in-memory data; a real implementation needs the rate-limiting/bot-protection from Phase 1/11, which requires the API layer built in Milestone 12), `/login`/`/register` and anything portal-related (Milestone 7+).

---

## Milestone 7 — Authentication

**Objective:** Build real login, registration, password recovery, MFA, and session management — the last milestone before any portal work, since Applicant/Assessor/Admin all sit behind it.

**Stack decision:** Phase 11 left the auth provider as "vendor TBD" (WorkOS/Clerk). With no real vendor account available in this environment, built on **Auth.js (next-auth v5)** instead — a real, self-hosted, working implementation rather than a mock, and a legitimate option Phase 11 already flagged as satisfying the architecture. Swapping to a managed provider later is a contained change (the `authorize()` function and session shape are the integration surface, not scattered through the app) since RBAC/record-scoping was always going to be custom regardless of provider.

**What was built:**
- `src/lib/auth/store.ts` — in-memory placeholder Users table (stands in for Phase 12's `User` table until Milestone 11). One seeded demo account per role (`applicant@example.com` / `assessor@example.com` / `admin@example.com`, password `Password123!`), bcrypt-hashed. MFA deliberately left unenrolled on the Admin/Assessor seed accounts so the "required" enforcement is actually exercised on first login, not just declared. Also holds password-reset tokens (in-memory, 30-minute expiry).
- `src/auth.ts` — Auth.js config: Credentials provider whose `authorize()` does the *complete* check (password, then MFA code if the account has MFA enabled) in one server-side call; JWT session strategy with `role`/`id`/`mfaEnabled` embedded in the token (`mfaEnabled` refreshed via the `trigger === "update"` path so enrolling in MFA doesn't require a full re-login). `verifyTotpCode()` here is the single source of truth for TOTP validation, reused by both the login provider and MFA enrollment confirmation.
- `src/lib/auth/actions.ts` — Server Actions: `checkCredentials` (password-only pre-check used purely to decide whether the login form shows the MFA step — never creates a session, and is never trusted for the real sign-in decision), `registerApplicant`, `requestPasswordReset`/`resetPassword`, `startMfaEnrollment`/`confirmMfaEnrollment` (generates a real TOTP secret + scannable QR via `qrcode`).
- `src/middleware.ts` — protects everything under `/portal`: no session → redirect to `/login?callbackUrl=`; wrong role for a subtree (e.g. Applicant hitting `/portal/admin`) → bounced back to their own role home; Admin/Assessor session without MFA enrolled → forced to `/portal/mfa-setup` before anything else. Explicitly set to run on the **Node.js middleware runtime** (`export const config = { runtime: "nodejs" }`), not the Edge default — see the bug note below.
- `/login`, `/register`, `/forgot-password`, `/reset-password` (all under `(public)`), plus `/portal/mfa-setup` and a minimal `/portal` shell (`layout.tsx` + one placeholder dashboard per role, proving the chain end-to-end — real dashboards are Milestones 8–10).
- `src/lib/auth/types.d.ts` — module augmentation adding `id`/`role`/`mfaEnabled` to Auth.js's `Session`/`User`/`JWT` types.
- `.env.local` (real generated `AUTH_SECRET`, gitignored) and `.env.example` (documents required vars, including the still-pending Milestone 11+ ones).

**Bug caught and fixed — Edge Runtime incompatibility:** the first build compiled but emitted warnings that `bcryptjs` (via `src/lib/auth/store.ts`) and `jose`'s WebCrypto compression helpers (pulled in by `next-auth` itself) use Node APIs (`crypto`, `setImmediate`, `CompressionStream`) not supported in the Edge Runtime that Next.js middleware uses by default. Comparing the build output before and after setting the middleware's `runtime` to `"nodejs"` confirmed this actually fixes it — the warnings disappeared entirely rather than just going quiet.

**Testing performed — full functional pass, not just build/lint:**
- `npm run build` — one real TypeScript strict-mode error along the way (`user.id` possibly `undefined` per Auth.js's own types), fixed with a guard. Clean after, plus the Edge Runtime fix above.
- `npm run typecheck`, `npm run lint` — clean.
- Verified the TOTP logic standalone with a Node script (`otpauth`'s `generate()`/`validate()`): a freshly generated code is accepted, an arbitrary wrong code is rejected — this is the exact function (`verifyTotpCode`) used by both login and MFA enrollment.
- Extensive HTTP-level testing via `curl` with per-flow cookie jars (since Server Actions aren't practically curl-testable — Next's action-invocation protocol uses an internal action-id header/encoding not worth reverse-engineering just to test): unauthenticated `/portal` → redirects to `/login?callbackUrl=%2Fportal`; CSRF token fetch + credentials POST to `/api/auth/callback/credentials` correctly sets a session cookie; applicant login lands on `/portal/applicant` and `/api/auth/session` reflects the right role/mfaEnabled; applicant hitting `/portal/admin` bounces back to `/portal/applicant`, not an error page; admin login succeeds but is force-redirected to `/portal/mfa-setup` since MFA isn't enrolled yet; wrong password leaves the session `null`; a garbage `mfaCode` is correctly ignored when the account doesn't have MFA enabled yet (confirms the field isn't accidentally gating unrelated logins); logout via `/api/auth/signout` clears the session and `/portal` redirects to `/login` again afterward.
- **Not verified**: the actual MFA-enrollment click-through (scan/enter secret → submit code → `useSession().update()` → redirect) wasn't exercised through a real browser, since no browser-automation tool is available in this environment — only its two halves (the TOTP crypto, and the page rendering the right "MFA required" copy) were verified independently. Flagged to the user, with an invitation to test it live on the running dev server.
- No errors in the dev server log across the whole pass, aside from Auth.js's own expected `[auth][error] CredentialsSignin` log line on the deliberate wrong-password test — that's the framework's normal logging for a failed sign-in attempt, not a bug.

**Known issues:** the MFA-enrollment browser click-through is untested (see above). Otherwise none new.

**Not yet built:** real Applicant/Assessor/Admin dashboards (Milestones 8–10 — today's `/portal/{role}` pages are intentionally bare placeholders), the portal Security page (password change, active-session list — part of the Applicant/Assessor portal milestones), and swapping the in-memory user store for the real database (Milestone 11).

---

## Milestone 8 — Applicant Portal

**Objective:** Replace the Milestone 7 placeholder dashboard with the real Applicant portal from Phase 8: dashboard, application list/detail with the full lifecycle timeline, documents, messages, invoices, accreditation status, profile, security.

**What was built:**
- `src/lib/portal/applicant-data.ts` — in-memory placeholder Application/Invoice/Message data (stands in for Phase 12's tables until Milestone 11), scoped per user id. Two seeded applications for the demo applicant (one mid-lifecycle with an open information request, one still in Draft), two invoices, two messages. Accessor functions filter by `applicantUserId` so one applicant can never see another's data even at the placeholder-data level.
- `src/lib/portal/applicant-actions.ts` — real Server Actions (`sendApplicationMessage`, `uploadApplicationDocument`, `startNewApplication`, `submitApplicationForReview`), each starting with a `requireApplicant()` auth check.
- `src/components/portal/application-timeline.tsx` — the shared `ApplicationTimeline` component named in the project's reusability list. Deliberately reuses the same visual language (numbered circles, connecting line, checkmarks for completed steps) as the public "How Accreditation Works" stepper from Milestone 4, so an applicant recognises their own journey.
- `src/components/ui/file-uploader.tsx` — the shared `FileUploader` component, drag-and-drop + browse, exact microcopy from the project brief ("PDF, DOCX or XLSX files up to 25 MB"), client-side size/type validation, calls a parent-supplied `onUpload`.
- Dashboard, Applications (list + `[id]` detail with Overview/Documents/Assessment/Messages/Invoices tabs and an "Information Requested" banner), Invoices (list + detail), Accreditation, Messages (index into each application's own thread — case-scoped, never a general inbox), Profile, Security (real password change via a new `changeOwnPassword` action; MFA status + enroll link reusing Milestone 7's flow; active-session list explicitly documented as unavailable under JWT/stateless sessions rather than faked).
- `src/components/portal/portal-sidebar.tsx` (generic, role-agnostic) + `applicant-sidebar.tsx` (Applicant's specific nav list) + `src/app/portal/applicant/layout.tsx`.

**Bugs caught and fixed — two real, distinct classes:**
1. **Icons crossing the server/client boundary.** The sidebar's nav item list (label/href/icon) was originally defined in the server `layout.tsx` and passed as a prop into the client `PortalSidebar`. lucide-react icons are function components, and functions can't be serialized across that boundary — same underlying rule as Milestone 5's `DataTable` columns bug, different surface. Fixed by moving the icon-bearing list into a new client component (`applicant-sidebar.tsx`) that owns it entirely, so nothing icon-shaped ever crosses the boundary.
2. **A plain data constant imported from a `"use client"` module into a Server Component.** The invoice status label/tone mapping was defined and exported from `invoices-table.tsx` (a client component file) and imported into the server-rendered invoice detail page. This passed `npm run typecheck` cleanly but threw `Cannot read properties of undefined (reading 'tone')` at runtime — non-component exports from a `"use client"` module aren't reliably usable from a Server Component under the RSC model, even when the type signature says they should be fine. Fixed by extracting the constant into a new plain module with no `"use client"` directive (`src/lib/portal/invoice-status.ts`) that both the client table and the server detail page import from safely. This is a sharper, less obvious bug than #1 — worth remembering: **any plain data (not just functions) crossing from a `"use client"` file into server code is suspect, not just component/function props.**

**Testing performed — full functional pass, caught real regressions along the way:**
- `npm run build` — two straightforward fixes first (an unescaped apostrophe, a `noUncheckedIndexedAccess` undefined-guard), then hit bug #1 above at runtime (build itself succeeded; the error only appeared when actually hitting the pages, since Next's build doesn't execute Server Component render logic against real request data). Rebuilt clean after fixing both boundary bugs.
- `npm run typecheck`, `npm run lint` — clean throughout, including after the invoice bug — which is exactly why the fix note above matters: type-cleanliness didn't catch it.
- Logged in as the demo applicant via the same curl+cookie-jar approach as Milestone 7 and hit all 11 applicant routes. First pass surfaced two `500`s (dashboard/applications-list initially, then specifically the invoice detail page after the first round of fixes) — traced both to their root cause via the dev server log rather than guessing, fixed, and re-ran the full pass until all 11 returned `200` with correct content (dashboard's required-action alert and application reference; both applications listed with correct program names; application detail's info-requested banner, assessor name, and document review comment all present; invoice detail's amount/status; accreditation page correctly pulling `MAB-2026-00417` — the same record used in Milestone 6 — showing "Active"/"Northfield Testing Laboratories").
- Re-confirmed RBAC + MFA-enforcement interaction still works correctly after the portal changes: an Assessor session hitting an Applicant route gets redirected to their own role home first, which itself then redirects to MFA setup on the very next request — a two-hop chain, not a broken redirect.
- No errors in the dev server log at the end of the pass.

**Known issues:** none new (all found issues were fixed and re-verified within this milestone).

**Not yet built:** Assessor portal (Milestone 9), Admin portal (Milestone 10), real payment collection on the "Pay now" button (Milestone 15), real document storage behind uploads (Milestone 13), the real database behind all of this placeholder data (Milestone 11).

---

*(Milestone 9 onward will be appended here as they're built.)*
