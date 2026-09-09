import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Accessibility Statement | Meridian Accreditation Board",
  description: "Our accessibility conformance target and known limitations.",
};

/**
 * Names a real conformance target and known limitations honestly, rather
 * than an unqualified "fully accessible" claim (Phase 6) — kept as its own
 * page (not the generic LegalPage template) so this framing is explicit.
 */
export default function AccessibilityStatementPage() {
  return (
    <PageHeader
      breadcrumbs={[{ label: "Accessibility Statement" }]}
      title="Accessibility Statement"
      meta="Last updated: [PLACEHOLDER]"
    >
      <div className="mt-8 flex flex-col gap-6">
        <div>
          <h2 className="font-sans text-base font-semibold text-text">Conformance target</h2>
          <p className="mt-1 font-sans text-sm text-text-muted">
            We aim to meet WCAG 2.1 Level AA across this site and portal.
          </p>
        </div>
        <div>
          <h2 className="font-sans text-base font-semibold text-text">Known limitations</h2>
          <p className="mt-1 font-sans text-sm text-text-muted">
            [PLACEHOLDER — REQUIRES CONFIRMATION: any known limitations, to be
            listed honestly once a full accessibility audit is complete —
            see Phase 14 Testing.]
          </p>
        </div>
        <div>
          <h2 className="font-sans text-base font-semibold text-text">Contact us about accessibility</h2>
          <p className="mt-1 font-sans text-sm text-text-muted">
            [PLACEHOLDER — REQUIRES CONFIRMATION: contact channel for accessibility issues.]
          </p>
        </div>
      </div>
    </PageHeader>
  );
}
