import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { CardCarousel } from '@/components/sections/CardCarousel'
import { HomeScrollSnap } from '@/components/sections/HomeScrollSnap'
import { RistoranteSection } from '@/components/sections/RistoranteSection'
import { LocationSection } from '@/components/sections/LocationSection'
import { OfferteSection } from '@/components/sections/OfferteSection'
import { Button } from '@/components/ui/Button'
import { HOTEL } from '@/lib/hotel.config'

export const metadata: Metadata = {
  title: 'Villa Madau Hotel – Pula, Sardegna',
  description: HOTEL.description,
  alternates: { canonical: HOTEL.url },
  openGraph: {
    title: 'Villa Madau Hotel – Pula, Sardegna',
    description: HOTEL.description,
    url: HOTEL.url,
    siteName: HOTEL.name,
    type: 'website',
    locale: 'it_IT',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'Villa Madau Hotel a Pula – vista esterna' }],
  },
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'home.ctaFinale' })

  return (
    <>
      <HomeScrollSnap />
      <HeroSection />
      <CardCarousel />
      <OfferteSection />
      <RistoranteSection />
      <LocationSection />

      {/* CTA finale */}
      <section className="py-20 bg-cream text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            {t('label')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('paragrafo')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contatti">{t('richiediDisponibilita')}</Button>
            <Button href={`mailto:${HOTEL.contact.email}`} variant="outline" external>
              {HOTEL.contact.email}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
