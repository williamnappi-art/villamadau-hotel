import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { ConditionalHeader } from '@/components/layout/ConditionalHeader'
import { Footer } from '@/components/layout/Footer'
import { HOTEL } from '@/lib/hotel.config'
import { generateHotelSchema } from '@/lib/schema'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(HOTEL.url),
  title: {
    default: `${HOTEL.name} – Hotel 3 Stelle a Pula, Sardegna`,
    template: `%s | ${HOTEL.shortName} Hotel Pula`,
  },
  description: HOTEL.description,
  keywords: [
    'hotel pula sardegna',
    'villa madau',
    'hotel centro storico pula',
    'hotel 3 stelle sardegna',
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
    title: `${HOTEL.name} – Hotel 3 Stelle a Pula, Sardegna`,
    description: HOTEL.description,
    images: [
      {
        url: '/images/hero.png',
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
    images: ['/images/hero.png'],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const hotelSchema = generateHotelSchema()

  return (
    <html lang="it" className={`${playfair.variable} ${lato.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <ConditionalHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
