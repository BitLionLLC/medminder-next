import type { Metadata } from "next";
import Image from "next/image";
import { Aurora } from "@/components/aurora";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink, Glass, Pill, cn } from "@/components/ui";
import {
  bitlion,
  getOtherApps,
  type CatalogEntry,
  type CatalogGroup,
} from "@/lib/apps";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our other apps",
  description: `The rest of what ${site.developer} makes — apps, browser extensions and web tools, including the ones that have not shipped yet.`,
  alternates: { canonical: "/apps" },
};

export default async function AppsPage() {
  const groups = await getOtherApps();

  return (
    <>
      <Aurora />
      <SiteHeader />

      <main className="relative z-10 flex-1 px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start gap-5">
            <Pill className="text-peri-700 dark:text-peri-300">{site.developer}</Pill>
            <h1 className="max-w-3xl text-4xl leading-[1.08] font-extrabold sm:text-5xl">
              Check out our <span className="text-gradient">other apps</span>
            </h1>
            <p className="text-soft max-w-2xl text-lg leading-relaxed">
              The same people who built Med Minder make a handful of other small,
              deliberate things — on the phone, in the browser and on the web.
              Here they all are, including the ones still on the way.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <ButtonLink href={bitlion.url} target="_blank" rel="noreferrer">
                All links
                <Arrow />
              </ButtonLink>
              <span className="text-soft text-sm">
                Everything we make, on one page at{" "}
                <ExternalLink href={bitlion.url}>bitlion.us</ExternalLink>
              </span>
            </div>
          </div>

          {groups.length > 0 ? (
            <div className="mt-16 space-y-14">
              {groups.map((group) => (
                <Group key={group.key} group={group} />
              ))}
            </div>
          ) : (
            <Unavailable />
          )}

          <div className="hairline mt-16 border-t pt-10">
            <p className="text-soft text-sm leading-relaxed">
              Made by{" "}
              <ExternalLink href={bitlion.siteUrl}>{site.developer}</ExternalLink>
              . Every link above, plus whatever we ship next, stays up to date at{" "}
              <ExternalLink href={bitlion.url}>bitlion.us</ExternalLink>.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

function Group({ group }: { group: CatalogGroup }) {
  return (
    <section>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{group.title}</h2>
        <p className="text-soft text-sm">{group.lede}</p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {group.entries.map((entry, i) => (
          <Reveal key={entry.id} delay={i * 80} className="h-full">
            <Card entry={entry} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Card({ entry }: { entry: CatalogEntry }) {
  return (
    <Glass as="article" className="flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <Icon entry={entry} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold tracking-tight">{entry.title}</h3>
            {entry.comingSoon ? <ComingSoonChip /> : null}
          </div>
          {entry.tagline ? (
            <p className="text-soft mt-1 text-sm">{entry.tagline}</p>
          ) : null}
        </div>
      </div>

      {entry.blurb ? (
        <p className="text-soft mt-5 text-sm leading-relaxed">{entry.blurb}</p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
        {entry.links.map((link) => (
          <ExternalLink key={link.href + link.label} href={link.href}>
            {link.label}
          </ExternalLink>
        ))}
        {entry.category ? (
          <span className="text-soft ml-auto text-xs tracking-wide uppercase opacity-70">
            {entry.category}
          </span>
        ) : null}
      </div>
    </Glass>
  );
}

/**
 * The app icon, or — for an entry with none, which is normal before something
 * ships — a monogram tile in the entry's own accent colour.
 */
function Icon({ entry }: { entry: CatalogEntry }) {
  if (entry.icon) {
    return (
      <Image
        src={entry.icon}
        alt=""
        width={56}
        height={56}
        className="h-14 w-14 shrink-0 rounded-2xl shadow-sm"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-xl font-extrabold text-white shadow-sm"
      style={{ backgroundColor: entry.accentColor ?? "var(--color-peri-500)" }}
    >
      {entry.title.charAt(0)}
    </div>
  );
}

function ComingSoonChip() {
  return (
    <span className="bg-amber/15 text-amber rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase">
      Coming soon
    </span>
  );
}

function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "text-peri-600 dark:text-peri-300 text-sm font-semibold transition hover:underline",
        className,
      )}
    >
      {children}
    </a>
  );
}

/** Shown when the catalogue cannot be read — the links still have somewhere to go. */
function Unavailable() {
  return (
    <Glass className="mt-16 p-8 text-center">
      <p className="text-soft leading-relaxed">
        The app list is not loading at the moment. Everything we make is at{" "}
        <ExternalLink href={bitlion.url}>bitlion.us</ExternalLink>.
      </p>
    </Glass>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
