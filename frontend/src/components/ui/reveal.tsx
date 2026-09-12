"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  /** Stagger offset in ms, for revealing items in a grid one after another. */
  delayMs?: number;
  /** Rendered element. Use "li" inside an <ol>/<ul> to keep list semantics. */
  as?: "div" | "li";
}

/**
 * Fades and lifts its content in once, the first time it scrolls into view.
 * CSS-driven (see .reveal in globals.css) so it costs nothing beyond a single
 * IntersectionObserver per instance — no animation library needed for this.
 */
function Reveal({ className, delayMs = 0, style, as = "div", ...props }: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-visible={visible}
      className={cn("reveal", className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms`, ...style } : style}
      {...props}
    />
  );
}

export { Reveal };
