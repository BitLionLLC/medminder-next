export const site = {
  name: "Med Minder",
  tagline: "Never miss a dose",
  developer: "BitLion, LLC",
  /* The canonical host, and the one every absolute URL in the page metadata is
     built from. It must be the host that answers with a 200 — Netlify serves
     www as primary and 301s the apex to it, and LinkedIn will not follow a
     redirect on og:image, so pointing this at the apex costs the link preview. */
  url: "https://www.getmedminder.app",
  supportEmail: "grant@thebitlion.com",
  category: "Medical",
  ageRating: "4+",
  platforms: "iPhone · Android",

  /* Med Minder has not shipped yet. Fill these in at launch and flip
     `launched` — every store button and badge on the site reads from here, and
     they render as "notify me" until it is true. */
  launched: false,
  appStoreUrl: "", // TODO: https://apps.apple.com/app/id…
  playStoreUrl: "", // TODO: https://play.google.com/store/apps/details?id=com.thebitlion.medminder
  bundleId: "com.thebitlion.medminder",

  /** Google Analytics 4 measurement ID for getmedminder.app. */
  gaMeasurementId: "G-R0HCVCDZFB",

  /** The one-time in-app purchase that removes the banner ad, in USD. */
  adFreePrice: 0.99,
  adFreeProductId: "medminder.removeAds",
} as const;

/** The price as it is written on the page. */
export const adFreePrice = `$${site.adFreePrice.toFixed(2)}`;

/** Subject line pre-filled on the "tell me when it launches" link. */
export const notifyMailto =
  `mailto:${site.supportEmail}` +
  `?subject=${encodeURIComponent("Tell me when Med Minder launches")}` +
  `&body=${encodeURIComponent(
    "Hi — please let me know when Med Minder is on the App Store or Google Play.",
  )}`;

export const faqs = [
  {
    q: "Is Med Minder free?",
    a: "Yes. Every feature — unlimited medications, unlimited reminders, the dose log, sync across devices — is free, supported by a small banner ad at the bottom of the screen. One optional $0.99 purchase removes the banner forever. There is no subscription and nothing is held back behind it.",
  },
  {
    q: "Do reminders work without a connection?",
    a: "Yes, and that is deliberate. Reminders are scheduled on the device with the operating system's own alarm scheduler rather than sent as push notifications, so they fire exactly on time on a phone in airplane mode, in a basement, or one that has not spoken to a server in days. They are also re-armed automatically after a reboot.",
  },
  {
    q: "Do I need an account?",
    a: "No. You can skip sign-in entirely and keep everything on the device. Signing in — with Apple, Google or an email address — is what makes your medications and history follow you to a new phone.",
  },
  {
    q: "How many medications can I add?",
    a: "As many as you like, each with any number of times a day on any set of weekdays. Give each one a colour and an icon so a glance at the day's list is enough to tell them apart.",
  },
  {
    q: "What if I take something a bit late, or skip it?",
    a: "Tap once to mark a dose taken, or swipe to skip it. Tap again to undo either. Settings keeps a running seven-day adherence figure so you can see how the week actually went rather than guessing.",
  },
  {
    q: "Can I use it for someone I care for?",
    a: "Med Minder tracks one person's schedule per account, so a carer managing their own medication and someone else's would want a separate account for each. Shared and multi-profile schedules are on the list.",
  },
  {
    q: "What happens to my data?",
    a: "If you stay signed out, nothing leaves the phone. If you sign in, your medications and dose log sync to your account so a new device picks up where the old one left off. It is never sold, and you can delete your account and everything in it from inside the app.",
  },
  {
    q: "Is Med Minder medical advice?",
    a: "No. It is a reminder and a log — it does not check interactions, suggest dosages or diagnose anything. Follow the instructions from your doctor or pharmacist, and talk to them before changing what you take.",
  },
  {
    q: "Which platforms does it run on?",
    a: "iPhone and Android. Both are built from the same codebase and get the same features at the same time.",
  },
] as const;
