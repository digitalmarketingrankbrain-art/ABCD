"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ShieldCheck, Globe, Award, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FOOTER_GROUPS } from "@/lib/nav";
import { SaafLogo } from "@/components/ui/saaf-logo";

/**
 * Institutional Footer for South Asia Accreditation Foundation (SAAF).
 */
function Footer() {
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);

  return (
    <footer className="border-t-4 border-amber-500 bg-[#062863] text-white">
      {/* Top Banner inside Footer */}
      <div className="border-b border-white/10 bg-[#03112B]/70 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <Globe className="size-5 text-blue-300" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-100">
              South Asia Regional Accreditation Oversight & Integrity Network
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-blue-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-400" /> ISO/IEC 17011 Standards
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="size-3.5 text-amber-400" /> Peer-Evaluated Rigor
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="mb-4">
              <SaafLogo variant="horizontal" size="lg" lightMode={true} />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-blue-100/80">
              South Asia Accreditation Foundation (SAAF) is an independent, international
              accreditation foundation. We evaluate, accredit, and continuously monitor testing laboratories,
              inspection bodies, and certification authorities across South Asia.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/verify"
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 transition-all hover:bg-amber-400 hover:shadow-lg"
              >
                <ShieldCheck className="size-4" />
                Verify Certificate
              </Link>
              <Link
                href="/about/who-we-are"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
              >
                About SAAF
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="hidden grid-cols-4 gap-8 lg:col-span-8 sm:grid">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="mb-4 font-sans text-xs font-bold uppercase tracking-wider text-amber-400">
                  {group.label}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-blue-100/75 transition-colors hover:text-white hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile Accordion */}
          <div className="flex flex-col divide-y divide-white/10 border-y border-white/10 lg:hidden">
            {FOOTER_GROUPS.map((group) => {
              const isOpen = openGroup === group.label;
              return (
                <div key={group.label}>
                  <button
                    aria-expanded={isOpen}
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    className="flex w-full items-center justify-between py-3.5 text-sm font-semibold text-white"
                  >
                    <span className="text-amber-300">{group.label}</span>
                    <ChevronDown
                      className={cn("size-4 text-blue-300 transition-transform", isOpen && "rotate-180")}
                    />
                  </button>
                  {isOpen && (
                    <ul className="flex flex-col gap-2.5 pb-4 pl-2">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-sm text-blue-100/80 hover:text-white"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-blue-200/60 sm:flex-row">
          <p>© {new Date().getFullYear()} South Asia Accreditation Foundation (SAAF). All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/legal/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <span>•</span>
            <Link href="/legal/terms-of-use" className="hover:text-white">Terms of Use</Link>
            <span>•</span>
            <Link href="/complaints-and-appeals" className="hover:text-white">Complaints & Appeals</Link>
            <span>•</span>
            <Link href="/report-fraud" className="hover:text-white">Report Fraud</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
