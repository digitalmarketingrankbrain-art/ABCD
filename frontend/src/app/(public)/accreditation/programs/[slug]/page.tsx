import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PROGRAMS } from "@/lib/programs";

export function generateStaticParams() {
  return PROGRAMS.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);
  if (!program) return {};
  return {
    title: `${program.name} | SAAF`,
    description: program.scopeDescription,
  };
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "eligibility", label: "Eligibility" },
  { id: "criteria", label: "Criteria" },
  { id: "process", label: "Process" },
  { id: "fees", label: "Fees" },
  { id: "documents", label: "Documents" },
];

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);
  if (!program) notFound();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Accreditation", href: "/accreditation" },
          { label: "Programs", href: "/accreditation/programs" },
          { label: program.name },
        ]}
        title={program.name}
        description={program.scopeDescription}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/accreditation/apply" className={cn(buttonVariants({ variant: "primary" }))}>
            Apply for this program
          </Link>
          <Link href="/resources/forms" className={cn(buttonVariants({ variant: "secondary" }))}>
            Download program guide
          </Link>
        </div>
      </PageHeader>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[200px_1fr]">
        <nav className="hidden lg:block">
          <ul className="sticky top-24 flex flex-col gap-1 border-l border-border pl-4">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="block py-1 font-sans text-sm text-text-muted hover:text-secondary">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-10">
          <section id="overview" className="scroll-mt-24">
            <h2 className="font-sans text-lg font-semibold text-text">Overview</h2>
            <p className="mt-2 font-sans text-base text-text-muted">{program.scopeDescription}</p>
          </section>
          <section id="eligibility" className="scroll-mt-24">
            <h2 className="font-sans text-lg font-semibold text-text">Eligibility</h2>
            <p className="mt-2 font-sans text-base text-text-muted">
              Detailed eligibility criteria for this program will be published here once finalized. In
              the meantime, please{" "}
              <Link href="/contact" className="text-secondary hover:underline">
                contact us
              </Link>{" "}
              with any questions about whether your organisation qualifies.
            </p>
          </section>
          <section id="criteria" className="scroll-mt-24">
            <h2 className="font-sans text-lg font-semibold text-text">Standard / Criteria Referenced</h2>
            <p className="mt-2 font-sans text-base text-text-muted">{program.standardReference}</p>
          </section>
          <section id="process" className="scroll-mt-24">
            <h2 className="font-sans text-lg font-semibold text-text">Process &amp; Timeline</h2>
            <p className="mt-2 font-sans text-base text-text-muted">
              This program follows the standard accreditation process.{" "}
              <Link href="/accreditation/how-it-works" className="text-secondary hover:underline">
                Read the full process
              </Link>
              .
            </p>
          </section>
          <section id="fees" className="scroll-mt-24">
            <h2 className="font-sans text-lg font-semibold text-text">Fees</h2>
            <p className="mt-2 font-sans text-base text-text-muted">
              See{" "}
              <Link href="/accreditation/fees" className="text-secondary hover:underline">
                Fee guidance
              </Link>{" "}
              for this program&apos;s fee structure.
            </p>
          </section>
          <section id="documents" className="scroll-mt-24">
            <h2 className="font-sans text-lg font-semibold text-text">Required Documents</h2>
            <p className="mt-2 font-sans text-base text-text-muted">
              The full required-document checklist for this program is confirmed once you start an
              application. A summary will be published here once finalized.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
