import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { Alert } from "@/components/ui/alert";

export const metadata: Metadata = {
  title: "Log In | Meridian Accreditation Board",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <h1 className="font-display text-2xl font-semibold text-text">Log in</h1>
      <p className="mt-1 font-sans text-sm text-text-muted">
        Applicants, assessors, and administrators all sign in here.
      </p>

      <div className="mt-8">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>

      <p className="mt-8 font-sans text-sm text-text-muted">
        New applicant organisation?{" "}
        <Link href="/register" className="text-secondary hover:underline">
          Create an account
        </Link>
      </p>

      <Alert tone="info" title="Demo credentials" className="mt-8">
        <p>applicant@example.com · assessor@example.com · admin@example.com</p>
        <p>Password: Password123!</p>
        <p className="mt-1 text-xs">
          Assessor/Admin accounts require MFA setup on first login — this is enforced, not just described.
        </p>
      </Alert>
    </div>
  );
}
