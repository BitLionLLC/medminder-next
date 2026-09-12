"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades and lifts its children as they scroll into view.
 *
 * Content is never gated on the animation: it renders visible, and only hides
 * itself once we know it is below the fold *and* that we can observe it. A
 * timer un-hides everything regardless, so a missed IntersectionObserver
 * callback can never leave the page blank.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // "idle" never animates — it is the state for content that was on screen
  // from the start, and the state everyone lands in without JS.
  const [phase, setPhase] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Anything already on screen at mount stays as it is.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setPhase("hidden");

    const show = () => setPhase("shown");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.02 },
    );
    observer.observe(node);

    // Safety net: never leave content invisible if the callback never lands.
    const failsafe = window.setTimeout(show, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: phase === "hidden" ? 0 : 1,
        transform: phase === "hidden" ? "translate3d(0, 26px, 0)" : "none",
        transition:
          phase === "shown"
            ? `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
            : undefined,
      }}
    >
      {children}
    </div>
  );
}
