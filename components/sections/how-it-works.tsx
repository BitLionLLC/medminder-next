import { Reveal } from "@/components/reveal";
import { Glass, SectionHeading } from "@/components/ui";

const steps = [
  {
    n: "01",
    title: "Add what you take",
    body: "Name, dosage and any notes. Pick a colour and an icon so it stands out in a list of five. Takes about twenty seconds.",
  },
  {
    n: "02",
    title: "Say when",
    body: "Any number of times a day, on any set of weekdays. Twice daily every day, or once on Monday, Wednesday and Friday — both are the same two taps.",
  },
  {
    n: "03",
    title: "Answer the reminder",
    body: "A notification at every scheduled time. Tap once to log the dose as taken, or swipe to skip it. Tapped the wrong one? Tap again to undo.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps, then it looks after itself"
            lede="There is no setup wizard, no import, and nothing to configure. Add a medication and the reminders arm themselves."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 110}>
              <Glass className="relative h-full overflow-hidden p-7">
                <span
                  aria-hidden
                  className="text-peri-500/15 dark:text-peri-300/12 absolute -top-3 right-3 font-[family-name:var(--font-jakarta)] text-7xl font-extrabold"
                >
                  {step.n}
                </span>
                <span className="bg-peri-600 dark:bg-peri-500 relative grid h-11 w-11 place-items-center rounded-2xl text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="relative mt-5 text-xl font-bold">{step.title}</h3>
                <p className="text-soft relative mt-3 leading-relaxed">{step.body}</p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
