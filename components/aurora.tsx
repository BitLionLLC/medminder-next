/**
 * The living backdrop every glass surface is seen against: four wide, slow
 * blobs drifting out of phase with one another — the web counterpart of the
 * app's `AuroraBackground`. Fixed to the viewport so panes appear to slide over
 * it as the page scrolls.
 */
export function Aurora() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="bg-peri-50 dark:bg-night absolute inset-0" />

      <div className="animate-drift absolute -top-[22%] -left-[12%] h-[70vmax] w-[70vmax] rounded-full bg-[#B9C8FF] opacity-70 blur-[110px] dark:bg-[#1D2C6B] dark:opacity-50" />
      <div className="animate-drift-slow absolute -top-[10%] right-[-18%] h-[62vmax] w-[62vmax] rounded-full bg-[#9FEFE6] opacity-55 blur-[120px] dark:bg-[#0C4F52] dark:opacity-40" />
      <div className="animate-drift-slow absolute bottom-[-25%] left-[16%] h-[58vmax] w-[58vmax] rounded-full bg-[#D9C4FF] opacity-55 blur-[120px] dark:bg-[#2C1C56] dark:opacity-45" />
      <div className="animate-drift absolute right-[6%] bottom-[-15%] h-[50vmax] w-[50vmax] rounded-full bg-[#C7DCFF] opacity-50 blur-[120px] dark:bg-[#13223F] dark:opacity-45" />

      {/* Settles the contrast so body text never sits on a hot spot. */}
      <div className="dark:bg-night/45 absolute inset-0 bg-white/25" />
    </div>
  );
}
