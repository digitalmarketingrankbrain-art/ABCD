import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { PROGRAMS } from "@/lib/programs";

function ProgramsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-2xl">
        <h2 className="font-sans text-2xl font-semibold text-text sm:text-3xl">
          What we accredit
        </h2>
        <p className="mt-2 font-sans text-base text-text-muted">
          Each program is defined by a specific scope and assessed against
          named criteria — not a general seal of approval. Explore the
          programs below to see what&apos;s covered, what&apos;s required, and
          how to apply.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
}

export { ProgramsSection };
