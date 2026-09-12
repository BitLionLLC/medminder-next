"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { HeaderCta, cn } from "./ui";

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-4",
          lifted ? "glass glass-rim" : "bg-transparent",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl pr-2 font-semibold"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/app-icon.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-[10px] shadow-sm"
            priority
          />
          <span className="text-[15px] tracking-tight whitespace-nowrap">{site.name}</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-soft rounded-full px-3.5 py-2 text-sm font-medium transition hover:bg-white/50 hover:text-[color:var(--text)] dark:hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <ThemeToggle />
          {/* The wrapper does the hiding: the CTA sets its own `display`,
              which a `hidden` class on it would lose to. */}
          <span className="hidden sm:contents">
            <HeaderCta />
          </span>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="glass glass-rim grid h-10 w-10 place-items-center rounded-full md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                d={open ? "M5 5l14 14M19 5L5 19" : "M4 7h16M4 12h16M4 17h16"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div className="glass glass-rim mx-auto mt-2 max-w-6xl rounded-2xl p-2 md:hidden">
          <nav className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-white/50 dark:hover:bg-white/10"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
