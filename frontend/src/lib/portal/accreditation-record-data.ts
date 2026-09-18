import { rpc } from "@/lib/rpc-client";

/** Thin proxy over backend/src/data/accreditation-record-data.ts — see applicant-data.ts's header comment for why. */

export interface AccreditationRecordSummary {
  id: string;
  accreditationNumber: string;
  organisationName: string;
  programName: string;
  status: string;
  effectiveDate: string;
  expiryDate: string | null;
}

const MODULE = "accreditation-record-data";

export function getAccreditationRecordForApplication(applicationId: string): Promise<AccreditationRecordSummary | undefined> {
  return rpc(MODULE, "getAccreditationRecordForApplication", [applicationId]);
}
