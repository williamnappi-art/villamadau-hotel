import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
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

const tipoLabel: Record<Tipo, string> = {
  evento:   'Evento',
  offerta:  'Offerta',
  stagione: 'Stagione',
}

const tipoColor: Record<Tipo, { bg: string; text: string }> = {
  evento:   { bg: 'bg-[#802d20]',  text: 'text-[#f2e7df]' },
  offerta:  { bg: 'bg-[#c96148]',  text: 'text-[#f2e7df]' },
  stagione: { bg: 'bg-[#d7a773]',  text: 'text-[#802d20]' },
}

const items = [
  {
    tipo: 'evento' as Tipo,
    label: 'Maggio 2025',
    titolo: 'Arriva',
    italic: "Sant\u2019Efisio",
    testo: 'Dal 1 al 4 maggio, da Cagliari parte la processione più importante e fiorita della Sardegna — e arriva a Pula. Vivila dalla tua camera al Villa Madau Boutique Hotel.',
    cta: 'Scopri le camere con vista',
    href: '/sant-efisio',
    external: false,
    image: '/images/sant-efisio-hotel.webp',
  },
  {
    tipo: 'stagione' as Tipo,
    label: 'Pasqua 2026',
    titolo: 'Weekend di',
    italic: 'Pasqua a Pula',
    testo: 'Mare e montagna, colazione in giardino, sentieri nel parco di Gutturu Mannu e cucina mediterranea. Il weekend di Pasqua nel cuore storico di Pula.',
    cta: 'Scopri il weekend di Pasqua',
    href: '/pasqua-a-pula',
    external: false,
    image: '/images/villa-madau-primavera.webp',
  },
  {
    tipo: 'evento' as Tipo,
    label: '15 Marzo 2026',
    titolo: 'Arriva',
    italic: 'Domus Antigas',
    testo: 'Laboratori, cortili aperti e tradizione a tavola: il centro storico di Pula si trasforma in un viaggio nel tempo. Villa Madau è nel cuore della manifestazione.',
    cta: "Scopri l\u2019offerta speciale",
    href: '/domus-antigas',
    external: false,
    image: '/images/piazza-chiesa-pula.webp',
  },
  {
    tipo: 'stagione' as Tipo,
    label: 'Bassa stagione',
    titolo: 'Primavera',
    italic: 'in Sardegna',
    testo: 'Aprile e maggio sono i mesi più belli: profumi di macchia mediterranea, spiagge deserte, temperature miti. Villa Madau è aperta e il paese vi aspetta.',
    cta: "Scopri l\u2019hotel",
    href: '/hotel',
    external: false,
    image: '/images/hotel-primavera.webp',
  },
  {
    tipo: 'offerta' as Tipo,
    label: 'Autunno 2025',
    titolo: 'Settembre & Ottobre,',
    italic: 'prenota prima',
    testo: "L\u2019ultima parte dell\u2019estate, temperature gradevoli, mare caldo, tramonti mozzafiato e spiagge vuote.",
    cta: 'Prenota ora',
    href: 'https://booking.slope.it/f0fc79cb-30b8-401d-a334-210174b387a8',
    external: true,
    image: '/images/ristorante.webp',
  },
]

export default async function DaNonPerderePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <DaNonPerdereHero />

      {/* ── CARDS ── */}
      <section className="bg-[#f2e7df] pt-16 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const cfg = tipoColor[item.tipo]
            const isLarge = i === 0 // prima card full-width
            const CardWrapper = item.external
              ? ({ children, className }: { children: React.ReactNode; className?: string }) => (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                    {children}
                  </a>
                )
              : ({ children, className }: { children: React.ReactNode; className?: string }) => (
                  <Link href={item.href} className={className}>
                    {children}
                  </Link>
                )

            return (
              <CardWrapper
                key={item.italic}
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
                    {tipoLabel[item.tipo]} · {item.label}
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
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#802d20] mb-5">Prenota il tuo soggiorno</p>
          <em className="font-serif italic text-[#802d20] text-2xl md:text-3xl leading-relaxed block mb-10">
            Ogni stagione a Pula ha la sua bellezza.<br />
            Villa Madau è aperta tutto l&apos;anno.
          </em>
          <Link
            href="/contatti"
            className="inline-block border border-[#802d20] text-[#802d20] text-[10px] uppercase tracking-[0.25em] px-8 py-3 hover:bg-[#802d20] hover:text-[#f2e7df] transition-colors duration-200"
          >
            Contattaci
          </Link>
        </div>
      </section>
    </>
  )
}
