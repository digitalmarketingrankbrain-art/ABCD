import { AdminAccreditationRecordsTable } from "@/components/portal/admin-accreditation-records-table";
import { VERIFICATION_RECORDS } from "@/lib/verification-records";

export default async function AdminAccreditationRecordsPage() {
  return (
    <div className="px-6 py-8">
      <h1 className="font-display text-2xl font-semibold text-text">Accreditation Records</h1>
      <div className="mt-6">
        <AdminAccreditationRecordsTable records={VERIFICATION_RECORDS} />
      </div>
    </div>
  );
}
