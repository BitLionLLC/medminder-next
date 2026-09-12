import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Aurora } from "@/components/aurora";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Pill } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy and terms",
  description: `What ${site.name} collects, what it does not, and the terms you use it under.`,
  alternates: { canonical: "/privacy" },
};

/* Update when the wording changes, not on every deploy — App Store review reads
   this date. */
const LAST_UPDATED = "12 September 2026";

export default function PrivacyPage() {
  return (
    <>
      <Aurora />
      <SiteHeader />

      <main className="relative z-10 flex-1 px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
        <article className="mx-auto max-w-3xl">
          <div className="flex flex-col items-start gap-5">
            <Pill className="text-peri-700 dark:text-peri-300">Legal</Pill>
            <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">
              Privacy policy
            </h1>
            <p className="text-soft">Last updated {LAST_UPDATED}.</p>
          </div>

          <div className="mt-12 space-y-10">
            <Section title="The short version">
              <p>
                If you use Med Minder without signing in, your medications and
                your dose history stay on your phone and are never sent anywhere.
                If you sign in, that same data syncs to your account so it follows
                you to a new device. We do not sell it, and we do not share it
                with advertisers.
              </p>
            </Section>

            <Section title="What we store">
              <ul className="space-y-3">
                <Bullet term="Your medications and schedule">
                  Name, dosage, notes, the times of day and the weekdays you take
                  it, plus the colour and icon you chose. Stored on the device
                  always, and in your account if you are signed in.
                </Bullet>
                <Bullet term="Your dose log">
                  One record each time you mark a dose taken or skipped: which
                  medication, which scheduled time, and when you tapped.
                </Bullet>
                <Bullet term="Your account, if you make one">
                  An identifier, and the email address and name your sign-in
                  provider gives us. Accounts are handled by Clerk; we never see
                  or store a password.
                </Bullet>
                <Bullet term="Purchases">
                  Whether the ad-free upgrade has been bought, checked through
                  RevenueCat and the platform store. Payment details go to Apple
                  or Google and never reach us.
                </Bullet>
              </ul>
            </Section>

            <Section title="What we do not do">
              <ul className="space-y-3">
                <Bullet term="No selling">
                  Your medication data is never sold, rented or traded.
                </Bullet>
                <Bullet term="No advertising use">
                  What you take is never used to target ads, and is never given to
                  an advertiser.
                </Bullet>
                <Bullet term="No health-records integration">
                  Med Minder does not read from or write to Apple Health, Google
                  Health Connect or any pharmacy or clinical system.
                </Bullet>
              </ul>
            </Section>

            <Section title="Reminders">
              <p>
                Reminders are scheduled by your phone&rsquo;s own operating system,
                not sent from a server. The times and medication names in your
                notifications are held on the device by iOS or Android. Nothing
                about a reminder is transmitted for it to fire.
              </p>
            </Section>

            <Section title="Ads">
              <p>
                The free version of Med Minder shows a banner ad supplied by Google
                AdMob. AdMob may use a device advertising identifier to choose and
                measure ads, subject to the tracking permission you grant or deny
                when the app first asks. We do not send AdMob anything about your
                medications, schedule or dose history. Buying the one-time ad
                removal stops the ad and the requests behind it.
              </p>
            </Section>

            <Section title="Who processes data for us">
              <ul className="space-y-3">
                <Bullet term="Clerk">Accounts and sign-in.</Bullet>
                <Bullet term="Convex">Storage and sync of your medications and dose log.</Bullet>
                <Bullet term="RevenueCat">Validating the ad-free purchase.</Bullet>
                <Bullet term="Google AdMob">Serving the banner ad in the free version.</Bullet>
              </ul>
              <p className="mt-4">
                Each acts on our behalf under its own terms, and each has its own
                privacy policy covering the data it handles.
              </p>
            </Section>

            <Section title="Keeping and deleting data">
              <p>
                Signed-in data is kept for as long as the account exists. Delete
                your account from Settings → Account → Delete account, and the
                account, medications, schedule and dose log are removed. Deleting
                the app from a device you never signed in on removes the only copy
                that existed. You can also email{" "}
                <a
                  className="text-peri-600 dark:text-peri-300 font-semibold hover:underline"
                  href={`mailto:${site.supportEmail}`}
                >
                  {site.supportEmail}
                </a>{" "}
                to ask for a copy of your data or to have it deleted.
              </p>
            </Section>

            <Section title="Children">
              <p>
                Med Minder is not directed at children under 13, and we do not
                knowingly collect data from them. If you believe a child has given
                us data, email us and we will remove it.
              </p>
            </Section>

            <Section title="Changes">
              <p>
                If this policy changes materially, the date at the top changes and
                the app tells you the next time you open it.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                {site.developer} —{" "}
                <a
                  className="text-peri-600 dark:text-peri-300 font-semibold hover:underline"
                  href={`mailto:${site.supportEmail}`}
                >
                  {site.supportEmail}
                </a>
              </p>
            </Section>

            <div id="terms" className="hairline scroll-mt-28 border-t pt-12">
              <h2 className="text-3xl font-extrabold">Terms of use</h2>

              <div className="mt-8 space-y-10">
                <Section title="Not medical advice">
                  <p>
                    Med Minder is a reminder and a log. It does not check for drug
                    interactions, does not verify dosages, does not diagnose
                    anything, and is not a substitute for advice from a doctor or
                    pharmacist. Never change what you take because of something
                    the app did or did not do. In an emergency, contact your local
                    emergency service.
                  </p>
                </Section>

                <Section title="Reminders are best-effort">
                  <p>
                    Reminders are scheduled with your phone&rsquo;s alarm
                    scheduler, which is reliable but not guaranteed: a phone that
                    is off, out of battery, or has notifications disabled for the
                    app will not show them, and operating systems limit how many
                    may be pending at once. Do not rely on Med Minder as the only
                    safeguard for a critical medication.
                  </p>
                </Section>

                <Section title="Your account">
                  <p>
                    You are responsible for the sign-in method you use and for
                    what is entered into your account. Do not use Med Minder to
                    store data about someone else without their agreement.
                  </p>
                </Section>

                <Section title="Purchases">
                  <p>
                    The ad-free upgrade is a one-time in-app purchase, sold and
                    refunded by Apple or Google under their terms. It is tied to
                    the store account that bought it and can be restored from
                    Settings.
                  </p>
                </Section>

                <Section title="Liability">
                  <p>
                    Med Minder is provided as-is, without warranty. To the extent
                    the law allows, {site.developer} is not liable for any loss
                    arising from a missed, late or incorrect reminder, or from any
                    other use of the app.
                  </p>
                </Section>
              </div>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="text-soft mt-3 leading-relaxed [&_a]:break-words">{children}</div>
    </section>
  );
}

function Bullet({ term, children }: { term: string; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="bg-peri-500/60 mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
      <span>
        <strong className="text-[color:var(--text)]">{term}.</strong> {children}
      </span>
    </li>
  );
}
