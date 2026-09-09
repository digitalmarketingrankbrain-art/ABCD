import bcrypt from "bcryptjs";

export type Role = "APPLICANT" | "ASSESSOR" | "ADMIN";

export interface AuthUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: Role;
  organisationName?: string;
  mfaEnabled: boolean;
  mfaSecret: string | null;
  status: "ACTIVE" | "SUSPENDED" | "LOCKED";
}

/**
 * In-memory placeholder user store — module-scoped, resets on server
 * restart. Stands in for the Phase 12 `User` table until the real database
 * lands in Milestone 11. MFA is deliberately left disabled on the seed
 * accounts (rather than pre-enrolled) so the "MFA required for Admin/
 * Assessor" enforcement from Phase 1 is actually exercised on first login,
 * not just declared.
 */
const DEMO_PASSWORD_HASH = "$2b$10$gfixhPAnYYhLd.ZJNJ2N4u1dNQNBCEDStlrQwjiye8dG8.G/eGx/W"; // "Password123!"

export const users: AuthUser[] = [
  {
    id: "user-applicant-demo",
    email: "applicant@example.com",
    passwordHash: DEMO_PASSWORD_HASH,
    name: "Alex Applicant",
    role: "APPLICANT",
    organisationName: "Northfield Testing Laboratories",
    mfaEnabled: false,
    mfaSecret: null,
    status: "ACTIVE",
  },
  {
    id: "user-assessor-demo",
    email: "assessor@example.com",
    passwordHash: DEMO_PASSWORD_HASH,
    name: "Sam Assessor",
    role: "ASSESSOR",
    mfaEnabled: false,
    mfaSecret: null,
    status: "ACTIVE",
  },
  {
    id: "user-admin-demo",
    email: "admin@example.com",
    passwordHash: DEMO_PASSWORD_HASH,
    name: "Jordan Admin",
    role: "ADMIN",
    mfaEnabled: false,
    mfaSecret: null,
    status: "ACTIVE",
  },
];

export function findUserByEmail(email: string): AuthUser | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): AuthUser | undefined {
  return users.find((u) => u.id === id);
}

export function createApplicantUser(input: {
  email: string;
  password: string;
  name: string;
  organisationName: string;
}): AuthUser {
  const user: AuthUser = {
    id: `user-${Date.now()}`,
    email: input.email,
    passwordHash: bcrypt.hashSync(input.password, 10),
    name: input.name,
    role: "APPLICANT",
    organisationName: input.organisationName,
    mfaEnabled: false,
    mfaSecret: null,
    status: "ACTIVE",
  };
  users.push(user);
  return user;
}

export function verifyPassword(user: AuthUser, password: string): boolean {
  return bcrypt.compareSync(password, user.passwordHash);
}

export function setUserPassword(userId: string, password: string) {
  const user = findUserById(userId);
  if (user) user.passwordHash = bcrypt.hashSync(password, 10);
}

export function setUserMfaSecret(userId: string, secret: string) {
  const user = findUserById(userId);
  if (user) user.mfaSecret = secret;
}

export function enableUserMfa(userId: string) {
  const user = findUserById(userId);
  if (user) user.mfaEnabled = true;
}

/** MFA required (not just available) for Admin and Assessor — Phase 1. */
export function mfaRequiredForRole(role: Role): boolean {
  return role === "ADMIN" || role === "ASSESSOR";
}

// --- Password reset tokens (in-memory, short-lived) ---

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
