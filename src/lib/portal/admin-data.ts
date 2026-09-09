import { users, type AuthUser } from "@/lib/auth/store";
import { getAllApplications } from "./applicant-data";
import { getAllAssignments, getAllCompetence } from "./assessor-data";
import { VERIFICATION_RECORDS } from "@/lib/verification-records";

export interface AssessorSummary {
  userId: string;
  name: string;
  email: string;
  activeAssignmentCount: number;
  competenceCount: number;
}

export function getAssessorSummaries(): AssessorSummary[] {
  const allAssignments = getAllAssignments();
  const allCompetence = getAllCompetence();
  return users
    .filter((u) => u.role === "ASSESSOR")
    .map((u) => ({
      userId: u.id,
      name: u.name,
      email: u.email,
      activeAssignmentCount: allAssignments.filter(
        (a) => a.assessorUserId === u.id && (a.status === "IN_PROGRESS" || a.status === "ACCEPTED" || a.status === "PENDING"),
      ).length,
      competenceCount: allCompetence.filter((c) => c.assessorUserId === u.id).length,
    }));
}

export interface OrganisationSummary {
  userId: string;
  organisationName: string;
  contactName: string;
  contactEmail: string;
  applicationCount: number;
  accreditationCount: number;
}

/** Organisations are derived from Applicant users — no separate table yet (Milestone 11 introduces one per Phase 12). */
export function getOrganisations(): OrganisationSummary[] {
  const applications = getAllApplications();
  return users
    .filter((u): u is AuthUser & { organisationName: string } => u.role === "APPLICANT" && !!u.organisationName)
    .map((u) => ({
      userId: u.id,
      organisationName: u.organisationName,
      contactName: u.name,
      contactEmail: u.email,
      applicationCount: applications.filter((a) => a.applicantUserId === u.id).length,
      accreditationCount: VERIFICATION_RECORDS.filter((r) => r.organisationName === u.organisationName).length,
    }));
}

export function getOrganisationByUserId(userId: string): OrganisationSummary | undefined {
  return getOrganisations().find((o) => o.userId === userId);
}

export function getUserOrgName(userId: string): string {
  return users.find((u) => u.id === userId)?.organisationName ?? "—";
}
