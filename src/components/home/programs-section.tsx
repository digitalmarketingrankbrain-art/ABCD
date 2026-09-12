import Link from "next/link";
import { FlaskConical, ClipboardCheck, ShieldCheck, PackageCheck, UserCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PROGRAMS } from "@/lib/programs";

const PROGRAM_ICONS: Record<string, LucideIcon> = {
  "testing-calibration-laboratories": FlaskConical,
  "inspection-bodies": ClipboardCheck,
  "management-systems-certification-bodies": ShieldCheck,
  "product-certification-bodies": PackageCheck,
  "certification-bodies-for-persons": UserCheck,
};

function ProgramsSection() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              Our Accreditation Services
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-text sm:text-4xl">
              Technical confidence across critical domains.
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm text-text-muted">
            We assess the organisations that assess others — strengthening the integrity of
            certificates, inspections, and claims across South Asia.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((program, i) => {
            const Icon = PROGRAM_ICONS[program.slug] ?? FlaskConical;
            return (
              <Reveal key={program.slug} delayMs={i * 40} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-border bg-background p-6 transition duration-150 hover:-translate-y-0.5 hover:border-secondary hover:shadow-[0_2px_12px_rgba(13,43,32,0.08)]">
                  <div className="flex items-start justify-between">
                    <span className="font-sans text-xs font-semibold uppercase tracking-[0.04em] text-text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex size-9 items-center justify-center rounded-md bg-primary/5">
                      <Icon className="size-4 text-primary" strokeWidth={1.75} />
                    </span>
                  </div>
                  <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.04em] text-secondary">
                    {program.standardReference}
                  </p>
                  <h3 className="mt-1 font-sans text-lg font-semibold text-text">{program.name}</h3>
                  <p className="mt-2 flex-1 font-sans text-sm text-text-muted">
                    {program.scopeDescription}
                  </p>
                  <Link
                    href={`/accreditation/programs/${program.slug}`}
                    className="mt-4 font-sans text-sm font-semibold text-secondary hover:underline"
                  >
                    Explore this service →
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { ProgramsSection };
