import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { bitlion } from "@/lib/apps";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-8 px-4 pb-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="hairline border-t pt-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <Image
                  src="/app-icon.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-xl"
                />
                <div>
                  <p className="font-semibold tracking-tight">{site.name}</p>
                  <p className="text-soft text-sm">{site.tagline}</p>
                </div>
              </div>
              <p className="text-soft mt-5 text-sm leading-relaxed">
                Made by {site.developer}. {site.platforms}. Rated {site.ageRating}.
              </p>
              <p className="text-soft mt-3 text-sm leading-relaxed">
                Med Minder is a reminder tool, not medical advice.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-sm sm:grid-cols-4 sm:gap-y-3">
              <FooterCol title="App">
                <FooterLink href="/#how">How it works</FooterLink>
                <FooterLink href="/#features">Features</FooterLink>
                <FooterLink href="/#pricing">Pricing</FooterLink>
              </FooterCol>
              <FooterCol title="Help">
                <FooterLink href="/support">Support</FooterLink>
                <FooterLink href="/#faq">FAQ</FooterLink>
                <FooterLink href={`mailto:${site.supportEmail}`} external>
                  Email us
                </FooterLink>
              </FooterCol>
              <FooterCol title="Legal">
                <FooterLink href="/privacy">Privacy policy</FooterLink>
                <FooterLink href="/privacy#terms">Terms of use</FooterLink>
              </FooterCol>
              <FooterCol title="BitLion">
                <FooterLink href="/apps">Our other apps</FooterLink>
                <FooterLink href={bitlion.url} external>
                  All links
                </FooterLink>
              </FooterCol>
            </div>
          </div>

          <p className="text-soft mt-10 text-xs">
            © {new Date().getFullYear()}{" "}
            <a
              href={bitlion.siteUrl}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[color:var(--text)] hover:underline"
            >
              {site.developer}
            </a>
            . Apple, the Apple logo,
            iPhone and App Store are trademarks of Apple Inc. Google Play and the
            Google Play logo are trademarks of Google LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold tracking-[0.14em] uppercase opacity-60">{title}</p>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className = "text-soft transition hover:text-[color:var(--text)] w-fit";
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
