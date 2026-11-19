import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { HOTEL } from '@/lib/hotel.config'
import { DaNonPerdereHero } from '@/components/sections/DaNonPerdereHero'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const url = locale === 'it' ? `${HOTEL.url}/da-non-perdere` : `${HOTEL.url}/en/da-non-perdere`
  return {
    title: t('metadata.daNonPerdere.title'),
    description: t('metadata.daNonPerdere.description'),
    alternates: {
      canonical: url,
      languages: { 'it': `${HOTEL.url}/da-non-perdere`, 'en': `${HOTEL.url}/en/da-non-perdere` },
    },
    openGraph: {
      title: t('metadata.daNonPerdere.ogTitle'),
      description: t('metadata.daNonPerdere.ogDescription'),
      url,
      siteName: HOTEL.name,
      type: 'website',
      locale: locale === 'it' ? 'it_IT' : 'en_US',
      images: [{ url: '/images/sant-efisio-hotel.webp', width: 1200, height: 630, alt: t('metadata.daNonPerdere.ogAlt') }],
    },
  }
}


// Palette: Rust #802d20 · Terracotta #c96148 · Moss #c4cac3 · Wheat #d7a773 · Peach #dca791 · Cream #f2e7df

type Tipo = 'offerta' | 'evento' | 'stagione'

const tipoColor: Record<Tipo, { bg: string; text: string }> = {
  evento:   { bg: 'bg-[#802d20]',  text: 'text-[#f2e7df]' },
  offerta:  { bg: 'bg-[#c96148]',  text: 'text-[#f2e7df]' },
  stagione: { bg: 'bg-[#d7a773]',  text: 'text-[#802d20]' },
}

// Testi in messages/*/eventi.json → daNonPerdere.items.<id>
const itemData: { id: string; tipo: Tipo; href: string; external?: boolean; image: string }[] = [
  { id: 'settimanaMare', tipo: 'offerta', href: '/settimana-al-mare', image: '/images/lettino-mare.jpg' },
  { id: 'santEfisio',    tipo: 'evento',  href: '/sant-efisio',       image: '/images/buoi-sant-efisio.jpg' },
  // Pasqua — riattivare a gennaio 2027 (aggiornare l'etichetta in eventi.json)
  // { id: 'pasqua',       tipo: 'stagione', href: '/pasqua-a-pula',  image: '/images/villa-madau-primavera.webp' },
  // Domus Antigas — riattivare per l'edizione 2027 (aggiornare l'etichetta in eventi.json)
  // { id: 'domusAntigas', tipo: 'evento',   href: '/domus-antigas',  image: '/images/piazza-chiesa-pula.webp' },
  { id: 'primavera',     tipo: 'stagione', href: '/hotel',            image: '/images/hotel-primavera.webp' },
  // Autunno — scaduto, riattivare per l'autunno 2027
  // { id: 'autunno', tipo: 'offerta', href: 'https://booking.slope.it/f0fc79cb-30b8-401d-a334-210174b387a8', external: true, image: '/images/ristorante.webp' },
]

function CardWrapper({ href, external, className, children }: { href: string; external?: boolean; className?: string; children: React.ReactNode }) {
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

export default async function DaNonPerderePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('eventi.daNonPerdere')

  const items = itemData.map((d) => ({
    ...d,
    label:  t(`items.${d.id}.label`),
    titolo: t(`items.${d.id}.titolo`),
    italic: t(`items.${d.id}.italic`),
    testo:  t(`items.${d.id}.testo`),
    cta:    t(`items.${d.id}.cta`),
  }))

  return (
    <>
      <DaNonPerdereHero />

      {/* ── CARDS ── */}
      <section className="bg-[#f2e7df] pt-16 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const cfg = tipoColor[item.tipo]
            const isLarge = i === 0 // prima card full-width

            return (
              <CardWrapper
                key={item.id}
                href={item.href}
                external={item.external}
                className={`group relative overflow-hidden bg-[#dca791]/20 flex flex-col ${isLarge ? 'md:col-span-2' : ''}`}
              >
                {/* Foto */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ paddingBottom: isLarge ? '42%' : '62%' }}
                >
                  <Image
                    src={item.image}
                    alt={`${item.titolo} ${item.italic}`}
                    fill
                    sizes={isLarge ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Badge tipo */}
                  <span
                    className={`absolute top-5 left-5 text-[9px] uppercase tracking-[0.25em] font-medium px-3 py-1.5 ${cfg.bg} ${cfg.text}`}
                  >
                    {t(`tipoLabel.${item.tipo}`)} · {item.label}
                  </span>
                </div>

                {/* Testo */}
                <div className="px-7 py-8 flex flex-col flex-1 bg-[#f2e7df]">
                  <h2 className="font-serif text-[#802d20] leading-tight mb-4">
                    <span className={`block ${isLarge ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
                      {item.titolo}
                    </span>
                    <em className={`italic font-normal block ${isLarge ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl'}`}>
                      {item.italic}
                    </em>
                  </h2>

                  <p className="text-[#802d20]/70 text-sm leading-relaxed mb-6 max-w-lg">
                    {item.testo}
                  </p>

                  <span className="mt-auto text-[10px] uppercase tracking-[0.25em] text-[#c96148] group-hover:text-[#802d20] transition-colors flex items-center gap-2 font-medium">
                    {item.cta} <span className="text-base">→</span>
                  </span>
                </div>
              </CardWrapper>
            )
          })}
        </div>
      </section>

      {/* ── STACCO FINALE ── */}
      <section className="bg-[#c4cac3] py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#802d20] mb-5">{t('ctaFinale.label')}</p>
          <em className="font-serif italic text-[#802d20] text-2xl md:text-3xl leading-relaxed block mb-10 whitespace-pre-line">
            {t('ctaFinale.testo')}
          </em>
          <Link
            href="/contatti"
            className="inline-block border border-[#802d20] text-[#802d20] text-[10px] uppercase tracking-[0.25em] px-8 py-3 hover:bg-[#802d20] hover:text-[#f2e7df] transition-colors duration-200"
          >
            {t('ctaFinale.cta')}
          </Link>
        </div>
      </section>
    </>
  )
}
