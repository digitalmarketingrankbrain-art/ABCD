"use client";

import * as React from "react";
import Link from "next/link";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { useToast } from "@/components/ui/toast";

const REDIRECT_CATEGORIES: Record<string, { label: string; href: string }> = {
  complaint: { label: "Complaints & Appeals", href: "/complaints-and-appeals" },
  fraud: { label: "Report Fraud / Impersonation", href: "/report-fraud" },
};

/**
 * Selecting Complaint or Fraud shows an inline notice suggesting the
 * dedicated page instead of silently accepting a misrouted message (Phase 6).
 */
function ContactForm() {
  const { toast } = useToast();
  const [category, setCategory] = React.useState("general");
  const redirect = REDIRECT_CATEGORIES[category];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast({
      tone: "success",
      title: "Message sent",
      description: "We've received your message and will route it to the right team.",
    });
    e.currentTarget.reset();
    setCategory("general");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FormField label="What is this about?" htmlFor="category">
        <Select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="general">General enquiry</option>
          <option value="applicant">Applicant enquiry</option>
          <option value="media">Media</option>
          <option value="complaint">Complaint or appeal</option>
          <option value="fraud">Report fraud / impersonation</option>
        </Select>
      </FormField>

      {redirect && (
        <Alert tone="info" title={`This is better handled on our ${redirect.label} page`}>
          <Link href={redirect.href} className="font-medium text-secondary hover:underline">
            Go to {redirect.label} →
          </Link>{" "}
          or continue below if you&apos;d prefer to send it this way.
        </Alert>
      )}

      <FormField label="Name" htmlFor="name" required>
        <Input id="name" name="name" required />
      </FormField>
      <FormField label="Email" htmlFor="email" required>
        <Input id="email" name="email" type="email" required />
      </FormField>
      <FormField label="Message" htmlFor="message" required>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-[6px] border border-border bg-surface px-3 py-2 font-sans text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
        />
      </FormField>
      <Button type="submit" variant="primary" className="self-start">
        Send message
      </Button>
    </form>
  );
}

export { ContactForm };
