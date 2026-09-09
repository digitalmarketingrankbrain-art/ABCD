import { AdminUsersTable, type AdminUserRow } from "@/components/portal/admin-users-table";
import { users } from "@/lib/auth/store";

export default async function AdminUsersPage() {
  // Deliberately strip passwordHash/mfaSecret before this ever reaches a
  // Client Component — see the note in admin-users-table.tsx.
  const rows: AdminUserRow[] = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    mfaEnabled: u.mfaEnabled,
    status: u.status,
  }));

  return (
    <div className="px-6 py-8">
      <h1 className="font-display text-2xl font-semibold text-text">Users</h1>
      <div className="mt-6">
        <AdminUsersTable users={rows} />
      </div>
    </div>
  );
}
