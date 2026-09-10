import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
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
  mfaEnabled: boolean;
  status: string;
}

const SAFE_SELECT = { id: true, name: true, email: true, primaryRole: true, mfaEnabled: true, status: true } as const;

/**
 * Excludes passwordHash/mfaSecret at the Prisma query level — not just at
 * display time. `getAllUsers()` above still exists for auth-flow code that
 * genuinely needs the full record (verifying a password); anything that
 * only needs to *display* users (admin screens, name lookups for a select
 * box) should prefer this instead, so the sensitive fields never load into
 * server memory in the first place, not just never reach the client.
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
  password: string;
  name: string;
  organisationName: string;
}): Promise<AuthUser> {
  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash: bcrypt.hashSync(input.password, 10),
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

export function verifyPassword(user: AuthUser, password: string): boolean {
  return bcrypt.compareSync(password, user.passwordHash);
}

export async function setUserPassword(userId: string, password: string) {
  await prisma.user.update({ where: { id: userId }, data: { passwordHash: bcrypt.hashSync(password, 10) } });
}

export async function setUserMfaSecret(userId: string, secret: string) {
  await prisma.user.update({ where: { id: userId }, data: { mfaSecret: secret } });
}

export async function enableUserMfa(userId: string) {
  await prisma.user.update({ where: { id: userId }, data: { mfaEnabled: true } });
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

/** MFA required (not just available) for Admin and Assessor — Phase 1. */
export function mfaRequiredForRole(role: Role): boolean {
  return role === "ADMIN" || role === "ASSESSOR";
}

// --- Password reset tokens (in-memory, short-lived — not worth persisting) ---

interface ResetToken {
  email: string;
  expiresAt: number;
}

const resetTokens = new Map<string, ResetToken>();

export function createResetToken(email: string): string {
  const token = crypto.randomUUID();
  resetTokens.set(token, { email, expiresAt: Date.now() + 30 * 60 * 1000 });
  return token;
}

export function consumeResetToken(token: string): string | null {
  const entry = resetTokens.get(token);
  if (!entry) return null;
  resetTokens.delete(token);
  if (entry.expiresAt < Date.now()) return null;
  return entry.email;
}
