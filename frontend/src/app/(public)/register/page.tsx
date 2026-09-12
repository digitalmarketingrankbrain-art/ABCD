import Link from "next/link";
import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create an Account | SAAF",
};

/**
 * Applicant/organisation self-service signup — Assessor and Admin accounts
 * are provisioned internally instead (Phase 2/9 assumption).
 */
export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <h1 className="font-display text-2xl font-semibold text-text">Create an account</h1>
      <p className="mt-1 font-sans text-sm text-text-muted">
        For organisations applying for accreditation. Assessor and admin accounts are provisioned separately.
      </p>
      <div className="mt-8">
        <RegisterForm />
      </div>
      <p className="mt-8 font-sans text-sm text-text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-secondary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
