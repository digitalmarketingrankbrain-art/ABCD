import { auth } from "@/auth";

export default async function ApplicantDashboardPlaceholder() {
  const session = await auth();
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-sans text-xs uppercase tracking-[0.02em] text-accent">Applicant Portal</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-text">
        Signed in as {session?.user?.name}
      </h1>
      <p className="mt-2 max-w-lg font-sans text-sm text-text-muted">
        Authentication, session management, and role-based routing are working.
        The real Applicant dashboard (application status, required actions,
        documents, invoices) is built in Milestone 8.
      </p>
    </div>
  );
}
