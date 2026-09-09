"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
}

/** Plain underline-style tabs, not pill/button tabs — Phase 4. */
function Tabs({ items, defaultValue, className }: TabsProps) {
  const [active, setActive] = React.useState(defaultValue ?? items[0]?.value);

  return (
    <div className={className}>
      <div role="tablist" className="flex gap-6 border-b border-border">
        {items.map((item) => {
          const isActive = item.value === active;
          return (
            <button
              key={item.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(item.value)}
              className={cn(
                "-mb-px border-b-2 px-1 py-3 font-sans text-sm font-medium transition-colors",
                isActive
                  ? "border-accent text-text"
                  : "border-transparent text-text-muted hover:text-text",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="pt-6">
        {items.find((item) => item.value === active)?.content}
      </div>
    </div>
  );
}

export { Tabs };
