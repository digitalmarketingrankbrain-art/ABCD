"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
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
  /** When set, the tab whose value matches this URL query param (e.g. ?tab=invoices) opens initially — lets other pages deep-link to a specific tab. */
  queryParam?: string;
}

/**
 * `useSearchParams` is only invoked (via `QuerySync` below, inside its own
 * Suspense boundary) when `queryParam` is actually passed — most `Tabs`
 * usages don't set it, and keeping the hook out of their render path avoids
 * forcing every page that uses Tabs to add a Suspense boundary just to stay
 * statically prerenderable.
 */
function QuerySync({
  queryParam,
  values,
  defaultValue,
  onResolve,
}: {
  queryParam: string;
  values: string[];
  defaultValue: string;
  onResolve: (value: string) => void;
}) {
  const searchParams = useSearchParams();
  const fromQuery = searchParams.get(queryParam);
  React.useEffect(() => {
    onResolve(fromQuery && values.includes(fromQuery) ? fromQuery : defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromQuery]);
  return null;
}

/** Plain underline-style tabs, not pill/button tabs — Phase 4. */
function Tabs({ items, defaultValue, className, queryParam }: TabsProps) {
  const resolvedDefault = defaultValue ?? items[0]?.value ?? "";
  const [active, setActive] = React.useState(resolvedDefault);

  return (
    <div className={className}>
      {queryParam && (
        <React.Suspense fallback={null}>
          <QuerySync
            queryParam={queryParam}
            values={items.map((i) => i.value)}
            defaultValue={resolvedDefault}
            onResolve={setActive}
          />
        </React.Suspense>
      )}
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
