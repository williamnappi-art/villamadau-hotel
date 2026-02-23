import type { Metadata } from 'next'
import { RistoranteHero } from '@/components/sections/RistoranteHero'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { HOTEL } from '@/lib/hotel.config'

export const metadata: Metadata = {
  title: 'Ristorante',
  description:
    'Il ristorante di Villa Madau a Pula propone la cucina tradizionale sarda con ingredienti locali: malloreddus, bottarga, grigliate di pesce, seadas. Colazione tipica sarda inclusa.',
  alternates: { canonical: `${HOTEL.url}/ristorante` },
  openGraph: {
    title: 'Ristorante | Villa Madau Hotel Pula Sardegna',
    description: 'Cucina tipica sarda con prodotti locali. Pula, Sardegna meridionale.',
    images: [{ url: '/images/ristorante.jpg', width: 1200, height: 630, alt: 'Ristorante Villa Madau Pula' }],
  },
}

const MENU_URL = 'https://www.leggimenu.it/menu/federicos/210635'

export default function RistorantePage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: HOTEL.url },
    { name: 'Ristorante', url: `${HOTEL.url}/ristorante` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <RistoranteHero />

      {/* Intro */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <SectionTitle
            label="Cucina tipica sarda"
            title="Un viaggio tra i sapori dell&apos;isola"
            subtitle="Ogni piatto racconta la storia e le tradizioni della Sardegna meridionale. Utilizziamo solo ingredienti freschi e locali, selezionati tra i migliori produttori del Sulcis e del Campidano."
          />
        </div>
      </section>

      {/* Menù embed */}
      <section className="pb-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
            <iframe
              src={MENU_URL}
              title="Menù Federico's"
              className="w-full"
              style={{ height: '900px', border: 'none' }}
              loading="lazy"
            />
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            Il menù varia in base alla stagionalità.{' '}
            <a href={MENU_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
              Apri in una nuova finestra →
            </a>
          </p>
        </div>
      </section>

      {/* Colazione */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-300 mb-3">
            Ogni mattina
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Colazione tipica sarda inclusa
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
            La giornata inizia con una colazione ricca e genuina: pane carasau, formaggi freschi,
            marmellate artigianali, dolci tradizionali, succhi di frutta e prodotti da forno locali.
            Un modo autentico per iniziare la scoperta della Sardegna.
          </p>
          <Button href="/contatti" variant="white">Prenota il tuo soggiorno</Button>
        </div>
      </section>
    </>
  )
}
