import { Phone } from "@/components/phone";
import { TodayScreen } from "@/components/screens";
import { Glass, Pill, StoreButtons } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="flex flex-col items-start gap-7">
          <Pill className="text-peri-700 dark:text-peri-300">
            <span className="bg-mint h-1.5 w-1.5 rounded-full" />
            Coming soon to iPhone and Android
          </Pill>

          <h1 className="text-[2.7rem] leading-[1.03] font-extrabold sm:text-6xl lg:text-[4.2rem]">
            Never miss a dose.
            <br />
            <span className="text-gradient">Even off the grid.</span>
          </h1>

          <p className="text-soft max-w-xl text-lg leading-relaxed sm:text-xl">
            Add what you take and when. Med Minder rings at every scheduled time
            and you tap once to log it. The alarms live on your phone, not on a
            server — so they arrive on time in a basement, on a plane, or on a
            handset that has not seen a signal all day.
          </p>

          <StoreButtons />

          <Glass className="flex flex-wrap items-center gap-x-7 gap-y-3 px-5 py-4 text-sm">
            <Fact value="Free" label="Every feature" />
            <Divider />
            <Fact value="No subscription" label="$0.99 removes the ad" />
            <Divider />
            <Fact value="Offline" label="Reminders still fire" />
          </Glass>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          {/* A soft bloom behind the handset so it sits in the aurora rather
              than on top of it. */}
          <div
            aria-hidden
            className="bg-peri-400/25 dark:bg-peri-500/20 absolute top-1/2 left-1/2 h-[70%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
          />
          <Phone className="animate-float w-[248px] sm:w-[290px]">
            <TodayScreen />
          </Phone>

          {/* The notification the whole product turns on. `.glass` sets its own
              `position: relative`, so the placement lives on a wrapper. */}
          <div className="animate-float absolute -bottom-6 -left-2 w-[230px] [animation-delay:-3.5s] sm:-left-6 lg:left-0">
            <Glass tone="strong" className="px-3.5 py-3">
              <div className="flex items-start gap-2.5">
                <span className="bg-peri-500 grid h-7 w-7 shrink-0 place-items-center rounded-[8px] text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7M13.7 20a2 2 0 0 1-3.4 0" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="flex items-baseline justify-between gap-2 text-[11px] font-bold">
                    Med Minder{" "}
                    <span className="text-soft text-[10px] font-medium">
                      now
                    </span>
                  </p>
                  <p className="text-[11px] leading-snug">
                    Time for <strong>Metformin</strong> — 500 mg
                  </p>
                </div>
              </div>
            </Glass>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <span className="flex flex-col">
      <span className="font-[family-name:var(--font-jakarta)] font-bold tracking-tight">
        {value}
      </span>
      <span className="text-soft text-xs">{label}</span>
    </span>
  );
}

function Divider() {
  return <span aria-hidden className="hairline hidden h-8 border-l sm:block" />;
}
