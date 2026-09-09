import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { getInvoiceById } from "@/lib/portal/applicant-data";
import { INVOICE_STATUS_STYLE } from "@/lib/portal/invoice-status";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const invoice = getInvoiceById(id, session!.user.id);
  if (!invoice) notFound();
  const style = INVOICE_STATUS_STYLE[invoice.status];

  return (
    <div className="px-6 py-8">
      <Breadcrumbs items={[{ label: "Invoices", href: "/portal/applicant/invoices" }, { label: invoice.invoiceNumber }]} />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-2xl font-semibold text-text">{invoice.invoiceNumber}</h1>
        <StatusBadge tone={style.tone} label={style.label} />
      </div>

      <div className="mt-6 max-w-md rounded-lg border border-border bg-surface p-6">
        <div className="flex items-center justify-between border-b border-border py-2">
          <span className="font-sans text-sm text-text-muted">Description</span>
          <span className="font-sans text-sm text-text">{invoice.description}</span>
        </div>
        <div className="flex items-center justify-between border-b border-border py-2">
          <span className="font-sans text-sm text-text-muted">Amount</span>
          <span className="font-mono text-sm text-text">{invoice.currency} {invoice.amount.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between border-b border-border py-2">
          <span className="font-sans text-sm text-text-muted">Issued</span>
          <span className="font-mono text-sm text-text">{invoice.issuedAt}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="font-sans text-sm text-text-muted">Due</span>
          <span className="font-mono text-sm text-text">{invoice.dueAt}</span>
        </div>
      </div>

      {invoice.status === "ISSUED" && (
        <Button variant="primary" className="mt-6" disabled>
          Pay now
        </Button>
      )}
      {invoice.status === "ISSUED" && (
        <p className="mt-2 font-sans text-xs text-text-muted">
          [PLACEHOLDER — payment collection wired up in Milestone 15 (Payments), per Phase 11&apos;s Stripe decision]
        </p>
      )}
    </div>
  );
}
