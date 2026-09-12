import { Accordion } from "@/components/ui/accordion";
import { countryName } from "@/lib/countries";
import type { CabDetails, SchemeEntry } from "@/lib/portal/cab-info-data";

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="font-sans text-sm text-text-muted">{label}</span>
      <span className="text-right font-sans text-sm text-text">{value || "—"}</span>
    </div>
  );
}

function SchemesPanel({ title, schemes, emptyLabel }: { title: string; schemes: SchemeEntry[]; emptyLabel: string }) {
  return (
    <div className="rounded-lg border border-border">
      <div className="border-b border-border bg-background-portal px-4 py-3">
        <h3 className="font-sans text-sm font-semibold text-text">{title}</h3>
      </div>
      <div className="px-4">
        {schemes.length === 0 ? (
          <p className="py-6 text-center font-sans text-sm text-text-muted">{emptyLabel}</p>
        ) : (
          <Accordion
            items={schemes.map((s) => ({
              id: s.slug,
              question: s.name,
              answer: s.standardReference ?? "No standard reference on file.",
            }))}
          />
        )}
      </div>
    </div>
  );
}

function CountriesPanel({ title, codes, emptyLabel }: { title: string; codes: string[]; emptyLabel: string }) {
  return (
    <div className="rounded-lg border border-border">
      <div className="border-b border-border bg-background-portal px-4 py-3">
        <h3 className="font-sans text-sm font-semibold text-text">{title}</h3>
      </div>
      <div className="px-4 py-3">
        {codes.length === 0 ? (
          <p className="py-6 text-center font-sans text-sm text-text-muted">{emptyLabel}</p>
        ) : (
          <p className="font-sans text-sm text-text">{codes.map(countryName).sort().join(", ")}</p>
        )}
      </div>
    </div>
  );
}

function CabOverview({
  details,
  appliedSchemes,
  awardedSchemes,
  appliedCountries,
  approvedCountries,
}: {
  details: CabDetails;
  appliedSchemes: SchemeEntry[];
  awardedSchemes: SchemeEntry[];
  appliedCountries: string[];
  approvedCountries: string[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border">
          <div className="border-b border-border bg-background-portal px-4 py-3">
            <h3 className="font-sans text-sm font-semibold text-text">CAB Details</h3>
          </div>
          <div className="divide-y divide-border px-4">
            <DetailRow label="Full Name" value={[details.contactFirstName, details.contactLastName].filter(Boolean).join(" ")} />
            <DetailRow label="Company" value={details.displayName} />
            <DetailRow label="CAB ID" value={details.cabNumber} />
            <DetailRow label="Company Short Code" value={details.shortCode} />
            <DetailRow label="Contact Phone" value={details.contactPhone} />
            <DetailRow
              label="Website"
              value={
                details.website ? (
                  <a href={details.website} target="_blank" rel="noreferrer" className="text-secondary hover:underline">
                    {details.website}
                  </a>
                ) : null
              }
            />
            <DetailRow label="Country" value={details.country} />
            <DetailRow label="Head Office" value={[details.address, details.city, details.state, details.country].filter(Boolean).join(", ")} />
            <DetailRow label="Director" value={details.director} />
            <DetailRow label="Certification Manager" value={details.certificationManager} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <SchemesPanel title="Applied Schemes and Technical Categories" schemes={appliedSchemes} emptyLabel="No applied schemes." />
          <SchemesPanel title="Awarded Schemes and Technical Categories" schemes={awardedSchemes} emptyLabel="No Awarded Schemes" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CountriesPanel title="Applied Country" codes={appliedCountries} emptyLabel="No applied countries." />
        <CountriesPanel title="Approved Country" codes={approvedCountries} emptyLabel="No Approved Countries" />
      </div>
    </div>
  );
}

export { CabOverview };
