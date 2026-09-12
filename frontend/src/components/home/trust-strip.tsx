import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const ITEMS = [
  {
    number: "01",
    label: "Apply for accreditation",
    description: "Prepare your organisation and begin",
    href: "/accreditation/apply",
  },
  {
    number: "02",
    label: "Explore accreditation programs",
    description: "See the scopes SAAF accredits against",
    href: "/accreditation/programs",
  },
  {
    number: "03",
    label: "Verify an accreditation",
    description: "Check the current status of any record",
    href: "/verify",
  },
  {
    number: "04",
    label: "Become an assessor",
    description: "Bring your expertise to SAAF",
    href: "/assessors/become-an-assessor",
  },
];

function TrustStrip() {
  return (
    <section className="bg-background">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 py-10 sm:grid-cols-2">
        {ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-surface px-6 py-5 transition hover:border-secondary hover:shadow-[0_2px_12px_rgba(13,43,32,0.08)]"
          >
            <div className="flex items-start gap-4">
              <span className="font-sans text-sm font-semibold text-accent">{item.number}</span>
              <div>
                <p className="font-sans text-base font-semibold text-text">{item.label}</p>
                <p className="mt-0.5 font-sans text-sm text-text-muted">{item.description}</p>
              </div>
            </div>
            <ArrowRight className="size-4 shrink-0 text-text-muted transition group-hover:translate-x-0.5 group-hover:text-secondary" strokeWidth={1.75} />
          </Link>
        ))}
      </Reveal>
    </section>
  );
}

export { TrustStrip };
