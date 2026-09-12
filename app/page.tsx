import { Aurora } from "@/components/aurora";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { PrivacyNote } from "@/components/sections/privacy-note";
import { Tour } from "@/components/sections/tour";
import { WhyOffline } from "@/components/sections/why-offline";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { faqs, site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: site.name,
      applicationCategory: "HealthApplication",
      operatingSystem: "iOS, Android",
      url: site.url,
      author: { "@type": "Organization", name: site.developer },
      description:
        "A medication tracker with reminders that are scheduled on the device, so they arrive on time without a connection. Free, with a one-time $0.99 in-app purchase to remove ads.",
      offers: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free download. Every feature, supported by one banner ad.",
        },
        {
          "@type": "Offer",
          name: "Remove ads",
          price: site.adFreePrice.toFixed(2),
          priceCurrency: "USD",
          category: "In-app purchase",
          description: "A one-time purchase that removes the banner ad permanently.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <Aurora />
      <SiteHeader />
      <main className="relative z-10 flex-1">
        <Hero />
        <WhyOffline />
        <HowItWorks />
        <Tour />
        <Features />
        <Pricing />
        <PrivacyNote />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
