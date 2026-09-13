/**
 * The rest of the BitLion catalogue.
 *
 * Every BitLion site reads the same published directory, so a new app appears
 * here without a deploy. Med Minder itself is filtered out — this page is on
 * Med Minder's own site — and the whole thing degrades to a link to bitlion.us
 * if the feed is unreachable rather than taking the build down with it.
 */

/** Where the catalogue lives, and where relative icon paths resolve against. */
export const bitlion = {
  url: "https://www.bitlion.us",
  siteUrl: "https://www.thebitlion.com",
  catalogUrl: "https://www.bitlion.us/apps.json",
  /** The host next/image is configured to load icons from (see next.config.ts). */
  iconHost: "www.bitlion.us",
} as const;

/** Med Minder's id in the catalogue: the one entry this site never lists. */
const SELF_ID = "medminder";

/** How long a build keeps the catalogue before re-reading it. */
const REVALIDATE_SECONDS = 3600;

export type CatalogLink = {
  label: string;
  href: string;
};

export type CatalogEntry = {
  id: string;
  title: string;
  tagline?: string;
  blurb?: string;
  /** Absolute icon URL, or undefined when the entry has none we can render. */
  icon?: string;
  category?: string;
  accentColor?: string;
  comingSoon: boolean;
  links: CatalogLink[];
};

export type CatalogGroup = {
  key: string;
  title: string;
  lede: string;
  entries: CatalogEntry[];
};

/* The three collections the feed publishes, in the order we show them. The
   label on each link is the store rather than the verb — "App Store", not
   "Download" — so a card reads as a list of places the thing exists. */
const GROUPS = [
  {
    key: "apps",
    title: "Apps",
    lede: "On iPhone and Android.",
  },
  {
    key: "extensions",
    title: "Browser extensions",
    lede: "Small things that sit in the toolbar and stay out of the way.",
  },
  {
    key: "saas",
    title: "On the web",
    lede: "Nothing to install.",
  },
] as const;

const LINK_FIELDS: { field: string; label: string }[] = [
  { field: "appStoreUrl", label: "App Store" },
  { field: "playStoreUrl", label: "Google Play" },
  { field: "chromeWebStoreUrl", label: "Chrome Web Store" },
  { field: "firefoxAddonUrl", label: "Firefox Add-ons" },
  { field: "edgeAddonUrl", label: "Edge Add-ons" },
  { field: "signupUrl", label: "Sign up" },
];

type Raw = Record<string, unknown>;

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

/** Resolve a possibly-relative icon path, and drop anything we cannot optimise. */
function iconUrl(value: unknown): string | undefined {
  const raw = text(value);
  if (!raw) return undefined;
  try {
    const url = new URL(raw, bitlion.url);
    return url.hostname === bitlion.iconHost ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function linksFor(entry: Raw, websiteUrl: string | undefined): CatalogLink[] {
  const links: CatalogLink[] = [];
  for (const { field, label } of LINK_FIELDS) {
    const href = text(entry[field]);
    // The signup link on a web app is usually the site again; no point twice.
    if (href && href !== websiteUrl) links.push({ label, href });
  }
  if (websiteUrl) links.push({ label: "Website", href: websiteUrl });
  return links;
}

function toEntry(value: unknown): CatalogEntry | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Raw;

  const id = text(raw.id);
  const title = text(raw.title);
  if (!id || !title || id === SELF_ID) return null;

  const websiteUrl = text(raw.websiteUrl);

  return {
    id,
    title,
    tagline: text(raw.tagline),
    blurb: text(raw.shortDescription) ?? text(raw.description),
    icon: iconUrl(raw.icon),
    category: text(raw.category),
    accentColor: text(raw.accentColor),
    comingSoon: raw.comingSoon === true,
    links: linksFor(raw, websiteUrl),
  };
}

/**
 * Drop icons the catalogue advertises but does not actually serve — an entry
 * added before its artwork was uploaded would otherwise render a broken image.
 * A check that cannot complete at all leaves the icon in place: a flaky network
 * is a worse reason to fall back to a monogram than a real 404.
 */
async function keepReachableIcons(entries: CatalogEntry[]): Promise<void> {
  const urls = [...new Set(entries.map((e) => e.icon).filter(Boolean))] as string[];

  const dead = new Set<string>();
  await Promise.all(
    urls.map(async (url) => {
      try {
        const res = await fetch(url, {
          method: "HEAD",
          signal: AbortSignal.timeout(4000),
        });
        if (!res.ok) dead.add(url);
      } catch {
        /* Inconclusive — keep it. */
      }
    }),
  );

  for (const entry of entries) {
    if (entry.icon && dead.has(entry.icon)) entry.icon = undefined;
  }
}

/**
 * Read the catalogue. Returns an empty array when the feed is unreachable or
 * malformed — the page renders a link to bitlion.us in that case.
 */
export async function getOtherApps(): Promise<CatalogGroup[]> {
  let data: Raw;
  try {
    const res = await fetch(bitlion.catalogUrl, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    data = (await res.json()) as Raw;
  } catch {
    return [];
  }

  const groups = GROUPS.map(({ key, title, lede }) => {
    const list = data[key];
    const entries = Array.isArray(list)
      ? list.map(toEntry).filter((entry): entry is CatalogEntry => entry !== null)
      : [];
    return { key, title, lede, entries };
  }).filter((group) => group.entries.length > 0);

  await keepReachableIcons(groups.flatMap((group) => group.entries));

  return groups;
}
