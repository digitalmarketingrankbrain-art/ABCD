import Link from "next/link";
import { ScrollText, ClipboardList, FileStack } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const LINKS = [
  { icon: ScrollText, label: "Policies", href: "/resources/policies" },
  { icon: ClipboardList, label: "Procedures", href: "/resources/procedures" },
  { icon: FileStack, label: "Forms", href: "/resources/forms" },
];

function TransparencySection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-2xl">
        <h2 className="font-sans text-2xl font-semibold text-text sm:text-3xl">
          Nothing important is behind a phone call
        </h2>
        <p className="mt-2 font-sans text-base text-text-muted">
          Our policies, procedures, and application documents are published
          and available to anyone — applicants, accredited organisations, and
          the public.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-1 items-center gap-3 rounded-lg border border-border bg-surface px-5 py-4 hover:border-secondary"
          >
            <link.icon className="size-5 text-secondary" strokeWidth={1.5} />
            <span className="font-sans text-sm font-medium text-text">{link.label}</span>
          </Link>
        ))}
      </div>
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
