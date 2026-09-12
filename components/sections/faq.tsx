import { Reveal } from "@/components/reveal";
import { Glass, SectionHeading } from "@/components/ui";
import { faqs, site } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions worth asking first"
            lede={
              <>
                Anything else, email{" "}
                <a
                  className="text-peri-600 dark:text-peri-300 font-semibold hover:underline"
                  href={`mailto:${site.supportEmail}`}
                >
                  {site.supportEmail}
                </a>
                .
              </>
            }
          />
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={Math.min(i, 4) * 60}>
              <Glass as="article" className="overflow-hidden">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="text-peri-600 dark:text-peri-300 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-current/10 transition-transform duration-300 group-open:rotate-45">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden>
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="text-soft px-6 pb-6 leading-relaxed">{faq.a}</p>
                </details>
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
