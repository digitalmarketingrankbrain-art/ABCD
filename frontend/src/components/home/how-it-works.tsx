import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  { title: "Enquiry & application", description: "We clarify your intended scope and establish the assessment pathway." },
  { title: "Document review", description: "Your systems, methods, and evidence are reviewed against applicable criteria." },
  { title: "Competence assessment", description: "Qualified assessors evaluate implementation, technical capability, and impartiality." },
  { title: "Decision & surveillance", description: "An independent decision is followed by planned ongoing oversight." },
];

function HowItWorks() {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              The Accreditation Journey
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-text-inverse sm:text-4xl">
              A clear, rigorous path to recognition.
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm text-text-inverse/70">
            Every decision is grounded in documented evidence, competent assessment, and
            independent review.
          </p>
        </Reveal>

        <ol className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-4 hidden h-px bg-text-inverse/20 lg:block"
          />
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delayMs={i * 40} className="relative">
              <span className="relative z-10 flex size-8 items-center justify-center rounded-full bg-primary">
                <span className="size-2.5 rounded-full bg-accent" aria-hidden="true" />
              </span>
              <p className="mt-4 font-sans text-xs font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 font-sans text-base font-semibold text-text-inverse">{step.title}</p>
              <p className="mt-1 font-sans text-sm text-text-inverse/70">{step.description}</p>
            </Reveal>
          ))}
        </ol>

        <Link
          href="/accreditation/how-it-works"
          className={cn(buttonVariants({ variant: "inverse" }), "mt-12 inline-flex")}
        >
          View the complete process
        </Link>
      </div>
    </section>
  );
}

export { HowItWorks };
