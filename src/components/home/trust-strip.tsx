import { Search, ScrollText, ClipboardCheck } from "lucide-react";

const ITEMS = [
  {
    icon: Search,
    label: "Public real-time verification",
    description: "No account required.",
  },
  {
    icon: ScrollText,
    label: "Published governance & impartiality policy",
    description: "Read how decisions are made.",
  },
  {
    icon: ClipboardCheck,
    label: "Documented assessment & decision process",
    description: "Every stage is named and visible.",
  },
];

/**
 * A 4th slot is intentionally left unfilled rather than placeheld — a visible
 * [PLACEHOLDER] tag inside a trust signal would undermine the trust it's
 * meant to build (Phase 5).
 */
function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-3">
        {ITEMS.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <item.icon className="mt-0.5 size-5 shrink-0 text-secondary" strokeWidth={1.5} />
            <div>
              <p className="font-sans text-sm font-medium text-text">{item.label}</p>
              <p className="font-sans text-xs text-text-muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { TrustStrip };
