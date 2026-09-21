import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SaafLogoProps {
  variant?: "emblem" | "horizontal" | "full";
  size?: "sm" | "md" | "lg" | "xl";
  lightMode?: boolean;
  className?: string;
}

/** Official SAAF emblem: transparent-background PNG at /public/saaf-logo.png (already contains the foundation's name). */
export function SaafLogo({ variant = "emblem", size = "md", lightMode = false, className }: SaafLogoProps) {
  const sizeClasses = {
    sm: "h-9 w-auto",
    md: "h-12 sm:h-14 w-auto",
    lg: "h-16 sm:h-20 w-auto",
    xl: "h-24 sm:h-28 w-auto",
  };

  const horizontal = variant === "horizontal" || variant === "full";

  const logo = (
    <Image
      src="/saaf-logo.png"
      width={900}
      height={556}
      // In the horizontal lockup the adjacent text already names the organisation.
      alt={horizontal ? "" : "South Asia Accreditation Foundation (SAAF) logo"}
      className={cn(sizeClasses[size], "shrink-0 object-contain", className)}
    />
  );

  if (horizontal) {
    return (
      <div className={cn("inline-flex items-center gap-3", className)}>
        {logo}
        <div className="flex flex-col justify-center leading-tight">
          <span
            className={cn(
              "font-display font-extrabold uppercase tracking-wider text-base sm:text-lg",
              lightMode ? "text-white" : "text-blue-950"
            )}
          >
            South Asia
          </span>
          <span
            className={cn(
              "font-sans font-extrabold uppercase tracking-wide text-[11px] sm:text-xs mt-0.5",
              lightMode ? "text-amber-300" : "text-blue-700 font-bold"
            )}
          >
            Accreditation Foundation
          </span>
        </div>
      </div>
    );
  }

  return logo;
}
