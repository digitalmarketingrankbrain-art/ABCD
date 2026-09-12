import { prisma } from "@/lib/prisma";
import { getUserOrganisationId } from "@/lib/auth/store";

export type NcSeverity = "MINOR" | "MAJOR" | "OBSERVATION";
export type NcStatus = "OPEN" | "CLOSED";

export interface NonConformitySummary {
  id: string;
  ncNumber: string;
  assessmentReference: string | null;
  category: NcSeverity;
  standardReference: string;
  status: NcStatus;
  progressStage: string;
  raisedAt: string;
  raisedByName: string | null;
  teamLeadName: string | null;
}

export interface NonConformityDetail extends NonConformitySummary {
  finding: string;
  correctiveAction: string | null;
  closedAt: string | null;
}

function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

const NC_INCLUDE = {
  raisedBy: { select: { name: true } },
  teamLead: { select: { name: true } },
  assignment: { include: { application: { select: { referenceNumber: true } } } },
} as const;

function assessmentReferenceOf(row: {
  assignment: { assessmentNumber: string | null; application: { referenceNumber: string } } | null;
}): string | null {
  if (!row.assignment) return null;
  return row.assignment.assessmentNumber ?? row.assignment.application.referenceNumber;
}

export async function getNonConformitiesForUser(userId: string): Promise<NonConformitySummary[]> {
  const organisationId = await getUserOrganisationId(userId);
  if (!organisationId) return [];
  const rows = await prisma.nonConformity.findMany({
    where: { organisationId },
    include: NC_INCLUDE,
    orderBy: { raisedAt: "desc" },
  });
  return rows.map((r) => ({
    id: r.id,
    ncNumber: r.ncNumber,
    assessmentReference: assessmentReferenceOf(r),
    category: r.category,
    standardReference: r.standardReference,
    status: r.status,
    progressStage: r.progressStage,
    raisedAt: fmtDate(r.raisedAt),
    raisedByName: r.raisedBy?.name ?? null,
    teamLeadName: r.teamLead?.name ?? null,
  }));
}

export async function getNonConformityById(id: string, userId: string): Promise<NonConformityDetail | undefined> {
  const organisationId = await getUserOrganisationId(userId);
  if (!organisationId) return undefined;
  const r = await prisma.nonConformity.findFirst({
    where: { id, organisationId },
    include: NC_INCLUDE,
  });
  if (!r) return undefined;
  return {
    id: r.id,
    ncNumber: r.ncNumber,
    assessmentReference: assessmentReferenceOf(r),
    category: r.category,
    standardReference: r.standardReference,
    status: r.status,
    progressStage: r.progressStage,
    raisedAt: fmtDate(r.raisedAt),
    raisedByName: r.raisedBy?.name ?? null,
    teamLeadName: r.teamLead?.name ?? null,
    finding: r.finding,
    correctiveAction: r.correctiveAction,
    closedAt: r.closedAt ? fmtDate(r.closedAt) : null,
  };
}
