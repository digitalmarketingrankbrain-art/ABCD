import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact | Meridian Accreditation Board",
  description: "Contact us — general enquiries, applicant questions, media, complaints, and fraud reports are routed to the right team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader breadcrumbs={[{ label: "Contact" }]} title="Contact" />
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[1fr_320px]">
        <ContactForm />
        <aside className="flex flex-col gap-6">
          <div>
            <h2 className="font-sans text-sm font-semibold text-text">Registered address</h2>
            <p className="mt-1 font-sans text-sm text-text-muted">To be published here.</p>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold text-text">Response time</h2>
            <p className="mt-1 font-sans text-sm text-text-muted">
              We aim to respond to all enquiries as quickly as possible. A specific response-time
              commitment will be published here once finalized.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
