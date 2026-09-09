import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { StatusBadge } from "@/components/ui/status-badge";
import { getOrganisationByUserId } from "@/lib/portal/admin-data";
import { getAllApplications, STAGE_LABEL } from "@/lib/portal/applicant-data";
import { VERIFICATION_RECORDS } from "@/lib/verification-records";
import { VERIFICATION_STATUS } from "@/components/ui/status-badge";

export default async function AdminOrganisationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const org = getOrganisationByUserId(id);
  if (!org) notFound();

  const applications = getAllApplications().filter((a) => a.applicantUserId === id);
  const records = VERIFICATION_RECORDS.filter((r) => r.organisationName === org.organisationName);

  return (
    <div className="px-6 py-8">
      <Breadcrumbs items={[{ label: "Organisations", href: "/portal/admin/organisations" }, { label: org.organisationName }]} />
      <h1 className="mt-3 font-display text-2xl font-semibold text-text">{org.organisationName}</h1>
      <p className="font-sans text-sm text-text-muted">{org.contactName} · {org.contactEmail}</p>

      <div className="mt-8">
        <h2 className="mb-3 font-sans text-sm font-semibold text-text">Applications</h2>
        {applications.length === 0 ? (
          <p className="font-sans text-sm text-text-muted">None.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {applications.map((a) => (
              <li key={a.id}>
                <Link href={`/portal/admin/applications/${a.id}`} className="text-sm text-secondary hover:underline">
                  {a.referenceNumber} — {a.programName} ({STAGE_LABEL[a.stage]})
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 font-sans text-sm font-semibold text-text">Accreditation records</h2>
        {records.length === 0 ? (
          <p className="font-sans text-sm text-text-muted">None.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {records.map((r) => (
              <li key={r.reference} className="flex items-center gap-3">
                <Link href={`/portal/admin/accreditation-records/${r.reference}`} className="text-sm text-secondary hover:underline">
                  {r.reference} — {r.programName}
                </Link>
                <StatusBadge tone={VERIFICATION_STATUS[r.status].tone} label={VERIFICATION_STATUS[r.status].label} size="sm" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
