/**
 * Seeds the real database with data equivalent to the in-memory placeholder
 * stores used by the app since Milestone 8 (src/lib/portal/*-data.ts,
 * src/lib/verification-records.ts, src/lib/auth/store.ts) — so Milestone 12
 * (wiring the app to Prisma) has consistent starting data, and the same
 * demo narrative (Northfield Testing Laboratories, Sam Assessor, etc.)
 * carries through unchanged.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEMO_PASSWORD_HASH = "$2b$10$gfixhPAnYYhLd.ZJNJ2N4u1dNQNBCEDStlrQwjiye8dG8.G/eGx/W"; // "Password123!"

async function main() {
  console.log("Seeding programs...");
  const programsData = [
    {
      slug: "testing-calibration-laboratories",
      name: "Testing & Calibration Laboratories",
      scopeDescription: "Covers physical, chemical, and dimensional testing and calibration activities.",
      feeAmount: 2500,
      currency: "USD",
    },
    {
      slug: "inspection-bodies",
      name: "Inspection Bodies",
      scopeDescription: "Covers inspection of products, processes, installations, and services against defined criteria.",
      feeAmount: 2200,
      currency: "USD",
    },
    {
      slug: "management-systems-certification-bodies",
      name: "Management Systems Certification Bodies",
      scopeDescription: "Covers certification of quality, environmental, and other management systems.",
      feeAmount: 3000,
      currency: "USD",
    },
    {
      slug: "product-certification-bodies",
      name: "Product Certification Bodies",
      scopeDescription: "Covers certification that specific products meet defined technical requirements.",
      feeAmount: 2800,
      currency: "USD",
    },
    {
      slug: "certification-bodies-for-persons",
      name: "Certification Bodies for Persons",
      scopeDescription: "Covers certification of individuals' competence against defined criteria.",
      feeAmount: 1800,
      currency: "USD",
    },
  ];

  const programs: Record<string, { id: string }> = {};
  for (const p of programsData) {
    const program = await prisma.program.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
    programs[p.slug] = program;
  }

  function getProgram(slug: string) {
    const program = programs[slug];
    if (!program) throw new Error(`Seed error: program "${slug}" was not created above.`);
    return program;
  }

  console.log("Seeding users...");
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Jordan Admin",
      primaryRole: "ADMIN",
      passwordHash: DEMO_PASSWORD_HASH,
    },
  });

  const assessorUser = await prisma.user.upsert({
    where: { email: "assessor@example.com" },
    update: {},
    create: {
      email: "assessor@example.com",
      name: "Sam Assessor",
      primaryRole: "ASSESSOR",
      passwordHash: DEMO_PASSWORD_HASH,
    },
  });
  const assessor = await prisma.assessor.upsert({
    where: { userId: assessorUser.id },
    update: {},
    create: { userId: assessorUser.id, bio: "10 years laboratory quality management experience." },
  });

  const applicantUser = await prisma.user.upsert({
    where: { email: "applicant@example.com" },
    update: {},
    create: {
      email: "applicant@example.com",
      name: "Alex Applicant",
      primaryRole: "APPLICANT",
      passwordHash: DEMO_PASSWORD_HASH,
    },
  });

  console.log("Seeding organisation...");
  let organisation = await prisma.organisation.findFirst({ where: { displayName: "Northfield Testing Laboratories" } });
  if (!organisation) {
    organisation = await prisma.organisation.create({
      data: { legalName: "Northfield Testing Laboratories", displayName: "Northfield Testing Laboratories" },
    });
  }
  await prisma.organisationMembership.upsert({
    where: { organisationId_userId: { organisationId: organisation.id, userId: applicantUser.id } },
    update: {},
    create: { organisationId: organisation.id, userId: applicantUser.id, membershipRole: "PRIMARY_CONTACT" },
  });

  console.log("Seeding assessor competence...");
  await prisma.assessorCompetence.createMany({
    data: [
      {
        assessorId: assessor.id,
        programId: getProgram("testing-calibration-laboratories").id,
        qualifyingBasis: "10 years laboratory quality management experience; internal auditor certification.",
        dateQualified: new Date("2022-03-01"),
        expiryDate: new Date("2027-03-01"),
        status: "CURRENT",
      },
      {
        assessorId: assessor.id,
        programId: getProgram("product-certification-bodies").id,
        qualifyingBasis: "Product safety engineering background; certification body auditor training.",
        dateQualified: new Date("2021-09-15"),
        expiryDate: new Date("2026-09-15"),
        status: "EXPIRING_SOON",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding application...");
  let application = await prisma.application.findUnique({ where: { referenceNumber: "MAB-APP-2026-0091" } });
  if (!application) {
    application = await prisma.application.create({
      data: {
        referenceNumber: "MAB-APP-2026-0091",
        organisationId: organisation.id,
        applicantUserId: applicantUser.id,
        programId: getProgram("testing-calibration-laboratories").id,
        stage: "ASSESSMENT",
        infoRequested: true,
        infoRequestNote:
          "Your uploaded Quality Manual references an outdated calibration procedure. Please upload a revised version reflecting your current procedure.",
        assessorUserId: assessorUser.id,
        submittedAt: new Date("2026-03-02"),
      },
    });
    await prisma.applicationStageHistory.createMany({
      data: [
        { applicationId: application.id, toStage: "DRAFT", changedById: applicantUser.id, changedAt: new Date("2026-02-20") },
        { applicationId: application.id, fromStage: "DRAFT", toStage: "SUBMITTED", changedById: applicantUser.id, changedAt: new Date("2026-03-02") },
        { applicationId: application.id, fromStage: "SUBMITTED", toStage: "INITIAL_REVIEW", changedById: admin.id, changedAt: new Date("2026-03-10") },
        { applicationId: application.id, fromStage: "INITIAL_REVIEW", toStage: "DOCUMENT_REVIEW", changedById: admin.id, reason: "Revision requested on Quality Manual.", changedAt: new Date("2026-03-18") },
        { applicationId: application.id, fromStage: "DOCUMENT_REVIEW", toStage: "ASSESSMENT", changedById: admin.id, changedAt: new Date("2026-06-01") },
      ],
    });
  }

  console.log("Seeding assignment + assessment...");
  let assignment = await prisma.assignment.findFirst({ where: { applicationId: application.id, assessorId: assessor.id } });
  if (!assignment) {
    assignment = await prisma.assignment.create({
      data: {
        applicationId: application.id,
        assessorId: assessor.id,
        status: "IN_PROGRESS",
        assignedById: admin.id,
        assignedAt: new Date("2026-06-01"),
        respondedAt: new Date("2026-06-02"),
        dueDate: new Date("2026-09-30"),
      },
    });
    const assessment = await prisma.assessment.create({
      data: { assignmentId: assignment.id, startedAt: new Date("2026-06-02") },
    });
    const criterion1 = await prisma.assessmentCriterion.create({
      data: {
        programId: getProgram("testing-calibration-laboratories").id,
        requirementText: "Documented quality manual reflects current procedures.",
        category: "Management System",
        sortOrder: 1,
      },
    });
    const criterion2 = await prisma.assessmentCriterion.create({
      data: {
        programId: getProgram("testing-calibration-laboratories").id,
        requirementText: "Internal audits conducted at planned intervals.",
        category: "Management System",
        sortOrder: 2,
      },
    });
    await prisma.assessmentFinding.createMany({
      data: [
        {
          assessmentId: assessment.id,
          criterionId: criterion1.id,
          status: "NON_CONFORMANCE",
          severity: "MINOR",
          notes: "Quality Manual references an outdated calibration procedure (Section 4.2).",
        },
        {
          assessmentId: assessment.id,
          criterionId: criterion2.id,
          status: "CONFORMS",
          notes: "Internal audit log shows quarterly audits as scheduled.",
        },
      ],
    });
  }

  console.log("Seeding accreditation + verification record...");
  let accreditationRecord = await prisma.accreditationRecord.findUnique({ where: { accreditationNumber: "MAB-2026-00417" } });
  if (!accreditationRecord) {
    // This demo record represents an already-accredited org (not app-1, which is
    // deliberately still mid-lifecycle) — a second, separate originating application.
    const priorApp = await prisma.application.create({
      data: {
        referenceNumber: "MAB-APP-2025-0043",
        organisationId: organisation.id,
        applicantUserId: applicantUser.id,
        programId: getProgram("testing-calibration-laboratories").id,
        stage: "ACCREDITED",
        submittedAt: new Date("2025-11-01"),
      },
    });
    accreditationRecord = await prisma.accreditationRecord.create({
      data: {
        accreditationNumber: "MAB-2026-00417",
        organisationId: organisation.id,
        programId: getProgram("testing-calibration-laboratories").id,
        originatingApplicationId: priorApp.id,
        status: "ACTIVE",
        effectiveDate: new Date("2026-01-14"),
        expiryDate: new Date("2029-01-13"),
        lastSurveillanceDate: new Date("2026-07-02"),
        nextRenewalDate: new Date("2029-01-13"),
      },
    });
    await prisma.verificationRecord.create({
      data: { accreditationRecordId: accreditationRecord.id, isPublished: true, certificateDocumentVisible: true },
    });
  }

  console.log("Seeding invoices...");
  const existingInvoice = await prisma.invoice.findUnique({ where: { invoiceNumber: "MAB-INV-2026-0143" } });
  if (!existingInvoice) {
    await prisma.invoice.create({
      data: {
        invoiceNumber: "MAB-INV-2026-0143",
        organisationId: organisation.id,
        applicationId: application.id,
        status: "PAID",
        amount: 2500,
        currency: "USD",
        issuedAt: new Date("2026-03-02"),
        dueAt: new Date("2026-03-16"),
        paidAt: new Date("2026-03-09"),
      },
    });
    await prisma.invoice.create({
      data: {
        invoiceNumber: "MAB-INV-2026-0311",
        organisationId: organisation.id,
        applicationId: application.id,
        status: "ISSUED",
        amount: 4200,
        currency: "USD",
        issuedAt: new Date("2026-08-15"),
        dueAt: new Date("2026-09-15"),
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
