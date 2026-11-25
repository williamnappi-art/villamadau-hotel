import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { servizi } from '@/content/servizi'
import { Button } from '@/components/ui/Button'
import { pageBreadcrumb } from '@/lib/schema'
import { ServiziHero } from '@/components/sections/ServiziHero'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ locale, path: '/servizi', key: 'servizi', image: { url: '/images/villa-madau-pula-hotel.webp' } })
}

const iconeMap: Record<string, React.ReactNode> = {
  wifi: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  ),
  parking: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  snowflake: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  car: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  coffee: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  map: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  ),
}

const spiagge = [
  { slug: 'nora', image: '/images/nora-villa-madau.webp' },
  { slug: 'chia', image: '/images/chia-villamadau.webp' },
  { slug: 'tuerredda', image: '/images/sardegna-chia.webp' },
]

export default async function ServiziPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('servizi')

  const breadcrumb = pageBreadcrumb(locale, '/servizi')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <ServiziHero />

      {/* ── INTRO ── */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a4640] mb-6">{t('intro.label')}</p>
          <p className="font-serif text-[#1e1c18] text-xl md:text-2xl leading-relaxed">
            {t('intro.paragrafo')}
          </p>
        </div>
      </section>

      {/* ── SPIAGGE ── */}
      {spiagge.map((s, i) => (
        <section
          key={s.slug}
          className={`py-0 ${i % 2 === 0 ? 'bg-[#f0ebe0]' : 'bg-white'}`}
        >
          <div className={`max-w-7xl mx-auto flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

            {/* Foto */}
            <div className="relative w-full lg:w-1/2" style={{ minHeight: '420px' }}>
              <Image
                src={s.image}
                alt={t(`spiagge.${s.slug}.alt`)}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Testo */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 py-16 lg:px-16 xl:px-20">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#4a4640] mb-4">{t(`spiagge.${s.slug}.distanza`)}</p>
              <h2 className="font-serif text-[#1e1c18] leading-none mb-6">
                <em className="block italic font-normal text-5xl md:text-6xl">{t(`spiagge.${s.slug}.nome`)}</em>
              </h2>
              <p className="text-[#4a4640] leading-relaxed text-sm max-w-md">{t(`spiagge.${s.slug}.testo`)}</p>
            </div>
          </div>
        </section>
      ))}

      {/* ── STACCO: il ritorno ── */}
      <section className="bg-[#1e1c18] py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-6">{t('stacco.label')}</p>
          <em className="font-serif italic text-white text-xl md:text-2xl leading-relaxed block">
            {t('stacco.testo')}
          </em>
        </div>
      </section>

      {/* ── SERVIZI GRID ── */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a4640] mb-3">{t('serviziGrid.label')}</p>
            <h2 className="font-serif text-[#1e1c18] text-4xl md:text-5xl leading-none">
              <em className="italic font-normal">{t('serviziGrid.title')}</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#c4b99a]/30">
            {servizi.map((servizio) => (
              <div
                key={servizio.icona}
                className="bg-cream p-10 flex flex-col gap-4"
              >
                <div className="text-[#7a5c3a]">
                  {iconeMap[servizio.icona]}
                </div>
                <h3 className="font-serif text-lg text-[#1e1c18]">{t(`serviziGrid.items.${servizio.icona}.titolo`)}</h3>
                <p className="text-sm text-[#4a4640] leading-relaxed">{t(`serviziGrid.items.${servizio.icona}.descrizione`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#f0ebe0] py-20 text-center px-6 border-t border-[#c4b99a]/30">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a4640] mb-6">{t('ctaFinale.label')}</p>
        <h2 className="font-serif text-[#1e1c18] text-4xl md:text-5xl leading-none mb-10">
          <em className="italic font-normal">{t('ctaFinale.title')}</em>
        </h2>
        <Button href="/contatti">{t('ctaFinale.cta')}</Button>
      </section>
    </>
  )
}
