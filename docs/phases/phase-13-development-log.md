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

*(Milestone 3 onward will be appended here as they're built.)*
