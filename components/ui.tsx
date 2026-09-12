import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { notifyMailto, site } from "@/lib/site";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** A translucent pane. `tone="strong"` milks the fill for dense text. */
export function Glass({
  as: Tag = "div",
  tone = "regular",
  className,
  children,
}: {
  as?: "div" | "section" | "article" | "li" | "header" | "figure";
  tone?: "regular" | "strong";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "glass glass-rim rounded-3xl",
        tone === "strong" && "glass-strong",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Small capsule used for section eyebrows and inline facts. */
export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "glass glass-rim inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
      )}
    >
      <Pill className="text-peri-700 dark:text-peri-300">{eyebrow}</Pill>
      <h2 className="max-w-3xl text-4xl leading-[1.08] font-extrabold sm:text-5xl">
        {title}
      </h2>
      {lede ? (
        <p className="text-soft max-w-2xl text-lg leading-relaxed">{lede}</p>
      ) : null}
    </div>
  );
}

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "ghost";
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition duration-300",
        variant === "primary" &&
          "bg-peri-600 shadow-peri-600/25 hover:bg-peri-700 hover:shadow-peri-600/30 dark:bg-peri-500 dark:text-peri-50 dark:shadow-peri-500/25 dark:hover:bg-peri-400 text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl",
        variant === "ghost" &&
          "glass glass-rim hover:-translate-y-0.5 hover:brightness-[1.04]",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" aria-hidden className={className} fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C61.2 141.2 0 184.6 0 273c0 26.1 4.8 53.1 14.4 80.9 12.8 36.6 59 126.4 107.2 124.9 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.3 102.6-119 -65.2-30.7-61.7-90-61.7-91.1zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

export function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden className={className}>
      <path d="M47 21.6a24 24 0 0 0-11 20.2v428.4a24 24 0 0 0 11 20.2L275 256Z" fill="#00d3ff" />
      <path d="m365.7 165.9-72.2-41.7L216 256l77.5 77.5 72.2-41.7c22.8-13.2 22.8-46.7 0-59.9Z" fill="#ffce00" />
      <path d="M47 21.6C51.6 18.8 58 18.4 65 22.4l300.7 173.6-72.2 41.7Z" fill="#00f076" />
      <path d="M47 490.4c4.6 2.8 11 3.2 18-.8l300.7-173.6-72.2-41.7Z" fill="#ff3a44" />
    </svg>
  );
}

/**
 * The download row. Until `site.launched` flips, there is nothing to link to,
 * so the same slot becomes a single "tell me when it lands" call instead of two
 * dead badges.
 */
export function StoreButtons({
  size = "lg",
  className,
}: {
  size?: "lg" | "sm";
  className?: string;
}) {
  if (!site.launched) {
    return (
      <div className={cn("flex flex-wrap items-center gap-3", className)}>
        <ButtonLink href={notifyMailto} className={size === "sm" ? "px-5 py-2.5" : ""}>
          Tell me when it launches
        </ButtonLink>
        <span className="text-soft text-xs">
          iPhone and Android · free · no subscription
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <StoreBadge href={site.appStoreUrl} size={size} label="Download on the" store="App Store">
        <AppleGlyph className={size === "lg" ? "h-7 w-7" : "h-5 w-5"} />
      </StoreBadge>
      <StoreBadge href={site.playStoreUrl} size={size} label="Get it on" store="Google Play">
        <PlayGlyph className={size === "lg" ? "h-6 w-6" : "h-[18px] w-[18px]"} />
      </StoreBadge>
    </div>
  );
}

function StoreBadge({
  href,
  size,
  label,
  store,
  children,
}: {
  href: string;
  size: "lg" | "sm";
  label: string;
  store: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "bg-peri-900 dark:bg-mist dark:text-peri-900 group inline-flex items-center gap-3 rounded-2xl text-white transition duration-300 hover:-translate-y-0.5 hover:bg-black focus-visible:outline-offset-4 dark:hover:bg-white",
        size === "lg"
          ? "shadow-peri-900/25 px-6 py-3.5 shadow-xl"
          : "shadow-peri-900/20 px-4 py-2.5 shadow-lg",
      )}
    >
      {children}
      <span className="flex flex-col text-left leading-none">
        <span className={cn("opacity-70", size === "lg" ? "text-[11px]" : "text-[9px]")}>
          {label}
        </span>
        <span
          className={cn(
            "font-semibold tracking-tight",
            size === "lg" ? "mt-1 text-lg" : "mt-0.5 text-sm",
          )}
        >
          {store}
        </span>
      </span>
    </a>
  );
}

/**
 * The compact call to action in the nav bar: a store badge once Med Minder is
 * live, and a notify link until then.
 */
export function HeaderCta() {
  if (!site.launched) {
    return (
      <ButtonLink href={notifyMailto} className="px-5 py-2.5">
        Notify me
      </ButtonLink>
    );
  }
  return (
    <StoreBadge href={site.appStoreUrl} size="sm" label="Download on the" store="App Store">
      <AppleGlyph className="h-5 w-5" />
    </StoreBadge>
  );
}
