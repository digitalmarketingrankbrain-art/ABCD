export type AssignmentStatus =
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
  | "IN_PROGRESS"
  | "REPORT_SUBMITTED"
  | "COMPLETED";

export const ASSIGNMENT_STATUS_LABEL: Record<AssignmentStatus, string> = {
  PENDING: "Pending response",
  ACCEPTED: "Accepted",
  DECLINED: "Declined",
  IN_PROGRESS: "In progress",
  REPORT_SUBMITTED: "Report submitted",
  COMPLETED: "Completed",
};

export type FindingStatus = "CONFORMS" | "NON_CONFORMANCE" | "OBSERVATION" | "NOT_APPLICABLE" | "UNANSWERED";

export const FINDING_STATUS_LABEL: Record<FindingStatus, string> = {
  CONFORMS: "Conforms",
  NON_CONFORMANCE: "Non-conformance",
  OBSERVATION: "Observation",
  NOT_APPLICABLE: "Not applicable",
  UNANSWERED: "Not yet assessed",
};

export interface AssessmentCriterion {
  id: string;
  requirementText: string;
  category: string;
}

export interface Finding {
  criterionId: string;
  status: FindingStatus;
  notes: string;
  severity: "MINOR" | "MAJOR" | null;
  evidenceNote: string | null;
}

export interface Assignment {
  id: string;
  assessorUserId: string;
  applicationReference: string;
  organisationName: string;
  programSlug: string;
  programName: string;
  status: AssignmentStatus;
  assignedAt: string;
  dueDate: string;
  respondedAt: string | null;
  declineReason: string | null;
  criteria: AssessmentCriterion[];
  findings: Record<string, Finding>;
  reportSubmittedAt: string | null;
  /** Documents shared into this assignment's context — read-only for the assessor. */
  sharedDocuments: { name: string; filename: string }[];
  /** Links to the corresponding applicant-side Application id, when one exists in the placeholder data — lets the assessor and applicant see the same case-scoped thread. */
  linkedApplicationId: string | null;
}

export interface CompetenceEntry {
  id: string;
  assessorUserId: string;
  programSlug: string;
  programName: string;
  qualifyingBasis: string;
  dateQualified: string;
  expiryDate: string | null;
  status: "CURRENT" | "EXPIRING_SOON" | "EXPIRED";
}

export interface AvailabilityBlackout {
  id: string;
  assessorUserId: string;
  startDate: string;
  endDate: string;
  note: string;
}

const CRITERIA_TESTING_LABS: AssessmentCriterion[] = [
  { id: "c1", category: "Management System", requirementText: "Documented quality manual reflects current procedures." },
  { id: "c2", category: "Management System", requirementText: "Internal audits conducted at planned intervals." },
  { id: "c3", category: "Technical Competence", requirementText: "Staff competence records are current and complete." },
  { id: "c4", category: "Technical Competence", requirementText: "Calibration procedures are documented and followed." },
  { id: "c5", category: "Equipment", requirementText: "Equipment calibration records are traceable to national standards." },
  { id: "c6", category: "Equipment", requirementText: "Equipment maintenance schedule is followed and documented." },
];

export const assignments: Assignment[] = [
  {
    id: "asg-1",
    assessorUserId: "user-assessor-demo",
    applicationReference: "MAB-APP-2026-0091",
    organisationName: "Northfield Testing Laboratories",
    programSlug: "testing-calibration-laboratories",
    programName: "Testing & Calibration Laboratories",
    status: "IN_PROGRESS",
    assignedAt: "2026-06-01",
    dueDate: "2026-09-30",
    respondedAt: "2026-06-02",
    declineReason: null,
    criteria: CRITERIA_TESTING_LABS,
    findings: {
      c1: { criterionId: "c1", status: "NON_CONFORMANCE", notes: "Quality Manual references an outdated calibration procedure (Section 4.2).", severity: "MINOR", evidenceNote: "Quality Manual v1, Section 4.2." },
      c2: { criterionId: "c2", status: "CONFORMS", notes: "Internal audit log shows quarterly audits as scheduled.", severity: null, evidenceNote: null },
      c3: { criterionId: "c3", status: "CONFORMS", notes: "Staff competence records reviewed and current.", severity: null, evidenceNote: null },
    },
    reportSubmittedAt: null,
    sharedDocuments: [
      { name: "Application Form", filename: "application-form.pdf" },
      { name: "Quality Manual", filename: "quality-manual-v1.pdf" },
      { name: "Scope of Accreditation Request", filename: "scope-request.pdf" },
    ],
    linkedApplicationId: "app-1",
  },
  {
    id: "asg-2",
    assessorUserId: "user-assessor-demo",
    applicationReference: "MAB-APP-2026-0134",
    organisationName: "Summit Product Testing",
    programSlug: "product-certification-bodies",
    programName: "Product Certification Bodies",
    status: "PENDING",
    assignedAt: "2026-08-25",
    dueDate: "2026-11-15",
    respondedAt: null,
    declineReason: null,
    criteria: [],
    findings: {},
    reportSubmittedAt: null,
    sharedDocuments: [{ name: "Application Form", filename: "application-form.pdf" }],
    linkedApplicationId: null,
  },
  {
    id: "asg-3",
    assessorUserId: "user-assessor-demo",
    applicationReference: "MAB-APP-2025-0067",
    organisationName: "Delta Calibration Services",
    programSlug: "testing-calibration-laboratories",
    programName: "Testing & Calibration Laboratories",
    status: "REPORT_SUBMITTED",
    assignedAt: "2026-04-10",
    dueDate: "2026-07-01",
    respondedAt: "2026-04-11",
    declineReason: null,
    criteria: CRITERIA_TESTING_LABS,
    findings: Object.fromEntries(
      CRITERIA_TESTING_LABS.map((c) => [
        c.id,
        { criterionId: c.id, status: "CONFORMS" as FindingStatus, notes: "Meets requirement.", severity: null, evidenceNote: null },
      ]),
    ),
    reportSubmittedAt: "2026-06-28",
    sharedDocuments: [{ name: "Application Form", filename: "application-form.pdf" }],
    linkedApplicationId: null,
  },
];

export const competenceEntries: CompetenceEntry[] = [
  {
    id: "comp-1",
    assessorUserId: "user-assessor-demo",
    programSlug: "testing-calibration-laboratories",
    programName: "Testing & Calibration Laboratories",
    qualifyingBasis: "10 years laboratory quality management experience; internal auditor certification.",
    dateQualified: "2022-03-01",
    expiryDate: "2027-03-01",
    status: "CURRENT",
  },
  {
    id: "comp-2",
    assessorUserId: "user-assessor-demo",
    programSlug: "product-certification-bodies",
    programName: "Product Certification Bodies",
    qualifyingBasis: "Product safety engineering background; certification body auditor training.",
    dateQualified: "2021-09-15",
    expiryDate: "2026-09-15",
    status: "EXPIRING_SOON",
  },
];

export const availabilityBlackouts: AvailabilityBlackout[] = [
  {
    id: "blk-1",
    assessorUserId: "user-assessor-demo",
    startDate: "2026-10-05",
    endDate: "2026-10-19",
    note: "Annual leave",
  },
];

// --- Accessors ---

export function getAssignmentsForUser(userId: string): Assignment[] {
  return assignments.filter((a) => a.assessorUserId === userId);
}

export function getAssignmentById(id: string, userId: string): Assignment | undefined {
  return assignments.find((a) => a.id === id && a.assessorUserId === userId);
}

export function getCompetenceForUser(userId: string): CompetenceEntry[] {
  return competenceEntries.filter((c) => c.assessorUserId === userId);
}

export function getBlackoutsForUser(userId: string): AvailabilityBlackout[] {
  return availabilityBlackouts.filter((b) => b.assessorUserId === userId);
}

export function addBlackout(userId: string, startDate: string, endDate: string, note: string) {
  availabilityBlackouts.push({
    id: `blk-${Date.now()}`,
    assessorUserId: userId,
    startDate,
    endDate,
    note,
  });
}

export function removeBlackout(id: string, userId: string) {
  const idx = availabilityBlackouts.findIndex((b) => b.id === id && b.assessorUserId === userId);
  if (idx !== -1) availabilityBlackouts.splice(idx, 1);
}

export function respondToAssignment(
  id: string,
  userId: string,
  decision: "ACCEPTED" | "DECLINED",
  declineReason?: string,
) {
  const assignment = getAssignmentById(id, userId);
  if (!assignment || assignment.status !== "PENDING") return false;
  assignment.status = decision;
  assignment.respondedAt = new Date().toISOString().slice(0, 10);
  if (decision === "DECLINED") assignment.declineReason = declineReason ?? null;
  if (decision === "ACCEPTED" && assignment.criteria.length === 0) {
    assignment.criteria = CRITERIA_TESTING_LABS;
  }
  return true;
}

export function updateFinding(
  assignmentId: string,
  userId: string,
  criterionId: string,
  update: Partial<Omit<Finding, "criterionId">>,
) {
  const assignment = getAssignmentById(assignmentId, userId);
  if (!assignment) return false;
  const existing = assignment.findings[criterionId];
  assignment.findings[criterionId] = {
    criterionId,
    status: update.status ?? existing?.status ?? "UNANSWERED",
    notes: update.notes ?? existing?.notes ?? "",
    severity: update.severity !== undefined ? update.severity : existing?.severity ?? null,
    evidenceNote: update.evidenceNote !== undefined ? update.evidenceNote : existing?.evidenceNote ?? null,
  };
  if (assignment.status === "ACCEPTED") assignment.status = "IN_PROGRESS";
  return true;
}

export function submitAssignmentReport(assignmentId: string, userId: string) {
  const assignment = getAssignmentById(assignmentId, userId);
  if (!assignment) return false;
  assignment.status = "REPORT_SUBMITTED";
  assignment.reportSubmittedAt = new Date().toISOString().slice(0, 10);
  return true;
}
