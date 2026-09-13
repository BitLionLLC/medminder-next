import Script from "next/script";

import { site } from "@/lib/site";

/**
 * Google Analytics 4 via the standard gtag.js tag.
 *
 * Both scripts load with the default `afterInteractive` strategy so the tag
 * never competes with the page's own JavaScript for the first paint.
 *
 * No route-change handling is needed here: GA4's enhanced measurement counts
 * the App Router's pushState navigations by itself (a few seconds after each
 * one), and sending our own `page_view` alongside it counts every page twice.
 * If "page changes based on browser history events" is ever switched off in
 * the property's enhanced measurement settings, only landing pages would be
 * recorded and that explicit call would have to come back.
 */
export function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`}
      />
      <Script id="gtag-init">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaMeasurementId}');`}
      </Script>
    </>
  );
}
