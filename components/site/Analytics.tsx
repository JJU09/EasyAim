import { GA_MEASUREMENT_ID } from "@/lib/analytics";

/**
 * Google Analytics 4 (gtag.js).
 *
 * Rendered as plain <script> tags (not next/script) so they land directly in
 * the static HTML and fire immediately, without depending on Next's client
 * runtime to inject them — the most reliable approach for a static export.
 * React 19 hoists the async loader into <head>.
 *
 * Renders nothing during local dev or when no measurement ID is set, so GA only
 * runs on the deployed production build. GA4 Enhanced Measurement tracks
 * client-side route changes (browser history) automatically.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production" || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/next-script-for-ga -- plain tags on purpose for static-export reliability */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        id="ga4-init"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`,
        }}
      />
    </>
  );
}
