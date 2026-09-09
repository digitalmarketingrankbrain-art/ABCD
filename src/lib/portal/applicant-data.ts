export type ApplicationStage =
  | "DRAFT"
  | "SUBMITTED"
  | "INITIAL_REVIEW"
  | "DOCUMENT_REVIEW"
  | "ASSESSMENT"
  | "DECISION"
  | "ACCREDITED"
  | "DECLINED";

export const APPLICATION_STAGE_ORDER: ApplicationStage[] = [
  "DRAFT",
  "SUBMITTED",
  "INITIAL_REVIEW",
  "DOCUMENT_REVIEW",
  "ASSESSMENT",
  "DECISION",
  "ACCREDITED",
];

export const STAGE_LABEL: Record<ApplicationStage, string> = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  INITIAL_REVIEW: "Initial Review",
  DOCUMENT_REVIEW: "Document Review",
  ASSESSMENT: "Assessment",
  DECISION: "Decision",
  ACCREDITED: "Accredited",
  DECLINED: "Declined",
};

export type DocumentStatus = "NOT_UPLOADED" | "UPLOADED" | "UNDER_REVIEW" | "APPROVED" | "NEEDS_REVISION";

export interface DocumentVersion {
  version: number;
  filename: string;
  uploadedAt: string;
  reviewComment?: string;
}

export interface RequiredDocument {
  id: string;
  name: string;
  mandatory: boolean;
  status: DocumentStatus;
  versions: DocumentVersion[];
}

export interface StageHistoryEntry {
  stage: ApplicationStage;
  changedAt: string;
  note?: string;
}

export interface Message {
  id: string;
  applicationId: string;
  senderName: string;
  senderRole: "APPLICANT" | "ADMIN" | "ASSESSOR";
  body: string;
  createdAt: string;
}

export interface Application {
  id: string;
  referenceNumber: string;
  applicantUserId: string;
  programSlug: string;
  programName: string;
  stage: ApplicationStage;
  infoRequested: boolean;
  infoRequestNote?: string;
  submittedAt: string | null;
  updatedAt: string;
  assessorName?: string;
  documents: RequiredDocument[];
  stageHistory: StageHistoryEntry[];
}

export type InvoiceStatus = "DRAFT" | "ISSUED" | "PAID" | "OVERDUE" | "VOID";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  applicantUserId: string;
  applicationId: string | null;
  description: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  issuedAt: string;
  dueAt: string;
  paidAt: string | null;
}

/**
 * Placeholder, in-memory, per-demo-user data — stands in for the real
 * Application/Document/Invoice/Message tables until Milestone 11. Only the
 * seeded demo applicant (user-applicant-demo) has data; a freshly registered
 * applicant correctly sees the Phase 8 "brand new applicant" empty state.
 */
export const applications: Application[] = [
  {
    id: "app-1",
    referenceNumber: "MAB-APP-2026-0091",
    applicantUserId: "user-applicant-demo",
    programSlug: "testing-calibration-laboratories",
    programName: "Testing & Calibration Laboratories",
    stage: "ASSESSMENT",
    infoRequested: true,
    infoRequestNote:
      "Your uploaded Quality Manual references an outdated calibration procedure. Please upload a revised version reflecting your current procedure.",
    submittedAt: "2026-03-02",
    updatedAt: "2026-08-20",
    assessorName: "Sam Assessor",
    documents: [
      {
        id: "doc-1",
        name: "Application Form",
        mandatory: true,
        status: "APPROVED",
        versions: [{ version: 1, filename: "application-form.pdf", uploadedAt: "2026-03-01" }],
      },
      {
        id: "doc-2",
        name: "Quality Manual",
        mandatory: true,
        status: "NEEDS_REVISION",
        versions: [
          {
            version: 1,
            filename: "quality-manual-v1.pdf",
            uploadedAt: "2026-03-01",
            reviewComment: "References an outdated calibration procedure (Section 4.2). Please update and re-upload.",
          },
        ],
      },
      {
        id: "doc-3",
        name: "Scope of Accreditation Request",
        mandatory: true,
        status: "APPROVED",
        versions: [{ version: 1, filename: "scope-request.pdf", uploadedAt: "2026-03-01" }],
      },
      {
        id: "doc-4",
        name: "Staff Competence Records",
        mandatory: false,
        status: "NOT_UPLOADED",
        versions: [],
      },
    ],
    stageHistory: [
      { stage: "DRAFT", changedAt: "2026-02-20" },
      { stage: "SUBMITTED", changedAt: "2026-03-02" },
      { stage: "INITIAL_REVIEW", changedAt: "2026-03-10" },
      { stage: "DOCUMENT_REVIEW", changedAt: "2026-03-18", note: "Revision requested on Quality Manual." },
      { stage: "ASSESSMENT", changedAt: "2026-06-01" },
    ],
  },
  {
    id: "app-2",
    referenceNumber: "MAB-APP-2026-0102",
    applicantUserId: "user-applicant-demo",
    programSlug: "inspection-bodies",
    programName: "Inspection Bodies",
    stage: "DRAFT",
    infoRequested: false,
    submittedAt: null,
    updatedAt: "2026-08-28",
    documents: [
      {
        id: "doc-5",
        name: "Application Form",
        mandatory: true,
        status: "NOT_UPLOADED",
        versions: [],
      },
      {
        id: "doc-6",
        name: "Scope of Accreditation Request",
        mandatory: true,
        status: "NOT_UPLOADED",
        versions: [],
      },
    ],
    stageHistory: [{ stage: "DRAFT", changedAt: "2026-08-28" }],
  },
];

export const invoices: Invoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "MAB-INV-2026-0143",
    applicantUserId: "user-applicant-demo",
    applicationId: "app-1",
    description: "Application fee — Testing & Calibration Laboratories",
    amount: 2500,
    currency: "USD",
    status: "PAID",
    issuedAt: "2026-03-02",
    dueAt: "2026-03-16",
    paidAt: "2026-03-09",
  },
  {
    id: "inv-2",
    invoiceNumber: "MAB-INV-2026-0311",
    applicantUserId: "user-applicant-demo",
    applicationId: "app-1",
    description: "Assessment fee — Testing & Calibration Laboratories",
    amount: 4200,
    currency: "USD",
    status: "ISSUED",
    issuedAt: "2026-08-15",
    dueAt: "2026-09-15",
    paidAt: null,
  },
];

export const messages: Message[] = [
  {
    id: "msg-1",
    applicationId: "app-1",
    senderName: "Meridian Admin",
    senderRole: "ADMIN",
    body: "Your application has moved to Document Review. We'll be in touch if anything further is needed.",
    createdAt: "2026-03-18",
  },
  {
    id: "msg-2",
    applicationId: "app-1",
    senderName: "Sam Assessor",
    senderRole: "ASSESSOR",
    body: "I've been assigned as your assessor and will be reviewing your Quality Manual revision once uploaded.",
    createdAt: "2026-06-02",
  },
];

// --- Accessors ---

export function getApplicationsForUser(userId: string): Application[] {
  return applications.filter((a) => a.applicantUserId === userId);
}

export function getApplicationById(id: string, userId: string): Application | undefined {
  return applications.find((a) => a.id === id && a.applicantUserId === userId);
}

export function getInvoicesForUser(userId: string): Invoice[] {
  return invoices.filter((i) => i.applicantUserId === userId);
}

export function getInvoiceById(id: string, userId: string): Invoice | undefined {
  return invoices.find((i) => i.id === id && i.applicantUserId === userId);
}

export function getMessagesForApplication(applicationId: string): Message[] {
  return messages
    .filter((m) => m.applicationId === applicationId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function addMessage(applicationId: string, body: string) {
  messages.push({
    id: `msg-${Date.now()}`,
    applicationId,
    senderName: "You",
    senderRole: "APPLICANT",
    body,
    createdAt: new Date().toISOString().slice(0, 10),
  });
}

export function uploadDocumentVersion(applicationId: string, documentId: string, filename: string) {
  const app = applications.find((a) => a.id === applicationId);
  const doc = app?.documents.find((d) => d.id === documentId);
  if (!doc) return;
  doc.versions.push({
    version: doc.versions.length + 1,
    filename,
    uploadedAt: new Date().toISOString().slice(0, 10),
  });
  doc.status = "UNDER_REVIEW";
}

export function createDraftApplication(userId: string, programSlug: string, programName: string): Application {
  const app: Application = {
    id: `app-${Date.now()}`,
    referenceNumber: `MAB-APP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    applicantUserId: userId,
    programSlug,
    programName,
    stage: "DRAFT",
    infoRequested: false,
    submittedAt: null,
    updatedAt: new Date().toISOString().slice(0, 10),
    documents: [
      { id: `doc-${Date.now()}-1`, name: "Application Form", mandatory: true, status: "NOT_UPLOADED", versions: [] },
      { id: `doc-${Date.now()}-2`, name: "Scope of Accreditation Request", mandatory: true, status: "NOT_UPLOADED", versions: [] },
    ],
    stageHistory: [{ stage: "DRAFT", changedAt: new Date().toISOString().slice(0, 10) }],
  };
  applications.push(app);
  return app;
}

export function submitApplication(applicationId: string) {
  const app = applications.find((a) => a.id === applicationId);
  if (!app || app.stage !== "DRAFT") return;
  app.stage = "SUBMITTED";
  app.submittedAt = new Date().toISOString().slice(0, 10);
  app.updatedAt = app.submittedAt;
  app.stageHistory.push({ stage: "SUBMITTED", changedAt: app.submittedAt });
}
