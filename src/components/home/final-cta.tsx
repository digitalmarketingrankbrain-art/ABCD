import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function FinalCta() {
  return (
    <section className="bg-primary text-text-inverse">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-16 text-center">
        <h2 className="font-sans text-2xl font-semibold sm:text-3xl">Ready to start?</h2>
        <p className="max-w-xl font-sans text-base text-text-inverse/80">
          Whether you&apos;re applying for accreditation or verifying someone
          else&apos;s, everything you need is here.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Link href="/accreditation/apply" className={buttonVariants({ variant: "inverse", size: "lg" })}>
            Start an Application
          </Link>
          <Link href="/verify" className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}>
            Verify an Accreditation
          </Link>
        </div>
      </div>
    </section>
  );
}

export { FinalCta };
