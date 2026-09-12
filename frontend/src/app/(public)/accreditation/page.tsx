import Link from "next/link";
import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PROGRAMS } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Accreditation | SAAF",
  description: "What accreditation means, the programs we offer, and how the process works.",
};

export default function AccreditationOverviewPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Accreditation" }]}
        title="Accreditation"
        description="Accreditation is an independent, third-party check that an organisation meets a defined standard of competence — assessed against published criteria, not granted on request."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/accreditation/programs" className={cn(buttonVariants({ variant: "primary" }))}>
            View Programs
          </Link>
          <Link href="/accreditation/how-it-works" className={cn(buttonVariants({ variant: "secondary" }))}>
            Read the full process
          </Link>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-sans text-xl font-semibold text-text">Programs</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((program) => (
            <Card key={program.slug} interactive>
              <CardHeader>
                <FlaskConical className="mb-2 size-5 text-secondary" strokeWidth={1.5} />
                <CardTitle>{program.name}</CardTitle>
                <CardDescription>{program.scopeDescription}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link
                  href={`/accreditation/programs/${program.slug}`}
                  className="font-sans text-sm font-medium text-secondary hover:underline"
                >
                  View program →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 rounded-lg border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-sans text-sm font-semibold text-text">Fee guidance</p>
            <p className="font-sans text-sm text-text-muted">
              See program-specific fee structure and guidance.
            </p>
          </div>
          <Link href="/accreditation/fees" className="font-sans text-sm font-medium text-secondary hover:underline">
            View fees →
          </Link>
        </div>
      </div>
    </>
  );
}
