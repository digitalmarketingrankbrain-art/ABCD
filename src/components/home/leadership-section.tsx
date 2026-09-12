import Link from "next/link";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

function LeadershipSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Leadership
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-text sm:text-4xl">
            Built on integrity, driven by quality.
          </h2>
          <p className="mt-4 max-w-md font-sans text-base text-text-muted">
            SAAF is governed by an independent accreditation council drawing on decades of
            combined experience across certification, inspection, and conformity assessment
            throughout South Asia.
          </p>
          <Link
            href="/about/governance"
            className="mt-6 inline-block font-sans text-sm font-semibold text-secondary hover:underline"
          >
            Meet our governance council →
          </Link>
        </div>

        <div className="relative rounded-lg border-l-4 border-accent bg-surface p-8 shadow-[0_2px_16px_rgba(13,43,32,0.06)]">
          <Quote className="size-8 text-accent/30" strokeWidth={1.5} />
          <p className="mt-4 font-display text-2xl font-semibold leading-snug text-text">
            Trust is not claimed. It is built through competence, impartiality, and evidence.
          </p>
          <p className="mt-6 font-sans text-sm font-semibold text-text">Dr. Meera Raghunathan</p>
          <p className="font-sans text-sm text-text-muted">Chair, SAAF Governance Council</p>
        </div>
      </Reveal>
    </section>
  );
}

export { LeadershipSection };
