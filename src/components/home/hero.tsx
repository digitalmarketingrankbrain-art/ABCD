import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { HeroMotif } from "./hero-motif";

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[55%_45%]">
        <div>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.02em] text-accent">
            Meridian Accreditation Board
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-text sm:text-5xl">
            Accreditation you can verify, not just trust.
          </h1>
          <p className="mt-4 max-w-xl font-sans text-base text-text-muted sm:text-lg">
            We accredit testing and calibration laboratories, inspection
            bodies, and certification bodies against defined, published
            criteria — through a process you can read in full, and a result
            anyone can check in seconds.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/verify" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Verify an Accreditation
            </Link>
            <Link
              href="/accreditation/programs"
              className={cn(buttonVariants({ variant: "tertiary", size: "lg" }), "justify-start sm:justify-center")}
            >
              Explore Accreditation Programs →
            </Link>
          </div>
          {/* Mobile: smaller decorative strip below the CTAs, text loads first — Phase 5 */}
          <HeroMotif className="mx-auto mt-10 h-40 w-40 lg:hidden" />
        </div>
        <div className="hidden justify-self-center lg:block">
          <HeroMotif className="h-80 w-80" />
        </div>
      </div>
    </section>
  );
}

export { Hero };
