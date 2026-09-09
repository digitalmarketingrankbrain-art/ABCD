import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Who We Are | Meridian Accreditation Board",
  description: "What Meridian Accreditation Board does and how it operates independently.",
};

export default function WhoWeArePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "About", href: "/about/who-we-are" }, { label: "Who We Are" }]}
        title="Who We Are"
      />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex flex-col gap-6 font-sans text-base leading-relaxed text-text">
          <p>
            Meridian Accreditation Board accredits testing and calibration
            laboratories, inspection bodies, and certification bodies against
            defined, published criteria.{" "}
            <span className="text-sm text-text-muted">
              [PLACEHOLDER — confirm real scope list]
            </span>
          </p>
          <p>
            We are structured to make our own accreditation decisions
            independently of commercial or organisational pressure — see our{" "}
            <Link href="/about/governance" className="text-secondary hover:underline">
              Governance
            </Link>{" "}
            and{" "}
            <Link href="/about/impartiality-and-ethics" className="text-secondary hover:underline">
              Impartiality &amp; Ethics
            </Link>{" "}
            pages for how that independence is maintained.
          </p>
          <p className="rounded-md border border-border bg-background-portal px-4 py-3 text-sm text-text-muted">
            [PLACEHOLDER — REQUIRES CONFIRMATION: legal entity name/status,
            jurisdiction of registration, year established — omitted rather
            than asserted until confirmed.]
          </p>
        </div>
      </div>
    </>
  );
}
