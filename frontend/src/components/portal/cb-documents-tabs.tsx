"use client";

import * as React from "react";
import { FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { FileUploader } from "@/components/ui/file-uploader";
import { EmptyState } from "@/components/ui/empty-state";
import { uploadOrganisationDocument } from "@/lib/portal/cab-info-actions";
import type { ReferenceDocumentEntry } from "@/lib/portal/reference-documents";

export interface OrgDocumentEntry {
  id: string;
  filename: string;
  sizeBytes: number;
  uploadedAt: string;
  currentVersionId: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function CbDocumentsTabs({
  orgDocuments,
  referenceDocuments,
}: {
  orgDocuments: OrgDocumentEntry[];
  referenceDocuments: ReferenceDocumentEntry[];
}) {
  const [tab, setTab] = React.useState<"documents" | "saaf">("documents");

  async function handleUpload(file: File) {
    const result = await uploadOrganisationDocument(file);
    return { ok: result.ok, error: "error" in result ? result.error : undefined };
  }

  return (
    <div>
      <div role="tablist" className="mb-5 flex gap-6 border-b border-border">
        {(["documents", "saaf"] as const).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={cn(
              "-mb-px border-b-2 px-1 py-3 font-sans text-sm font-medium transition-colors",
              tab === key ? "border-accent text-text" : "border-transparent text-text-muted hover:text-text",
            )}
          >
            {key === "documents" ? "Documents" : "SAAF"}
          </button>
        ))}
      </div>

      {tab === "documents" ? (
        <div className="flex flex-col gap-6">
          <FileUploader onUpload={handleUpload} className="max-w-lg" />
          {orgDocuments.length === 0 ? (
            <EmptyState title="No documents uploaded yet." description="Files you upload will appear here." />
          ) : (
            <ul className="divide-y divide-border rounded-lg border border-border">
              {orgDocuments.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between gap-4 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <FileText className="size-4 shrink-0 text-text-muted" strokeWidth={1.75} />
                    <div>
                      <p className="font-sans text-sm text-text">{doc.filename}</p>
                      <p className="font-sans text-xs text-text-muted">
                        {formatBytes(doc.sizeBytes)} · Uploaded {doc.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`/api/documents/${doc.currentVersionId}`}
                    className="flex items-center gap-1.5 font-sans text-sm text-secondary hover:underline"
                  >
                    <Download className="size-3.5" strokeWidth={1.75} /> Download
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div>
          {referenceDocuments.length === 0 ? (
            <EmptyState title="No reference documents published yet." description="Checklists and forms issued by SAAF will appear here." />
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-background-portal">
                  <tr>
                    <th className="border-b border-border px-4 py-3 text-left font-sans text-xs font-medium uppercase tracking-[0.02em] text-text-muted">S.No</th>
                    <th className="border-b border-border px-4 py-3 text-left font-sans text-xs font-medium uppercase tracking-[0.02em] text-text-muted">Description</th>
                    <th className="border-b border-border px-4 py-3 text-left font-sans text-xs font-medium uppercase tracking-[0.02em] text-text-muted">Document</th>
                  </tr>
                </thead>
                <tbody>
                  {referenceDocuments.map((doc, i) => (
                    <tr key={doc.id} className="border-b border-border last:border-b-0">
                      <td className="px-4 py-3 text-text-muted">{i + 1}</td>
                      <td className="px-4 py-3 text-text">{doc.description}</td>
                      <td className="px-4 py-3">
                        <a href={`/api/reference-documents/${doc.id}`} className="flex items-center gap-1.5 font-sans text-secondary hover:underline">
                          <FileText className="size-3.5" strokeWidth={1.75} /> {doc.filename}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { CbDocumentsTabs };
