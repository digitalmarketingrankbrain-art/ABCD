import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { TOTP, Secret } from "otpauth";
import {
  findUserByEmail,
  findUserById,
  verifyPassword,
  type Role,
} from "@/lib/auth/store";

export function verifyTotpCode(secret: string, code: string): boolean {
  const totp = new TOTP({ secret: Secret.fromBase32(secret), digits: 6, period: 30 });
  // Allow the immediately-adjacent time step either side, for clock drift.
  return totp.validate({ token: code, window: 1 }) !== null;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        mfaCode: {},
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        const mfaCode = credentials?.mfaCode as string | undefined;
        if (!email || !password) return null;

        const user = findUserByEmail(email);
        if (!user || user.status !== "ACTIVE") return null;
        if (!verifyPassword(user, password)) return null;

        if (user.mfaEnabled) {
          if (!user.mfaSecret || !mfaCode || !verifyTotpCode(user.mfaSecret, mfaCode)) {
            return null;
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.role = (user as { role: Role }).role;
        token.id = user.id;
        token.mfaEnabled = (user.id && findUserById(user.id)?.mfaEnabled) ?? false;
      }
      // Client calls useSession().update() after enrolling in MFA so the
      // token reflects the change without requiring a full re-login.
      if (trigger === "update") {
        token.mfaEnabled = findUserById(token.id as string)?.mfaEnabled ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.mfaEnabled = token.mfaEnabled as boolean;
      }
      return session;
    },
  },
});
