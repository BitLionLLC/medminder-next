import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const title = `${site.name} — medication reminders that actually arrive`;
const description =
  "Add what you take and when, get a reminder at every scheduled time, and tap once to log the dose. Reminders are scheduled on the device, so they fire on time with no connection. Free on iPhone and Android.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description,
  applicationName: site.name,
  keywords: [
    "medication reminder app",
    "pill reminder",
    "medication tracker",
    "dose log",
    "medicine reminder offline",
    "free medication reminder",
  ],
  authors: [{ name: site.developer }],
  creator: site.developer,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title,
    description:
      "A reminder at every scheduled time, scheduled on the device so it fires with no connection. Tap once to log the dose. Free on iPhone and Android.",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Medication reminders that arrive on time, offline. Tap once to log the dose. Free on iPhone and Android.",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eff3ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e17" },
  ],
};

/* Resolve the theme before first paint so a dark-mode visitor never sees a
   white flash. Kept tiny and inlined for that reason. */
const themeScript = `(function(){try{var s=localStorage.getItem("mm-theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full`}
      // The inline script below sets the `dark` class before React hydrates,
      // so the server and client class lists legitimately differ.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
