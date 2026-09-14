import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * The social metadata for one page.
 *
 * Facebook, LinkedIn, Slack, WhatsApp, Pinterest and iMessage all read the
 * Open Graph (`og:*`) tags; X reads `twitter:*` and falls back to `og:*` for
 * anything it does not find. So the two sets carry the same title, description
 * and card — the only reason to write both is that X ignores `og:` for the
 * card type, and `summary_large_image` is what turns the link into a banner
 * rather than a thumbnail.
 *
 * Every page has to call this. A route segment inherits its parent's
 * `openGraph` object whole rather than field by field, so a page that sets
 * only `title` would still advertise the homepage's og:title and og:url and
 * share as the homepage.
 */
export function socialMetadata({
  path,
  title,
  description,
  shareTitle,
  shareDescription,
}: {
  /** Route path, leading slash, e.g. "/support". The homepage is "/". */
  path: string;
  /** Page title. Subpages get `· Med Minder` appended by the root template. */
  title: string;
  description: string;
  /** Overrides for the share card, where a shorter line usually reads better. */
  shareTitle?: string;
  shareDescription?: string;
}): Metadata {
  const isHome = path === "/";
  const url = isHome ? site.url : `${site.url}${path}`;

  /* The root template only rewrites <title>, not og:title, so spell the site
     name out here for the pages that would otherwise share as a bare word. */
  const social = shareTitle ?? (isHome ? title : `${title} · ${site.name}`);
  const blurb = shareDescription ?? description;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      locale: "en_US",
      title: social,
      description: blurb,
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description: blurb,
    },
  };
}
