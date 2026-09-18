import { rpc } from "@/lib/rpc-client";

/** Thin proxy over backend/src/data/nc-data.ts — see applicant-data.ts's header comment for why. */

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

const MODULE = "nc-data";

export function getNonConformitiesForUser(userId: string): Promise<NonConformitySummary[]> {
  return rpc(MODULE, "getNonConformitiesForUser", [userId]);
}

export function getNonConformityById(id: string, userId: string): Promise<NonConformityDetail | undefined> {
  return rpc(MODULE, "getNonConformityById", [id, userId]);
}
