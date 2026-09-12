import type { ReactNode } from "react";
import { cn } from "./ui";

/**
 * A drawn device shell. Med Minder has not shipped yet, so there are no App
 * Store screenshots to drop in — the screens below are rebuilt in markup
 * instead, which has the happy side effect of staying crisp at any size and
 * picking up the page's own light and theme.
 */
export function Phone({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  /** Which of the app's two themes this handset is showing. */
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "relative rounded-[2.6rem] bg-gradient-to-br from-white/70 via-white/20 to-white/5 p-[3px] shadow-[0_40px_90px_-30px_rgb(27_37_89_/_0.45)] dark:from-white/25 dark:via-white/5 dark:to-white/0 dark:shadow-[0_40px_90px_-30px_rgb(0_0_0_/_0.85)]",
        className,
      )}
    >
      <div className="bg-peri-900 relative overflow-hidden rounded-[2.45rem] p-[6px] dark:bg-black">
        <div
          className={cn(
            "relative isolate aspect-[9/19.5] overflow-hidden rounded-[2rem]",
            tone === "light" ? "bg-[#eff3ff] text-[#10131c]" : "bg-[#0b0e17] text-[#f2f4fa]",
          )}
        >
          {/* The app's own aurora, behind its own glass. */}
          <ScreenAurora tone={tone} />
          <div className="relative z-10 flex h-full flex-col">{children}</div>

          {/* Specular sweep across the glass, as on a real screen. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/5 to-white/12 mix-blend-screen"
          />
        </div>

        {/* Dynamic-island style cutout. */}
        <div
          aria-hidden
          className="absolute top-[14px] left-1/2 z-30 h-[18px] w-[86px] -translate-x-1/2 rounded-full bg-black/95"
        />
      </div>
    </div>
  );
}

function ScreenAurora({ tone }: { tone: "light" | "dark" }) {
  const light = tone === "light";
  return (
    <div aria-hidden className="absolute inset-0">
      <div
        className="absolute -top-[18%] -left-[20%] h-[70%] w-[90%] rounded-full blur-[46px]"
        style={{ background: light ? "#C8D6FF" : "#1D2C6B", opacity: light ? 0.85 : 0.7 }}
      />
      <div
        className="absolute top-[24%] -right-[24%] h-[55%] w-[80%] rounded-full blur-[46px]"
        style={{ background: light ? "#A9EFE6" : "#0C4F52", opacity: light ? 0.7 : 0.55 }}
      />
      <div
        className="absolute -bottom-[16%] left-[-10%] h-[55%] w-[85%] rounded-full blur-[46px]"
        style={{ background: light ? "#DEC9FF" : "#2C1C56", opacity: light ? 0.75 : 0.65 }}
      />
    </div>
  );
}

/** The status bar, so a screen reads as a phone and not a card. */
export function StatusBar({ tone = "light", time = "8:00" }: { tone?: "light" | "dark"; time?: string }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-between px-6 pt-[13px] pb-1 text-[10px] font-semibold",
        tone === "light" ? "text-[#10131c]" : "text-[#f2f4fa]",
      )}
    >
      <span>{time}</span>
      <span className="flex items-center gap-[3px] opacity-80">
        <svg viewBox="0 0 18 12" className="h-[9px]" fill="currentColor" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="9" y="3" width="3" height="9" rx="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 24 12" className="h-[9px]" fill="none" aria-hidden>
          <rect x="0.5" y="0.5" width="19" height="11" rx="3" stroke="currentColor" opacity="0.5" />
          <rect x="2" y="2" width="14" height="8" rx="1.6" fill="currentColor" />
          <path d="M21 4v4a2.2 2.2 0 0 0 0-4Z" fill="currentColor" opacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

/** A glass pane *inside* the phone — the app's `GlassCard`. */
export function ScreenGlass({
  tone = "light",
  className,
  children,
}: {
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[18px] backdrop-blur-md",
        tone === "light"
          ? "border border-white/75 bg-white/55 shadow-[0_8px_20px_-10px_rgb(27_37_89_/_0.28)]"
          : "border border-white/14 bg-white/7 shadow-[0_8px_20px_-10px_rgb(0_0_0_/_0.6)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** The app's frosted bottom bar. */
export function ScreenNavBar({
  tone = "light",
  active = "today",
}: {
  tone?: "light" | "dark";
  active?: "today" | "meds" | "settings";
}) {
  const items = [
    { key: "today", label: "Today", d: "M12 3.5 3.5 10v10h17V10L12 3.5Z" },
    { key: "meds", label: "Meds", d: "M7.5 4.5h9v15h-9zM7.5 12h9" },
    { key: "settings", label: "Settings", d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" },
  ] as const;

  return (
    <div className="mt-auto shrink-0 px-3 pb-3">
      <ScreenGlass tone={tone} className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const on = item.key === active;
          return (
            <span key={item.key} className="flex flex-col items-center gap-[3px]">
              <svg
                viewBox="0 0 24 24"
                className="h-[15px] w-[15px]"
                fill="none"
                stroke={on ? "#4C6FFF" : "currentColor"}
                strokeWidth="1.8"
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={on ? 1 : 0.45}
                aria-hidden
              >
                <path d={item.d} />
              </svg>
              <span
                className="text-[7px] font-semibold"
                style={{ color: on ? "#4C6FFF" : undefined, opacity: on ? 1 : 0.45 }}
              >
                {item.label}
              </span>
            </span>
          );
        })}
      </ScreenGlass>
    </div>
  );
}
