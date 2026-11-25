import type { Metadata } from 'next'
import Link from 'next/link'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

// Pagina 404 unica e statica (bilingue) per qualsiasi indirizzo inesistente:
// /hotelx, /en/abc, /test.php, /wp-login.php…
// Il root layout non ha <html>/<body> (li mette [locale]/layout.tsx), quindi li dichiariamo qui.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pagina non trovata – Villa Madau Hotel',
  robots: { index: false, follow: true },
}

export default function RootNotFound() {
  return (
    <html lang="it" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-cream min-h-screen flex items-center justify-center px-6 text-center" style={{ backgroundColor: '#f0ebe0' }}>
        <div className="max-w-xl py-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Villa Madau Hotel" width={220} height={155} className="mx-auto mb-10 h-auto w-[220px]" />
          <p className="text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: '#52624c' }}>
            Errore 404
          </p>
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-4" style={{ color: '#1e1c18' }}>
            Pagina <em className="italic font-normal">non trovata</em>
          </h1>
          <p className="font-serif italic text-2xl mb-12" style={{ color: '#4a4640' }}>
            Page not found
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="inline-block text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#1e1c18', color: '#f0ebe0' }}
            >
              Torna alla home
            </Link>
            <Link
              href="/en"
              className="inline-block border text-xs font-medium tracking-[0.2em] uppercase px-8 py-4"
              style={{ borderColor: '#1e1c18', color: '#1e1c18' }}
            >
              Back to home
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
