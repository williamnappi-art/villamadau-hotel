import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

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
}

export default withNextIntl(nextConfig)
