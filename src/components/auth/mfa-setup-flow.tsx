"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Alert } from "@/components/ui/alert";
import { startMfaEnrollment, confirmMfaEnrollment } from "@/lib/auth/actions";

function MfaSetupFlow({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const { update } = useSession();
  const [secret, setSecret] = React.useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = React.useState<string | null>(null);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    startMfaEnrollment().then((result) => {
      if (result.ok) {
        setSecret(result.secret);
        setQrDataUrl(result.qrDataUrl);
      }
    });
  }, []);

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await confirmMfaEnrollment(code);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    await update();
    router.push(redirectTo);
    router.refresh();
  }

  if (!secret || !qrDataUrl) {
    return <p className="font-sans text-sm text-text-muted">Generating your setup key…</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-sans text-sm font-medium text-text">1. Scan this code</p>
        <p className="mt-1 font-sans text-sm text-text-muted">
          Using Google Authenticator, 1Password, or any TOTP app.
        </p>
        <Image src={qrDataUrl} alt="MFA setup QR code" width={200} height={200} className="mt-3 rounded-md border border-border" unoptimized />
      </div>
      <div>
        <p className="font-sans text-sm font-medium text-text">Or enter this key manually</p>
        <p className="mt-1 select-all rounded-md border border-border bg-background-portal px-3 py-2 font-mono text-xs text-text">
          {secret}
        </p>
      </div>
      <form onSubmit={handleConfirm} className="flex flex-col gap-4">
        <p className="font-sans text-sm font-medium text-text">2. Enter the 6-digit code</p>
        {error && <Alert tone="error" title="Couldn't confirm setup">{error}</Alert>}
        <FormField label="Authentication code" htmlFor="code" required>
          <Input
            id="code"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </FormField>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Confirming…" : "Enable MFA"}
        </Button>
      </form>
    </div>
  );
}

export { MfaSetupFlow };
