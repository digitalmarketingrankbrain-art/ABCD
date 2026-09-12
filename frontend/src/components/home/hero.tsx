import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { HeroMotif } from "./hero-motif";

const TRUST_BULLETS = ["Scheme Competence", "Impartial Decisions", "Reliable Certification"];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 lg:block">
        <HeroMotif className="h-[520px] w-[520px]" tone="dark" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p
            className="animate-fade-up flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent"
          >
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Independent Accreditation Body
          </p>
          <h1
            className="animate-fade-up mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-text-inverse sm:text-6xl"
            style={{ animationDelay: "60ms" }}
          >
            Accreditation that earns{" "}
            <span className="text-accent">market confidence.</span>
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-xl font-sans text-base text-text-inverse/75 sm:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            SAAF accredits testing and calibration laboratories, inspection bodies, and
            certification bodies against published criteria — through a process anyone can read
            and a result anyone can check.
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "180ms" }}
          >
            <Link href="/accreditation/programs" className={buttonVariants({ variant: "accent", size: "lg" })}>
              Explore accreditation programs
            </Link>
            <Link
              href="/verify"
              className={cn(buttonVariants({ variant: "inverse", size: "lg" }))}
            >
              Verify an Accreditation
            </Link>
          </div>
          <div
            className="animate-fade-up mt-10 flex flex-wrap gap-x-6 gap-y-2"
            style={{ animationDelay: "240ms" }}
          >
            {TRUST_BULLETS.map((label) => (
              <span
                key={label}
                className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.04em] text-text-inverse/80"
              >
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
