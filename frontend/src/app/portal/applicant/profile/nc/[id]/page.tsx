import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { StatusBadge, type StatusTone } from "@/components/ui/status-badge";
import { getNonConformityById, type NcSeverity } from "@/lib/portal/nc-data";

const CATEGORY_TONE: Record<NcSeverity, StatusTone> = { MAJOR: "error", MINOR: "warning", OBSERVATION: "info" };
const CATEGORY_LABEL: Record<NcSeverity, string> = { MAJOR: "Major", MINOR: "Minor", OBSERVATION: "Observation" };

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-3 last:border-b-0">
      <span className="font-sans text-sm text-text-muted">{label}</span>
      <span className="max-w-md text-right font-sans text-sm text-text">{value || "—"}</span>
    </div>
  );
}

export default async function NcDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const nc = await getNonConformityById(id, session!.user.id);
  if (!nc) notFound();

  return (
    <div className="px-6 py-8">
      <Link href="/portal/applicant/profile" className="flex items-center gap-1.5 font-sans text-sm text-secondary hover:underline">
        <ArrowLeft className="size-3.5" strokeWidth={1.75} /> Back to Profile
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-text">NC {nc.ncNumber}</h1>
          <p className="font-mono text-sm text-text-muted">Assessment {nc.assessmentReference ?? "—"}</p>
        </div>
        <div className="flex gap-2">
          <StatusBadge tone={CATEGORY_TONE[nc.category]} label={CATEGORY_LABEL[nc.category]} />
          <StatusBadge tone={nc.status === "OPEN" ? "warning" : "success"} label={nc.status === "OPEN" ? "Open" : "Closed"} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-border p-6 lg:col-span-2">
          <h2 className="font-sans text-sm font-semibold text-text">Finding</h2>
          <p className="mt-2 font-sans text-sm text-text">{nc.finding}</p>

          <h2 className="mt-6 font-sans text-sm font-semibold text-text">Corrective Action</h2>
          <p className="mt-2 font-sans text-sm text-text">{nc.correctiveAction ?? "Not yet submitted."}</p>
        </div>

        <div className="rounded-lg border border-border p-6">
          <Row label="Standard" value={nc.standardReference} />
          <Row label="Progress Stage" value={nc.progressStage} />
          <Row label="Raised Date" value={nc.raisedAt} />
          <Row label="Raised By" value={nc.raisedByName} />
          <Row label="Team Lead" value={nc.teamLeadName} />
          <Row label="Closed Date" value={nc.closedAt} />
        </div>
      </div>
    </div>
  );
}
