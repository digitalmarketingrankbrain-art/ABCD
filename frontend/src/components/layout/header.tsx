"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { HEADER_NAV, HEADER_SIMPLE_LINKS } from "@/lib/nav";
import { SaafLogo } from "@/components/ui/saaf-logo";

/**
 * Ultra-sleek Header featuring active route tab indicators.
 */
function Header() {
  const pathname = usePathname();
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

  const isVerifyActive = pathname === "/verify" || pathname.startsWith("/verify");
  const isApplyActive = pathname === "/apply";

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-white">
      {/* Main Slim Navbar */}
      <div className="border-b border-slate-200/70 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* SAAF Official Brand Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <SaafLogo variant="emblem" size="md" className="h-[42px] sm:h-[50px]" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 xl:flex">
            {HEADER_NAV.map((group) => {
              const isGroupActive =
                (group.href && pathname.startsWith(group.href)) ||
                group.links.some((l) => pathname === l.href || pathname.startsWith(l.href));
              const isOpen = openMenu === group.label;

              return (
                <div
                  key={group.label}
                  className="relative group"
                  onMouseEnter={() => setOpenMenu(group.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    aria-expanded={isOpen}
                    onClick={() => setOpenMenu(isOpen ? null : group.label)}
                    className={cn(
                      "flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-semibold transition-colors relative",
                      isGroupActive
                        ? "text-blue-700 bg-blue-50/90 font-bold border-b-2 border-blue-600 rounded-b-none"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                      isOpen && "bg-blue-50 text-blue-900"
                    )}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        isGroupActive ? "text-blue-600" : "text-slate-400",
                        isOpen && "rotate-180 text-blue-700"
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="absolute left-0 top-full pt-1.5 w-80 z-50">
                      <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-fade-up">
                        {group.links.map((link) => {
                          const isLinkActive = pathname === link.href;
                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setOpenMenu(null)}
                              className={cn(
                                "block rounded-lg px-3.5 py-2 transition-colors",
                                isLinkActive
                                  ? "bg-blue-50 text-blue-800 font-bold border-l-2 border-blue-600 pl-3"
                                  : "hover:bg-slate-50"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <p className={cn("text-sm font-semibold", isLinkActive ? "text-blue-900 font-bold" : "text-slate-900")}>
                                  {link.label}
                                </p>
                                {isLinkActive && <span className="size-1.5 rounded-full bg-blue-600" />}
                              </div>
                              {link.description && (
                                <p className="mt-0.5 text-xs text-slate-500 font-normal">
                                  {link.description}
                                </p>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/verify"
              className={cn(
                "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-bold transition-colors",
                isVerifyActive
                  ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600 rounded-b-none"
                  : "text-blue-700 hover:bg-blue-50"
              )}
            >
              Verify Certificate
            </Link>

            {HEADER_SIMPLE_LINKS.map((link) => {
              const isSimpleActive = pathname === link.href || pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-semibold transition-colors",
                    isSimpleActive
                      ? "text-blue-700 bg-blue-50/90 font-bold border-b-2 border-blue-600 rounded-b-none"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden items-center gap-2.5 xl:flex">
            <Link
              href="/login"
              className={cn(
                "whitespace-nowrap rounded-md px-3 py-1 text-sm font-semibold transition-colors",
                pathname === "/login"
                  ? "bg-slate-100 text-slate-900 font-bold"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              Log In
            </Link>
            <Link
              href="/apply"
              className={cn(
                buttonVariants({ variant: "primary", size: "sm" }),
                "h-8 whitespace-nowrap px-3.5 bg-blue-600 font-semibold text-white transition-all shadow-none hover:bg-blue-700",
                isApplyActive && "ring-2 ring-blue-600 ring-offset-2 bg-blue-700 font-bold"
              )}
            >
              Apply for Accreditation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-100 xl:hidden"
          >
            <Menu className="size-6" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white xl:hidden">
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
              className={cn(
                "mb-6 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold border transition-colors",
                isVerifyActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-blue-50 text-blue-900 border-blue-200/60"
              )}
            >
              <span className="flex items-center gap-2">
                <Search className="size-4" />
                Verify an Accreditation
              </span>
              <span className="rounded bg-blue-700 px-2 py-0.5 text-[10px] text-white">LIVE</span>
            </Link>

            {HEADER_NAV.map((group) => {
              const isGroupActive =
                (group.href && pathname.startsWith(group.href)) ||
                group.links.some((l) => pathname === l.href || pathname.startsWith(l.href));
              return (
                <div key={group.label} className="mb-6">
                  <p className={cn(
                    "mb-2 font-sans text-xs font-bold uppercase tracking-wider",
                    isGroupActive ? "text-blue-600 font-extrabold" : "text-slate-400"
                  )}>
                    {group.label} {isGroupActive && "• ACTIVE"}
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {group.links.map((link) => {
                      const isLinkActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block rounded-lg px-2.5 py-1.5 transition-colors",
                            isLinkActive
                              ? "bg-blue-50 text-blue-900 font-bold border-l-4 border-blue-600 pl-3"
                              : "hover:bg-slate-50"
                          )}
                        >
                          <p className="text-sm font-semibold">
                            {link.label}
                          </p>
                          {link.description && (
                            <p className="text-xs text-slate-500">{link.description}</p>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-4">
              {HEADER_SIMPLE_LINKS.map((link) => {
                const isSimpleActive = pathname === link.href || pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "text-sm font-semibold transition-colors",
                      isSimpleActive ? "text-blue-600 font-bold" : "text-slate-800 hover:text-blue-700"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
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
              href="/apply"
              onClick={() => setMobileOpen(false)}
              className={cn(
                buttonVariants({ variant: "primary" }),
                "w-full justify-center bg-blue-600 text-white hover:bg-blue-700 font-bold"
              )}
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

