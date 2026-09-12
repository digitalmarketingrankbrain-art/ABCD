import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Log In | SAAF",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <h1 className="font-display text-2xl font-semibold text-text">Log in</h1>
      <p className="mt-1 font-sans text-sm text-text-muted">
        Choose the login that matches your account, then sign in below.
      </p>

      <div className="mt-8">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
