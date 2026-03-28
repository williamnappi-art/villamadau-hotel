import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { GalleriaClient } from './GalleriaClient'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { HOTEL } from '@/lib/hotel.config'

export const metadata: Metadata = {
  title: 'Galleria fotografica',
  description:
    'Galleria fotografica di Villa Madau Hotel a Pula, Sardegna. Scopri le camere, il ristorante, gli esterni e le bellezze della Sardegna meridionale.',
  alternates: { canonical: `${HOTEL.url}/galleria` },
  openGraph: {
    title: 'Galleria fotografica | Villa Madau Hotel – Pula, Sardegna',
    description: 'Galleria fotografica di Villa Madau Hotel a Pula, Sardegna. Scopri le camere, il ristorante, gli esterni e le bellezze della Sardegna meridionale.',
    url: `${HOTEL.url}/galleria`,
    siteName: HOTEL.name,
    type: 'website',
    locale: 'it_IT',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'Villa Madau Hotel Pula – galleria fotografica' }],
  },
}

const immagini = [
  { src: '/images/hero.webp', alt: 'Villa Madau Hotel Pula - vista primaverile', categoria: 'Esterno' },
  { src: '/images/hotel-1.webp', alt: 'Villa Madau Hotel - dettaglio architettura', categoria: 'Esterno' },
  { src: '/images/hotel-2.webp', alt: 'Villa Madau Hotel - ingresso', categoria: 'Esterno' },
  { src: '/images/ristorante.webp', alt: 'Ristorante Villa Madau - cucina tipica sarda', categoria: 'Ristorante' },
  { src: '/images/sardegna-chia.webp', alt: 'Spiaggia di Chia - Sardegna meridionale', categoria: 'Dintorni' },
  { src: '/images/mare-sardegna.webp', alt: 'Mare della Sardegna meridionale - vista aerea', categoria: 'Dintorni' },
]

export default async function GalleriaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: HOTEL.url },
    { name: 'Galleria', url: `${HOTEL.url}/galleria` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <div className="bg-gray-900 py-16 px-4 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-300 mb-3">
          Immagini
        </p>
        <h1 className="font-serif text-4xl md:text-5xl">Galleria fotografica</h1>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Scopri Villa Madau e i dintorni di Pula attraverso le nostre foto.
        </p>
      </div>

      <GalleriaClient immagini={immagini} />
    </>
  )
}
