"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  getAssignmentById,
  respondToAssignment,
  updateFinding,
  submitAssignmentReport,
  addBlackout,
  removeBlackout,
  type FindingStatus,
} from "./assessor-data";
import { addMessage, getApplicationIdByReference } from "./applicant-data";

async function requireAssessor() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ASSESSOR") {
    throw new Error("Not authorised.");
  }
  return session.user;
}

export async function acceptAssignment(assignmentId: string) {
  const user = await requireAssessor();
  const ok = await respondToAssignment(assignmentId, user.id, "ACCEPTED");
  if (!ok) return { ok: false as const, error: "Couldn't accept this assignment." };
  revalidatePath(`/portal/assessor/assignments/${assignmentId}`);
  revalidatePath("/portal/assessor/assignments");
  return { ok: true as const };
}

export async function declineAssignment(assignmentId: string, reason: string) {
  const user = await requireAssessor();
  if (!reason.trim()) return { ok: false as const, error: "A reason is required to decline an assignment." };
  const ok = await respondToAssignment(assignmentId, user.id, "DECLINED", reason.trim());
  if (!ok) return { ok: false as const, error: "Couldn't decline this assignment." };
  revalidatePath(`/portal/assessor/assignments/${assignmentId}`);
  revalidatePath("/portal/assessor/assignments");
  return { ok: true as const };
}

export async function saveFinding(
  assignmentId: string,
  criterionId: string,
  status: FindingStatus,
  notes: string,
  severity: "MINOR" | "MAJOR" | null,
) {
  const user = await requireAssessor();
  const assignment = await getAssignmentById(assignmentId, user.id);
  if (!assignment) return { ok: false as const, error: "Assignment not found." };
  await updateFinding(assignmentId, user.id, criterionId, { status, notes, severity });
  revalidatePath(`/portal/assessor/assignments/${assignmentId}`);
  return { ok: true as const };
}

export async function submitReport(assignmentId: string) {
  const user = await requireAssessor();
  const assignment = await getAssignmentById(assignmentId, user.id);
  if (!assignment) return { ok: false as const, error: "Assignment not found." };
  const unanswered = assignment.criteria.filter((c) => !assignment.findings[c.id] || assignment.findings[c.id]?.status === "UNANSWERED");
  if (unanswered.length > 0) {
    return { ok: false as const, error: `${unanswered.length} checklist item(s) still need a finding before you can submit.` };
  }
  await submitAssignmentReport(assignmentId, user.id);
  revalidatePath(`/portal/assessor/assignments/${assignmentId}`);
  revalidatePath("/portal/assessor/assignments");
  return { ok: true as const };
}

export async function sendAssignmentMessage(assignmentId: string, body: string) {
  const user = await requireAssessor();
  const assignment = await getAssignmentById(assignmentId, user.id);
  if (!assignment) return { ok: false as const, error: "Assignment not found." };
  if (!assignment.linkedApplicationId) return { ok: false as const, error: "No conversation available for this assignment yet." };
  if (!body.trim()) return { ok: false as const, error: "Message can't be empty." };
  const applicationId = await getApplicationIdByReference(assignment.linkedApplicationId);
  if (!applicationId) return { ok: false as const, error: "No conversation available for this assignment yet." };
  await addMessage(applicationId, body.trim(), user.id);
  revalidatePath(`/portal/assessor/assignments/${assignmentId}`);
  revalidatePath("/portal/assessor/messages");
  return { ok: true as const };
}

export async function addAvailabilityBlackout(startDate: string, endDate: string, note: string) {
  const user = await requireAssessor();
  if (!startDate || !endDate) return { ok: false as const, error: "Start and end dates are required." };
  await addBlackout(user.id, startDate, endDate, note);
  revalidatePath("/portal/assessor/availability");
  return { ok: true as const };
}

export async function removeAvailabilityBlackout(id: string) {
  const user = await requireAssessor();
  await removeBlackout(id, user.id);
  revalidatePath("/portal/assessor/availability");
  return { ok: true as const };
}
