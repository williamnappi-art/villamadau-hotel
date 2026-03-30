import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { ConditionalHeader } from '@/components/layout/ConditionalHeader'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import CookieBanner from '@/components/ui/CookieBanner'
import { HOTEL } from '@/lib/hotel.config'
import { generateHotelSchema } from '@/lib/schema'
import { routing } from '@/i18n/routing'
import Script from 'next/script'
import '../globals.css'

const GTM_ID = 'GTM-KQMDTBCZ'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(HOTEL.url),
  title: {
    default: `${HOTEL.name} – Boutique Hotel a Pula, Sardegna`,
    template: `%s | ${HOTEL.shortName} Hotel Pula`,
  },
  description: HOTEL.description,
  keywords: [
    'hotel pula sardegna',
    'villa madau',
    'hotel centro storico pula',
    'boutique hotel sardegna',
    'hotel pula ca',
    'soggiorno sardegna meridionale',
    'boutique hotel sulcis',
    'hotel vicino nora sardegna',
  ],
  authors: [{ name: HOTEL.name }],
  creator: HOTEL.name,
  verification: {
    google: 'PzuCQyQAID-pi1C5AxmCrltC1Ivl3xS15IsARpi1etA',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: HOTEL.url,
    siteName: HOTEL.name,
    title: `${HOTEL.name} – Boutique Hotel a Pula, Sardegna`,
    description: HOTEL.description,
    images: [
      {
        url: '/images/hotel-primavera.webp',
        width: 1200,
        height: 630,
        alt: `${HOTEL.name} – Pula, Sardegna`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${HOTEL.name} – Pula, Sardegna`,
    description: HOTEL.description,
    images: ['/images/hotel-primavera.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: HOTEL.url,
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()
  const hotelSchema = generateHotelSchema()
  const schemaJson = JSON.stringify(hotelSchema)

  return (
    <html lang={locale} className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <Script id="gtm-init" strategy="afterInteractive">{`
          window.dataLayer=window.dataLayer||[];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent','default',{
            'analytics_storage':'denied',
            'ad_storage':'denied',
            'ad_user_data':'denied',
            'ad_personalization':'denied',
            'wait_for_update':500
          });
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>
        <script type="application/ld+json" suppressHydrationWarning>{schemaJson}</script>
      </head>
      <body className="flex flex-col min-h-screen">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <ConditionalHeader>
            <Header />
          </ConditionalHeader>
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
