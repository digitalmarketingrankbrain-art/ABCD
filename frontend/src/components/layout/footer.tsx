"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ShieldCheck, Award, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FOOTER_GROUPS } from "@/lib/nav";
import { SaafLogo } from "@/components/ui/saaf-logo";

/**
 * Institutional Footer for South Asia Accreditation Foundation (SAAF).
 */
function Footer() {
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);

  return (
    <footer className="border-t border-slate-200 bg-slate-50/60 text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <SaafLogo variant="horizontal" size="md" className="h-10" lightMode={false} />
              </div>
              <p className="text-xs leading-relaxed text-slate-600 font-medium">
                South Asia Accreditation Foundation (SAAF) is an independent, non-profit accreditation body operating in full compliance with ISO/IEC 17011 standards across South Asia.
              </p>
            </div>

            {/* ISO Standard Compliance Badge */}
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2.5 shadow-2xs">
              <Award className="size-4 shrink-0 text-blue-600" />
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                Operating as per ISO/IEC 17011 International Standards
              </span>
            </div>
          </div>

          {/* Links Columns Grid */}
          <div className="hidden grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:col-span-9 sm:grid">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.label} className="flex flex-col">
                <p className="mb-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5">
                  {group.label}
                </p>
                <ul className="flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-[12px] font-medium text-slate-600 transition-colors hover:text-blue-600 leading-tight block"
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
          <div className="flex flex-col divide-y divide-slate-200 border-y border-slate-200 lg:hidden">
            {FOOTER_GROUPS.map((group) => {
              const isOpen = openGroup === group.label;
              return (
                <div key={group.label}>
                  <button
                    aria-expanded={isOpen}
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    className="flex w-full items-center justify-between py-2.5 text-xs font-bold text-slate-900"
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={cn("size-3.5 text-slate-500 transition-transform", isOpen && "rotate-180")}
                    />
                  </button>
                  {isOpen && (
                    <ul className="flex flex-col gap-1.5 pb-3 pl-2">
                      {group.links.map((link) => (
                        <li key={link.href + link.label}>
                          <Link
                            href={link.href}
                            className="text-xs text-slate-600 hover:text-blue-600"
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

        {/* Legal & Copyright Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-5 text-[11px] text-slate-500 sm:flex-row">
          <p className="font-medium">
            © {new Date().getFullYear()} South Asia Accreditation Foundation (SAAF). All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3 font-medium">
            <Link href="/legal/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <span className="text-slate-300">•</span>
            <Link href="/legal/terms-of-use" className="hover:text-blue-600 transition-colors">Terms of Use</Link>
            <span className="text-slate-300">•</span>
            <Link href="/complaints-and-appeals" className="hover:text-blue-600 transition-colors">Complaints & Appeals</Link>
            <span className="text-slate-300">•</span>
            <Link href="/report-fraud" className="hover:text-blue-600 transition-colors">Report Fraud</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };

