import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

function FinalCta() {
  return (
    <section className="border-t border-accent/30 bg-primary text-text-inverse">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-16 sm:flex-row sm:items-center">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Start a Conversation
          </p>
          <h2 className="mt-3 max-w-lg font-display text-3xl font-bold leading-tight sm:text-4xl">
            Ready to demonstrate your technical competence?
          </h2>
          <p className="mt-3 max-w-md font-sans text-base text-text-inverse/75">
            Talk to us about the right accreditation pathway for your organisation.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link href="/accreditation/apply" className={buttonVariants({ variant: "accent", size: "lg" })}>
            Begin your accreditation
          </Link>
          <Link href="/verify" className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}>
            Verify an Accreditation
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export { FinalCta };
