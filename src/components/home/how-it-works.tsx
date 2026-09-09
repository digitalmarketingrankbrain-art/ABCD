import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const STEPS = [
  { title: "Apply", description: "Submit your application and supporting documents." },
  { title: "Review", description: "We confirm your application is complete and eligible." },
  { title: "Assessment", description: "An assigned assessor evaluates your organisation against the relevant scope." },
  { title: "Decision", description: "An authorised decision-maker reviews the assessment and makes a determination, independent of the assessor's recommendation." },
  { title: "Accreditation", description: "Once granted, your accreditation is published and publicly verifiable." },
  { title: "Ongoing", description: "Accreditation is maintained through surveillance and renewal, not granted once and forgotten." },
];

function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-sans text-2xl font-semibold text-text sm:text-3xl">
        A process you can follow, start to finish
      </h2>

      <ol className="mt-10 flex flex-col gap-8 lg:flex-row lg:gap-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="relative flex flex-1 gap-4 lg:flex-col lg:gap-3">
            <div className="flex flex-col items-center lg:w-full">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-xs font-medium text-text-inverse">
                {i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="mt-1 w-px flex-1 bg-border lg:mt-0 lg:h-px lg:w-full lg:flex-none lg:translate-y-4"
                />
              )}
            </div>
            <div className="pb-2 lg:text-center">
              <p className="font-sans text-sm font-semibold text-text">{step.title}</p>
              <p className="mt-1 font-sans text-xs text-text-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <Link
        href="/accreditation/how-it-works"
        className={cn(buttonVariants({ variant: "secondary" }), "mt-10 inline-flex")}
      >
        Read the full process
      </Link>
    </section>
  );
}

export { HowItWorks };
