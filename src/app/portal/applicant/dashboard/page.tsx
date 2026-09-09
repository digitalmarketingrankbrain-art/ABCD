import Link from "next/link";
import {
  AlertCircle,
  FileText,
  Clock,
  FolderOpen,
  MessageSquare,
  Receipt,
  ShieldCheck,
} from "lucide-react";
import { auth } from "@/auth";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { StatusBadge, VERIFICATION_STATUS } from "@/components/ui/status-badge";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { STAGE_LABEL } from "@/lib/portal/applicant-data";
import { getApplicationsForUser, getInvoicesForUser } from "@/lib/portal/applicant-data";
import { findByReferenceAdmin } from "@/lib/verification-records";

export default async function ApplicantDashboardPage() {
  const session = await auth();
  const userId = session!.user.id;
  const apps = getApplicationsForUser(userId);
  const userInvoices = getInvoicesForUser(userId);
  const accreditation = findByReferenceAdmin("MAB-2026-00417"); // demo tie-in to the applicant's own org

  const requiredActions = [
    ...apps
      .filter((a) => a.infoRequested)
      .map((a) => ({
        text: `${a.programName} (${a.referenceNumber}): information requested`,
        href: `/portal/applicant/applications/${a.id}`,
      })),
    ...userInvoices
      .filter((i) => i.status === "ISSUED" || i.status === "OVERDUE")
      .map((i) => ({
        text: `Invoice ${i.invoiceNumber} is due ${i.dueAt}`,
        href: `/portal/applicant/invoices/${i.id}`,
      })),
  ];

  if (apps.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <FileText className="mx-auto size-8 text-text-muted" strokeWidth={1.5} />
        <h1 className="mt-3 font-display text-2xl font-semibold text-text">
          Start your first application
        </h1>
        <p className="mt-2 font-sans text-sm text-text-muted">
          You don&apos;t have any applications yet. Browse our accreditation
          programs to find the right scope and get started.
        </p>
        <Link href="/accreditation/programs" className="mt-6 inline-block">
          <Button variant="primary">Browse Programs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <h1 className="font-display text-2xl font-semibold text-text">Dashboard</h1>

      {requiredActions.length > 0 && (
        <div className="mt-6 flex flex-col gap-3">
          {requiredActions.map((action, i) => (
            <Alert key={i} tone="warning" title="Action needed">
              <Link href={action.href} className="hover:underline">
                {action.text} →
              </Link>
            </Alert>
          ))}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <FileText className="mb-1 size-5 text-secondary" strokeWidth={1.5} />
            <CardTitle>Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {apps.map((a) => (
              <p key={a.id} className="text-sm text-text-muted">
                {a.referenceNumber}: {STAGE_LABEL[a.stage]}
              </p>
            ))}
          </CardContent>
          <CardFooter>
            <Link href="/portal/applicant/applications" className="text-sm font-medium text-secondary hover:underline">
              View all →
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Clock className="mb-1 size-5 text-secondary" strokeWidth={1.5} />
            <CardTitle>Upcoming deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            {userInvoices.filter((i) => i.status === "ISSUED").length === 0 ? (
              <p className="text-sm text-text-muted">Nothing due right now.</p>
            ) : (
              userInvoices
                .filter((i) => i.status === "ISSUED")
                .map((i) => (
                  <p key={i.id} className="font-mono text-sm text-text-muted">
                    {i.dueAt} — {i.invoiceNumber}
                  </p>
                ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FolderOpen className="mb-1 size-5 text-secondary" strokeWidth={1.5} />
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-muted">
              {apps.flatMap((a) => a.documents).filter((d) => d.status === "NEEDS_REVISION").length} needing revision
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MessageSquare className="mb-1 size-5 text-secondary" strokeWidth={1.5} />
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-muted">Case-scoped to each application.</p>
          </CardContent>
          <CardFooter>
            <Link href="/portal/applicant/messages" className="text-sm font-medium text-secondary hover:underline">
              View all →
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Receipt className="mb-1 size-5 text-secondary" strokeWidth={1.5} />
            <CardTitle>Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-muted">
              {userInvoices.filter((i) => i.status === "ISSUED").reduce((s, i) => s + i.amount, 0) > 0
                ? `$${userInvoices.filter((i) => i.status === "ISSUED").reduce((s, i) => s + i.amount, 0).toLocaleString()} outstanding`
                : "Nothing outstanding."}
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/portal/applicant/invoices" className="text-sm font-medium text-secondary hover:underline">
              View all →
            </Link>
          </CardFooter>
        </Card>

        {accreditation && (
          <Card>
            <CardHeader>
              <ShieldCheck className="mb-1 size-5 text-secondary" strokeWidth={1.5} />
              <CardTitle>Accreditation status</CardTitle>
            </CardHeader>
            <CardContent>
              <StatusBadge
                tone={VERIFICATION_STATUS[accreditation.status].tone}
                label={VERIFICATION_STATUS[accreditation.status].label}
                size="sm"
              />
              {accreditation.nextRenewalDate && (
                <p className="mt-2 font-mono text-xs text-text-muted">
                  Next renewal: {accreditation.nextRenewalDate}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Link href="/portal/applicant/accreditation" className="text-sm font-medium text-secondary hover:underline">
                View details →
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>

      {requiredActions.length === 0 && (
        <p className="mt-8 flex items-center gap-2 font-sans text-sm text-text-muted">
          <AlertCircle className="size-4" strokeWidth={1.5} />
          No actions are required from you right now.
        </p>
      )}
    </div>
  );
}
