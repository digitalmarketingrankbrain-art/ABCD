"use client";

import * as React from "react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { changeOwnPassword } from "@/lib/auth/actions";

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    const result = await changeOwnPassword(currentPassword, newPassword);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <Alert tone="error" title="Couldn't change password">{error}</Alert>}
      {success && <Alert tone="success" title="Password updated" />}
      <FormField label="Current password" htmlFor="currentPassword" required>
        <Input
          id="currentPassword"
          type="password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </FormField>
      <FormField label="New password" htmlFor="newPassword" required hint="At least 10 characters.">
        <Input
          id="newPassword"
          type="password"
          autoComplete="new-password"
          minLength={10}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </FormField>
      <Button type="submit" variant="secondary" disabled={loading} className="self-start">
        {loading ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}

export { ChangePasswordForm };
