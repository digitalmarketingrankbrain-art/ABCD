import Link from "next/link";
import { auth } from "@/auth";
import { BadgeCheck, Plus } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/ui/status-badge";
import { findUserById, getUserOrganisationId } from "@/lib/auth/store";
import {
  getCabDetails,
  getAppliedSchemes,
  getAwardedSchemes,
  getLocations,
  getCountryLists,
  getTeamMembers,
} from "@/lib/portal/cab-info-data";
import { getInvoicesForUser } from "@/lib/portal/applicant-data";
import { getAssessmentsForUser } from "@/lib/portal/cb-assessments-data";
import { getNonConformitiesForUser } from "@/lib/portal/nc-data";
import { getDocumentsForOwner } from "@/lib/portal/document-data";
import { getReferenceDocuments } from "@/lib/portal/reference-documents";
import { CabOverview } from "@/components/portal/cab-overview";
import { CabInfoTabs } from "@/components/portal/cab-info-tabs";
import { InvoicesTable } from "@/components/portal/invoices-table";
import { CbAssessmentsTable } from "@/components/portal/cb-assessments-table";
import { NcTable } from "@/components/portal/nc-table";
import { CbDocumentsTabs, type OrgDocumentEntry } from "@/components/portal/cb-documents-tabs";

export default async function ProfilePage() {
  const session = await auth();
  const userId = session!.user.id;

  const [user, organisationId, details, appliedSchemes, awardedSchemes, locations, countryLists, teamMembers, invoices, assessments, nonConformities, referenceDocuments] =
    await Promise.all([
      findUserById(userId),
      getUserOrganisationId(userId),
      getCabDetails(userId),
      getAppliedSchemes(userId),
      getAwardedSchemes(userId),
      getLocations(userId),
      getCountryLists(userId),
      getTeamMembers(userId),
      getInvoicesForUser(userId),
      getAssessmentsForUser(userId),
      getNonConformitiesForUser(userId),
      getReferenceDocuments(),
    ]);

  const orgDocumentRows = organisationId ? await getDocumentsForOwner("ORGANISATION", organisationId) : [];
  const orgDocuments: OrgDocumentEntry[] = orgDocumentRows
    .filter((d) => d.currentVersion)
    .map((d) => ({
      id: d.id,
      filename: d.currentVersion!.filename,
      sizeBytes: d.currentVersion!.sizeBytes,
      uploadedAt: d.currentVersion!.uploadedAt.toISOString().slice(0, 10),
      currentVersionId: d.currentVersion!.id,
    }));

  const isApproved = awardedSchemes.length > 0;

  return (
    <div className="px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-surface p-6">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold text-text">{details.displayName}</h1>
            {isApproved && <BadgeCheck className="size-5 text-accent" strokeWidth={1.75} />}
          </div>
          <p className="mt-1 font-sans text-sm text-text-muted">{user?.email}</p>
          <div className="mt-3">
            <StatusBadge
              tone={isApproved ? "success" : "info"}
              label={isApproved ? "Approved" : "Pending Approval"}
              size="sm"
            />
          </div>
        </div>

        <div>
          <Link
            href="/portal/applicant/profile/add-certificate"
            className="inline-flex items-center gap-2 rounded-md bg-[#041f19] px-4 py-2.5 text-sm font-bold text-amber-400 hover:bg-[#08352a] transition-all shadow-xs border border-[#c9a24a]/40"
          >
            <Plus className="size-4" /> Add Certification
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <Tabs
          queryParam="tab"
          items={[
            {
              value: "overview",
              label: "Overview",
              content: (
                <CabOverview
                  details={details}
                  appliedSchemes={appliedSchemes}
                  awardedSchemes={awardedSchemes}
                  appliedCountries={countryLists.applied}
                  approvedCountries={countryLists.approved}
                />
              ),
            },
            {
              value: "documents",
              label: "Documents",
              content: <CbDocumentsTabs orgDocuments={orgDocuments} referenceDocuments={referenceDocuments} />,
            },
            {
              value: "cab-info",
              label: "CAB Info",
              content: (
                <CabInfoTabs
                  details={details}
                  locations={locations}
                  appliedCountries={countryLists.applied}
                  approvedCountries={countryLists.approved}
                  teamMembers={teamMembers}
                />
              ),
            },
            {
              value: "invoices",
              label: "Invoices",
              content: <InvoicesTable invoices={invoices} />,
            },
            {
              value: "assessments",
              label: "Assessments",
              content: <CbAssessmentsTable items={assessments} basePath="/portal/applicant/profile/assessments" />,
            },
            {
              value: "nc",
              label: "NC",
              content: <NcTable items={nonConformities} basePath="/portal/applicant/profile/nc" />,
            },
          ]}
        />
      </div>
    </div>
  );
}
