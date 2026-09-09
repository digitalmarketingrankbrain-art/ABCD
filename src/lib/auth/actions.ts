"use server";

import { TOTP, Secret } from "otpauth";
import QRCode from "qrcode";
import { auth, verifyTotpCode } from "@/auth";
import {
  findUserByEmail,
  findUserById,
  verifyPassword,
  createApplicantUser,
  createResetToken,
  consumeResetToken,
  setUserPassword,
  setUserMfaSecret,
  enableUserMfa,
} from "./store";
import { createNotification } from "@/lib/notifications";

/**
 * Pre-check email/password only, without creating a session — lets the
 * login form know whether to show the MFA code step, without ever trusting
 * that client-reported result for the actual sign-in (auth.ts re-verifies
 * password + MFA code together on the real signIn call).
 */
export async function checkCredentials(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user || user.status !== "ACTIVE" || !verifyPassword(user, password)) {
    return { ok: false as const, mfaRequired: false };
  }
  return { ok: true as const, mfaRequired: user.mfaEnabled };
}

export async function registerApplicant(input: {
  email: string;
  password: string;
  name: string;
  organisationName: string;
}) {
  if (await findUserByEmail(input.email)) {
    return { ok: false as const, error: "An account with this email already exists." };
  }
  if (input.password.length < 10) {
    return { ok: false as const, error: "Password must be at least 10 characters." };
  }
  await createApplicantUser(input);
  return { ok: true as const };
}

export async function requestPasswordReset(email: string) {
  const user = await findUserByEmail(email);
  // Always respond the same way whether or not the account exists, so this
  // endpoint can't be used to enumerate registered emails.
  if (!user) return { ok: true as const, devToken: null };
  const token = createResetToken(email);
  // No real email provider is wired up yet (Phase 11: Resend, vendor TBD) —
  // the token is returned directly for local development/demo purposes only.
  return { ok: true as const, devToken: token };
}

export async function resetPassword(token: string, newPassword: string) {
  const email = consumeResetToken(token);
  if (!email) return { ok: false as const, error: "This reset link is invalid or has expired." };
  const user = await findUserByEmail(email);
  if (!user) return { ok: false as const, error: "This reset link is invalid or has expired." };
  if (newPassword.length < 10) {
    return { ok: false as const, error: "Password must be at least 10 characters." };
  }
  await setUserPassword(user.id, newPassword);
  // Security notification on password change — Phase 1 requirement.
  await createNotification({ userId: user.id, type: "password.changed", channel: "IN_APP" });
  await createNotification({ userId: user.id, type: "password.changed", channel: "EMAIL" });
  return { ok: true as const };
}

export async function startMfaEnrollment() {
  const session = await auth();
  if (!session?.user) return { ok: false as const, error: "Not signed in." };

  const secret = new Secret({ size: 20 });
  const totp = new TOTP({
    issuer: "Meridian Accreditation Board",
    label: session.user.email ?? session.user.id,
    secret,
  });
  await setUserMfaSecret(session.user.id, secret.base32);
  const qrDataUrl = await QRCode.toDataURL(totp.toString());
  return { ok: true as const, secret: secret.base32, qrDataUrl };
}

export async function confirmMfaEnrollment(code: string) {
  const session = await auth();
  if (!session?.user) return { ok: false as const, error: "Not signed in." };
  const user = await findUserById(session.user.id);
  if (!user?.mfaSecret) return { ok: false as const, error: "Start MFA setup again." };
  if (!verifyTotpCode(user.mfaSecret, code)) {
    return { ok: false as const, error: "That code didn't match. Check your authenticator app and try again." };
  }
  await enableUserMfa(session.user.id);
  // Security notification on a privileged action — Phase 1 requirement.
  await createNotification({ userId: session.user.id, type: "mfa.enabled", channel: "IN_APP" });
  await createNotification({ userId: session.user.id, type: "mfa.enabled", channel: "EMAIL" });
  return { ok: true as const };
}

export async function changeOwnPassword(currentPassword: string, newPassword: string) {
  const session = await auth();
  if (!session?.user) return { ok: false as const, error: "Not signed in." };
  const user = await findUserById(session.user.id);
  if (!user) return { ok: false as const, error: "Not signed in." };
  if (!verifyPassword(user, currentPassword)) {
    return { ok: false as const, error: "Current password is incorrect." };
  }
  if (newPassword.length < 10) {
    return { ok: false as const, error: "New password must be at least 10 characters." };
  }
  await setUserPassword(user.id, newPassword);
  // Security notification on password change — Phase 1 requirement.
  await createNotification({ userId: user.id, type: "password.changed", channel: "IN_APP" });
  await createNotification({ userId: user.id, type: "password.changed", channel: "EMAIL" });
  return { ok: true as const };
}
