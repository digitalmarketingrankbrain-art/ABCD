import { FileQuestion, SearchCheck, BadgeCheck, ArrowRight } from "lucide-react";

const NODES = [
  { icon: FileQuestion, label: "Claim" },
  { icon: SearchCheck, label: "Independent Assessment" },
  { icon: BadgeCheck, label: "Verifiable Record" },
];

function WhyItMatters() {
  return (
    <section className="bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-sans text-2xl font-semibold text-text sm:text-3xl">
            Why accreditation matters
          </h2>
          <p className="mt-4 font-sans text-base text-text-muted">
            Accreditation is an independent check that an organisation meets a
            defined standard of competence — assessed by a third party with no
            stake in the outcome. It exists so that a client, regulator, or
            member of the public doesn&apos;t have to take a competence claim
            on faith; they can rely on a documented, verifiable assessment
            instead.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-background px-6 py-10 sm:flex-row sm:justify-between">
          {NODES.map((node, i) => (
            <div key={node.label} className="flex items-center gap-4 sm:contents">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex size-14 items-center justify-center rounded-full border border-primary/30 bg-surface">
                  <node.icon className="size-6 text-primary" strokeWidth={1.5} />
                </div>
                <p className="font-sans text-xs font-medium text-text">{node.label}</p>
              </div>
              {i < NODES.length - 1 && (
                <ArrowRight
                  className="size-4 shrink-0 rotate-90 text-text-muted sm:rotate-0"
                  strokeWidth={1.5}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { WhyItMatters };
