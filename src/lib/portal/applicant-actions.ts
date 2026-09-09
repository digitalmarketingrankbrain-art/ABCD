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
import { uploadDocumentForOwner } from "./document-data";
import { MAX_UPLOAD_BYTES } from "@/lib/storage";
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
 * Real storage as of Milestone 13 — the file is genuinely saved (locally,
 * as a stand-in for S3/R2 per Phase 11's architecture) and a real
 * Document/DocumentVersion pair is created in Postgres, attributed to the
 * real authenticated user. The in-memory `uploadDocumentVersion` call
 * alongside it keeps the existing per-document status UI (NOT_UPLOADED ->
 * UNDER_REVIEW, version count) working, since the Application/
 * RequiredDocument checklist itself is still in-memory (remaining
 * Milestone 12 work) — the real file storage didn't need to wait on that.
 */
export async function uploadApplicationDocument(applicationId: string, documentId: string, file: File) {
  const user = await requireApplicant();
  const app = getApplicationById(applicationId, user.id);
  if (!app) return { ok: false as const, error: "Application not found." };
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false as const, error: "That file is larger than 25 MB. Please upload a smaller file." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await uploadDocumentForOwner({
    ownerType: "APPLICATION",
    ownerId: applicationId,
    documentKind: "REQUIRED_SUBMISSION",
    buffer,
    filename: file.name,
    uploadedById: user.id,
  });

  uploadDocumentVersion(applicationId, documentId, file.name);
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
