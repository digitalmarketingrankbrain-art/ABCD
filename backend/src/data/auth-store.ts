import { prisma } from "../prisma";
import type { User as PrismaUser, Role } from "@prisma/client";

export type { Role };

/**
 * Real database-backed user store (Milestone 12) — replaces the in-memory
 * array used since Milestone 7. Function names/shapes kept stable so the
 * many call sites across auth.ts/actions.ts/the portals only needed
 * `await` added, not rewriting.
 */
export type AuthUser = PrismaUser;

export async function findUserByEmail(email: string): Promise<AuthUser | null> {
  return prisma.user.findFirst({ where: { email: { equals: email, mode: "insensitive" } } });
}

export async function findUserById(id: string): Promise<AuthUser | null> {
  return prisma.user.findUnique({ where: { id } });
}

export async function getAllUsers(): Promise<AuthUser[]> {
  return prisma.user.findMany({ orderBy: { createdAt: "asc" } });
}

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: string;
}

const SAFE_SELECT = { id: true, name: true, email: true, primaryRole: true, status: true } as const;

/**
 * Selects only display-safe fields at the Prisma query level. Login no
 * longer involves a password or MFA secret at all (see createLoginOtp/
 * consumeLoginOtp below), but this selective-select pattern is kept since
 * it's still the right way for anything that only needs to *display* users
 * (admin screens, name lookups for a select box) to avoid loading more than
 * it needs into server memory.
 */
export async function getAllUsersSafe(): Promise<SafeUser[]> {
  const rows = await prisma.user.findMany({ orderBy: { createdAt: "asc" }, select: SAFE_SELECT });
  return rows.map((u) => ({ ...u, role: u.primaryRole }));
}

export async function getUsersByRoleSafe(role: Role): Promise<SafeUser[]> {
  const rows = await prisma.user.findMany({ where: { primaryRole: role }, select: SAFE_SELECT });
  return rows.map((u) => ({ ...u, role: u.primaryRole }));
}

export async function createApplicantUser(input: {
  email: string;
  name: string;
  organisationName: string;
}): Promise<AuthUser> {
  const user = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      primaryRole: "APPLICANT",
    },
  });

  const organisation = await prisma.organisation.create({
    data: { legalName: input.organisationName, displayName: input.organisationName },
  });
  await prisma.organisationMembership.create({
    data: { organisationId: organisation.id, userId: user.id, membershipRole: "PRIMARY_CONTACT" },
  });

  return user;
}

export async function getUserOrganisationName(userId: string): Promise<string> {
  const membership = await prisma.organisationMembership.findFirst({
    where: { userId },
    include: { organisation: true },
  });
  return membership?.organisation.displayName ?? "—";
}

export async function getUserOrganisationId(userId: string): Promise<string | null> {
  const membership = await prisma.organisationMembership.findFirst({ where: { userId } });
  return membership?.organisationId ?? null;
}

// --- Login OTPs ---
//
// Backed by a real `login_otps` table rather than an in-memory Map: Next.js
// dev mode compiles Server Actions and Route Handlers as separate module
// instances, so a code created by requestLoginOtp (a Server Action) and
// consumed by auth.ts's authorize() (invoked from the NextAuth Route
// Handler) would never see the same in-memory state — a real DB row is the
// only thing both layers reliably share, in dev or in a multi-instance
// production deployment.

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function createLoginOtp(email: string): Promise<string> {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const key = normalizeEmail(email);
  await prisma.loginOtp.upsert({
    where: { email: key },
    create: { email: key, code, expiresAt: new Date(Date.now() + 10 * 60 * 1000) },
    update: { code, expiresAt: new Date(Date.now() + 10 * 60 * 1000) },
  });
  return code;
}

export async function consumeLoginOtp(email: string, code: string): Promise<boolean> {
  const key = normalizeEmail(email);
  const entry = await prisma.loginOtp.findUnique({ where: { email: key } });
  if (!entry) return false;
  if (entry.expiresAt < new Date()) {
    await prisma.loginOtp.delete({ where: { email: key } }).catch(() => {});
    return false;
  }
  if (entry.code !== code) return false;
  await prisma.loginOtp.delete({ where: { email: key } });
  return true;
}
