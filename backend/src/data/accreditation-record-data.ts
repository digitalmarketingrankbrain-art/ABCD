import { prisma } from "../prisma";

/**
 * Real AccreditationRecord rows — previously the schema had this model
 * (Milestone 11) but NOTHING ever created one; the public /verify page and
 * admin accreditation-records list run entirely on a separate hand-curated
 * in-memory array (frontend/src/lib/verification-records.ts, explicitly
 * flagged in HANDOVER.md as not yet migrated). This module creates a real
 * record the moment an application is actually accredited, so certificate
 * issuance has a real row to attach to — reconciling that with the legacy
 * in-memory verification store is a separate, already-flagged migration,
 * out of scope here.
 */

function generateAccreditationNumber(): string {
  return `ACC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function ensureAccreditationRecordForApplication(
  applicationId: string,
  validityYears = 3,
): Promise<{ id: string; accreditationNumber: string }> {
  const existing = await prisma.accreditationRecord.findUnique({ where: { originatingApplicationId: applicationId } });
  if (existing) return { id: existing.id, accreditationNumber: existing.accreditationNumber };

  const app = await prisma.application.findUniqueOrThrow({ where: { id: applicationId } });
  const effectiveDate = new Date();
  const expiryDate = new Date(effectiveDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + validityYears);

  const record = await prisma.accreditationRecord.create({
    data: {
      accreditationNumber: generateAccreditationNumber(),
      organisationId: app.organisationId,
      programId: app.programId,
      originatingApplicationId: applicationId,
      effectiveDate,
      expiryDate,
    },
  });
  return { id: record.id, accreditationNumber: record.accreditationNumber };
}

export interface AccreditationRecordSummary {
  id: string;
  accreditationNumber: string;
  organisationName: string;
  programName: string;
  status: string;
  effectiveDate: string;
  expiryDate: string | null;
}

function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function getAccreditationRecordForApplication(applicationId: string): Promise<AccreditationRecordSummary | undefined> {
  const row = await prisma.accreditationRecord.findUnique({
    where: { originatingApplicationId: applicationId },
    include: { organisation: true, program: true },
  });
  if (!row) return undefined;
  return {
    id: row.id,
    accreditationNumber: row.accreditationNumber,
    organisationName: row.organisation.displayName,
    programName: row.program.name,
    status: row.status,
    effectiveDate: fmtDate(row.effectiveDate),
    expiryDate: row.expiryDate ? fmtDate(row.expiryDate) : null,
  };
}
