"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Search, Lock, ChevronDown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { HEADER_NAV, HEADER_SIMPLE_LINKS } from "@/lib/nav";
import { SaafLogo } from "@/components/ui/saaf-logo";

/**
 * Ultra-sleek Header featuring SAAF logo emblem with slim navbar height.
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
    <header ref={headerRef} className="sticky top-0 z-40 bg-surface shadow-sm">
      {/* Top Utility & Trust Bar - Slimmed */}
      <div className="bg-[#062863] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1 text-[11px] font-semibold sm:px-6">
          <div className="flex items-center gap-2 tracking-wide text-blue-100">
            <CheckCircle2 className="size-3.5 text-amber-400" />
            <span>South Asia Accreditation Foundation — Official Institutional Portal</span>
          </div>
          <div className="hidden items-center gap-6 sm:flex">
            <Link
              href="/verify"
              className="flex items-center gap-1.5 text-amber-300 transition-colors hover:text-white"
            >
              <Search className="size-3" />
              <span>Public Verification Register</span>
            </Link>
            <span className="text-blue-400/50">|</span>
            <Link
              href="/login"
              className="flex items-center gap-1 text-blue-100 transition-colors hover:text-white"
            >
              <Lock className="size-3" />
              <span>Portal Sign In</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Slim Navbar (h-13 sm:h-14) */}
      <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-13 sm:h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* SAAF Official Brand Logo - Reduced by 10px more */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <SaafLogo variant="horizontal" size="md" className="h-[39px] sm:h-[49px] transition-transform hover:scale-105" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {HEADER_NAV.map((group) => (
              <div key={group.label} className="relative">
                <button
                  aria-expanded={openMenu === group.label}
                  onClick={() =>
                    setOpenMenu(openMenu === group.label ? null : group.label)
                  }
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-1 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 hover:text-blue-900",
                    openMenu === group.label && "bg-blue-50 text-blue-900"
                  )}
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-slate-400 transition-transform duration-200",
                      openMenu === group.label && "rotate-180 text-blue-700"
                    )}
                  />
                </button>
                {openMenu === group.label && (
                  <div className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xl ring-1 ring-black/5 animate-fade-up">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpenMenu(null)}
                        className="block rounded-lg px-3.5 py-2.5 transition-colors hover:bg-blue-50/80"
                      >
                        <p className="text-sm font-semibold text-slate-900">
                          {link.label}
                        </p>
                        {link.description && (
                          <p className="mt-0.5 text-xs text-slate-500">
                            {link.description}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/verify"
              className="rounded-md px-3 py-1 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50"
            >
              Verify Certificate
            </Link>

            {HEADER_SIMPLE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-1 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <Link
              href="/login"
              className="rounded-md px-3 py-1 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              Log In
            </Link>
            <Link
              href="/accreditation/apply"
              className={cn(
                buttonVariants({ variant: "primary", size: "sm" }),
                "h-8 px-3.5 bg-[#0B4DA2] font-semibold text-white shadow-md shadow-blue-900/10 hover:bg-[#083B7E] hover:shadow-blue-900/20"
              )}
            >
              Apply for Accreditation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-100 lg:hidden"
          >
            <Menu className="size-6" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
          <div className="flex h-14 items-center justify-between border-b border-slate-200 px-6">
            <SaafLogo variant="horizontal" size="md" className="h-10" />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            >
              <X className="size-6" strokeWidth={2} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <Link
              href="/verify"
              onClick={() => setMobileOpen(false)}
              className="mb-6 flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-900 border border-blue-200/60"
            >
              <span className="flex items-center gap-2">
                <Search className="size-4 text-blue-700" />
                Verify an Accreditation
              </span>
              <span className="rounded bg-blue-700 px-2 py-0.5 text-[10px] text-white">LIVE</span>
            </Link>

            {HEADER_NAV.map((group) => (
              <div key={group.label} className="mb-6">
                <p className="mb-2 font-sans text-xs font-bold uppercase tracking-wider text-slate-400">
                  {group.label}
                </p>
                <div className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-2 py-1.5 hover:bg-slate-50"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {link.label}
                      </p>
                      {link.description && (
                        <p className="text-xs text-slate-500">{link.description}</p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-4">
              {HEADER_SIMPLE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold text-slate-800 hover:text-blue-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className={cn(buttonVariants({ variant: "secondary" }), "w-full justify-center text-slate-800")}
            >
              Portal Log In
            </Link>
            <Link
              href="/accreditation/apply"
              onClick={() => setMobileOpen(false)}
              className={cn(buttonVariants({ variant: "primary" }), "w-full justify-center bg-[#0B4DA2] text-white")}
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
