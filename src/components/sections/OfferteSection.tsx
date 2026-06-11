'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

type Tipo = 'offerta' | 'evento' | 'stagione'

interface ItemData {
  id: string
  tipo: Tipo
  bigItalic?: boolean
  href: string
  external?: boolean
  image: string
}

interface Item extends ItemData {
  label: string
  titolo: string
  italic: string
  testo: string
  cta: string
}

const itemData: ItemData[] = [
  {
    id: 'settimanaMare',
    tipo: 'offerta',
    bigItalic: true,
    href: '/settimana-al-mare',
    image: '/images/lettino-mare.jpg',
  },
  {
    id: 'santEfisio',
    tipo: 'evento',
    bigItalic: true,
    href: '/sant-efisio',
    image: '/images/piazza-chiesa-pula.webp',
  },
  {
    id: 'autunno',
    tipo: 'offerta',
    href: 'https://booking.slope.it/f0fc79cb-30b8-401d-a334-210174b387a8',
    external: true,
    image: '/images/ristorante.webp',
  },
  {
    id: 'primavera',
    tipo: 'stagione',
    href: '/hotel',
    image: '/images/hotel-primavera.webp',
  },
  // Pasqua — riattivare a gennaio 2027
  // {
  //   id: 'pasqua',
  //   tipo: 'stagione',
  //   bigItalic: true,
  //   href: '/pasqua-a-pula',
  //   image: '/images/villa-madau-primavera.webp',
  // },
  // Domus Antigas — riattivare per l'edizione 2027
  // {
  //   id: 'domusAntigas',
  //   tipo: 'evento',
  //   bigItalic: true,
  //   href: '/domus-antigas',
  //   image: '/images/piazza-chiesa-pula.webp',
  // },
]

const tipoConfig: Record<Tipo, { dot: string; text: string }> = {
  offerta:  { dot: 'bg-[#c9621a]', text: 'text-[#c9621a]' },
  evento:   { dot: 'bg-[#7a5c3a]', text: 'text-[#7a5c3a]' },
  stagione: { dot: 'bg-[#8a9e82]',  text: 'text-[#8a9e82]' },
}

const INTERVAL = 6

export function OfferteSection() {
  const t = useTranslations('home.offerte')
  const items: Item[] = itemData.map((d) => ({
    ...d,
    label:  t(`items.${d.id}.label`),
    titolo: t(`items.${d.id}.titolo`),
    italic: t(`items.${d.id}.italic`),
    testo:  t(`items.${d.id}.testo`),
    cta:    t(`items.${d.id}.cta`),
  }))

  const [active, setActive] = useState(0)
  const [tick, setTick]     = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(i => (i + 1) % items.length)
      setTick(t => t + 1)
    }, INTERVAL * 1000)
    return () => clearInterval(timer)
  }, [items.length])

  const advance = (i: number) => { setActive(i); setTick(t => t + 1) }

  const current = items[active]
  const cfg     = tipoConfig[current.tipo]

  return (
    <section className="bg-cream py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">

        {/* Intestazione */}
        <div className="mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a4640] mb-3">
            {t('label')}
          </p>
          <h2 className="font-serif text-[#1e1c18] leading-none">
            <em className="block italic font-normal text-7xl md:text-9xl leading-none">{t('sardegna')}</em>
            <span className="block text-3xl md:text-4xl mt-2">{t('tuttoLanno')}</span>
          </h2>
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden lg:block">

          {/* Foto principale */}
          <div className="relative w-full overflow-hidden mb-10" style={{ aspectRatio: '16 / 7' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {current.external ? (
                  <a href={current.href} target="_blank" rel="noopener noreferrer" className="block absolute inset-0">
                    <Image src={current.image} alt={current.titolo + ' ' + current.italic} fill sizes="100vw" className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  </a>
                ) : (
                  <Link href={current.href} className="block absolute inset-0">
                    <Image src={current.image} alt={current.titolo + ' ' + current.italic} fill sizes="100vw" className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testo sotto la foto */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid grid-cols-2 gap-16 mb-12"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                  <span className={`text-[10px] uppercase tracking-[0.25em] font-medium ${cfg.text}`}>
                    {current.label}
                  </span>
                </div>
                <h3 className="font-serif text-[#1e1c18] leading-tight">
                  <span className="block text-4xl xl:text-5xl">{current.titolo}</span>
                  <em className={`italic font-normal block ${current.bigItalic ? 'text-5xl xl:text-7xl' : 'text-4xl xl:text-5xl'}`}>
                    {current.italic}
                  </em>
                </h3>
              </div>
              <div className="flex flex-col justify-end">
                <p className="text-[#4a4640] leading-relaxed mb-6 text-sm max-w-sm">
                  {current.testo}
                </p>
                {current.external ? (
                  <a
                    href={current.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-[0.2em] text-[#1e1c18]/40 hover:text-[#1e1c18] transition-colors flex items-center gap-2 self-start"
                  >
                    {current.cta} <span className="text-base">→</span>
                  </a>
                ) : (
                  <Link
                    href={current.href}
                    className="text-[11px] uppercase tracking-[0.2em] text-[#1e1c18]/40 hover:text-[#1e1c18] transition-colors flex items-center gap-2 self-start"
                  >
                    {current.cta} <span className="text-base">→</span>
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Miniature con progress bar */}
          <div className="grid grid-cols-5 gap-3">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => advance(i)}
                aria-label={t('vaiA', { titolo: item.titolo, italic: item.italic })}
                className="group text-left"
              >
                <div
                  className={`relative overflow-hidden mb-2 transition-opacity duration-300 ${
                    i === active ? 'opacity-100' : 'opacity-45 group-hover:opacity-75'
                  }`}
                  style={{ aspectRatio: '3 / 2' }}
                >
                  <Image src={item.image} alt={item.titolo} fill sizes="20vw" className="object-cover" />
                  {i === active && (
                    <div className="absolute inset-0 ring-1 ring-inset ring-[#1e1c18]/25" />
                  )}
                </div>
                <div className="h-[2px] w-full bg-[#1e1c18]/12 relative overflow-hidden">
                  {i < active && (
                    <span className="absolute inset-0 bg-[#1e1c18]/50" />
                  )}
                  {i === active && (
                    <motion.span
                      key={tick}
                      className="absolute inset-0 bg-[#1e1c18] origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: INTERVAL, ease: 'linear' }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="lg:hidden flex flex-col gap-6">

          {/* Foto principale */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {current.external ? (
                  <a href={current.href} target="_blank" rel="noopener noreferrer" className="block absolute inset-0">
                    <Image src={current.image} alt={current.titolo} fill sizes="100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </a>
                ) : (
                  <Link href={current.href} className="block absolute inset-0">
                    <Image src={current.image} alt={current.titolo} fill sizes="100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                <span className={`text-[10px] uppercase tracking-[0.25em] font-medium ${cfg.text}`}>
                  {current.label}
                </span>
              </div>
              <h3 className="font-serif text-[#1e1c18] leading-tight mb-3">
                <span className="block text-3xl">{current.titolo}</span>
                <em className={`italic font-normal block ${current.bigItalic ? 'text-4xl' : 'text-3xl'}`}>
                  {current.italic}
                </em>
              </h3>
              <p className="text-[#4a4640] text-sm leading-relaxed mb-5">{current.testo}</p>
              {current.external ? (
                <a href={current.href} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.2em] text-[#1e1c18]/50 flex items-center gap-2">
                  {current.cta} <span>→</span>
                </a>
              ) : (
                <Link href={current.href}
                  className="text-[11px] uppercase tracking-[0.2em] text-[#1e1c18]/50 flex items-center gap-2">
                  {current.cta} <span>→</span>
                </Link>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Miniature */}
          <div className="grid grid-cols-5 gap-2">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => advance(i)}
                aria-label={t('vaiA', { titolo: item.titolo, italic: item.italic })}
                className="group"
              >
                <div
                  className={`relative overflow-hidden mb-1.5 transition-opacity duration-300 ${
                    i === active ? 'opacity-100' : 'opacity-45 group-hover:opacity-75'
                  }`}
                  style={{ aspectRatio: '1 / 1' }}
                >
                  <Image src={item.image} alt={item.titolo} fill sizes="20vw" className="object-cover" />
                </div>
                <div className="h-[2px] w-full bg-[#1e1c18]/12 relative overflow-hidden">
                  {i < active && <span className="absolute inset-0 bg-[#1e1c18]/50" />}
                  {i === active && (
                    <motion.span
                      key={tick}
                      className="absolute inset-0 bg-[#1e1c18] origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: INTERVAL, ease: 'linear' }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
