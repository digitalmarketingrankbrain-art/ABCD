import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SaafLogo } from "@/components/ui/saaf-logo";
import { ShieldCheck, ArrowRight } from "lucide-react";

function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t-4 border-amber-500 bg-[#062863] py-20 text-white saaf-gradient-hero">
      <Reveal className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-10 rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-2xl lg:flex-row lg:p-12">
          <div className="flex flex-col items-start gap-4">
            <SaafLogo variant="horizontal" size="lg" lightMode={true} />
            <h2 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
              Demonstrate Technical Competence Across South Asia
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-blue-100/90 sm:text-base">
              Join leading testing laboratories, inspection bodies, and certification authorities accredited under the SAAF oversight framework.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-4 sm:flex-row w-full lg:w-auto">
            <Link
              href="/accreditation/apply"
              className={cn(
                buttonVariants({ variant: "accent", size: "lg" }),
                "bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 justify-center shadow-xl"
              )}
            >
              <span>Apply for Accreditation</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/verify"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "border-white/40 text-white hover:bg-white/10 justify-center"
              )}
            >
              <ShieldCheck className="size-4 text-amber-400" />
              <span>Verify Register</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export { FinalCta };
