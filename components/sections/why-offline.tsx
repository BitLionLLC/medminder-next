import { Reveal } from "@/components/reveal";
import { Glass, SectionHeading } from "@/components/ui";

/**
 * The one architectural decision worth selling to a non-technical reader: the
 * reminders are OS alarms, not push notifications.
 */
export function WhyOffline() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Why it arrives"
            title={
              <>
                Most reminder apps send a <span className="text-gradient">push</span>.
                <br />
                Med Minder sets an <span className="text-gradient">alarm</span>.
              </>
            }
            lede="A dose reminder has one job: be there at the right minute. That is not something to route through a server and hope for."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal>
            <Glass className="h-full p-7">
              <Label tone="muted">The usual way</Label>
              <p className="mt-4 text-xl font-bold">A push notification</p>
              <ul className="mt-5 space-y-3.5">
                <Item cross>Needs a connection at the exact moment it fires.</Item>
                <Item cross>Goes through someone else&rsquo;s delivery queue.</Item>
                <Item cross>Can be delayed, batched or quietly dropped.</Item>
                <Item cross>Stops entirely if the server is having a bad day.</Item>
              </ul>
            </Glass>
          </Reveal>

          <Reveal delay={120}>
            <Glass tone="strong" className="ring-peri-500/25 h-full p-7 ring-1">
              <Label>Med Minder</Label>
              <p className="mt-4 text-xl font-bold">A local alarm</p>
              <ul className="mt-5 space-y-3.5">
                <Item>Scheduled by the phone&rsquo;s own alarm clock.</Item>
                <Item>Fires in airplane mode, in a lift, in a basement.</Item>
                <Item>Re-armed automatically after a restart.</Item>
                <Item>Re-synced the moment you edit a schedule anywhere.</Item>
              </ul>
            </Glass>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <p className="text-soft mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed">
            iOS caps how many reminders an app may have pending at once. Med Minder
            budgets under that cap deliberately — a daily medication becomes one
            repeating alarm per time rather than seven weekly ones — so a long
            medication list never quietly loses its evening dose.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Label({ children, tone }: { children: React.ReactNode; tone?: "muted" }) {
  return (
    <span
      className={
        tone === "muted"
          ? "text-soft text-xs font-bold tracking-[0.16em] uppercase"
          : "text-peri-600 dark:text-peri-300 text-xs font-bold tracking-[0.16em] uppercase"
      }
    >
      {children}
    </span>
  );
}

function Item({ children, cross }: { children: React.ReactNode; cross?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={
          cross
            ? "text-soft mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-current/10"
            : "bg-go/15 text-go mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
        }
      >
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d={cross ? "M6 6l12 12M18 6 6 18" : "m5 12.5 4.5 4.5L19 7"} />
        </svg>
      </span>
      <span className={cross ? "text-soft leading-relaxed" : "leading-relaxed"}>{children}</span>
    </li>
  );
}
