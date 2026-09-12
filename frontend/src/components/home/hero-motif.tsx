/**
 * Abstract geometric line motif — deliberately not a photo or illustration,
 * per Phase 4/5 (no real photography exists yet; avoids both stock-photo
 * cliché and SaaS-blob-illustration cliché). Reads as a reticle / reference
 * grid, echoing the "precise, checkable" brand idea.
 */
function HeroMotif({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const line = tone === "dark" ? "#ffffff33" : "#ded7c4";
  const ring = tone === "dark" ? "#ffffff66" : "#0d2b20";
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="0.5" y="0.5" width="399" height="399" rx="8" stroke={line} />
      {[80, 160, 240, 320].map((pos) => (
        <line key={`v-${pos}`} x1={pos} y1="0" x2={pos} y2="400" stroke={line} strokeWidth="1" />
      ))}
      {[80, 160, 240, 320].map((pos) => (
        <line key={`h-${pos}`} x1="0" y1={pos} x2="400" y2={pos} stroke={line} strokeWidth="1" />
      ))}
      <circle cx="200" cy="200" r="120" stroke={ring} strokeWidth="1.5" />
      <circle cx="200" cy="200" r="72" stroke={ring} strokeWidth="1.5" />
      <circle cx="200" cy="200" r="4" fill="#c9a24a" />
      <line x1="200" y1="40" x2="200" y2="360" stroke={ring} strokeWidth="1" strokeDasharray="2 6" />
      <line x1="40" y1="200" x2="360" y2="200" stroke={ring} strokeWidth="1" strokeDasharray="2 6" />
    </svg>
  );
}

export { HeroMotif };
