import { auth } from "@/auth";
import { mfaRequiredForRole } from "@/lib/auth/store";
import { MfaSetupFlow } from "@/components/auth/mfa-setup-flow";

const ROLE_HOME: Record<string, string> = {
  APPLICANT: "/portal/applicant",
  ASSESSOR: "/portal/assessor",
  ADMIN: "/portal/admin",
};

export default async function MfaSetupPage() {
  const session = await auth();
  const role = session?.user?.role ?? "APPLICANT";
  const required = mfaRequiredForRole(role);

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="font-display text-2xl font-semibold text-text">Set up multi-factor authentication</h1>
      <p className="mt-2 font-sans text-sm text-text-muted">
        {required
          ? "MFA is required for your role before you can continue."
          : "MFA is optional but encouraged for your role."}
      </p>
      <div className="mt-8">
        <MfaSetupFlow redirectTo={ROLE_HOME[role] ?? "/portal"} />
      </div>
    </div>
  );
}
