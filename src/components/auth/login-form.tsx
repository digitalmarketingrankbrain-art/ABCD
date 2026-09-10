"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { checkCredentials } from "@/lib/auth/actions";

type Step = "credentials" | "mfa";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/portal";

  const [step, setStep] = React.useState<Step>("credentials");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mfaCode, setMfaCode] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function handleCredentialsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await checkCredentials(email, password);
    setLoading(false);

    if (!result.ok) {
      setError(
        "rateLimited" in result && result.rateLimited
          ? "Too many sign-in attempts. Wait 15 minutes and try again."
          : "Incorrect email or password.",
      );
      return;
    }
    if (result.mfaRequired) {
      setStep("mfa");
      return;
    }
    await completeSignIn();
  }

  async function handleMfaSubmit(e: React.FormEvent) {
    e.preventDefault();
    await completeSignIn();
  }

  async function completeSignIn() {
    setError(null);
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      mfaCode,
      redirect: false,
    });
    setLoading(false);

    if (result?.error) {
      setError(
        step === "mfa"
          ? "That code didn't match. Check your authenticator app and try again."
          : "Incorrect email or password.",
      );
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  if (step === "mfa") {
    return (
      <form onSubmit={handleMfaSubmit} className="flex flex-col gap-5">
        <p className="font-sans text-sm text-text-muted">
          Enter the 6-digit code from your authenticator app.
        </p>
        {error && <Alert tone="error" title="Sign in failed">{error}</Alert>}
        <FormField label="Authentication code" htmlFor="mfaCode" required>
          <Input
            id="mfaCode"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={mfaCode}
            onChange={(e) => setMfaCode(e.target.value)}
            autoFocus
            required
          />
        </FormField>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Verifying…" : "Verify and sign in"}
        </Button>
        <button
          type="button"
          onClick={() => setStep("credentials")}
          className="font-sans text-sm text-text-muted hover:underline"
        >
          ← Back
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleCredentialsSubmit} className="flex flex-col gap-5">
      {error && <Alert tone="error" title="Sign in failed">{error}</Alert>}
      <FormField label="Email" htmlFor="email" required>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          required
        />
      </FormField>
      <FormField label="Password" htmlFor="password" required>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormField>
      <div className="flex items-center justify-between">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
        <Link href="/forgot-password" className="font-sans text-sm text-secondary hover:underline">
          Forgot password?
        </Link>
      </div>
    </form>
  );
}

export { LoginForm };
