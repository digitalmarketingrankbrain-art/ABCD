"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { FOOTER_GROUPS } from "@/lib/nav";

/**
 * Dense, structured footer on the dark primary surface (the one other large
 * use of the dark colour besides the homepage's final-CTA band). Columns
 * collapse into an accordion on mobile per Phase 5/6.
 */
function Footer() {
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);

  return (
    <footer className="border-t-2 border-accent bg-primary text-text-inverse">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-6 text-accent" strokeWidth={1.75} />
            <span className="font-display text-sm font-bold">SAAF</span>
          </div>
          <p className="mt-3 max-w-xs font-sans text-sm text-text-inverse/70">
            Independent, technically rigorous accreditation designed to strengthen trust in
            conformity assessment across South Asia.
          </p>
        </div>

        {/* Desktop: four link columns */}
        <div className="hidden grid-cols-4 gap-8 sm:grid">
          {FOOTER_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                {group.label}
              </p>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-text-inverse/90 hover:text-text-inverse hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile: accordion groups */}
        <div className="flex flex-col divide-y divide-text-inverse/15 border-y border-text-inverse/15 sm:hidden">
          {FOOTER_GROUPS.map((group) => {
            const isOpen = openGroup === group.label;
            return (
              <div key={group.label}>
                <button
                  aria-expanded={isOpen}
                  onClick={() => setOpenGroup(isOpen ? null : group.label)}
                  className="flex w-full items-center justify-between py-3 font-sans text-sm font-semibold"
                >
                  {group.label}
                  <ChevronDown
                    className={cn("size-4 transition-transform", isOpen && "rotate-180")}
                    strokeWidth={1.75}
                  />
                </button>
                {isOpen && (
                  <ul className="flex flex-col gap-2 pb-4">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="font-sans text-sm text-text-inverse/90 hover:underline"
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

        <div className="mt-10 border-t border-text-inverse/15 pt-6 font-sans text-xs text-text-inverse/60">
          <p>© {new Date().getFullYear()} SAAF.</p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
