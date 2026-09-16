import { prisma } from "@/lib/prisma";

/**
 * Global document oversight (Phase 10) — reads real Document/DocumentVersion
 * rows from Postgres directly, with working authenticated download links via
 * /api/documents/[versionId] (Milestone 13). Applications themselves are
 * still in-memory (remaining Milestone 12 work), so ownerId below is shown
 * as a raw reference rather than a resolved organisation name for now.
 */
type DocumentWithVersion = {
  id: string;
  ownerType: string;
  ownerId: string;
  documentKind: string;
  currentVersion?: {
    id: string;
    filename: string;
    sizeBytes: number;
    uploadedAt: Date | string;
    reviewStatus: string;
  } | null;
};

export default async function AdminDocumentsPage() {
  const documents = (await prisma.document.findMany({
    include: { currentVersion: true },
    orderBy: { createdAt: "desc" },
  })) as unknown as DocumentWithVersion[];

  return (
    <div className="px-6 py-8">
      <h1 className="font-display text-2xl font-semibold text-text">Documents</h1>
      <p className="mt-1 font-sans text-sm text-text-muted">
        Every uploaded file, stored privately and served only through an authenticated download link.
      </p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-background-portal">
            <tr>
              <th className="border-b border-border px-4 py-3 text-left font-sans text-xs font-medium uppercase tracking-[0.02em] text-text-muted">Owner</th>
              <th className="border-b border-border px-4 py-3 text-left font-sans text-xs font-medium uppercase tracking-[0.02em] text-text-muted">Kind</th>
              <th className="border-b border-border px-4 py-3 text-left font-sans text-xs font-medium uppercase tracking-[0.02em] text-text-muted">Filename</th>
              <th className="border-b border-border px-4 py-3 text-left font-sans text-xs font-medium uppercase tracking-[0.02em] text-text-muted">Size</th>
              <th className="border-b border-border px-4 py-3 text-left font-sans text-xs font-medium uppercase tracking-[0.02em] text-text-muted">Uploaded</th>
              <th className="border-b border-border px-4 py-3 text-left font-sans text-xs font-medium uppercase tracking-[0.02em] text-text-muted">Status</th>
              <th className="border-b border-border px-4 py-3 text-left font-sans text-xs font-medium uppercase tracking-[0.02em] text-text-muted"></th>
            </tr>
          </thead>
          <tbody>
            {documents.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center font-sans text-sm text-text-muted">
                  No documents uploaded yet.
                </td>
              </tr>
            )}
            {documents.map((d: DocumentWithVersion) => (
              <tr key={d.id} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3 font-mono text-xs text-text">{d.ownerType} · {d.ownerId}</td>
                <td className="px-4 py-3 text-text-muted">{d.documentKind}</td>
                <td className="px-4 py-3 text-text">{d.currentVersion?.filename ?? "—"}</td>
                <td className="px-4 py-3 font-mono text-xs text-text-muted">
                  {d.currentVersion ? `${(d.currentVersion.sizeBytes / 1024).toFixed(1)} KB` : "—"}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-text-muted">
                  {d.currentVersion ? new Date(d.currentVersion.uploadedAt).toISOString().slice(0, 19).replace("T", " ") : "—"}
                </td>
                <td className="px-4 py-3 text-text-muted">{d.currentVersion?.reviewStatus ?? "—"}</td>
                <td className="px-4 py-3">
                  {d.currentVersion && (
                    <a
                      href={`/api/documents/${d.currentVersion.id}`}
                      className="font-sans text-sm font-medium text-secondary hover:underline"
                    >
                      Download
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
