import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, CheckCircle } from "lucide-react";

const STEPS = [
  { title: "Enquiry & Application", description: "Submit your organizational profile and define the technical scope under ISO/IEC criteria." },
  { title: "Documentary Evaluation", description: "SAAF technical experts audit your quality manual, calibration logs, and operational procedures." },
  { title: "On-Site Assessment", description: "Qualified assessors evaluate practical staff competence, equipment accuracy, and impartiality." },
  { title: "Decision & Registration", description: "The independent SAAF Accreditation Committee awards formal accreditation and issues QR-verified credentials." },
];

function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#062863] py-20 text-white saaf-gradient-hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
              The Accreditation Journey
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              A Transparent, Four-Stage Assessment Pathway
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-blue-100/80">
            Every SAAF accreditation decision is grounded in empirical evidence, technical competence, and unyielding peer review.
          </p>
        </Reveal>

        <ol className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delayMs={i * 60} className="relative">
              <div className="h-full rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-amber-400/50 hover:bg-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-amber-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <CheckCircle className="size-5 text-blue-300" />
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-blue-100/75">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 flex justify-start">
          <Link
            href="/accreditation/how-it-works"
            className={cn(
              buttonVariants({ variant: "accent", size: "lg" }),
              "bg-amber-500 font-bold text-slate-950 hover:bg-amber-400"
            )}
          >
            <span>View Comprehensive Accreditation Guidance</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export { HowItWorks };
