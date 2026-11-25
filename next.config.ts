import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

// Fonti autorizzate (Google Tag Manager/Analytics/Ads tramite GTM, mappe Google, menù leggimenu)
const CSP = [
  "default-src 'self'",
  // 'unsafe-inline' serve agli script inline di Next.js (pagine statiche, niente nonce) e al consenso GTM
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://www.googleadservices.com https://*.doubleclick.net https://pagead2.googlesyndication.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://*.google.com https://*.gstatic.com https://*.googleapis.com https://*.doubleclick.net https://pagead2.googlesyndication.com https://www.googleadservices.com https://*.google.it",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.google.com https://*.doubleclick.net https://pagead2.googlesyndication.com https://www.googleadservices.com https://*.google.it",
  "frame-src https://www.google.com https://maps.google.com https://www.leggimenu.it https://www.googletagmanager.com https://*.doubleclick.net",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  'report-uri /api/csp-report',
  'report-to csp',
].join('; ')

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  async redirects() {
    return [
      // === Pagine vecchio sito (Flazio) → nuovo sito ===

      // Home alternativa
      { source: '/home', destination: '/', permanent: true },

      // Camere
      { source: '/camere', destination: '/hotel', permanent: true },

      // Contatti
      { source: '/contact', destination: '/contatti', permanent: true },

      // Galleria
      { source: '/gallery', destination: '/galleria', permanent: true },

      // Booking
      { source: '/bookingonline', destination: '/contatti', permanent: true },

      // Esperienze / Servizi
      { source: '/esperienze', destination: '/servizi', permanent: true },

      // Sant'Efisio
      { source: '/hotel-in-centro-a-pula-sant-efisio-a-pula-maggio2025', destination: '/sant-efisio', permanent: true },

      // Pasqua
      { source: '/pasqua', destination: '/pasqua-a-pula', permanent: true },
      { source: '/2026-pasqua-a-pula', destination: '/pasqua-a-pula', permanent: true },

      // Domus Antigas
      { source: '/pula-gennaio-25-26-domus-antigas', destination: '/domus-antigas', permanent: true },

      // Offerte stagionali → da non perdere
      { source: '/inverno-2024', destination: '/da-non-perdere', permanent: true },
      { source: '/pula2024', destination: '/da-non-perdere', permanent: true },
      { source: '/luglio-in-sardegna', destination: '/da-non-perdere', permanent: true },
      { source: '/natale-2025-pula-capodanno-2026-2025', destination: '/da-non-perdere', permanent: true },
      { source: '/ridee-egalo-natale-saredgna-estate', destination: '/da-non-perdere', permanent: true },

      // Covid (obsoleta)
      { source: '/covid-19', destination: '/', permanent: true },

      // Blog posts → home (non esistono più)
      { source: '/pula-hotel-nora-blog', destination: '/', permanent: true },
      { source: '/home/post/:slug*', destination: '/', permanent: true },

      // Legal
      { source: '/cookie-policy', destination: '/privacy', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/terms-and-conditions', destination: '/privacy', permanent: true },
    ]
  },
  async headers() {
    return [
      // Header di sicurezza standard su tutte le pagine (HSTS lo aggiunge già Vercel).
      // CSP in modalità "solo segnalazione": non blocca nulla, segnala a /api/csp-report
      // (log di Vercel, cerca "[CSP]"). Quando i log sono puliti per qualche giorno si può
      // passare a 'Content-Security-Policy' (bloccante).
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy-Report-Only', value: CSP },
          { key: 'Reporting-Endpoints', value: 'csp="/api/csp-report"' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
        ],
      },
      // Immagini, video e loghi in /public/images: cache di 30 giorni nel browser
      // (le visite successive non riscaricano i ~3 MB dei video).
      // Se si sostituisce un file mantenendo lo stesso nome, meglio rinominarlo.
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
