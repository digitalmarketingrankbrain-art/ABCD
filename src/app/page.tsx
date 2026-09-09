export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.02em] text-accent">
        Meridian Accreditation Board
      </p>
      <h1 className="font-display text-4xl font-semibold text-text">
        Project scaffold running.
      </h1>
      <p className="max-w-md font-sans text-base text-text-muted">
        This is a temporary placeholder confirming Next.js, TypeScript, Tailwind,
        and the Phase 4 design tokens are wired up correctly. The real homepage
        (Phase 5 spec) is built in the next milestone.
      </p>
    </main>
  );
}
