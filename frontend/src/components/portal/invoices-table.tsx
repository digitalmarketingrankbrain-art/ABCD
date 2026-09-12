"use client";

import { useRouter } from "next/navigation";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Invoice } from "@/lib/portal/applicant-data";
import { INVOICE_STATUS_STYLE } from "@/lib/portal/invoice-status";

function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  const router = useRouter();

  const columns: DataTableColumn<Invoice>[] = [
    { key: "invoiceNumber", header: "Invoice", mono: true, render: (i) => i.invoiceNumber },
    { key: "description", header: "Description", render: (i) => i.description },
    {
      key: "amount",
      header: "Amount",
      mono: true,
      align: "right",
      render: (i) => `${i.currency} ${i.amount.toLocaleString()}`,
    },
    {
      key: "status",
      header: "Status",
      render: (i) => {
        const s = INVOICE_STATUS_STYLE[i.status];
        return <StatusBadge tone={s.tone} label={s.label} size="sm" />;
      },
    },
    { key: "dueAt", header: "Due", mono: true, align: "right", render: (i) => i.dueAt },
  ];

  return (
    <DataTable
      columns={columns}
      rows={invoices}
      getRowKey={(i) => i.id}
      onRowClick={(i) => router.push(`/portal/applicant/invoices/${i.id}`)}
    />
  );
}

export { InvoicesTable };
