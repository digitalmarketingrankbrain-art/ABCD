import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Apply | SAAF",
  description: "Start an accreditation application.",
};

/**
 * A routing page, not a form — explains what happens next and hands off to
 * auth/portal, keeping the marketing site and transactional portal cleanly
 * separated (Phase 2). Portal itself is built in later milestones.
 */
export default function ApplyPage() {
  return (
    <PageHeader
      breadcrumbs={[{ label: "Accreditation", href: "/accreditation" }, { label: "Apply" }]}
      title="Start an application"
      description="Applications are submitted and tracked through your SAAF account. If you don't have one yet, you'll create one as part of starting your application."
    >
      <ol className="mt-6 flex flex-col gap-2 font-sans text-sm text-text-muted">
        <li>1. Sign in or create an account.</li>
        <li>2. Choose the program you&apos;re applying for.</li>
        <li>3. Complete your application and upload supporting documents — you can save a draft and return any time.</li>
      </ol>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/login" className={cn(buttonVariants({ variant: "primary" }))}>
          Sign in or create an account
        </Link>
        <Link href="/accreditation/programs" className={cn(buttonVariants({ variant: "tertiary" }))}>
          Not sure which program? Browse programs →
        </Link>
      </div>
    </PageHeader>
  );
}
