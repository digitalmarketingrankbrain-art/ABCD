"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  getApplicationById,
  addMessage,
  uploadDocumentVersion,
  createDraftApplication,
  submitApplication,
} from "./applicant-data";
import { PROGRAMS } from "@/lib/programs";

async function requireApplicant() {
  const session = await auth();
  if (!session?.user || session.user.role !== "APPLICANT") {
    throw new Error("Not authorised.");
  }
  return session.user;
}

export async function sendApplicationMessage(applicationId: string, body: string) {
  const user = await requireApplicant();
  const app = getApplicationById(applicationId, user.id);
  if (!app) return { ok: false as const, error: "Application not found." };
  if (!body.trim()) return { ok: false as const, error: "Message can't be empty." };
  addMessage(applicationId, body.trim());
  revalidatePath(`/portal/applicant/applications/${applicationId}`);
  return { ok: true as const };
}

/**
 * No real storage backend exists yet (Milestone 13) — this records the
 * upload against the placeholder document-version history so the UI/UX
 * (status change, version increment) is real and testable, without a
 * durable file behind it.
 */
export async function uploadApplicationDocument(applicationId: string, documentId: string, filename: string) {
  const user = await requireApplicant();
  const app = getApplicationById(applicationId, user.id);
  if (!app) return { ok: false as const, error: "Application not found." };
  uploadDocumentVersion(applicationId, documentId, filename);
  revalidatePath(`/portal/applicant/applications/${applicationId}`);
  return { ok: true as const };
}

export async function startNewApplication(programSlug: string) {
  const user = await requireApplicant();
  const program = PROGRAMS.find((p) => p.slug === programSlug);
  if (!program) return { ok: false as const, error: "Unknown program." };
  const app = createDraftApplication(user.id, program.slug, program.name);
  revalidatePath("/portal/applicant/applications");
  return { ok: true as const, applicationId: app.id };
}

export async function submitApplicationForReview(applicationId: string) {
  const user = await requireApplicant();
  const app = getApplicationById(applicationId, user.id);
  if (!app) return { ok: false as const, error: "Application not found." };
  if (app.documents.some((d) => d.mandatory && d.status === "NOT_UPLOADED")) {
    return { ok: false as const, error: "All mandatory documents must be uploaded before submitting." };
  }
  submitApplication(applicationId);
  revalidatePath(`/portal/applicant/applications/${applicationId}`);
  revalidatePath("/portal/applicant/applications");
  return { ok: true as const };
}
