import Link from "next/link";
import {
  ArrowRight,
  Inbox,
  ClipboardCheck,
  FileCheck,
  AlertTriangle,
  Users,
  FileClock,
  ShieldAlert,
  Receipt,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { auth } from "@/auth";
import { StatusBadge, VERIFICATION_STATUS } from "@/components/ui/status-badge";
import { getAllApplications, getAllInvoices, STAGE_LABEL } from "@/lib/portal/applicant-data";
import { getAllAssignments } from "@/lib/portal/assessor-data";
import { getAllProposalsForAdmin } from "@/lib/portal/assessor-team-data";
import { getAllNonConformitiesForAdmin } from "@/lib/portal/nc-data";
import { listAccreditationRecords } from "@/lib/portal/accreditation-record-data";
import { listApplicationRequests } from "@/lib/portal/application-requests-data";
import { getUserOrgName } from "@/lib/portal/admin-data";
import { getAuditLog } from "@/lib/portal/audit-log";
import { getBackendHealth } from "@/lib/backend-client";
import type { VerificationStatus } from "@/lib/verification-records";

type Tone = "warning" | "error" | "info";

interface QueueItem {
  key: string;
  icon: LucideIcon;
  title: string;
  description: string;
  count: number;
  tone: Tone;
  /** Where the whole queue is worked. Omitted when there is no page for it yet. */
  href?: string;
  cta?: string;
  /** The first few items, each linking straight to its own page. */
  preview?: { href: string; primary: string; secondary: string }[];
}

const TONE_CLASSES: Record<Tone, { pill: string; tile: string }> = {
  warning: { pill: "bg-warning-surface text-warning-text", tile: "bg-warning-surface text-warning-text" },
  error: { pill: "bg-error-surface text-error-text", tile: "bg-error-surface text-error-text" },
  info: { pill: "bg-info-surface text-info-text", tile: "bg-info-surface text-info-text" },
};

const LINK_FOCUS = "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1";

const REGISTER_ORDER: VerificationStatus[] = ["ACTIVE", "SUSPENDED", "WITHDRAWN", "CANCELLED", "EXPIRED"];

const DAY_MS = 24 * 60 * 60 * 1000;

function greeting(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/** "application_request.approved" -> "Application request approved" */
function describeAction(action: string): string {
  const text = action.replace(/[._]/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function daysUntil(isoDate: string, now: number): number {
  return Math.ceil((new Date(isoDate).getTime() - now) / DAY_MS);
}

export default async function AdminDashboardPage() {
  const nowDate = new Date();
  const now = nowDate.getTime();
  const today = nowDate.toISOString().slice(0, 10);
  const renewalCutoff = new Date(nowDate);
  renewalCutoff.setMonth(renewalCutoff.getMonth() + 6);
  const renewalCutoffDate = renewalCutoff.toISOString().slice(0, 10);

  const [session, applications, invoices, allAssignments, teamProposals, nonConformities, records, pendingRequests, auditLog, backendHealth] =
    await Promise.all([
      auth(),
      getAllApplications(),
      getAllInvoices(),
      getAllAssignments(),
      getAllProposalsForAdmin(),
      getAllNonConformitiesForAdmin(),
      listAccreditationRecords(),
      listApplicationRequests("PENDING"),
      getAuditLog(),
      getBackendHealth(),
    ]);

  const awaitingAction = applications
    .filter((a) => a.stage !== "ACCREDITED" && a.stage !== "DECLINED" && a.stage !== "DRAFT")
    .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
  const overdueAssessments = allAssignments.filter(
    (a) => (a.status === "IN_PROGRESS" || a.status === "ACCEPTED") && a.dueDate < today,
  );
  const decisionsPending = allAssignments.filter((a) => a.status === "REPORT_SUBMITTED");
  const reportsAwaitingReview = allAssignments.filter(
    (a) => a.reportStatus === "SUBMITTED" || a.reportStatus === "UNDER_REVIEW",
  );
  const ncsAwaitingReview = nonConformities.filter(
    (n) => n.status === "RESPONSE_SUBMITTED" || n.status === "UNDER_REVIEW",
  );
  const pendingTeamProposals = teamProposals.filter((p) => p.status === "SUBMITTED");
  const overdueInvoices = invoices.filter((i) => i.status === "ISSUED" && i.dueAt < today);

  const applicationPreview = awaitingAction.slice(0, 3);
  const applicationOrgNames = await Promise.all(applicationPreview.map((a) => getUserOrgName(a.applicantUserId)));

  const renewals = records
    .filter((r) => r.status === "ACTIVE" && r.expiryDate && r.expiryDate <= renewalCutoffDate)
    .sort((a, b) => (a.expiryDate ?? "").localeCompare(b.expiryDate ?? ""));

  const registerCounts = REGISTER_ORDER.map((status) => ({
    status,
    count: records.filter((r) => r.status === status).length,
  }));

  const recentActivity = [...auditLog].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, 6);

  // Ordered by how soon an admin should act: new intake first, then decisions, then follow-ups.
  const queue: QueueItem[] = [
    {
      key: "requests",
      icon: Inbox,
      title: "Application requests",
      description: "Organisations asking to become a certification body. Approve to create their account, or reject with a reason.",
      count: pendingRequests.length,
      tone: "warning",
      href: "/admin/application-requests",
      cta: "Review requests",
      preview: pendingRequests.slice(0, 3).map((r) => ({
        href: `/admin/application-requests/${r.id}`,
        primary: r.companyName,
        secondary: `${r.contactName} · ${r.createdAt.slice(0, 10)}`,
      })),
    },
    {
      key: "decisions",
      icon: ClipboardCheck,
      title: "Decisions pending",
      description: "Assessment reports are in and waiting for a recorded accreditation decision.",
      count: decisionsPending.length,
      tone: "warning",
      href: "/admin/assessments",
      cta: "Open assessments",
    },
    {
      key: "reports",
      icon: FileCheck,
      title: "Assessment reports to review",
      description: "Reports submitted by assessors that need your review.",
      count: reportsAwaitingReview.length,
      tone: "info",
      href: "/admin/assessments",
      cta: "Review reports",
    },
    {
      key: "ncs",
      icon: AlertTriangle,
      title: "Non-conformities to review",
      description: "Responses from certification bodies awaiting your review.",
      count: ncsAwaitingReview.length,
      tone: "info",
      href: "/admin/non-conformities",
      cta: "Review non-conformities",
    },
    {
      key: "proposals",
      icon: Users,
      title: "Assessor team proposals",
      description: "Proposed assessor teams waiting for approval.",
      count: pendingTeamProposals.length,
      tone: "info",
      href: "/admin/assessor-teams",
      cta: "Review proposals",
    },
    {
      key: "applications",
      icon: FileClock,
      title: "Applications in progress",
      description: "Open accreditation applications, oldest activity first.",
      count: awaitingAction.length,
      tone: "info",
      href: "/admin/applications",
      cta: "Open applications",
      preview: applicationPreview.map((a, i) => ({
        href: `/admin/applications/${a.id}`,
        primary: applicationOrgNames[i] ? `${applicationOrgNames[i]} · ${a.programName}` : a.programName,
        secondary: `${a.referenceNumber} · ${STAGE_LABEL[a.stage]}`,
      })),
    },
    {
      key: "overdue-assessments",
      icon: ShieldAlert,
      title: "Assessments overdue",
      description: "Past the due date and not yet reported.",
      count: overdueAssessments.length,
      tone: "error",
      href: "/admin/assessments",
      cta: "Open assessments",
      preview: overdueAssessments.slice(0, 3).map((a) => ({
        href: `/admin/assessments/${a.id}`,
        primary: `${a.organisationName} · ${a.programName}`,
        secondary: `Due ${a.dueDate}`,
      })),
    },
    {
      key: "overdue-payments",
      icon: Receipt,
      title: "Payments overdue",
      description: "Issued invoices past their due date. Follow up with the organisation.",
      count: overdueInvoices.length,
      tone: "error",
    },
  ];

  const active = queue.filter((q) => q.count > 0);
  const clear = queue.filter((q) => q.count === 0);
  const firstName = session?.user?.name?.split(" ")[0];
  const dateLabel = nowDate.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-text">
            {greeting(nowDate.getHours())}
            {firstName ? `, ${firstName}` : ""}
          </h1>
          <p className="mt-1 font-sans text-sm text-text-muted">
            {dateLabel} ·{" "}
            {active.length === 0
              ? "You're all caught up."
              : `${active.length} ${active.length === 1 ? "area needs" : "areas need"} your attention.`}
          </p>
        </div>
        <div className="flex items-center gap-2" title={backendHealth.ok ? undefined : backendHealth.error}>
          <StatusBadge
            tone={backendHealth.ok ? "success" : "error"}
            label={backendHealth.ok ? "Backend online" : "Backend unreachable"}
            size="sm"
          />
          {backendHealth.ok && <span className="font-mono text-xs text-text-muted">{backendHealth.latencyMs} ms</span>}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
        {/* Work queue */}
        <section aria-labelledby="queue-heading">
          <h2 id="queue-heading" className="font-sans text-sm font-semibold text-text">
            Needs your action
          </h2>

          {active.length === 0 ? (
            <div className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-surface px-5 py-6">
              <CheckCircle2 className="size-5 shrink-0 text-success-text" strokeWidth={1.5} aria-hidden />
              <p className="font-sans text-sm text-text">Nothing is waiting on you right now.</p>
            </div>
          ) : (
            <ul className="mt-3 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
              {active.map((item) => {
                const Icon = item.icon;
                const tone = TONE_CLASSES[item.tone];
                return (
                  <li key={item.key} className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-3 px-5 py-4 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
                    <span className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md ${tone.tile}`}>
                      <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-sans text-sm font-semibold text-text">{item.title}</h3>
                        <span className={`rounded-full px-2 py-0.5 font-mono text-xs font-semibold ${tone.pill}`}>{item.count}</span>
                      </div>
                      <p className="mt-0.5 font-sans text-sm text-text-muted">{item.description}</p>

                      {item.preview && item.preview.length > 0 && (
                        <ul className="mt-3 flex flex-col gap-1.5">
                          {item.preview.map((p) => (
                            <li key={p.href} className="min-w-0">
                              <Link
                                href={p.href}
                                className={`group flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-0.5 ${LINK_FOCUS}`}
                              >
                                <span className="break-words font-sans text-sm font-medium text-text group-hover:underline sm:truncate">
                                  {p.primary}
                                </span>
                                <span className="truncate font-mono text-xs text-text-muted">{p.secondary}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {item.href && (
                      <Link
                        href={item.href}
                        className={`col-start-2 inline-flex items-center gap-1 whitespace-nowrap font-sans text-sm font-medium text-primary hover:underline sm:col-start-3 sm:row-start-1 sm:mt-0.5 ${LINK_FOCUS}`}
                      >
                        {item.cta}
                        <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {clear.length > 0 && active.length > 0 && (
            <p className="mt-3 flex items-start gap-2 font-sans text-sm text-text-muted">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success-text" strokeWidth={1.75} aria-hidden />
              <span>All clear: {clear.map((c) => c.title.toLowerCase()).join(", ")}.</span>
            </p>
          )}
        </section>

        {/* Register, renewals, activity */}
        <aside className="flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
          <section className="px-5 py-4" aria-labelledby="register-heading">
            <div className="flex items-baseline justify-between gap-3">
              <h2 id="register-heading" className="font-sans text-sm font-semibold text-text">
                Accreditation register
              </h2>
              <Link href="/admin/accreditation-records" className={`font-sans text-xs font-medium text-primary hover:underline ${LINK_FOCUS}`}>
                View all
              </Link>
            </div>
            {records.length === 0 ? (
              <p className="mt-3 font-sans text-sm text-text-muted">No accreditation records yet. They appear once an application is accredited.</p>
            ) : (
              <ul className="mt-3 flex flex-col gap-2">
                {registerCounts.map(({ status, count }) => (
                  <li key={status} className="flex items-center justify-between gap-3">
                    <StatusBadge tone={VERIFICATION_STATUS[status].tone} label={VERIFICATION_STATUS[status].label} size="sm" />
                    <span className={`font-mono text-sm ${count === 0 ? "text-text-muted" : "font-semibold text-text"}`}>{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="px-5 py-4" aria-labelledby="renewals-heading">
            <h2 id="renewals-heading" className="font-sans text-sm font-semibold text-text">
              Renewals in the next 6 months
            </h2>
            {renewals.length === 0 ? (
              <p className="mt-3 font-sans text-sm text-text-muted">No accreditations expire in this window.</p>
            ) : (
              <ul className="mt-3 flex flex-col gap-2.5">
                {renewals.map((r) => {
                  const days = daysUntil(r.expiryDate!, now);
                  return (
                    <li key={r.reference}>
                      <Link href={`/admin/accreditation-records/${r.reference}`} className={`group block ${LINK_FOCUS}`}>
                        <span className="block truncate font-sans text-sm font-medium text-text group-hover:underline">{r.organisationName}</span>
                        <span className="font-mono text-xs text-text-muted">
                          {r.expiryDate} · {days <= 0 ? "expired" : `in ${days} ${days === 1 ? "day" : "days"}`}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section className="px-5 py-4" aria-labelledby="activity-heading">
            <div className="flex items-baseline justify-between gap-3">
              <h2 id="activity-heading" className="font-sans text-sm font-semibold text-text">
                Recent activity
              </h2>
              <Link href="/admin/audit-logs" className={`font-sans text-xs font-medium text-primary hover:underline ${LINK_FOCUS}`}>
                Audit log
              </Link>
            </div>
            {recentActivity.length === 0 ? (
              <p className="mt-3 font-sans text-sm text-text-muted">No activity recorded yet.</p>
            ) : (
              <ul className="mt-3 flex flex-col gap-3">
                {recentActivity.map((e) => (
                  <li key={e.id}>
                    <p className="font-sans text-sm text-text">{describeAction(e.action)}</p>
                    <p className="font-mono text-xs text-text-muted">
                      {e.actorName} · {e.timestamp.slice(0, 16).replace("T", " ")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
