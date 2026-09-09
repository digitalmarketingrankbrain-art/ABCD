import Link from "next/link";
import { auth } from "@/auth";
import { ChangePasswordForm } from "@/components/portal/change-password-form";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

export default async function SecurityPage() {
  const session = await auth();

  return (
    <div className="max-w-md px-6 py-8">
      <h1 className="font-display text-2xl font-semibold text-text">Security</h1>

      <section className="mt-6">
        <h2 className="font-sans text-sm font-semibold text-text">Password</h2>
        <div className="mt-3">
          <ChangePasswordForm />
        </div>
      </section>

      <section className="mt-8 border-t border-border pt-6">
        <h2 className="font-sans text-sm font-semibold text-text">Multi-factor authentication</h2>
        <p className="mt-1 font-sans text-sm text-text-muted">
          Optional but encouraged for your role.
        </p>
        <div className="mt-3 flex items-center gap-3">
          <StatusBadge
            tone={session?.user?.mfaEnabled ? "success" : "neutral"}
            label={session?.user?.mfaEnabled ? "Enabled" : "Not enabled"}
            size="sm"
          />
          {!session?.user?.mfaEnabled && (
            <Link href="/portal/mfa-setup">
              <Button variant="secondary" size="sm">Set up MFA</Button>
            </Link>
          )}
        </div>
      </section>

      <section className="mt-8 border-t border-border pt-6">
        <h2 className="font-sans text-sm font-semibold text-text">Active sessions</h2>
        <p className="mt-1 font-sans text-sm text-text-muted">
          [PLACEHOLDER — this deployment uses stateless (JWT) sessions, which
          don&apos;t support server-side session enumeration/revocation without
          a database-backed session store. Revisit if per-session revoke
          becomes a real requirement — Auth.js supports a database session
          strategy for exactly this.]
        </p>
      </section>
    </div>
  );
}
