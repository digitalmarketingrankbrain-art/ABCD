import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { getUserOrganisationId } from "@/lib/auth/store";
import { countryName } from "@/lib/countries";

export interface CabDetails {
  organisationId: string;
  legalName: string;
  displayName: string;
  shortCode: string | null;
  cabNumber: string | null;
  website: string | null;
  director: string | null;
  certificationManager: string | null;
  registrationNumber: string | null;
  address: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  contactFirstName: string | null;
  contactLastName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
}

export interface SchemeEntry {
  slug: string;
  name: string;
  standardReference: string | null;
}

export interface LocationEntry {
  id: string;
  contactPerson: string | null;
  mobile: string | null;
  address: string;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  locationType: "HEAD_OFFICE" | "KEY_LOCATION" | "OTHER";
}

export interface TeamMemberEntry {
  id: string;
  userId: string;
  name: string;
  email: string;
  title: string | null;
  membershipRole: "PRIMARY_CONTACT" | "MEMBER";
  status: "ACTIVE" | "SUSPENDED" | "LOCKED";
}

async function requireOrganisationId(userId: string): Promise<string> {
  const organisationId = await getUserOrganisationId(userId);
  if (!organisationId) throw new Error("No organisation found for this user.");
  return organisationId;
}

export async function getCabDetails(userId: string): Promise<CabDetails> {
  const organisationId = await requireOrganisationId(userId);
  const org = await prisma.organisation.findUniqueOrThrow({ where: { id: organisationId } });
  return {
    organisationId: org.id,
    legalName: org.legalName,
    displayName: org.displayName,
    shortCode: org.shortCode,
    cabNumber: org.cabNumber,
    website: org.website,
    director: org.director,
    certificationManager: org.certificationManager,
    registrationNumber: org.registrationNumber,
    address: org.address,
    addressLine2: org.addressLine2,
    city: org.city,
    state: org.state,
    postalCode: org.postalCode,
    country: org.country,
    contactFirstName: org.contactFirstName,
    contactLastName: org.contactLastName,
    contactEmail: org.contactEmail,
    contactPhone: org.contactPhone,
  };
}

export async function updateCabBasicDetails(
  userId: string,
  data: Partial<Omit<CabDetails, "organisationId" | "cabNumber">>,
): Promise<void> {
  const organisationId = await requireOrganisationId(userId);
  await prisma.organisation.update({
    where: { id: organisationId },
    data: {
      displayName: data.displayName,
      website: data.website,
      shortCode: data.shortCode,
      address: data.address,
      addressLine2: data.addressLine2,
      country: data.country,
      state: data.state,
      city: data.city,
      postalCode: data.postalCode,
      contactFirstName: data.contactFirstName,
      contactLastName: data.contactLastName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      director: data.director,
      certificationManager: data.certificationManager,
    },
  });
}

/** Programs the organisation has an active (non-declined) application for — the "Applied Schemes" panel. */
export async function getAppliedSchemes(userId: string): Promise<SchemeEntry[]> {
  const organisationId = await requireOrganisationId(userId);
  const apps = await prisma.application.findMany({
    where: { organisationId, stage: { not: "DECLINED" } },
    include: { program: true },
  });
  const seen = new Map<string, SchemeEntry>();
  for (const app of apps) {
    seen.set(app.program.slug, {
      slug: app.program.slug,
      name: app.program.name,
      standardReference: app.program.standardReference,
    });
    for (const slug of app.additionalScopeSlugs) {
      const program = await prisma.program.findUnique({ where: { slug } });
      if (program) seen.set(slug, { slug: program.slug, name: program.name, standardReference: program.standardReference });
    }
  }
  return Array.from(seen.values());
}

/** Programs with a live AccreditationRecord — the "Awarded Schemes" panel. */
export async function getAwardedSchemes(userId: string): Promise<SchemeEntry[]> {
  const organisationId = await requireOrganisationId(userId);
  const records = await prisma.accreditationRecord.findMany({
    where: { organisationId, status: "ACTIVE" },
    include: { program: true },
  });
  return records.map((r) => ({ slug: r.program.slug, name: r.program.name, standardReference: r.program.standardReference }));
}

export async function getLocations(userId: string): Promise<LocationEntry[]> {
  const organisationId = await requireOrganisationId(userId);
  const rows = await prisma.organisationLocation.findMany({ where: { organisationId }, orderBy: { createdAt: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    contactPerson: r.contactPerson,
    mobile: r.mobile,
    address: r.address,
    city: r.city,
    state: r.state,
    country: r.country,
    postalCode: r.postalCode,
    locationType: r.locationType,
  }));
}

export async function addLocation(
  userId: string,
  data: Omit<LocationEntry, "id">,
): Promise<void> {
  const organisationId = await requireOrganisationId(userId);
  await prisma.organisationLocation.create({ data: { organisationId, ...data } });
}

export interface CountryLists {
  applied: string[];
  approved: string[];
}

export async function getCountryLists(userId: string): Promise<CountryLists> {
  const organisationId = await requireOrganisationId(userId);
  const rows = await prisma.organisationCountry.findMany({ where: { organisationId } });
  return {
    applied: rows.filter((r) => r.status === "APPLIED").map((r) => r.countryCode),
    approved: rows.filter((r) => r.status === "APPROVED").map((r) => r.countryCode),
  };
}

/** Replaces the full Applied-countries set for the organisation (approved countries are admin-controlled, not editable here). */
export async function setAppliedCountries(userId: string, countryCodes: string[]): Promise<void> {
  const organisationId = await requireOrganisationId(userId);
  await prisma.$transaction([
    prisma.organisationCountry.deleteMany({ where: { organisationId, status: "APPLIED" } }),
    prisma.organisationCountry.createMany({
      data: countryCodes.map((code) => ({
        organisationId,
        countryCode: code,
        countryName: countryName(code),
        status: "APPLIED" as const,
      })),
    }),
  ]);
}

function generateTempPassword(): string {
  // 12 random alphanumeric chars — not shown to anyone but the inviting CB admin, once, immediately after creation.
  return crypto.randomBytes(9).toString("base64url").slice(0, 12);
}

export interface AddTeamMemberInput {
  name: string;
  email: string;
  title: string;
  membershipRole: "PRIMARY_CONTACT" | "MEMBER";
}

/**
 * No email provider is wired (Phase 11: vendor TBD) — same honest gap as
 * password reset (`src/lib/auth/actions.ts`'s `requestPasswordReset`), so
 * this returns the generated temporary password directly to the caller
 * (shown once, client-side, marked [DEV ONLY]) rather than pretending an
 * invite email was sent.
 */
export async function addTeamMember(
  requestingUserId: string,
  input: AddTeamMemberInput,
): Promise<{ ok: true; tempPassword: string } | { ok: false; error: string }> {
  const organisationId = await requireOrganisationId(requestingUserId);

  const existing = await prisma.user.findFirst({ where: { email: { equals: input.email, mode: "insensitive" } } });
  if (existing) {
    return { ok: false, error: "A user with this email already exists." };
  }

  const tempPassword = generateTempPassword();
  const user = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      primaryRole: "APPLICANT",
      passwordHash: bcrypt.hashSync(tempPassword, 10),
    },
  });
  await prisma.organisationMembership.create({
    data: { organisationId, userId: user.id, membershipRole: input.membershipRole, title: input.title || null },
  });

  return { ok: true, tempPassword };
}

export async function getTeamMembers(userId: string): Promise<TeamMemberEntry[]> {
  const organisationId = await requireOrganisationId(userId);
  const rows = await prisma.organisationMembership.findMany({
    where: { organisationId },
    include: { user: true },
  });
  return rows.map((r) => ({
    id: r.id,
    userId: r.userId,
    name: r.user.name,
    email: r.user.email,
    title: r.title,
    membershipRole: r.membershipRole,
    status: r.user.status,
  }));
}
