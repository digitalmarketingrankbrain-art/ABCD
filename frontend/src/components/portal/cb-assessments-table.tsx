"use client";

import { useRouter } from "next/navigation";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { StatusBadge, type StatusTone } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import type { CbAssessmentSummary, CbAssessmentStatus } from "@/lib/portal/cb-assessments-data";

const STATUS_TONE: Record<CbAssessmentStatus, StatusTone> = {
  SCHEDULED: "info",
  IN_PROGRESS: "warning",
  PENDING_REVIEW: "warning",
  COMPLETED: "success",
  CANCELLED: "neutral",
};

const STATUS_LABEL: Record<CbAssessmentStatus, string> = {
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In Progress",
  PENDING_REVIEW: "Pending Review",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const TYPE_LABEL: Record<CbAssessmentSummary["assessmentType"], string> = {
  WITNESS_ASSESSMENT: "Witness Assessment",
  OFFICE_ASSESSMENT: "Office Assessment",
  DOCUMENT_REVIEW: "Document Review",
};

function CbAssessmentsTable({ items, basePath }: { items: CbAssessmentSummary[]; basePath: string }) {
  const router = useRouter();

  if (items.length === 0) {
    return <EmptyState title="No assessments yet." description="Scheduled and completed assessments will appear here." />;
  }

  const columns: DataTableColumn<CbAssessmentSummary>[] = [
    { key: "assessmentNumber", header: "Assessment#", mono: true, render: (a) => a.assessmentNumber },
    { key: "assessmentType", header: "Assessment Type", render: (a) => TYPE_LABEL[a.assessmentType] },
    { key: "schemeNames", header: "Scheme Name", render: (a) => a.schemeNames.join(", ") || "—" },
    { key: "status", header: "Status", render: (a) => <StatusBadge tone={STATUS_TONE[a.status]} label={STATUS_LABEL[a.status]} size="sm" /> },
  ];

  return <DataTable columns={columns} rows={items} getRowKey={(a) => a.id} onRowClick={(a) => router.push(`${basePath}/${a.id}`)} />;
}

export { CbAssessmentsTable, STATUS_TONE, STATUS_LABEL, TYPE_LABEL };
