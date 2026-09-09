export default function Home() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.02em] text-accent">
        Meridian Accreditation Board
      </p>
      <h1 className="font-display text-4xl font-semibold text-text">
        Public layout running.
      </h1>
      <p className="max-w-md font-sans text-base text-text-muted">
        This placeholder now renders inside the shared Header/Footer shell
        (Milestone 3). The real homepage content (Phase 5 spec) is built in
        the next milestone.
      </p>
    </main>
  );
}
