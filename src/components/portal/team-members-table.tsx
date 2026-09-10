import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import type { TeamMemberEntry } from "@/lib/portal/cab-info-data";

const STATUS_TONE = { ACTIVE: "success", SUSPENDED: "warning", LOCKED: "error" } as const;

/** Server-rendered (no client interactivity yet) — read-only view of CB team members. */
function TeamMembersTable({ members }: { members: TeamMemberEntry[] }) {
  if (members.length === 0) {
    return <EmptyState title="No team members yet." description="Members added to this organisation will appear here." />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-background-portal">
          <tr>
            {["Name", "Role", "Email", "Status", "Access Level"].map((h) => (
              <th key={h} className="border-b border-border px-4 py-3 text-left font-sans text-xs font-medium uppercase tracking-[0.02em] text-text-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id} className="border-b border-border last:border-b-0">
              <td className="px-4 py-3 text-text">{m.name}</td>
              <td className="px-4 py-3 text-text">{m.title ?? "—"}</td>
              <td className="px-4 py-3 text-text">{m.email}</td>
              <td className="px-4 py-3">
                <StatusBadge tone={STATUS_TONE[m.status]} label={m.status === "ACTIVE" ? "Active" : m.status === "SUSPENDED" ? "Suspended" : "Locked"} size="sm" />
              </td>
              <td className="px-4 py-3 text-text">{m.membershipRole === "PRIMARY_CONTACT" ? "Primary Contact" : "Member"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { TeamMembersTable };
