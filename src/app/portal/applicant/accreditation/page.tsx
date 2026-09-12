import Link from "next/link";
import { StatusBadge, VERIFICATION_STATUS } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { STATUS_EXPLANATION, findByReferenceAdmin } from "@/lib/verification-records";

/**
 * Uses the identical status badge system as the public /verify page —
 * an applicant should recognise their own status as the same thing the
 * public sees, not a different private truth (Phase 8).
 */
export default async function AccreditationPage() {
  const accreditation = findByReferenceAdmin("SAAF-2026-00417");

  return (
    <div className="px-6 py-8">
      <h1 className="font-display text-2xl font-semibold text-text">Accreditation</h1>

      {!accreditation ? (
        <div className="mt-6">
          <EmptyState title="No active accreditation yet." description="This will appear here once an application is accredited." />
        </div>
      ) : (
        <div className="mt-6 max-w-lg rounded-lg border border-border bg-surface p-6">
          <StatusBadge
            tone={VERIFICATION_STATUS[accreditation.status].tone}
            label={VERIFICATION_STATUS[accreditation.status].label}
            size="lg"
          />
          <p className="mt-2 font-sans text-sm text-text-muted">{STATUS_EXPLANATION[accreditation.status]}</p>
          <h2 className="mt-4 font-sans text-lg font-semibold text-text">{accreditation.organisationName}</h2>
          <p className="font-mono text-sm text-text-muted">{accreditation.reference}</p>

          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="font-sans text-sm text-text-muted">Program</span>
              <span className="font-sans text-sm text-text">{accreditation.programName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-sans text-sm text-text-muted">Effective</span>
              <span className="font-mono text-sm text-text">{accreditation.effectiveDate}</span>
            </div>
            {accreditation.nextRenewalDate && (
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-text-muted">Next renewal due</span>
                <span className="font-mono text-sm text-text">{accreditation.nextRenewalDate}</span>
              </div>
            )}
          </div>

          <Link
            href={`/verify/${accreditation.reference}`}
            className="mt-4 inline-block font-sans text-sm text-secondary hover:underline"
          >
            View public verification page →
          </Link>
        </div>
      )}
    </div>
  );
}
