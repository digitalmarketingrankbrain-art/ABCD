export interface Program {
  slug: string;
  name: string;
  scopeDescription: string;
  standardReference: string;
}

/**
 * Placeholder accreditation programs per Phase 2 Section 1.1 — representative,
 * industry-standard categories, swappable once real scopes are confirmed.
 */
export const PROGRAMS: Program[] = [
  {
    slug: "testing-calibration-laboratories",
    name: "Testing & Calibration Laboratories",
    scopeDescription:
      "Covers physical, chemical, and dimensional testing and calibration activities.",
    standardReference: "[PLACEHOLDER — REQUIRES CONFIRMATION: standard referenced]",
  },
  {
    slug: "inspection-bodies",
    name: "Inspection Bodies",
    scopeDescription:
      "Covers inspection of products, processes, installations, and services against defined criteria.",
    standardReference: "[PLACEHOLDER — REQUIRES CONFIRMATION: standard referenced]",
  },
  {
    slug: "management-systems-certification-bodies",
    name: "Management Systems Certification Bodies",
    scopeDescription:
      "Covers certification of quality, environmental, and other management systems.",
    standardReference: "[PLACEHOLDER — REQUIRES CONFIRMATION: standard referenced]",
  },
  {
    slug: "product-certification-bodies",
    name: "Product Certification Bodies",
    scopeDescription:
      "Covers certification that specific products meet defined technical requirements.",
    standardReference: "[PLACEHOLDER — REQUIRES CONFIRMATION: standard referenced]",
  },
  {
    slug: "certification-bodies-for-persons",
    name: "Certification Bodies for Persons",
    scopeDescription:
      "Covers certification of individuals' competence against defined criteria.",
    standardReference: "[PLACEHOLDER — REQUIRES CONFIRMATION: standard referenced]",
  },
];
