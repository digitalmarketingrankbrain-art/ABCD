"use client";

import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import type { Program } from "@/lib/programs";

const columns: DataTableColumn<Program>[] = [
  { key: "name", header: "Program", render: (p) => p.name },
  {
    key: "fee",
    header: "Application Fee",
    align: "right",
    mono: true,
    render: () => "[PLACEHOLDER]",
  },
  {
    key: "annual",
    header: "Annual Fee",
    align: "right",
    mono: true,
    render: () => "[PLACEHOLDER]",
  },
];

function FeesTable({ programs }: { programs: Program[] }) {
  return <DataTable columns={columns} rows={programs} getRowKey={(p) => p.slug} />;
}

export { FeesTable };
