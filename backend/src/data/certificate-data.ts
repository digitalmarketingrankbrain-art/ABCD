import PDFDocument from "pdfkit";
import { prisma } from "../prisma";
import { saveDocumentFile } from "./storage";
import { getUserOrganisationId } from "./auth-store";
import { ensureAccreditationRecordForApplication } from "./accreditation-record-data";

function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function buildCertificatePdf(data: {
  certificateNumber: string;
  organisationName: string;
  scopeText: string;
  standardReference: string | null;
  issueDate: string;
  validUntil: string | null;
  signatoryName: string;
  signatoryTitle: string | null;
  version: number;
}): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 56 });
    const chunks: Buffer[] = [];
    doc.on("data", (c) => chunks.push(c as Buffer));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();

    doc.fontSize(10).fillColor("#555").text("ACCREDITATION CERTIFICATE", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(22).fillColor("#111").text(data.organisationName, { align: "center" });
    doc.moveDown(0.3);
    if (data.version > 1) {
      doc.fontSize(10).fillColor("#a00").text(`Reissue — version ${data.version}`, { align: "center" });
      doc.moveDown(0.3);
    }
    doc.moveDown(1);

    doc.fontSize(11).fillColor("#111");
    const row = (label: string, value: string) => {
      doc.font("Helvetica-Bold").text(`${label}: `, { continued: true }).font("Helvetica").text(value);
    };
    row("Certificate Number", data.certificateNumber);
    row("Standard / Scheme", data.standardReference ?? "—");
    row("Scope of Accreditation", data.scopeText);
    row("Issue Date", data.issueDate);
    row("Valid Until", data.validUntil ?? "—");
    doc.moveDown(2);

    doc.text("_____________________________");
    doc.font("Helvetica-Bold").text(data.signatoryName);
    if (data.signatoryTitle) doc.font("Helvetica").fontSize(10).text(data.signatoryTitle);
    doc.font("Helvetica").fontSize(9).fillColor("#777").moveDown(1);
    doc.text("This certificate remains the property of the issuing Accreditation Body and is subject to the terms of the accreditation agreement.", { align: "center" });

    doc.end();
  });
}

export interface IssueCertificateInput {
  applicationId: string;
  scopeText: string;
  standardReference?: string;
  validityMonths: number;
  authorizedSignatoryName: string;
  authorizedSignatoryTitle?: string;
}

/**
 * Issuing when a certificate already exists for this accreditation record
 * revokes the prior one and creates a new, higher-version row chained via
 * supersedesId — full reissue history, nothing overwritten in place.
 */
export async function issueCertificate(
  input: IssueCertificateInput,
  issuedById: string,
): Promise<{ id: string; certificateNumber: string }> {
  const { id: accreditationRecordId, accreditationNumber } = await ensureAccreditationRecordForApplication(input.applicationId);
  const recordWithOrg = await prisma.accreditationRecord.findUniqueOrThrow({
    where: { id: accreditationRecordId },
    include: { organisation: true, certificates: { orderBy: { version: "desc" }, take: 1 } },
  });

  const previous = recordWithOrg.certificates[0];
  const version = previous ? previous.version + 1 : 1;
  const certificateNumber = version === 1 ? accreditationNumber : `${accreditationNumber}-R${version}`;
  const issueDate = new Date();
  const validUntil = new Date(issueDate);
  validUntil.setMonth(validUntil.getMonth() + input.validityMonths);

  const pdfBuffer = await buildCertificatePdf({
    certificateNumber,
    organisationName: recordWithOrg.organisation.displayName,
    scopeText: input.scopeText,
    standardReference: input.standardReference ?? null,
    issueDate: fmtDate(issueDate),
    validUntil: fmtDate(validUntil),
    signatoryName: input.authorizedSignatoryName,
    signatoryTitle: input.authorizedSignatoryTitle ?? null,
    version,
  });
  const filename = `${certificateNumber}.pdf`;
  const { storageKey } = await saveDocumentFile(pdfBuffer, filename);

  const created = await prisma.$transaction(async (tx) => {
    if (previous) {
      await tx.accreditationCertificate.update({ where: { id: previous.id }, data: { status: "REVOKED" } });
    }
    return tx.accreditationCertificate.create({
      data: {
        accreditationRecordId,
        certificateNumber,
        version,
        issueDate,
        validUntil,
        scopeText: input.scopeText,
        standardReference: input.standardReference,
        authorizedSignatoryName: input.authorizedSignatoryName,
        authorizedSignatoryTitle: input.authorizedSignatoryTitle,
        storageKey,
        filename,
        issuedById,
        supersedesId: previous?.id,
      },
    });
  });

  return { id: created.id, certificateNumber: created.certificateNumber };
}

export interface CertificateRow {
  id: string;
  certificateNumber: string;
  version: number;
  status: string;
  issueDate: string;
  validUntil: string | null;
  scopeText: string;
  standardReference: string | null;
  authorizedSignatoryName: string;
  filename: string;
}

function mapCertificate(c: {
  id: string; certificateNumber: string; version: number; status: string; issueDate: Date; validUntil: Date | null;
  scopeText: string; standardReference: string | null; authorizedSignatoryName: string; filename: string;
}): CertificateRow {
  return {
    id: c.id,
    certificateNumber: c.certificateNumber,
    version: c.version,
    status: c.status,
    issueDate: fmtDate(c.issueDate),
    validUntil: c.validUntil ? fmtDate(c.validUntil) : null,
    scopeText: c.scopeText,
    standardReference: c.standardReference,
    authorizedSignatoryName: c.authorizedSignatoryName,
    filename: c.filename,
  };
}

export async function getCertificatesForApplication(applicationId: string): Promise<CertificateRow[]> {
  const record = await prisma.accreditationRecord.findUnique({
    where: { originatingApplicationId: applicationId },
    include: { certificates: { orderBy: { version: "desc" } } },
  });
  return record ? record.certificates.map(mapCertificate) : [];
}

export async function getCertificatesForUser(userId: string): Promise<CertificateRow[]> {
  const organisationId = await getUserOrganisationId(userId);
  if (!organisationId) return [];
  const records = await prisma.accreditationRecord.findMany({
    where: { organisationId },
    include: { certificates: { orderBy: { version: "desc" } } },
  });
  return records.flatMap((r) => r.certificates.map(mapCertificate));
}

export interface CertificateDownload {
  storageKey: string;
  filename: string;
}

/** Access check performed by the caller (route handler) — mirrors documents/[versionId]/route.ts's pattern. */
export async function getCertificateForDownload(
  certificateId: string,
): Promise<(CertificateDownload & { organisationId: string }) | undefined> {
  const cert = await prisma.accreditationCertificate.findUnique({
    where: { id: certificateId },
    include: { accreditationRecord: { select: { organisationId: true } } },
  });
  if (!cert) return undefined;
  return { storageKey: cert.storageKey, filename: cert.filename, organisationId: cert.accreditationRecord.organisationId };
}

export async function revokeCertificate(certificateId: string): Promise<boolean> {
  const res = await prisma.accreditationCertificate.updateMany({
    where: { id: certificateId, status: "ISSUED" },
    data: { status: "REVOKED" },
  });
  return res.count > 0;
}
