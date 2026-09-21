export type VerificationStatus = "ACTIVE" | "SUSPENDED" | "WITHDRAWN" | "CANCELLED" | "EXPIRED";

export interface VerificationStatusHistoryEntry {
  from: VerificationStatus;
  to: VerificationStatus;
  reason: string;
  changedBy: string;
  changedAt: string;
}

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
  /**
   * Admin-controlled — unpublished renders NOT_FOUND on the public page
   * regardless of the underlying record existing (Phase 10/12).
   */
  isPublished: boolean;
  statusHistory: VerificationStatusHistoryEntry[];
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
  CANCELLED:
    "This accreditation has been cancelled and is no longer valid. Any current claim of this accreditation by this organisation should not be relied upon.",
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
    reference: "SAAF-2026-00417",
    organisationName: "Northfield Testing Laboratories",
    programSlug: "testing-calibration-laboratories",
    programName: "Testing & Calibration Laboratories",
    status: "ACTIVE",
    effectiveDate: "2026-01-14",
    expiryDate: "2029-01-13",
    lastSurveillanceDate: "2026-07-02",
    nextRenewalDate: "2029-01-13",
    certificateVisible: true,
    isPublished: true,
    statusHistory: [],
  },
  {
    reference: "SAAF-2025-00298",
    organisationName: "Prairie Inspection Services",
    programSlug: "inspection-bodies",
    programName: "Inspection Bodies",
    status: "SUSPENDED",
    effectiveDate: "2025-06-02",
    expiryDate: "2028-06-01",
    lastSurveillanceDate: "2026-07-15",
    nextRenewalDate: "2028-06-01",
    certificateVisible: false,
    isPublished: true,
    statusHistory: [
      {
        from: "ACTIVE",
        to: "SUSPENDED",
        reason: "Non-conformance identified during surveillance assessment; corrective action pending.",
        changedBy: "SAAF Admin",
        changedAt: "2026-07-18",
      },
    ],
  },
  {
    reference: "SAAF-2022-00156",
    organisationName: "Prairie Inspection Services",
    programSlug: "product-certification-bodies",
    programName: "Product Certification Bodies",
    status: "WITHDRAWN",
    effectiveDate: "2022-03-10",
    expiryDate: null,
    lastSurveillanceDate: "2026-06-20",
    nextRenewalDate: null,
    certificateVisible: false,
    isPublished: true,
    statusHistory: [
      {
        from: "SUSPENDED",
        to: "WITHDRAWN",
        reason: "Non-conformance from surveillance assessment was not resolved within the corrective action period.",
        changedBy: "SAAF Admin",
        changedAt: "2026-07-30",
      },
    ],
  },
  {
    reference: "SAAF-2020-00043",
    organisationName: "Coastal Certification Group",
    programSlug: "management-systems-certification-bodies",
    programName: "Management Systems Certification Bodies",
    status: "EXPIRED",
    effectiveDate: "2020-11-20",
    expiryDate: "2023-11-19",
    lastSurveillanceDate: "2023-05-11",
    nextRenewalDate: null,
    certificateVisible: false,
    isPublished: true,
    statusHistory: [],
  },
  {
    reference: "SAAF-2024-00512",
    organisationName: "Coastal Certification Laboratories",
    programSlug: "certification-bodies-for-persons",
    programName: "Certification Bodies for Persons",
    status: "ACTIVE",
    effectiveDate: "2024-05-02",
    expiryDate: "2027-05-01",
    lastSurveillanceDate: "2026-05-10",
    nextRenewalDate: "2027-05-01",
    certificateVisible: true,
    isPublished: true,
    statusHistory: [],
  },
];

/** Public-facing lookup — unpublished records are treated as not found. */
export function findByReference(reference: string): VerificationRecord | undefined {
  return VERIFICATION_RECORDS.find(
    (r) => r.reference.toLowerCase() === reference.toLowerCase() && r.isPublished,
  );
}

export function searchRecords(query: string): VerificationRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return VERIFICATION_RECORDS.filter(
    (r) =>
      r.isPublished &&
      (r.reference.toLowerCase().includes(q) || r.organisationName.toLowerCase().includes(q)),
  );
}

/** Admin-facing lookup — sees records regardless of publish state. */
export function findByReferenceAdmin(reference: string): VerificationRecord | undefined {
  return VERIFICATION_RECORDS.find((r) => r.reference.toLowerCase() === reference.toLowerCase());
}

export function updateVerificationStatus(
  reference: string,
  newStatus: VerificationStatus,
  reason: string,
  actorName: string,
) {
  const record = findByReferenceAdmin(reference);
  if (!record) return false;
  record.statusHistory.push({
    from: record.status,
    to: newStatus,
    reason,
    changedBy: actorName,
    changedAt: new Date().toISOString().slice(0, 10),
  });
  record.status = newStatus;
  return true;
}

export function setVerificationPublished(reference: string, published: boolean) {
  const record = findByReferenceAdmin(reference);
  if (!record) return false;
  record.isPublished = published;
  return true;
}

export function setCertificateVisible(reference: string, visible: boolean) {
  const record = findByReferenceAdmin(reference);
  if (!record) return false;
  record.certificateVisible = visible;
  return true;
}
