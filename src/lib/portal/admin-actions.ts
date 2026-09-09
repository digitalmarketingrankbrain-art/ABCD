"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  getApplicationByIdAdmin,
  advanceApplicationStage,
  setInfoRequested,
  clearInfoRequested,
  assignAssessorToApplication,
  recordApplicationDecision,
} from "./applicant-data";
import {
  updateVerificationStatus,
  setVerificationPublished,
  setCertificateVisible,
  findByReferenceAdmin,
  type VerificationStatus,
} from "@/lib/verification-records";
import { logAction } from "./audit-log";
import { createNotification } from "@/lib/notifications";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Not authorised.");
  }
  return session.user;
}

export async function markInitialReviewComplete(applicationId: string) {
  const admin = await requireAdmin();
  const app = getApplicationByIdAdmin(applicationId);
  if (!app) return { ok: false as const, error: "Application not found." };
  advanceApplicationStage(applicationId, "DOCUMENT_REVIEW");
  await logAction({
    actorUserId: admin.id,
    actorRole: "ADMIN",
    action: "application.initial_review_completed",
    targetType: "Application",
    targetId: applicationId,
  });
  revalidatePath(`/portal/admin/applications/${applicationId}`);
  return { ok: true as const };
}

export async function requestApplicationInfo(applicationId: string, note: string) {
  const admin = await requireAdmin();
  if (!note.trim()) return { ok: false as const, error: "A note explaining what's needed is required." };
  const app = getApplicationByIdAdmin(applicationId);
  if (!app) return { ok: false as const, error: "Application not found." };
  setInfoRequested(applicationId, note.trim());
  await logAction({
    actorUserId: admin.id,
    actorRole: "ADMIN",
    action: "application.information_requested",
    targetType: "Application",
    targetId: applicationId,
    reason: note.trim(),
  });
  await createNotification({
    userId: app.applicantUserId,
    type: "application.information_requested",
    relatedType: "Application",
    relatedId: applicationId,
    channel: "IN_APP",
  });
  await createNotification({
    userId: app.applicantUserId,
    type: "application.information_requested",
    relatedType: "Application",
    relatedId: applicationId,
    channel: "EMAIL",
  });
  revalidatePath(`/portal/admin/applications/${applicationId}`);
  return { ok: true as const };
}

export async function clearApplicationInfoRequest(applicationId: string) {
  const admin = await requireAdmin();
  const app = getApplicationByIdAdmin(applicationId);
  if (!app) return { ok: false as const, error: "Application not found." };
  clearInfoRequested(applicationId);
  await logAction({
    actorUserId: admin.id,
    actorRole: "ADMIN",
    action: "application.information_request_cleared",
    targetType: "Application",
    targetId: applicationId,
  });
  revalidatePath(`/portal/admin/applications/${applicationId}`);
  return { ok: true as const };
}

export async function assignAssessor(applicationId: string, assessorName: string) {
  const admin = await requireAdmin();
  if (!assessorName) return { ok: false as const, error: "Select an assessor." };
  const app = getApplicationByIdAdmin(applicationId);
  if (!app) return { ok: false as const, error: "Application not found." };
  assignAssessorToApplication(applicationId, assessorName);
  await logAction({
    actorUserId: admin.id,
    actorRole: "ADMIN",
    action: "application.assessor_assigned",
    targetType: "Application",
    targetId: applicationId,
    after: assessorName,
  });
  revalidatePath(`/portal/admin/applications/${applicationId}`);
  return { ok: true as const };
}

/**
 * A distinct action from the assessor's report view (Phase 10) — requires
 * outcome + rationale + the deciding admin's identity, structurally
 * enforcing the assessor/decision-maker separation from Phase 6 Governance.
 */
export async function recordDecision(
  applicationId: string,
  outcome: "ACCREDIT" | "DECLINE" | "REQUEST_MORE_INFO",
  rationale: string,
) {
  const admin = await requireAdmin();
  if (!rationale.trim()) return { ok: false as const, error: "A rationale is required to record a decision." };
  const app = getApplicationByIdAdmin(applicationId);
  if (!app) return { ok: false as const, error: "Application not found." };
  recordApplicationDecision(applicationId, outcome, rationale.trim(), admin.name ?? admin.email ?? "Admin");
  await logAction({
    actorUserId: admin.id,
    actorRole: "ADMIN",
    action: `application.decision_recorded.${outcome.toLowerCase()}`,
    targetType: "Application",
    targetId: applicationId,
    reason: rationale.trim(),
  });
  const notificationType = `application.decision_recorded.${outcome.toLowerCase()}`;
  await createNotification({
    userId: app.applicantUserId,
    type: notificationType,
    relatedType: "Application",
    relatedId: applicationId,
    channel: "IN_APP",
  });
  await createNotification({
    userId: app.applicantUserId,
    type: notificationType,
    relatedType: "Application",
    relatedId: applicationId,
    channel: "EMAIL",
  });
  revalidatePath(`/portal/admin/applications/${applicationId}`);
  revalidatePath("/portal/admin/applications");
  return { ok: true as const };
}

export async function changeAccreditationStatus(reference: string, newStatus: VerificationStatus, reason: string) {
  const admin = await requireAdmin();
  if (!reason.trim()) return { ok: false as const, error: "A reason is required for every status change." };
  const record = findByReferenceAdmin(reference);
  if (!record) return { ok: false as const, error: "Record not found." };
  const before = record.status;
  updateVerificationStatus(reference, newStatus, reason.trim(), admin.name ?? admin.email ?? "Admin");
  await logAction({
    actorUserId: admin.id,
    actorRole: "ADMIN",
    action: "accreditation.status_changed",
    targetType: "AccreditationRecord",
    targetId: reference,
    reason: reason.trim(),
    before,
    after: newStatus,
  });
  revalidatePath(`/portal/admin/accreditation-records/${reference}`);
  revalidatePath(`/verify/${reference}`);
  return { ok: true as const };
}

export async function toggleVerificationPublished(reference: string, published: boolean) {
  const admin = await requireAdmin();
  const ok = setVerificationPublished(reference, published);
  if (!ok) return { ok: false as const, error: "Record not found." };
  await logAction({
    actorUserId: admin.id,
    actorRole: "ADMIN",
    action: published ? "verification.published" : "verification.unpublished",
    targetType: "VerificationRecord",
    targetId: reference,
  });
  revalidatePath(`/portal/admin/accreditation-records/${reference}`);
  revalidatePath(`/verify/${reference}`);
  return { ok: true as const };
}

export async function toggleCertificateVisible(reference: string, visible: boolean) {
  const admin = await requireAdmin();
  const ok = setCertificateVisible(reference, visible);
  if (!ok) return { ok: false as const, error: "Record not found." };
  await logAction({
    actorUserId: admin.id,
    actorRole: "ADMIN",
    action: visible ? "verification.certificate_made_visible" : "verification.certificate_hidden",
    targetType: "VerificationRecord",
    targetId: reference,
  });
  revalidatePath(`/portal/admin/accreditation-records/${reference}`);
  revalidatePath(`/verify/${reference}`);
  return { ok: true as const };
}
