import Link from "next/link";
import { AdminApplicationRequestsTable } from "@/components/portal/admin-application-requests-table";
import { listApplicationRequests, type ApplicationRequestStatus } from "@/lib/portal/application-requests-data";
import { cn } from "@/lib/utils";

const FILTERS: { label: string; value: ApplicationRequestStatus | undefined }[] = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "All", value: undefined },
];

export default async function AdminApplicationRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = FILTERS.find((f) => f.value === status)?.value ?? (status === "all" ? undefined : "PENDING");
  const rows = await listApplicationRequests(active);

  return (
    <div className="px-6 py-8">
      <h1 className="font-display text-2xl font-semibold text-text">Application Requests</h1>
      <p className="mt-1 font-sans text-sm text-text-muted">
        Organisations asking to become a certification body. Approve to create their account, or reject with a reason.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.label}
            href={`/portal/admin/application-requests?status=${f.value ?? "all"}`}
            className={cn(
              "rounded-full border px-3 py-1 font-sans text-sm",
              f.value === active ? "border-primary bg-primary text-white" : "border-border text-text hover:bg-slate-50",
            )}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="mt-4">
        <AdminApplicationRequestsTable rows={rows} />
      </div>
    </div>
  );
}
