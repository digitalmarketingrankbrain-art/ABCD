import * as React from "react";
import { cn } from "@/lib/utils";

interface SaafLogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: "emblem" | "horizontal" | "full";
  size?: "sm" | "md" | "lg" | "xl";
  lightMode?: boolean;
}

export function SaafLogo({
  variant = "emblem",
  size = "md",
  lightMode = false,
  className,
  ...props
}: SaafLogoProps) {
  const sizeClasses = {
    sm: "h-9 w-auto",
    md: "h-12 sm:h-14 w-auto",
    lg: "h-16 sm:h-20 w-auto",
    xl: "h-24 sm:h-28 w-auto",
  };

  const logoSvg = (
    <svg
      viewBox="0 0 400 240"
      className={cn(sizeClasses[size], "shrink-0 transition-transform duration-200 hover:scale-[1.02]", className)}
      {...props}
    >
      <defs>
        <path id="saafTopArcComp" d="M 52 120 A 148 82 0 0 1 348 120" fill="none" />
        <path id="saafBottomArcComp" d="M 52 120 A 148 82 0 0 0 348 120" fill="none" />
        <linearGradient id="blueGradComp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F52BA" />
          <stop offset="50%" stopColor="#0B4DA2" />
          <stop offset="100%" stopColor="#062863" />
        </linearGradient>
      </defs>

      {/* Outer double ring */}
      <ellipse cx="200" cy="120" rx="194" ry="114" fill="url(#blueGradComp)" />
      <ellipse cx="200" cy="120" rx="188" ry="108" fill="none" stroke="#FFFFFF" strokeWidth="3" />
      
      {/* Inner White Globe Box */}
      <ellipse cx="200" cy="120" rx="150" ry="78" fill="#FFFFFF" stroke="url(#blueGradComp)" strokeWidth="2.5" />

      {/* Globe Wireframe Grid */}
      <g stroke="#93C5FD" strokeWidth="1.2" fill="none" opacity="0.85">
        <ellipse cx="200" cy="120" rx="146" ry="74" />
        <ellipse cx="200" cy="120" rx="112" ry="74" />
        <ellipse cx="200" cy="120" rx="72" ry="74" />
        <ellipse cx="200" cy="120" rx="32" ry="74" />
        <line x1="200" y1="46" x2="200" y2="194" strokeWidth="1.5" />
        <line x1="54" y1="120" x2="346" y2="120" strokeWidth="1.5" />
        <path d="M 72 90 Q 200 68 328 90" />
        <path d="M 88 70 Q 200 56 312 70" />
        <path d="M 72 150 Q 200 172 328 150" />
        <path d="M 88 170 Q 200 184 312 170" />
      </g>

      {/* Curved Text: SOUTH ASIA (Top) */}
      <text fill="#FFFFFF" fontSize="24" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="4" dy="-2">
        <textPath href="#saafTopArcComp" startOffset="50%" textAnchor="middle">
          SOUTH ASIA
        </textPath>
      </text>

      {/* Center Text: SAAF */}
      <text x="200" y="145" fill="#0B4DA2" fontSize="78" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="3">
        SAAF
      </text>

      {/* Curved Text: ACCREDITATION FOUNDATION (Bottom - Upright) */}
      <text fill="#FFFFFF" fontSize="14.5" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="2" dy="16">
        <textPath href="#saafBottomArcComp" startOffset="50%" textAnchor="middle">
          ACCREDITATION FOUNDATION
        </textPath>
      </text>
    </svg>
  );

  if (variant === "horizontal" || variant === "full") {
    return (
      <div className={cn("inline-flex items-center gap-3", className)}>
        {logoSvg}
        <div className="flex flex-col justify-center leading-tight">
          <span
            className={cn(
              "font-display font-extrabold uppercase tracking-wider text-base sm:text-lg",
              lightMode ? "text-white" : "text-[#062863]"
            )}
          >
            South Asia
          </span>
          <span
            className={cn(
              "font-sans font-extrabold uppercase tracking-wide text-[11px] sm:text-xs text-blue-900 mt-0.5",
              lightMode ? "text-amber-300" : "text-[#0B4DA2]"
            )}
          >
            Accreditation Foundation
          </span>
        </div>
      </div>
    );
  }

  return logoSvg;
}
