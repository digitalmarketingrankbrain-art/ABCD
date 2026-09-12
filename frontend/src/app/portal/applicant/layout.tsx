import { ApplicantSidebar } from "@/components/portal/applicant-sidebar";

export default function ApplicantPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl items-start">
      <ApplicantSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
