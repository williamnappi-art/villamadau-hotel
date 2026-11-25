import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { ReactNode } from 'react'
import Image from 'next/image'

import { pageBreadcrumb } from '@/lib/schema'
import { Button } from '@/components/ui/Button'
import { HOTEL } from '@/lib/hotel.config'
import { ConsentIframe } from '@/components/ui/ConsentIframe'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ locale, path: '/gutturu-mannu', key: 'gutturuMannu', image: { url: '/images/gutturu-mannu-paesaggio.webp' } })
}

// Testi in messages/*/eventi.json → gutturuMannu.percorsi.items.<id>
const percorsi = [
  { id: 'd212a', codice: 'D 212A', difficolta: 'E' },
  { id: 'd215', codice: 'D 215', difficolta: 'E' },
  { id: 'd204', codice: 'D 204', difficolta: 'E' },
  { id: 'd200', codice: 'D 200', difficolta: 'EE' },
]

// Testi in messages/*/eventi.json → gutturuMannu.attivita.items.<id>
const attivita = [
  {
    id: 'trekking',
    icona: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
  {
    id: 'cervi',
    icona: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'birdwatching',
    icona: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636" />
      </svg>
    ),
  },
  {
    id: 'cascate',
    icona: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    id: 'mountainBike',
    icona: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.522 4.82 3.889 6.204L6 21l4.5-2.25a9.7 9.7 0 001.5.115c4.97 0 9-3.186 9-7.115C21 7.185 16.97 3 12 3z" />
      </svg>
    ),
  },
  {
    id: 'ecomuseo',
    icona: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
]

export default async function GutturuMannuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('eventi')
  const strong = (chunks: ReactNode) => <strong className="text-gray-800">{chunks}</strong>
  const em = (chunks: ReactNode) => <em>{chunks}</em>

  const breadcrumb = pageBreadcrumb(locale, '/gutturu-mannu')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* ── HERO ── */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <Image
          src="/images/gutturu-mannu-cervo.webp"
          alt={t('gutturuMannu.hero.imageAlt')}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4 text-center text-white">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70 mb-3">
            {t('gutturuMannu.hero.label')}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4 drop-shadow-md">
            {t('gutturuMannu.hero.title')}
          </h1>
          <p className="max-w-xl text-white/80 text-base md:text-lg leading-relaxed">
            {t('gutturuMannu.hero.subtitle1')}<br className="hidden md:block" />
            {t('gutturuMannu.hero.subtitle2')}
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {['area', 'cervi', 'vetta', 'sentieri'].map((id) => (
            <div key={id}>
              <p className="font-serif text-3xl md:text-4xl">{t(`gutturuMannu.stats.${id}.valore`)}</p>
              <p className="text-xs text-primary-200 uppercase tracking-wider mt-0.5">{t(`gutturuMannu.stats.${id}.unita`)}</p>
              <p className="text-sm text-white/70 mt-1">{t(`gutturuMannu.stats.${id}.etichetta`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTRODUZIONE ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">
            {t('gutturuMannu.introduzione.label')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-8 text-center">
            {t('gutturuMannu.introduzione.title')}
          </h2>
          <div className="space-y-5 text-gray-600 leading-relaxed text-[15px]">
            <p>{t.rich('gutturuMannu.introduzione.paragrafo1', { b: strong, i: em })}</p>
            <p>{t.rich('gutturuMannu.introduzione.paragrafo2', { b: strong, i: em })}</p>
            <p>{t.rich('gutturuMannu.introduzione.paragrafo3', { b: strong, i: em })}</p>
          </div>
        </div>
      </section>

      {/* ── FOTO PAESAGGIO ── */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src="/images/gutturu-mannu-paesaggio.webp"
          alt={t('gutturuMannu.fotoPaesaggio.imageAlt')}
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-serif text-white text-2xl md:text-3xl italic text-center px-4 drop-shadow">
            {t('gutturuMannu.fotoPaesaggio.citazione')}
          </p>
        </div>
      </section>

      {/* ── ATTIVITÀ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">
            {t('gutturuMannu.attivita.label')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-12 text-center">
            {t('gutturuMannu.attivita.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attivita.map((a) => (
              <div key={a.id} className="flex gap-4 p-6 rounded-xl bg-cream hover:shadow-sm transition-shadow">
                <div className="shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                  {a.icona}
                </div>
                <div>
                  <h3 className="font-serif text-lg text-gray-900 mb-1">{t(`gutturuMannu.attivita.items.${a.id}.titolo`)}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{t(`gutturuMannu.attivita.items.${a.id}.testo`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERCORSI ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">
            {t('gutturuMannu.percorsi.label')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 text-center">
            {t('gutturuMannu.percorsi.title')}
          </h2>
          <p className="text-center text-sm text-gray-500 mb-12">
            <span className="inline-flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">E</span> {t('gutturuMannu.percorsi.escursionistico')}
            </span>
            <span className="mx-3 text-gray-300">·</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-xs font-medium">EE</span> {t('gutturuMannu.percorsi.escursionistaEsperto')}
            </span>
          </p>
          <div className="space-y-4">
            {percorsi.map((p) => (
              <div key={p.codice} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs text-gray-400 font-mono">{p.codice}</span>
                    <h3 className="font-serif text-lg text-gray-900 mt-0.5">{t(`gutturuMannu.percorsi.items.${p.id}.nome`)}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{t(`gutturuMannu.percorsi.items.${p.id}.lunghezza`)}</span>
                    <span className="text-gray-200">·</span>
                    <span>{t(`gutturuMannu.percorsi.items.${p.id}.durata`)}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        p.difficolta === 'EE'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {p.difficolta}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{t(`gutturuMannu.percorsi.items.${p.id}.descrizione`)}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            {t('gutturuMannu.percorsi.mappeNote')}{' '}
            <a href="https://www.sardegnasentieri.it/carte/gutturu-mannu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              sardegnasentieri.it
            </a>
          </p>
        </div>
      </section>

      {/* ── COME ARRIVARE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">
            {t('gutturuMannu.comeArrivare.label')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-12 text-center">
            {t('gutturuMannu.comeArrivare.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6 text-[15px] text-gray-600 leading-relaxed">
              <div>
                <h3 className="font-serif text-lg text-gray-900 mb-2">{t('gutturuMannu.comeArrivare.pixinamanna.title')}</h3>
                <p>
                  {t.rich('gutturuMannu.comeArrivare.pixinamanna.paragrafo', { b: (chunks: ReactNode) => <strong>{chunks}</strong> })}
                </p>
                <p className="mt-2 text-sm text-primary font-medium">{t('gutturuMannu.comeArrivare.pixinamanna.distanza')}</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-gray-900 mb-2">{t('gutturuMannu.comeArrivare.pantaleo.title')}</h3>
                <p>
                  {t('gutturuMannu.comeArrivare.pantaleo.paragrafo')}
                </p>
              </div>
              <p className="text-sm text-gray-400">
                {t('gutturuMannu.comeArrivare.nota')}
              </p>
            </div>

            {/* Mappa OpenStreetMap */}
            <div className="rounded-xl overflow-hidden shadow-md aspect-[4/3]">
              <ConsentIframe
                src="https://maps.google.com/maps?q=Via+Nora+84,+09050+Pula+CA,+Sardegna,+Italy&output=embed&z=16"
                title={t('gutturuMannu.comeArrivare.mapTitle')}
                provider="Google Maps"
                externalUrl={HOTEL.googleMapsUrl}
                kind="mappa"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-cream text-center px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          {t('gutturuMannu.ctaFinale.label')}
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
          {t('gutturuMannu.ctaFinale.title')}
        </h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">
          {t('gutturuMannu.ctaFinale.paragrafo')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/contatti">{t('gutturuMannu.ctaFinale.contattaci')}</Button>
          <Button href="https://www.parcogutturumannu.it" variant="outline" external>
            {t('gutturuMannu.ctaFinale.sitoUfficiale')}
          </Button>
        </div>
      </section>
    </>
  )
}
