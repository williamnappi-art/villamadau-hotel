import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { setRequestLocale } from 'next-intl/server'
import { RistoranteHero } from '@/components/sections/RistoranteHero'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { pageBreadcrumb } from '@/lib/schema'
import { ConsentIframe } from '@/components/ui/ConsentIframe'
import { HOTEL } from '@/lib/hotel.config'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ locale, path: '/ristorante', key: 'ristorante', image: { url: '/images/ristorante.webp' } })
}

const MENU_URL = HOTEL.restaurant.menuUrl

export default async function RistorantePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumb = pageBreadcrumb(locale, '/ristorante')

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
            <ConsentIframe
              src={MENU_URL}
              title="Menù Federico's"
              provider="leggimenu"
              externalUrl={MENU_URL}
              kind="menu"
              className="w-full"
              style={{ height: '900px' }}
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
