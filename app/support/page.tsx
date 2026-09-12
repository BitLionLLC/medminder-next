import type { Metadata } from "next";
import Link from "next/link";
import { Aurora } from "@/components/aurora";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Glass, Pill } from "@/components/ui";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description: `Help with ${site.name} — reminders, schedules, sync, purchases and account deletion. Or email us and get a person.`,
  alternates: { canonical: "/support" },
};

const topics = [
  {
    q: "A reminder did not arrive",
    a: (
      <>
        Check that notifications are allowed for Med Minder in your phone&rsquo;s
        Settings, and that the medication is scheduled for today&rsquo;s weekday.
        On Android, some manufacturers put the app to sleep aggressively —
        exempting Med Minder from battery optimisation fixes it. If it still
        misses, email us with the medication&rsquo;s times and your phone model.
      </>
    ),
  },
  {
    q: "My medications did not appear on a new phone",
    a: (
      <>
        Sync is tied to your account, so sign in on the new phone with the same
        method you used on the old one — Apple, Google or the same email address.
        If you never signed in, the data only ever lived on the old device.
      </>
    ),
  },
  {
    q: "I bought the ad removal and still see ads",
    a: (
      <>
        Open Settings and tap <strong>Restore purchase</strong>. That re-validates
        the purchase against the store account that made it. Make sure you are
        signed in to the same Apple Account or Google account you bought it with.
      </>
    ),
  },
  {
    q: "I want to delete my account",
    a: (
      <>
        Settings → Account → Delete account. That removes the account along with
        every medication, schedule and dose record attached to it. It cannot be
        undone.
      </>
    ),
  },
  {
    q: "I marked the wrong dose",
    a: (
      <>
        Tap it again. Taken and skipped both toggle back to pending, and the
        seven-day adherence figure updates with them.
      </>
    ),
  },
  {
    q: "I have a feature request",
    a: (
      <>
        Send it over. Shared and multi-profile schedules, refill tracking and an
        exportable history are the three most-asked so far, and the list genuinely
        shapes what gets built next.
      </>
    ),
  },
];

export default function SupportPage() {
  return (
    <>
      <Aurora />
      <SiteHeader />

      <main className="relative z-10 flex-1 px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-start gap-5">
            <Pill className="text-peri-700 dark:text-peri-300">Support</Pill>
            <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">
              Something not working?
            </h1>
            <p className="text-soft text-lg leading-relaxed">
              Med Minder is made by one small company, and the support address
              goes to a person rather than a queue. Most answers are below;
              anything else, write to us.
            </p>
            <a
              href={`mailto:${site.supportEmail}`}
              className="bg-peri-600 shadow-peri-600/25 hover:bg-peri-700 dark:bg-peri-500 dark:hover:bg-peri-400 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
            >
              Email {site.supportEmail}
            </a>
          </div>

          <div className="mt-14 space-y-3">
            {topics.map((topic) => (
              <Glass key={topic.q} as="article" className="p-6">
                <h2 className="text-lg font-bold">{topic.q}</h2>
                <p className="text-soft mt-2.5 leading-relaxed">{topic.a}</p>
              </Glass>
            ))}
          </div>

          <div className="hairline mt-14 border-t pt-10">
            <h2 className="text-2xl font-extrabold">Before you write</h2>
            <p className="text-soft mt-3 leading-relaxed">
              The{" "}
              <Link href="/#faq" className="text-peri-600 dark:text-peri-300 font-semibold hover:underline">
                FAQ on the home page
              </Link>{" "}
              covers pricing, offline behaviour, accounts and what Med Minder is
              and is not ({faqs.length} questions in all). If your answer is not
              there, include your phone model and OS version in the email — it
              usually saves a round trip.
            </p>
            <p className="text-soft mt-6 text-sm leading-relaxed">
              Med Minder is a reminder tool. It is not medical advice, it does not
              check for drug interactions, and it cannot tell you what to take.
              For anything about the medication itself, talk to your doctor or
              pharmacist.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
