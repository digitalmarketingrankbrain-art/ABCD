"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/**
 * Persistent, role-scoped left sidebar — Phase 4: "no mega menus in-portal,
 * this is a task tool, not a marketing surface." Shared shape; each role's
 * page supplies its own item list.
 *
 * Items may point at `?tab=` deep links into a Tabs-based page (see
 * profile/page.tsx's `queryParam="tab"`) — active-state matching accounts
 * for that so only the item whose tab is actually selected highlights,
 * not every item sharing the same base pathname.
 */
function PortalSidebar({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  return (
    <nav className="sticky top-20 w-60 shrink-0 py-6 pr-4 hidden md:block">
      <div className="rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xs">
        <div className="px-3 py-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </span>
        </div>
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const [itemPath, itemQuery] = item.href.split("?");
            const pathMatches = pathname === itemPath || (pathname?.startsWith(itemPath + "/") && itemPath !== "/cab/applicant");
            const itemTab = itemQuery ? new URLSearchParams(itemQuery).get("tab") : null;
            const active = itemTab
              ? pathMatches && activeTab === itemTab
              : pathMatches && (!activeTab || activeTab === "overview");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-sans text-xs sm:text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md shadow-blue-900/15 font-semibold"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 hover:translate-x-0.5",
                  )}
                >
                  <item.icon
                    className={cn(
                      "size-4.5 transition-transform duration-200 group-hover:scale-110",
                      active ? "text-white" : "text-slate-400 group-hover:text-blue-700",
                    )}
                    strokeWidth={2}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export { PortalSidebar };
