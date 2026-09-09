"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { PROGRAMS } from "@/lib/programs";
import { startNewApplication } from "@/lib/portal/applicant-actions";

function NewApplicationButton() {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [creating, setCreating] = React.useState(false);

  async function handleSelect(slug: string) {
    setCreating(true);
    const result = await startNewApplication(slug);
    setCreating(false);
    setOpen(false);
    if (!result.ok) {
      toast({ tone: "error", title: "Couldn't start application", description: result.error });
      return;
    }
    router.push(`/portal/applicant/applications/${result.applicationId}`);
  }

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        New application
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Choose a program">
        <div className="flex flex-col gap-2">
          {PROGRAMS.map((p) => (
            <button
              key={p.slug}
              disabled={creating}
              onClick={() => handleSelect(p.slug)}
              className="rounded-md border border-border px-4 py-3 text-left hover:border-secondary disabled:opacity-50"
            >
              <p className="font-sans text-sm font-medium text-text">{p.name}</p>
              <p className="mt-0.5 font-sans text-xs text-text-muted">{p.scopeDescription}</p>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}

export { NewApplicationButton };
