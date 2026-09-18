"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { respondToNc } from "@/lib/portal/nc-actions";
import { NC_RESPONSE_TYPE_LABEL, type NcResponseEntryRow, type NcResponseType } from "@/lib/portal/nc-data";

export function NcResponseThread({ responses }: { responses: NcResponseEntryRow[] }) {
  if (responses.length === 0) {
    return <p className="font-sans text-sm text-text-muted">No responses submitted yet.</p>;
  }
  return (
    <div className="flex flex-col gap-3">
      {responses.map((r) => (
        <div key={r.id} className="rounded-md border border-border bg-surface p-4">
          <p className="font-sans text-xs font-medium text-text-muted">
            {NC_RESPONSE_TYPE_LABEL[r.type]} — {r.submittedByName}, {new Date(r.submittedAt).toLocaleString()}
          </p>
          <p className="mt-1 font-sans text-sm text-text">{r.body}</p>
        </div>
      ))}
    </div>
  );
}

export function NcResponseForm({ ncId, locked }: { ncId: string; locked: boolean }) {
  const router = useRouter();
  const { toast } = useToast();
  const [type, setType] = React.useState<Exclude<NcResponseType, "ASSESSOR_REMARK">>("ROOT_CAUSE");
  const [body, setBody] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  if (locked) {
    return (
      <p className="font-sans text-sm font-medium text-success-text">
        The AB has already approved this NC&apos;s response — further changes are disabled.
      </p>
    );
  }

  async function handleSubmit() {
    setSubmitting(true);
    const result = await respondToNc(ncId, type, body);
    setSubmitting(false);
    if (!result.ok) return toast({ tone: "error", persistent: true, title: "Couldn't submit", description: result.error });
    toast({ tone: "success", title: "Response submitted" });
    setBody("");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="font-sans text-xs font-medium text-text-muted" htmlFor="nc-response-type">Response type</label>
        <Select id="nc-response-type" value={type} onChange={(e) => setType(e.target.value as typeof type)} className="mt-1">
          <option value="ROOT_CAUSE">Root Cause Analysis</option>
          <option value="CORRECTION">Proposed Correction</option>
          <option value="CORRECTIVE_ACTION">Proposed Corrective Action</option>
        </Select>
      </div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        placeholder="Describe your response..."
        className="w-full rounded-[6px] border border-border bg-surface px-3 py-2 font-sans text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
      />
      <Button variant="primary" size="sm" onClick={handleSubmit} disabled={!body.trim()} loading={submitting} className="self-start">
        Submit response
      </Button>
    </div>
  );
}
