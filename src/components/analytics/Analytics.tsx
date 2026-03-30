'use client'

import Script from 'next/script'

const GTM_ID = 'GTM-KQMDTBCZ'

export function Analytics() {
  if (!GTM_ID) return null

  return (
    <>
      {/* Consent Mode v2 Default — MUST run before GTM loads */}
      <Script id="gtm-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          // 1. Consent Mode v2 - Default DENIED (GDPR compliant)
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'wait_for_update': 500
          });

          // 2. Check for saved consent preferences (with 180-day GDPR expiry)
          (function() {
            try {
              var saved = localStorage.getItem('cookie_consent');
              if (saved) {
                var prefs = JSON.parse(saved);
                var daysSince = (Date.now() - prefs.timestamp) / (1000 * 60 * 60 * 24);
                if (daysSince > 180) {
                  localStorage.removeItem('cookie_consent');
                } else {
                  gtag('consent', 'update', {
                    'ad_storage': prefs.marketing ? 'granted' : 'denied',
                    'ad_user_data': prefs.marketing ? 'granted' : 'denied',
                    'ad_personalization': prefs.marketing ? 'granted' : 'denied',
                    'analytics_storage': prefs.analytics ? 'granted' : 'denied'
                  });
                }
              }
            } catch(e) {}
          })();

          // 3. Advanced parameters for better tracking
          gtag('set', 'url_passthrough', true);
          gtag('set', 'ads_data_redaction', true);
        `}
      </Script>

      {/* 4. Google Tag Manager */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      {/* GTM noscript fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}
