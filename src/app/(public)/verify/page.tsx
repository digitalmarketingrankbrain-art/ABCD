import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SearchForm, type SearchMode } from "@/components/verify/search-form";
import { ResultsList } from "@/components/verify/results-list";
import { EmptyState } from "@/components/ui/empty-state";
import { findByReference, searchRecords } from "@/lib/verification-records";

export const metadata: Metadata = {
  title: "Verify an Accreditation | Meridian Accreditation Board",
  description: "Search by accreditation number or organisation name to check a current, unambiguous status. No account required.",
};

/**
 * Status must reflect current data on every load — no long-TTL caching
 * (Phase 7/11). Data is a static placeholder today (Milestone 11 wires the
 * real database), but the page is built dynamic from the start so nothing
 * has to change structurally later.
 */
export const dynamic = "force-dynamic";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; mode?: string }>;
}) {
  const { q, mode: rawMode } = await searchParams;
  const mode: SearchMode = rawMode === "name" ? "name" : "number";
  const query = q?.trim() ?? "";

  // Exact number-mode match navigates straight to the detail page — Phase 7.
  if (query && mode === "number") {
    const exact = findByReference(query);
    if (exact) redirect(`/verify/${exact.reference}`);
  }

  const results = query ? searchRecords(query) : [];

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold text-text sm:text-4xl">
          Verify an Accreditation
        </h1>
        <p className="mt-3 font-sans text-base text-text-muted">
          Search by accreditation number or organisation name. No account required.
        </p>
      </div>

      <div className="mt-8">
        <SearchForm initialQuery={query} initialMode={mode} />
      </div>

      {query && results.length > 0 && (
        <div className="mt-10">
          <ResultsList results={results} />
        </div>
      )}

      {query && results.length === 0 && (
        <div className="mt-10">
          <EmptyState
            title={`No accreditation records matched "${query}".`}
            description="Check the spelling or accreditation number, or try searching by organisation name instead of number (or vice versa)."
            action={
              <p className="font-sans text-sm text-text-muted">
                If you were shown this as a valid accreditation and it isn&apos;t
                listed here, you can{" "}
                <Link href="/report-fraud" className="text-secondary hover:underline">
                  report it
                </Link>
                .
              </p>
            }
          />
        </div>
      )}
    </div>
  );
}
