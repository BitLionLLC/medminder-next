# getmedminder.app

The marketing site for **Med Minder**, the medication tracker in
[`../medminder-flutter`](../medminder-flutter). Next.js App Router, Tailwind v4,
statically rendered — every route prerenders, so it deploys anywhere that serves
files.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export of every route
```

## What is where

```
app/
├── layout.tsx            # fonts, metadata, the pre-paint theme script
├── page.tsx              # the home page, and its SoftwareApplication + FAQ JSON-LD
├── globals.css           # design tokens and the glass utilities
├── opengraph-image.tsx   # the 1200×630 social card, generated at build
├── privacy/              # privacy policy + terms (anchored at #terms)
├── support/              # help topics and the support address
├── robots.ts, sitemap.ts
components/
├── aurora.tsx            # the drifting backdrop everything is seen against
├── phone.tsx             # the drawn handset shell and its in-screen glass
├── screens.tsx           # Today / Medications / Adherence, rebuilt in markup
├── ui.tsx                # Glass, Pill, SectionHeading, buttons, store badges
├── reveal.tsx            # scroll-in animation that can never hide content
└── sections/             # one file per band of the home page
lib/site.ts               # every fact about the app that appears on the page
```

## The design language

The palette and the glass tokens are lifted from the app's
`lib/constants/app_theme.dart` — periwinkle `#4C6FFF`, mint `#14C7B8`, violet
`#9B5DE5`, over a slowly drifting aurora. If the app's theme changes, change
`app/globals.css` to match rather than inventing a second palette.

There are no App Store screenshots yet, so `components/screens.tsx` rebuilds the
three screens in HTML. They stay crisp at any size and follow the site's own
light/dark theme, but they are a *likeness* — when real screenshots exist,
swapping them in is a change to `phone.tsx` and `tour.tsx` only.

## At launch

Everything that has to change lives in `lib/site.ts`:

1. Set `launched: true`.
2. Fill in `appStoreUrl` and `playStoreUrl`.

That flips every call to action on the site from "tell me when it launches" to
real store badges — the header, the hero, the pricing section and the closing
card all read the same flag.

Also worth doing at that point:

- [ ] Have the privacy policy and terms in `app/privacy/page.tsx` reviewed. They
      describe what the app actually does — Clerk for accounts, Convex for sync,
      AdMob for the banner, RevenueCat for the purchase — but they were not
      written by a lawyer.
- [ ] Point `getmedminder.app` at the deployment and check the OG card renders.
