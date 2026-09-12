import { AssessorSidebar } from "@/components/portal/assessor-sidebar";

export default function AssessorPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl items-start">
      <AssessorSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
