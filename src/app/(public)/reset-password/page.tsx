import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Alert } from "@/components/ui/alert";

export const metadata: Metadata = {
  title: "Reset Password | Meridian Accreditation Board",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <h1 className="font-display text-2xl font-semibold text-text">Reset password</h1>
      <div className="mt-8">
        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <Alert tone="error" title="Missing reset token">
            This link is missing its reset token. Request a new one from the Forgot Password page.
          </Alert>
        )}
      </div>
    </div>
  );
}
