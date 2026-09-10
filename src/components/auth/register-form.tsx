"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { registerApplicant } from "@/lib/auth/actions";

function RegisterForm() {
  const router = useRouter();
  const [organisationName, setOrganisationName] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await registerApplicant({ email, password, name, organisationName });
    if (!result.ok) {
      setLoading(false);
      setError(result.error);
      return;
    }

    const signInResult = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (signInResult?.error) {
      setError("Account created, but sign-in failed. Try logging in directly.");
      return;
    }
    router.push("/portal/applicant");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
      <FormField label="Password" htmlFor="password" required hint="At least 10 characters.">
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          minLength={10}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormField>
      <Button type="submit" variant="primary" loading={loading}>
        {loading ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}

export { RegisterForm };
