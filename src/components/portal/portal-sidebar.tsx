"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
 */
function PortalSidebar({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-16 w-56 shrink-0 border-r border-border-portal bg-surface">
      <ul className="flex flex-col gap-0.5 p-3">
        {items.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(item.href + "/");
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
