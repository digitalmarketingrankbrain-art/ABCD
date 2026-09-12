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
    <nav className="sticky top-16 w-56 shrink-0 border-r border-border-portal bg-surface">
      <ul className="flex flex-col gap-0.5 p-3">
        {items.map((item) => {
          const [itemPath, itemQuery] = item.href.split("?");
          const pathMatches = pathname === itemPath || pathname?.startsWith(itemPath + "/");
          const itemTab = itemQuery ? new URLSearchParams(itemQuery).get("tab") : null;
          const active = itemTab
            ? pathMatches && activeTab === itemTab
            : pathMatches && (!activeTab || activeTab === "overview");
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-[6px] px-3 py-2 font-sans text-sm",
                  active ? "bg-primary text-text-inverse" : "text-text hover:bg-background-portal",
                )}
              >
                <item.icon className="size-4" strokeWidth={1.75} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { PortalSidebar };
