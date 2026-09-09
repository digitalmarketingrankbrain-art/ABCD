"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { AssessmentCriterion, Finding, FindingStatus } from "@/lib/portal/assessor-data";
import { saveFinding } from "@/lib/portal/assessor-actions";

function CriterionRow({
  assignmentId,
  criterion,
  finding,
}: {
  assignmentId: string;
  criterion: AssessmentCriterion;
  finding?: Finding;
}) {
  const router = useRouter();
  const [status, setStatus] = React.useState<FindingStatus>(finding?.status ?? "UNANSWERED");
  const [notes, setNotes] = React.useState(finding?.notes ?? "");
  const [severity, setSeverity] = React.useState<"MINOR" | "MAJOR" | "">(finding?.severity ?? "");
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  async function handleSave() {
    setSaving(true);
    await saveFinding(assignmentId, criterion.id, status, notes, severity || null);
    setSaving(false);
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="font-sans text-xs font-medium uppercase tracking-[0.02em] text-text-muted">{criterion.category}</p>
      <p className="mt-1 font-sans text-sm text-text">{criterion.requirementText}</p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[200px_1fr]">
        <Select value={status} onChange={(e) => setStatus(e.target.value as FindingStatus)}>
          <option value="UNANSWERED">Not yet assessed</option>
          <option value="CONFORMS">Conforms</option>
          <option value="NON_CONFORMANCE">Non-conformance</option>
          <option value="OBSERVATION">Observation</option>
          <option value="NOT_APPLICABLE">Not applicable</option>
        </Select>
        {status === "NON_CONFORMANCE" && (
          <Select value={severity} onChange={(e) => setSeverity(e.target.value as "MINOR" | "MAJOR" | "")}>
            <option value="">Select severity</option>
            <option value="MINOR">Minor</option>
            <option value="MAJOR">Major</option>
          </Select>
        )}
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        placeholder="Notes / evidence reference"
        className="mt-3 w-full rounded-[6px] border border-border bg-surface px-3 py-2 font-sans text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
      />

      <div className="mt-3 flex items-center gap-3">
        <Button variant="secondary" size="sm" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save finding"}
        </Button>
        {saved && <span className="font-sans text-xs text-success-text">Saved</span>}
      </div>
    </div>
  );
}

function AssignmentChecklist({
  assignmentId,
  criteria,
  findings,
}: {
  assignmentId: string;
  criteria: AssessmentCriterion[];
  findings: Record<string, Finding>;
}) {
  if (criteria.length === 0) {
    return <p className="font-sans text-sm text-text-muted">Accept this assignment to load the assessment checklist.</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      {criteria.map((c) => (
        <CriterionRow key={c.id} assignmentId={assignmentId} criterion={c} finding={findings[c.id]} />
      ))}
    </div>
  );
}

export { AssignmentChecklist };
