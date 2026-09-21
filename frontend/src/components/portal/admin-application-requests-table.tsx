"use client";

import { useRouter } from "next/navigation";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { StatusBadge, type StatusTone } from "@/components/ui/status-badge";
import type { ApplicationRequestStatus, ApplicationRequestSummary } from "@/lib/portal/application-requests-data";

export const REQUEST_STATUS_TONE: Record<ApplicationRequestStatus, StatusTone> = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "error",
};

export const REQUEST_STATUS_LABEL: Record<ApplicationRequestStatus, string> = {
  PENDING: "Pending review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

function AdminApplicationRequestsTable({ rows }: { rows: ApplicationRequestSummary[] }) {
  const router = useRouter();

  const columns: DataTableColumn<ApplicationRequestSummary>[] = [
    { key: "companyName", header: "Organisation", render: (r) => r.companyName },
    { key: "contactName", header: "Contact", render: (r) => r.contactName },
    { key: "email", header: "Email", render: (r) => r.email },
    { key: "referenceId", header: "Reference", mono: true, render: (r) => r.referenceId },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusBadge tone={REQUEST_STATUS_TONE[r.status]} label={REQUEST_STATUS_LABEL[r.status]} size="sm" />,
    },
    {
      key: "createdAt",
      header: "Submitted",
      mono: true,
      align: "right",
      render: (r) => new Date(r.createdAt).toISOString().slice(0, 10),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={rows}
      getRowKey={(r) => r.id}
      onRowClick={(r) => router.push(`/portal/admin/application-requests/${r.id}`)}
    />
  );
}

export { AdminApplicationRequestsTable };
