import Link from "next/link";
import { ScrollText, ClipboardList, FileStack } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const LINKS = [
  { icon: ScrollText, label: "Policies", href: "/resources/policies" },
  { icon: ClipboardList, label: "Procedures", href: "/resources/procedures" },
  { icon: FileStack, label: "Forms", href: "/resources/forms" },
];

function TransparencySection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Reveal className="max-w-2xl">
        <p className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          Transparency
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-text sm:text-4xl">
          Nothing important is behind a phone call.
        </h2>
        <p className="mt-3 font-sans text-base text-text-muted">
          Our policies, procedures, and application documents are published
          and available to anyone: applicants, accredited organisations, and
          the public.
        </p>
      </Reveal>
      <Reveal
        delayMs={80}
        className="mt-8 flex flex-col divide-y divide-border rounded-lg border border-border bg-surface sm:flex-row sm:divide-x sm:divide-y-0"
      >
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex flex-1 items-center gap-3 px-5 py-4 hover:bg-background"
          >
            <link.icon className="size-5 text-secondary" strokeWidth={1.5} />
            <span className="font-sans text-sm font-medium text-text group-hover:text-secondary">
              {link.label}
            </span>
          </Link>
        ))}
      </Reveal>
      <Link
        href="/resources"
        className={cn(buttonVariants({ variant: "secondary" }), "mt-8 inline-flex")}
      >
        Browse resources
      </Link>
    </section>
  );
}

export { TransparencySection };
