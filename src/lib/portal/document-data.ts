import { prisma } from "@/lib/prisma";
import { saveDocumentFile, guessMimeType } from "@/lib/storage";
import type { DocumentOwnerType, DocumentKind } from "@prisma/client";

/**
 * Real Prisma-backed Document/DocumentVersion records (Milestone 13) —
 * `ownerId` is a plain string, not a foreign key, deliberately: it
 * currently holds the in-memory placeholder Application id (e.g. "app-1")
 * since Applications themselves haven't been migrated off the in-memory
 * store yet (remaining Milestone 12 work). Document storage didn't need to
 * wait on that migration to be real.
 */

export async function uploadDocumentForOwner(input: {
  ownerType: DocumentOwnerType;
  ownerId: string;
  documentKind: DocumentKind;
  buffer: Buffer;
  filename: string;
  uploadedById: string;
  /** If provided, adds a new version to this existing Document instead of creating one. */
  existingDocumentId?: string;
}) {
  const { storageKey, sizeBytes } = await saveDocumentFile(input.buffer, input.filename);
  const mimeType = guessMimeType(input.filename);

  if (input.existingDocumentId) {
    const doc = await prisma.document.findUnique({ where: { id: input.existingDocumentId } });
    if (!doc) throw new Error("Document not found.");
    const versionCount = await prisma.documentVersion.count({ where: { documentId: doc.id } });
    const version = await prisma.documentVersion.create({
      data: {
        documentId: doc.id,
        versionNumber: versionCount + 1,
        storageKey,
        filename: input.filename,
        mimeType,
        sizeBytes,
        uploadedById: input.uploadedById,
        reviewStatus: "UNDER_REVIEW",
      },
    });
    await prisma.document.update({ where: { id: doc.id }, data: { currentVersionId: version.id } });
    return { documentId: doc.id, versionId: version.id };
  }

  const document = await prisma.document.create({
    data: { ownerType: input.ownerType, ownerId: input.ownerId, documentKind: input.documentKind },
  });
  const version = await prisma.documentVersion.create({
    data: {
      documentId: document.id,
      versionNumber: 1,
      storageKey,
      filename: input.filename,
      mimeType,
      sizeBytes,
      uploadedById: input.uploadedById,
      reviewStatus: "UNDER_REVIEW",
    },
  });
  await prisma.document.update({ where: { id: document.id }, data: { currentVersionId: version.id } });
  return { documentId: document.id, versionId: version.id };
}

export async function getDocumentsForOwner(ownerType: DocumentOwnerType, ownerId: string) {
  return prisma.document.findMany({
    where: { ownerType, ownerId },
    include: { currentVersion: true, versions: { orderBy: { versionNumber: "desc" } } },
    orderBy: { createdAt: "asc" },
  });
}

export async function getDocumentVersionForDownload(versionId: string) {
  return prisma.documentVersion.findUnique({
    where: { id: versionId },
    include: { document: true },
  });
}
