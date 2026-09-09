import { PageHeader } from "@/components/layout/page-header";

export interface LegalSection {
  heading: string;
}

/** Structural placeholder for legal pages — real body text requires legal review (Phase 6). */
function LegalPage({
  title,
  breadcrumbLabel,
  sections,
}: {
  title: string;
  breadcrumbLabel: string;
  sections: LegalSection[];
}) {
  return (
    <PageHeader
      breadcrumbs={[{ label: breadcrumbLabel }]}
      title={title}
      meta="Last updated: [PLACEHOLDER]"
    >
      <div className="mt-8 flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-sans text-base font-semibold text-text">{section.heading}</h2>
            <p className="mt-1 font-sans text-sm text-text-muted">
              [PLACEHOLDER — REQUIRES CONFIRMATION: real legal text. This section requires legal review before launch.]
            </p>
          </div>
        ))}
      </div>
    </PageHeader>
  );
}

export { LegalPage };
