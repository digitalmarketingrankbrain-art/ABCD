import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { StatusBadge, type StatusTone } from "@/components/ui/status-badge";
import { Alert } from "@/components/ui/alert";
import { ApplicationTimeline } from "@/components/portal/application-timeline";
import { AdminApplicationActions } from "@/components/portal/admin-application-actions";
import { getApplicationByIdAdmin, STAGE_LABEL, type ApplicationStage } from "@/lib/portal/applicant-data";
import { getUserOrgName } from "@/lib/portal/admin-data";
import { getUsersByRoleSafe } from "@/lib/auth/store";
import { getAuditLogForTarget } from "@/lib/portal/audit-log";

const STAGE_TONE: Record<ApplicationStage, StatusTone> = {
  DRAFT: "neutral",
  SUBMITTED: "info",
  INITIAL_REVIEW: "info",
  DOCUMENT_REVIEW: "warning",
  ASSESSMENT: "info",
  DECISION: "warning",
  ACCREDITED: "success",
  DECLINED: "error",
};

export default async function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = getApplicationByIdAdmin(id);
  if (!application) notFound();

  const orgName = await getUserOrgName(application.applicantUserId);
  const assessorUsers = await getUsersByRoleSafe("ASSESSOR");
  const assessorOptions = assessorUsers.map((u) => u.name);
  const auditEntries = await getAuditLogForTarget("Application", application.id);

  return (
    <div className="px-6 py-8">
      <Breadcrumbs items={[{ label: "Applications", href: "/portal/admin/applications" }, { label: application.referenceNumber }]} />

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-2xl font-semibold text-text">{orgName}</h1>
        <StatusBadge tone={STAGE_TONE[application.stage]} label={STAGE_LABEL[application.stage]} />
      </div>
      <p className="font-sans text-sm text-text-muted">{application.programName} · {application.referenceNumber}</p>

      {application.infoRequested && (
        <Alert tone="warning" title="Information requested" className="mt-4">
          {application.infoRequestNote}
        </Alert>
      )}
      {application.decisionOutcome && (
        <Alert tone={application.decisionOutcome === "ACCREDIT" ? "success" : "error"} title={`Decision: ${application.decisionOutcome}`} className="mt-4">
          {application.decisionRationale} — recorded by {application.decidedBy}
        </Alert>
      )}

      <div className="mt-6">
        <AdminApplicationActions
          applicationId={application.id}
          stage={application.stage}
          infoRequested={application.infoRequested}
          assessorOptions={assessorOptions}
        />
      </div>

      <div className="mt-8 overflow-x-auto">
        <ApplicationTimeline stage={application.stage} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 font-sans text-sm font-semibold text-text">Documents</h2>
          <ul className="flex flex-col gap-2">
            {application.documents.map((d) => (
              <li key={d.id} className="flex items-center justify-between rounded-md border border-border bg-surface px-4 py-2">
                <span className="font-sans text-sm text-text">{d.name}</span>
                <span className="font-mono text-xs text-text-muted">{d.status}</span>
              </li>
            ))}
          </ul>

          <h2 className="mb-3 mt-6 font-sans text-sm font-semibold text-text">Stage history</h2>
          <ul className="flex flex-col gap-2">
            {application.stageHistory.map((h, i) => (
              <li key={i} className="font-sans text-sm text-text-muted">
                <span className="font-mono text-xs">{h.changedAt}</span> — {STAGE_LABEL[h.stage]}
                {h.note && <span className="text-xs"> ({h.note})</span>}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-sans text-sm font-semibold text-text">Audit log for this record</h2>
          {auditEntries.length === 0 ? (
            <p className="font-sans text-sm text-text-muted">No admin actions recorded yet.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {auditEntries.map((e) => (
                <li key={e.id} className="rounded-md border border-border bg-surface px-4 py-2">
                  <p className="font-mono text-xs text-text-muted">{e.timestamp}</p>
                  <p className="font-sans text-sm text-text">{e.actorName} ({e.actorRole}) — {e.action}</p>
                  {e.reason && <p className="font-sans text-xs text-text-muted">{e.reason}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
