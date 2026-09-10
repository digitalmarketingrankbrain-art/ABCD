"use client";

import * as React from "react";
import Link from "next/link";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { requestPasswordReset } from "@/lib/auth/actions";

function ForgotPasswordForm() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [devToken, setDevToken] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await requestPasswordReset(email);
    setLoading(false);
    setSubmitted(true);
    setDevToken(result.devToken);
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4">
        <Alert tone="success" title="Check your email">
          If an account exists for {email}, we&apos;ve sent a link to reset your password.
        </Alert>
        {devToken && (
          <Alert tone="warning" title="[DEV ONLY] No email provider is connected yet">
            <p>
              This link would normally arrive by email (Phase 11: Resend, vendor
              still to be confirmed). For local testing, use it directly:
            </p>
            <Link
              href={`/reset-password?token=${devToken}`}
              className="mt-1 block break-all font-mono text-xs text-secondary hover:underline"
            >
              /reset-password?token={devToken}
            </Link>
          </Alert>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FormField label="Email" htmlFor="email" required>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
      </FormField>
      <Button type="submit" variant="primary" loading={loading}>
        {loading ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}

export { ForgotPasswordForm };
