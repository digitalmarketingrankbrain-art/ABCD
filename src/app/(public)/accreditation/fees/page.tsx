import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { FeesTable } from "@/components/accreditation/fees-table";
import { PROGRAMS } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Fees | Meridian Accreditation Board",
  description: "Fee structure and guidance by accreditation program.",
};

export default function FeesPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Accreditation", href: "/accreditation" }, { label: "Fees" }]}
        title="Fees"
        description="Indicative fee structure by program. Final fees are confirmed during application review and depend on scope and organisation size."
      />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <FeesTable programs={PROGRAMS} />
        <p className="mt-4 font-sans text-xs text-text-muted">
          [PLACEHOLDER — REQUIRES CONFIRMATION: real fee amounts and currency.]
        </p>
      </div>
    </>
  );
}
