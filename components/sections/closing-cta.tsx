import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Glass, StoreButtons } from "@/components/ui";
import { site } from "@/lib/site";

export function ClosingCta() {
  return (
    <section className="relative px-4 pt-10 pb-24 sm:px-6 sm:pb-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <Glass tone="strong" className="relative overflow-hidden px-8 py-14 text-center sm:px-14">
            <div
              aria-hidden
              className="bg-peri-400/25 dark:bg-peri-500/20 absolute -top-24 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full blur-[90px]"
            />
            <div className="relative flex flex-col items-center gap-6">
              <Image
                src="/app-icon.png"
                alt=""
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-[18px] shadow-lg"
              />
              <h2 className="max-w-2xl text-4xl leading-[1.08] font-extrabold sm:text-5xl">
                The dose you forget is the one that matters
              </h2>
              <p className="text-soft max-w-xl text-lg leading-relaxed">
                {site.name} is finishing up for iPhone and Android. Leave your
                address and you&rsquo;ll hear from us the day it lands — nothing
                else, ever.
              </p>
              <StoreButtons className="justify-center" />
            </div>
          </Glass>
        </Reveal>
      </div>
    </section>
  );
}
