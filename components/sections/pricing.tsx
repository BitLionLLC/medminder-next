import { Reveal } from "@/components/reveal";
import { Glass, SectionHeading, StoreButtons } from "@/components/ui";

const free = [
  "Unlimited medications",
  "Unlimited reminders, every day of the week",
  "The full dose log and seven-day adherence",
  "Sync across your devices",
  "Light and dark themes",
  "One small banner ad at the bottom",
];

const paid = [
  "Everything in the free app",
  "No banner ad, anywhere, ever",
  "Restores on every device you sign in on",
  "Paid once — not monthly, not yearly",
];

export function Pricing() {
  return (
    <section id="pricing" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title={
              <>
                Free, in the way you&rsquo;d <span className="text-gradient">want</span> free to mean
              </>
            }
            lede="Nothing about your medication is behind a paywall. The app earns its keep from one banner at the bottom of the screen, and you can buy that away once if it bothers you."
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          <Reveal>
            <Glass className="flex h-full flex-col p-8">
              <p className="text-soft text-xs font-bold tracking-[0.16em] uppercase">
                The app
              </p>
              <p className="mt-4 font-[family-name:var(--font-jakarta)] text-5xl font-extrabold tracking-tight">
                Free
              </p>
              <p className="text-soft mt-2 text-sm">Every feature, no account required</p>
              <ul className="mt-7 space-y-3">
                {free.map((line) => (
                  <Line key={line}>{line}</Line>
                ))}
              </ul>
            </Glass>
          </Reveal>

          <Reveal delay={120}>
            <Glass tone="strong" className="ring-peri-500/25 flex h-full flex-col p-8 ring-1">
              <div className="flex items-center justify-between">
                <p className="text-peri-600 dark:text-peri-300 text-xs font-bold tracking-[0.16em] uppercase">
                  Remove ads
                </p>
                <span className="bg-peri-500/12 text-peri-600 dark:text-peri-300 rounded-full px-3 py-1 text-[11px] font-bold">
                  One-time
                </span>
              </div>
              <p className="mt-4 font-[family-name:var(--font-jakarta)] text-5xl font-extrabold tracking-tight">
                One purchase
              </p>
              <p className="text-soft mt-2 text-sm">
                Priced at launch — a few dollars, paid once
              </p>
              <ul className="mt-7 space-y-3">
                {paid.map((line) => (
                  <Line key={line}>{line}</Line>
                ))}
              </ul>
            </Glass>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <StoreButtons />
            <p className="text-soft max-w-xl text-center text-sm">
              No trial that quietly converts, no feature that disappears after a
              week, and no card details to download it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="bg-go/15 text-go mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m5 12.5 4.5 4.5L19 7" />
        </svg>
      </span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}
