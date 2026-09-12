import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { Glass, SectionHeading } from "@/components/ui";

type Feature = {
  title: string;
  body: string;
  icon: ReactNode;
  wide?: boolean;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const features: Feature[] = [
  {
    title: "Reminders that hold up",
    body: "One notification per scheduled time, set by the operating system itself. They survive a reboot, a timezone change and a week with no signal.",
    wide: true,
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7M13.7 20a2 2 0 0 1-3.4 0" />
      </svg>
    ),
  },
  {
    title: "Any schedule you actually have",
    body: "Any number of times a day, on any set of weekdays. Once daily, three times daily, or Monday-Wednesday-Friday only.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
        <path d="M3.5 9.5h17M8 3.5V6M16 3.5V6M8 13.5h2M14 13.5h2M8 17h2" />
      </svg>
    ),
  },
  {
    title: "One tap to log a dose",
    body: "Taken or skipped, straight from the day's list or the notification. Tap again to undo — nothing is ever locked in.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4.5 12.5 9 17l10.5-10" />
      </svg>
    ),
  },
  {
    title: "Colour and icon per medication",
    body: "Eight accents and ten icons. A glance at the list is enough to tell the blue morning tablet from the purple evening one.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4.9 12.7 12.7 4.9a4.1 4.1 0 0 1 5.8 5.8l-7.8 7.8a4.1 4.1 0 0 1-5.8-5.8ZM8.8 8.8l5.8 5.8" />
      </svg>
    ),
  },
  {
    title: "Seven-day adherence",
    body: "A single honest number in Settings for how much of the last week you actually took, built from the log rather than a streak you can game.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 19.5V11M9.3 19.5V5M14.7 19.5v-6M20 19.5V8.5" />
      </svg>
    ),
  },
  {
    title: "Sync, only if you want it",
    body: "Sign in with Apple, Google or an email address and your schedule follows you to a new phone. Or skip sign-in entirely and keep it all on the device.",
    wide: true,
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M7 18.5A4.5 4.5 0 0 1 6.6 9.6a5.6 5.6 0 0 1 10.6-1.4A4.2 4.2 0 0 1 17.8 18.5Z" />
        <path d="M12 11v6.5M9.5 14 12 11.2 14.5 14" />
      </svg>
    ),
  },
  {
    title: "Light and dark, properly",
    body: "The liquid-glass interface is built for both, and follows your system setting unless you tell it otherwise.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5a8.6 8.6 0 1 0 10.7 10.7Z" />
      </svg>
    ),
  },
  {
    title: "Nothing held back",
    body: "No medication limit, no reminder limit, no history cut off after a week. The paid upgrade removes an ad — that is all it does.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3.5 14.6 9l6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.4 9.9l6-.9Z" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Features"
            title="Everything a medication tracker needs, and nothing it doesn't"
            lede="No streaks to protect, no social feed, no wellness score. It reminds you, you tap, it remembers."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal
              key={feature.title}
              delay={(i % 3) * 90}
              className={feature.wide ? "lg:col-span-2" : undefined}
            >
              <Glass className="flex h-full flex-col gap-4 p-6">
                <span className="bg-peri-500/12 text-peri-600 dark:text-peri-300 grid h-11 w-11 shrink-0 place-items-center rounded-2xl [&_svg]:h-5 [&_svg]:w-5">
                  {feature.icon}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-soft mt-2 leading-relaxed">{feature.body}</p>
                </div>
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
