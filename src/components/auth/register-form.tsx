"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { registerApplicant, requestLoginOtp } from "@/lib/auth/actions";

type Step = "details" | "otp";

function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = React.useState<Step>("details");
  const [organisationName, setOrganisationName] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [devCode, setDevCode] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await registerApplicant({ email, name, organisationName });
    if (!result.ok) {
      setLoading(false);
      setError(result.error);
      return;
    }

    const otpResult = await requestLoginOtp(email, ["APPLICANT"]);
    setLoading(false);
    if (!otpResult.ok) {
      setError("wrongPortal" in otpResult && otpResult.wrongPortal ? "Something went wrong. Try logging in instead." : otpResult.error);
      return;
    }
    setDevCode(otpResult.devCode);
    setStep("otp");
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await signIn("credentials", { email, otp, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError("That code didn't match or has expired. Try again.");
      return;
    }
    router.push("/portal/applicant");
  }

  if (step === "otp") {
    return (
      <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5">
        <p className="font-sans text-sm text-text-muted">
          Enter the 6-digit code sent for <span className="font-medium text-text">{email}</span>.
        </p>
        {error && <Alert tone="error" title="Sign in failed">{error}</Alert>}
        {devCode && (
          <Alert tone="info" title="[DEV ONLY] No email/SMS provider is connected yet">
            <p>This code would normally be sent to your email. For now, here it is:</p>
            <p className="mt-1 font-mono text-lg text-text">{devCode}</p>
          </Alert>
        )}
        <FormField label="One-time code" htmlFor="otp" required>
          <Input
            id="otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            autoFocus
            required
          />
        </FormField>
        <Button type="submit" variant="primary" loading={loading}>
          {loading ? "Verifying…" : "Verify and continue"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-5">
      {error && <Alert tone="error" title="We couldn't create your account">{error}</Alert>}
      <FormField label="Organisation name" htmlFor="organisationName" required>
        <Input id="organisationName" value={organisationName} onChange={(e) => setOrganisationName(e.target.value)} required />
      </FormField>
      <FormField label="Your name" htmlFor="name" required>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </FormField>
      <FormField label="Email" htmlFor="email" required>
        <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </FormField>
      <Button type="submit" variant="primary" loading={loading}>
        {loading ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}

export { RegisterForm };
