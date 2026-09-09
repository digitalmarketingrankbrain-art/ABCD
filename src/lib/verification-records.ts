export type VerificationStatus = "ACTIVE" | "SUSPENDED" | "WITHDRAWN" | "EXPIRED";

export interface VerificationRecord {
  /** Accreditation number — also the public URL slug at /verify/[reference]. */
  reference: string;
  organisationName: string;
  programSlug: string;
  programName: string;
  status: VerificationStatus;
  effectiveDate: string;
  expiryDate: string | null;
  lastSurveillanceDate: string | null;
  nextRenewalDate: string | null;
  certificateVisible: boolean;
}

/**
 * Plain-language explanation shown alongside every status per Phase 7 — a
 * bare status word is never shown without this. EXPIRED's copy is a
 * template filled with the record's own dates at render time.
 */
export const STATUS_EXPLANATION: Record<VerificationStatus, string> = {
  ACTIVE: "This is a current, active accreditation record.",
  SUSPENDED:
    "This accreditation is currently suspended. The organisation may not represent this accreditation as active during suspension. Contact us if you need details on the reason or expected duration.",
  WITHDRAWN:
    "This accreditation has been withdrawn and is no longer valid. Any current claim of this accreditation by this organisation should not be relied upon.",
  EXPIRED: "This accreditation has expired and was not renewed.",
};

/**
 * Placeholder verification records — Milestone 11+ replaces this with the
 * real AccreditationRecord/VerificationRecord tables from Phase 12. Covers
 * all 4 statuses, plus two similarly-named organisations to exercise the
 * ambiguous-name-search / results-list path.
 */
export const VERIFICATION_RECORDS: VerificationRecord[] = [
  {
    reference: "MAB-2026-00417",
    organisationName: "Northfield Testing Laboratories",
    programSlug: "testing-calibration-laboratories",
    programName: "Testing & Calibration Laboratories",
    status: "ACTIVE",
    effectiveDate: "2026-01-14",
    expiryDate: "2029-01-13",
    lastSurveillanceDate: "2026-07-02",
    nextRenewalDate: "2029-01-13",
    certificateVisible: true,
  },
  {
    reference: "MAB-2025-00298",
    organisationName: "Prairie Inspection Services",
    programSlug: "inspection-bodies",
    programName: "Inspection Bodies",
    status: "SUSPENDED",
    effectiveDate: "2025-06-02",
    expiryDate: "2028-06-01",
    lastSurveillanceDate: "2026-07-15",
    nextRenewalDate: "2028-06-01",
    certificateVisible: false,
  },
  {
    reference: "MAB-2022-00156",
    organisationName: "Prairie Inspection Services",
    programSlug: "product-certification-bodies",
    programName: "Product Certification Bodies",
    status: "WITHDRAWN",
    effectiveDate: "2022-03-10",
    expiryDate: null,
    lastSurveillanceDate: "2026-06-20",
    nextRenewalDate: null,
    certificateVisible: false,
  },
  {
    reference: "MAB-2020-00043",
    organisationName: "Coastal Certification Group",
    programSlug: "management-systems-certification-bodies",
    programName: "Management Systems Certification Bodies",
    status: "EXPIRED",
    effectiveDate: "2020-11-20",
    expiryDate: "2023-11-19",
    lastSurveillanceDate: "2023-05-11",
    nextRenewalDate: null,
    certificateVisible: false,
  },
  {
    reference: "MAB-2024-00512",
    organisationName: "Coastal Certification Laboratories",
    programSlug: "certification-bodies-for-persons",
    programName: "Certification Bodies for Persons",
    status: "ACTIVE",
    effectiveDate: "2024-05-02",
    expiryDate: "2027-05-01",
    lastSurveillanceDate: "2026-05-10",
    nextRenewalDate: "2027-05-01",
    certificateVisible: true,
  },
];

export function findByReference(reference: string): VerificationRecord | undefined {
  return VERIFICATION_RECORDS.find(
    (r) => r.reference.toLowerCase() === reference.toLowerCase(),
  );
}

export function searchRecords(query: string): VerificationRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return VERIFICATION_RECORDS.filter(
    (r) =>
      r.reference.toLowerCase().includes(q) ||
      r.organisationName.toLowerCase().includes(q),
  );
}
