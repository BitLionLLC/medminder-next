import { Phone } from "@/components/phone";
import { AdherenceScreen, MedicationsScreen, TodayScreen } from "@/components/screens";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui";

const screens = [
  {
    title: "Today",
    body: "Every dose due, in order, grouped by part of the day. A ring at the top counts off what is left.",
    render: (tone: "light" | "dark") => <TodayScreen tone={tone} compact />,
  },
  {
    title: "Medications",
    body: "The full list, each with its times and the days it runs on. Edit one and the alarms re-sync immediately.",
    render: (tone: "light" | "dark") => <MedicationsScreen tone={tone} />,
  },
  {
    title: "Adherence",
    body: "A running seven-day figure in Settings, so you can see how the week actually went rather than guessing.",
    render: (tone: "light" | "dark") => <AdherenceScreen tone={tone} />,
  },
];

export function Tour() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="The app"
            title="Three screens. That is the whole thing."
            lede="Translucent surfaces over a slowly drifting aurora, in light and dark — and it honours your phone's reduce-motion setting."
          />
        </Reveal>

        {/* One column until there is room for three handsets at a width where
            their contents still fit — a squeezed phone clips its own list. */}
        <div className="mt-16 grid justify-items-center gap-12 lg:grid-cols-3 lg:gap-6">
          {screens.map((screen, i) => (
            <Reveal key={screen.title} delay={i * 120}>
              <figure className="flex flex-col items-center gap-6">
                <Phone
                  className="w-[240px] lg:w-full lg:max-w-[258px]"
                  tone={i === 1 ? "dark" : "light"}
                >
                  {screen.render(i === 1 ? "dark" : "light")}
                </Phone>
                <figcaption className="text-center">
                  <p className="text-lg font-bold">{screen.title}</p>
                  <p className="text-soft mx-auto mt-2 max-w-xs text-sm leading-relaxed">
                    {screen.body}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
