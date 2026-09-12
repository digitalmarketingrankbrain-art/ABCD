"use client";

import * as React from "react";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  /** Numeric/date columns are right-aligned in mono, per Phase 4. */
  align?: "left" | "right";
  mono?: boolean;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  onSort?: (key: string) => void;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  onRowClick?: (row: T) => void;
  className?: string;
}

function DataTable<T>({
  columns,
  rows,
  getRowKey,
  onSort,
  sortKey,
  sortDirection,
  onRowClick,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("overflow-x-auto rounded-lg border border-border", className)}>
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 bg-background-portal">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  "border-b border-border px-4 py-3 font-sans text-xs font-medium uppercase tracking-[0.02em] text-text-muted",
                  col.align === "right" ? "text-right" : "text-left",
                )}
              >
                {col.sortable ? (
                  <button
                    onClick={() => onSort?.(col.key)}
                    className="inline-flex items-center gap-1 hover:text-text"
                  >
                    {col.header}
                    <ArrowUpDown
                      className={cn(
                        "size-3 transition-transform",
                        sortKey === col.key ? "text-primary" : "text-text-muted/60",
                        sortKey === col.key && sortDirection === "desc" && "rotate-180",
                      )}
                      strokeWidth={1.75}
                    />
                  </button>
                ) : (
                  col.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={getRowKey(row)}
              onClick={() => onRowClick?.(row)}
              tabIndex={onRowClick ? 0 : undefined}
              onKeyDown={
                onRowClick
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onRowClick(row);
                      }
                    }
                  : undefined
              }
              className={cn(
                "border-b border-border last:border-b-0",
                onRowClick &&
                  "cursor-pointer hover:bg-background-portal focus-visible:outline-none focus-visible:bg-background-portal focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-text",
                    col.align === "right" ? "text-right" : "text-left",
                    col.mono && "font-mono text-xs",
                  )}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { DataTable };
