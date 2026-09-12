import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { HeroMotif } from "./hero-motif";

const POINTS = [
  {
    title: "A documented claim",
    description: "Every accreditation starts with a specific, published scope — not a general seal of approval.",
  },
  {
    title: "Independent assessment",
    description: "Qualified assessors with no stake in the outcome evaluate competence against named criteria.",
  },
  {
    title: "A verifiable record",
    description: "The result is published and checkable by anyone, for as long as it remains valid.",
  },
];

function WhyItMatters() {
  return (
    <section className="bg-background">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div className="relative flex min-h-[280px] items-end overflow-hidden rounded-lg bg-primary p-8">
          <div className="pointer-events-none absolute -right-16 -top-16">
            <HeroMotif className="h-72 w-72" tone="dark" />
          </div>
          <div className="relative">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-accent">
              One Framework · Regional Relevance
            </p>
            <p className="mt-3 font-display text-2xl font-bold leading-snug text-text-inverse">
              Reliable conformity assessment helps quality move confidently across South Asia.
            </p>
          </div>
        </div>

        <div>
          <p className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Why Accreditation Matters
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-text sm:text-4xl">
            Independent evidence of competence.
          </h2>
          <p className="mt-4 font-sans text-base text-text-muted">
            Accreditation gives organisations, regulators, and the public confidence that a
            competence claim is technically sound and impartially assessed — not simply asserted.
          </p>
          <ul className="mt-6 flex flex-col gap-5">
            {POINTS.map((point) => (
              <li key={point.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <Check className="size-3.5 text-accent-hover" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="font-sans text-sm font-semibold text-text">{point.title}</p>
                  <p className="mt-0.5 font-sans text-sm text-text-muted">{point.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/about/who-we-are"
            className="mt-6 inline-block font-sans text-sm font-semibold text-secondary hover:underline"
          >
            Discover the SAAF approach →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export { WhyItMatters };
