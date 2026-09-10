import Link from "next/link";
import { FileClock, ClipboardCheck, ShieldAlert, Receipt } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getAllApplications, getAllInvoices, STAGE_LABEL } from "@/lib/portal/applicant-data";
import { getAllAssignments } from "@/lib/portal/assessor-data";
import { VERIFICATION_RECORDS } from "@/lib/verification-records";

const today = new Date().toISOString().slice(0, 10);

export default async function AdminDashboardPage() {
  const applications = await getAllApplications();
  const invoices = await getAllInvoices();
  const allAssignments = await getAllAssignments();

  const awaitingAction = applications
    .filter((a) => a.stage !== "ACCREDITED" && a.stage !== "DECLINED" && a.stage !== "DRAFT")
    .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));

  const overdueAssessments = allAssignments.filter(
    (a) => (a.status === "IN_PROGRESS" || a.status === "ACCEPTED") && a.dueDate < today,
  );

  const decisionsPending = allAssignments.filter((a) => a.status === "REPORT_SUBMITTED");

  const expiringAccreditations = VERIFICATION_RECORDS.filter(
    (r) => r.status === "ACTIVE" && r.nextRenewalDate && r.nextRenewalDate < "2029-06-01",
  );

  const overdueInvoices = invoices.filter((i) => i.status === "ISSUED" && i.dueAt < today);

  return (
    <div className="px-6 py-8">
      <h1 className="font-display text-2xl font-semibold text-text">Admin Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <FileClock className="mb-1 size-5 text-secondary" strokeWidth={1.5} />
            <CardTitle>Applications awaiting action</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl text-text">{awaitingAction.length}</p>
            <ul className="mt-2 flex flex-col gap-1">
              {awaitingAction.slice(0, 3).map((a) => (
                <li key={a.id}>
                  <Link href={`/portal/admin/applications/${a.id}`} className="text-xs text-secondary hover:underline">
                    {a.referenceNumber} — {STAGE_LABEL[a.stage]}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <ClipboardCheck className="mb-1 size-5 text-secondary" strokeWidth={1.5} />
            <CardTitle>Decisions pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl text-text">{decisionsPending.length}</p>
            <p className="mt-2 text-xs text-text-muted">Assessment reports submitted, awaiting a recorded decision.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <ShieldAlert className="mb-1 size-5 text-secondary" strokeWidth={1.5} />
            <CardTitle>Assessments overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl text-text">{overdueAssessments.length}</p>
            <p className="mt-2 text-xs text-text-muted">Past due date, not yet reported.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Receipt className="mb-1 size-5 text-secondary" strokeWidth={1.5} />
            <CardTitle>Payments overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl text-text">{overdueInvoices.length}</p>
          </CardContent>
        </Card>
      </div>

      {expiringAccreditations.length > 0 && (
        <div className="mt-6">
          <h2 className="font-sans text-sm font-semibold text-text">Accreditations approaching renewal</h2>
          <ul className="mt-2 flex flex-col gap-1">
            {expiringAccreditations.map((r) => (
              <li key={r.reference}>
                <Link href={`/portal/admin/accreditation-records/${r.reference}`} className="text-sm text-secondary hover:underline">
                  {r.organisationName} — renewal due {r.nextRenewalDate}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
