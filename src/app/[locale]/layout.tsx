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
import '../globals.css'

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
        <script type="application/ld+json" suppressHydrationWarning>{schemaJson}</script>
      </head>
      <body className="flex flex-col min-h-screen">
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
