/**
 * Abstract geometric line motif — deliberately not a photo or illustration,
 * per Phase 4/5 (no real photography exists yet; avoids both stock-photo
 * cliché and SaaS-blob-illustration cliché). Reads as a reticle / reference
 * grid, echoing the "precise, checkable" brand idea.
 */
function HeroMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="0.5" y="0.5" width="399" height="399" rx="8" stroke="#DCD7CD" />
      {[80, 160, 240, 320].map((pos) => (
        <line key={`v-${pos}`} x1={pos} y1="0" x2={pos} y2="400" stroke="#DCD7CD" strokeWidth="1" />
      ))}
      {[80, 160, 240, 320].map((pos) => (
        <line key={`h-${pos}`} x1="0" y1={pos} x2="400" y2={pos} stroke="#DCD7CD" strokeWidth="1" />
      ))}
      <circle cx="200" cy="200" r="120" stroke="#13233E" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="72" stroke="#13233E" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="4" fill="#B8722A" />
      <line x1="200" y1="40" x2="200" y2="360" stroke="#13233E" strokeWidth="1" strokeDasharray="2 6" />
      <line x1="40" y1="200" x2="360" y2="200" stroke="#13233E" strokeWidth="1" strokeDasharray="2 6" />
    </svg>
  );
}

export { HeroMotif };
