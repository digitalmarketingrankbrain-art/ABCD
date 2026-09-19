import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ApplicationRequestForm } from "@/components/accreditation/application-request-form";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Application Request Form | SAAF Accreditation",
  description: "Submit an official Conformity Assessment Body (CAB) accreditation request to SAAF.",
};

export default function ApplyPage() {
  return (
    <div className="bg-slate-50/60 pb-16">
      <PageHeader
        breadcrumbs={[{ label: "Accreditation", href: "/accreditation" }, { label: "Apply" }]}
        title="Application Request Form"
        description="Conformity Assessment Bodies (CABs), laboratories, and inspection authorities can initiate their accreditation process by submitting the Application Request Form below."
      >
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link href="/login" className={cn(buttonVariants({ variant: "primary", size: "sm" }), "bg-blue-600 font-bold text-white hover:bg-blue-700")}>
            Already have an account? Sign In
          </Link>
          <Link href="/accreditation/programs" className={cn(buttonVariants({ variant: "tertiary", size: "sm" }))}>
            Browse Programs & Standards →
          </Link>
        </div>
      </PageHeader>

      <ApplicationRequestForm />
    </div>
  );
}

