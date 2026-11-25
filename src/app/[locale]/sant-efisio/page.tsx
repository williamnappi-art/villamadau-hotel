import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { ReactNode } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { SantEfisioHero } from '@/components/sections/SantEfisioHero'
import { pageBreadcrumb } from '@/lib/schema'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ locale, path: '/sant-efisio', key: 'santEfisio', image: { url: '/images/fuochi-villa-madau.webp' } })
}

// Foto delle sei camere — i testi sono in messages/*/eventi.json → santEfisio.camere.rooms.<numero>
const rooms = [
  { numero: '01', image: '/images/camera-1.webp' },
  { numero: '02', image: '/images/camera-3.webp' },
  { numero: '03', image: '/images/camera-hotel-pula.webp' },
  { numero: '04', image: '/images/camera-1.webp' },
  { numero: '05', image: '/images/camera-3.webp' },
  { numero: '06', image: '/images/camera-via-nora.webp' },
]

const BOOKING_URL = 'https://booking.slope.it/f0fc79cb-30b8-401d-a334-210174b387a8'

export default async function SantEfisioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('eventi')

  const breadcrumb = pageBreadcrumb(locale, '/sant-efisio')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <SantEfisioHero />

      {/* ── INTRO PROCESSIONE ── */}
      <section style={{ backgroundColor: '#F9ECE8' }} className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] mb-8" style={{ color: '#939685' }}>
            {t('santEfisio.intro.label')}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-10" style={{ color: '#1e1c18' }}>
            {t('santEfisio.intro.title1')}<br />{t('santEfisio.intro.title2')}
          </h2>
          <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#4a4640' }}>
            <p>{t('santEfisio.intro.paragrafo1')}</p>
            <p>{t('santEfisio.intro.paragrafo2')}</p>
            <p>{t('santEfisio.intro.paragrafo3')}</p>
          </div>
          <a
            href="https://www.festadisantefisio.it"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 text-xs uppercase tracking-[0.25em] border-b pb-px transition-opacity hover:opacity-60"
            style={{ color: '#D0634C', borderColor: '#D0634C' }}
          >
            {t('santEfisio.intro.link')}
          </a>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ backgroundColor: '#F4C2AE' }} className="h-px" />

      {/* ── PERCHÉ VILLA MADAU ── */}
      <section style={{ backgroundColor: '#D3DCD7' }} className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
            <Image
              src="/images/fuochi-villa-madau.webp"
              alt={t('santEfisio.perche.imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: '#939685' }}>
              {t('santEfisio.perche.label')}
            </p>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-snug" style={{ color: '#1e1c18' }}>
              {t('santEfisio.perche.title')}
            </h2>
            <div className="space-y-4 leading-relaxed" style={{ color: '#4a4640' }}>
              <p>{t('santEfisio.perche.paragrafo1')}</p>
              <p>{t('santEfisio.perche.paragrafo2')}</p>
              <p>{t('santEfisio.perche.paragrafo3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LE SEI CAMERE — intestazione ── */}
      <section style={{ backgroundColor: '#F9ECE8' }} className="pt-28 pb-0 px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] mb-4" style={{ color: '#939685' }}>
          {t('santEfisio.camere.label')}
        </p>
        <h2 className="font-serif text-5xl md:text-7xl" style={{ color: '#1e1c18' }}>
          {t('santEfisio.camere.title')}
        </h2>
        <p className="mt-5 leading-relaxed" style={{ color: '#939685' }}>
          {t('santEfisio.camere.subtitle')}
        </p>
      </section>

      {/* ── CAMERE — lista editoriale ── */}
      <section style={{ backgroundColor: '#F9ECE8' }} className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {rooms.map((room, i) => {
            const isEven = i % 2 === 0
            const testo = (campo: string) => t(`santEfisio.camere.rooms.${room.numero}.${campo}`)
            return (
              <div
                key={room.numero}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 border-t"
                style={{ borderColor: '#F4C2AE' }}
              >
                {/* Foto */}
                <div
                  className={`relative w-full overflow-hidden ${!isEven ? 'lg:order-2' : ''}`}
                  style={{ aspectRatio: '4 / 3' }}
                >
                  <Image
                    src={room.image}
                    alt={testo('alt')}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Testo */}
                <div className={!isEven ? 'lg:order-1' : ''}>
                  <span
                    className="font-serif text-8xl md:text-9xl leading-none select-none block mb-2"
                    style={{ color: '#F4C2AE' }}
                  >
                    {room.numero}
                  </span>
                  <p className="text-[11px] uppercase tracking-[0.3em] mb-3" style={{ color: '#D0634C' }}>
                    {testo('sottotitolo')}
                  </p>
                  <h3 className="font-serif text-3xl md:text-4xl mb-5" style={{ color: '#1e1c18' }}>
                    {testo('nome')}
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#4a4640' }}>
                    {testo('descrizione')}
                  </p>
                </div>
              </div>
            )
          })}
          <div className="border-t" style={{ borderColor: '#F4C2AE' }} />
        </div>
      </section>

      {/* ── INFO PRATICHE ── */}
      <section style={{ backgroundColor: '#F9ECE8' }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] mb-4" style={{ color: '#D0634C' }}>
              {t('santEfisio.infoPratiche.quando.label')}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#4a4640' }}>
              {t.rich('santEfisio.infoPratiche.quando.testo', {
                b: (chunks: ReactNode) => <strong style={{ color: '#1e1c18' }}>{chunks}</strong>,
              })}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] mb-4" style={{ color: '#D0634C' }}>
              {t('santEfisio.infoPratiche.dove.label')}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#4a4640' }}>
              {t('santEfisio.infoPratiche.dove.riga1')}<br />
              {t('santEfisio.infoPratiche.dove.riga2')}<br />
              {t('santEfisio.infoPratiche.dove.riga3')}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] mb-4" style={{ color: '#D0634C' }}>
              {t('santEfisio.infoPratiche.disponibilita.label')}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#4a4640' }}>
              {t('santEfisio.infoPratiche.disponibilita.testo')}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: '#D0634C' }} className="py-28 text-center px-6">
        <p className="text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: '#F4C2AE' }}>
          {t('santEfisio.cta.label')}
        </p>
        <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
          {t('santEfisio.cta.title1')}<br />{t('santEfisio.cta.title2')}
        </h2>
        <p className="max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {t('santEfisio.cta.paragrafo')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-xs font-medium tracking-[0.2em] uppercase px-10 py-4 transition-opacity hover:opacity-90"
            style={{ color: '#D0634C' }}
          >
            {t('santEfisio.cta.prenotaOra')}
          </a>
          <Link
            href="/contatti"
            className="inline-block border border-white/50 text-white text-xs font-medium tracking-[0.2em] uppercase px-10 py-4 hover:bg-white/10 transition-colors duration-200"
          >
            {t('santEfisio.cta.chiediDisponibilita')}
          </Link>
        </div>
      </section>
    </>
  )
}
