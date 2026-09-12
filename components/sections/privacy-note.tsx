import { Reveal } from "@/components/reveal";
import { Glass } from "@/components/ui";
import Link from "next/link";

const points = [
  {
    title: "Signed out means on-device",
    body: "Skip the sign-in screen and your medications and dose log never leave the phone. Nothing to sync, nothing to leak.",
  },
  {
    title: "Signed in means yours alone",
    body: "Your schedule syncs to your own account so a new phone picks it up. It is not sold, and it is not shared with advertisers.",
  },
  {
    title: "Deletable, in the app",
    body: "Delete your account from Settings and the medications, the schedule and the whole dose log go with it.",
  },
];

export function PrivacyNote() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Glass tone="strong" className="overflow-hidden p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <div>
                <span className="text-peri-600 dark:text-peri-300 text-xs font-bold tracking-[0.16em] uppercase">
                  Privacy
                </span>
                <h2 className="mt-4 text-3xl leading-tight font-extrabold sm:text-4xl">
                  A medication list is about as personal as data gets
                </h2>
                <p className="text-soft mt-4 leading-relaxed">
                  So Med Minder treats it that way. The app works fully signed
                  out, and the only reason to sign in is to move your schedule
                  between devices.
                </p>
                <Link
                  href="/privacy"
                  className="text-peri-600 dark:text-peri-300 mt-6 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
                >
                  Read the privacy policy
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h13M13 6.5 18.5 12 13 17.5" />
                  </svg>
                </Link>
              </div>

              <ul className="grid gap-4 sm:grid-cols-1">
                {points.map((point) => (
                  <li key={point.title} className="hairline border-t pt-4 first:border-t-0 first:pt-0">
                    <p className="font-bold">{point.title}</p>
                    <p className="text-soft mt-1.5 leading-relaxed">{point.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Glass>
        </Reveal>
      </div>
    </section>
  );
}
