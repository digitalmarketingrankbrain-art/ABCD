"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { HEADER_NAV, HEADER_SIMPLE_LINKS } from "@/lib/nav";

/**
 * Sticky header with a click-triggered mega menu (not hover-only, for touch/
 * accessibility parity) and a full-screen mobile nav. Per Phase 5: "Verify"
 * is a single distinct link, never folded into a dropdown, and the header's
 * primary CTA is Verify (not Apply) — it's the lowest-friction, highest-
 * frequency action and belongs in the persistent header on every page.
 */
function Header() {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-40">
      <div className="hidden bg-primary lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 font-sans text-xs font-semibold tracking-[0.08em] text-text-inverse/90 uppercase">
          <span>Independent Accreditation · Trusted Across South Asia</span>
          <Link href="/verify" className="hover:text-accent">
            Verify an Accreditation
          </Link>
        </div>
      </div>

      <div className="border-b border-border bg-surface shadow-[0_1px_0_rgba(13,43,32,0.04)]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <ShieldCheck className="size-6 text-primary" strokeWidth={1.75} />
            <span className="font-display text-sm font-bold tracking-tight text-text">
              SAAF
            </span>
          </Link>

          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {HEADER_NAV.map((group) => (
              <div key={group.label} className="relative">
                <button
                  aria-expanded={openMenu === group.label}
                  onClick={() =>
                    setOpenMenu(openMenu === group.label ? null : group.label)
                  }
                  className={cn(
                    "flex items-center gap-1 rounded-[6px] px-3 py-2 font-sans text-sm font-semibold text-text hover:bg-background",
                    openMenu === group.label && "bg-background",
                  )}
                >
                  {group.label}
                </button>
                {openMenu === group.label && (
                  <div className="absolute left-0 top-full mt-2 w-80 rounded-lg border border-border bg-surface p-2 shadow-[0_12px_28px_rgba(13,43,32,0.14)]">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpenMenu(null)}
                        className="block rounded-[6px] px-3 py-2 hover:bg-background"
                      >
                        <p className="font-sans text-sm font-semibold text-text">
                          {link.label}
                        </p>
                        {link.description && (
                          <p className="text-xs text-text-muted">{link.description}</p>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/verify"
              className="rounded-[6px] px-3 py-2 font-sans text-sm font-semibold text-secondary hover:bg-background"
            >
              Verify
            </Link>

            {HEADER_SIMPLE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[6px] px-3 py-2 font-sans text-sm font-semibold text-text hover:bg-background"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="font-sans text-sm font-semibold text-text hover:text-secondary"
            >
              Log In
            </Link>
            <Link
              href="/accreditation/apply"
              className={cn(buttonVariants({ variant: "primary", size: "sm" }), "h-9")}
            >
              Apply for Accreditation
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-[6px] p-2 text-text lg:hidden"
          >
            <Menu className="size-6" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-surface lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <span className="font-display text-sm font-bold text-text">
              SAAF
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="rounded-[6px] p-2 text-text"
            >
              <X className="size-6" strokeWidth={1.75} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <Link
              href="/verify"
              onClick={() => setMobileOpen(false)}
              className="mb-4 block rounded-md bg-background-portal px-4 py-3 font-sans text-sm font-semibold text-secondary"
            >
              Verify an Accreditation
            </Link>
            {HEADER_NAV.map((group) => (
              <div key={group.label} className="mb-6">
                <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.02em] text-text-muted">
                  {group.label}
                </p>
                <div className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      <p className="font-sans text-sm font-medium text-text">
                        {link.label}
                      </p>
                      {link.description && (
                        <p className="text-xs text-text-muted">{link.description}</p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-3 border-t border-border pt-4">
              {HEADER_SIMPLE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans text-sm font-medium text-text"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t border-border px-6 py-4">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              Log In
            </Link>
            <Link
              href="/accreditation/apply"
              onClick={() => setMobileOpen(false)}
              className={cn(buttonVariants({ variant: "primary" }), "w-full")}
            >
              Apply for Accreditation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export { Header };
