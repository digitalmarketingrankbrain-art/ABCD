"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Visually distinct from surrounding marketing sections — this is a tool,
 * not copy (Phase 5). Field does NOT autofocus here; only /verify itself
 * autofocuses, so the homepage doesn't hijack scroll/focus.
 */
function VerificationSection() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/verify${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  }

  return (
    <section className="border-y border-border-portal bg-background-portal">
      <Reveal className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h2 className="font-sans text-2xl font-semibold text-text sm:text-3xl">
          Check any accreditation, instantly
        </h2>
        <p className="mt-3 font-sans text-base text-text-muted">
          Seen an accreditation claim on a certificate, website, or report?
          Search by accreditation number or organisation name and get a
          current, unambiguous status.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
              strokeWidth={1.75}
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Accreditation number or organisation name"
              aria-label="Accreditation number or organisation name"
              className="pl-9"
            />
          </div>
          <Button type="submit" variant="primary">
            Verify now
          </Button>
        </form>
        <p className="mt-2 font-sans text-xs text-text-muted">No account required.</p>
      </Reveal>
    </section>
  );
}

export { VerificationSection };
