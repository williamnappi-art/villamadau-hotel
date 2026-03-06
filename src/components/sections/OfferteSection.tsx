'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type Tipo = 'offerta' | 'evento' | 'stagione'

interface Item {
  tipo: Tipo
  label: string
  titolo: string
  italic: string
  bigItalic?: boolean
  testo: string
  cta: string
  href: string
  external?: boolean
  image: string
}

const items: Item[] = [
  {
    tipo: 'evento',
    label: 'Maggio 2025',
    titolo: 'Arriva',
    italic: "Sant\u2019Efisio",
    bigItalic: true,
    testo:
      'Dal 1 al 4 maggio, da Cagliari parte la processione pi\u00f9 importante e fiorita della Sardegna \u2014 e arriva a Pula. Vivila dalla tua camera al Villa Madau Boutique Hotel.',
    cta: 'Scopri le camere con vista',
    href: '/sant-efisio',
    image: '/images/sant-efisio-hotel.png',
  },
  {
    tipo: 'offerta',
    label: 'Autunno 2025',
    titolo: 'Settembre & Ottobre,',
    italic: 'prenota prima',
    testo:
      "L\u2019ultima parte dell\u2019estate, temperature gradevoli, mare caldo, tramonti mozzafiato e spiagge vuote.",
    cta: 'Prenota ora',
    href: 'https://booking.slope.it/f0fc79cb-30b8-401d-a334-210174b387a8',
    external: true,
    image: '/images/ristorante.jpg',
  },
  {
    tipo: 'stagione',
    label: 'Bassa stagione',
    titolo: 'Primavera',
    italic: 'in Sardegna',
    testo:
      'Aprile e maggio sono i mesi pi\u00f9 belli: profumi di macchia mediterranea, spiagge deserte, temperature miti. Villa Madau \u00e8 aperta e il paese vi aspetta.',
    cta: "Scopri l\u2019hotel",
    href: '/hotel',
    image: '/images/hotel-primavera.png',
  },
  {
    tipo: 'evento',
    label: '15 Marzo 2026',
    titolo: 'Arriva',
    italic: 'Domus Antigas',
    bigItalic: true,
    testo:
      'Laboratori, cortili aperti e tradizione a tavola: il centro storico di Pula si trasforma in un viaggio nel tempo. Villa Madau \u00e8 nel cuore della manifestazione.',
    cta: 'Scopri l\u2019offerta speciale',
    href: '/domus-antigas',
    image: '/images/piazza-chiesa-pula.png',
  },
]

const tipoConfig: Record<Tipo, { dot: string; text: string }> = {
  offerta:  { dot: 'bg-[#c9621a]', text: 'text-[#c9621a]' },
  evento:   { dot: 'bg-[#7a5c3a]', text: 'text-[#7a5c3a]' },
  stagione: { dot: 'bg-[#8a9e82]',  text: 'text-[#8a9e82]' },
}

const INTERVAL = 6 // secondi per card

export function OfferteSection() {
  const [active, setActive] = useState(0)
  const [tick, setTick]     = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActive(i => (i + 1) % items.length)
      setTick(t => t + 1)
    }, INTERVAL * 1000)
    return () => clearInterval(t)
  }, [])

  const advance = (i: number) => { setActive(i); setTick(t => t + 1) }

  const current = items[active]
  const others  = items.map((item, i) => ({ item, idx: i })).filter(({ idx }) => idx !== active)
  const cfg     = tipoConfig[current.tipo]

  return (
    <section className="bg-cream py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">

        {/* Intestazione */}
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a4640] mb-3">
            Offerte &amp; eventi
          </p>
          <h2 className="font-serif text-[#1e1c18] leading-none">
            <em className="block italic font-normal text-7xl md:text-9xl leading-none">Sardegna</em>
            <span className="block text-3xl md:text-4xl mt-2">Tutto l&apos;anno</span>
          </h2>
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden lg:flex items-start gap-0">

          {/* ── Collage: card piccole (z-10) + card grande (z-20) ── */}
          {/* Collage è 42% del container: la card grande (aspect 3/4) determina l'altezza */}
          <div className="relative flex-[0_0_42%]">

            {/* Card piccole — dietro, lato destro, stessa altezza della card grande */}
            <div
              className="absolute top-0 right-0 bottom-0 z-10 flex flex-col gap-3"
              style={{ width: '22%' }}
            >
              <motion.div
                key={tick}
                className="flex flex-col gap-3 h-full"
                initial={{ y: 0 }}
                animate={{ y: -18 }}
                transition={{ duration: INTERVAL, ease: 'linear' }}
              >
                {others.map(({ item, idx }) => (
                  <motion.button
                    key={item.italic}
                    onClick={() => advance(idx)}
                    className="flex-1 relative overflow-hidden cursor-pointer"
                    initial={{ opacity: 0.55 }}
                    whileHover={{ opacity: 0.9, scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={item.image}
                      alt={item.titolo}
                      fill
                      sizes="10vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Card grande — portrait 3:4, in-flow (determina altezza collage), copre le piccole */}
            {current.external ? (
              <a
                href={current.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 overflow-hidden block cursor-pointer"
                style={{ width: 'calc(100% - 9%)', aspectRatio: '3 / 4' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Image
                      src={current.image}
                      alt={current.titolo + ' ' + current.italic}
                      fill
                      sizes="38vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </a>
            ) : (
              <Link
                href={current.href}
                className="relative z-20 overflow-hidden block cursor-pointer"
                style={{ width: 'calc(100% - 9%)', aspectRatio: '3 / 4' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Image
                      src={current.image}
                      alt={current.titolo + ' ' + current.italic}
                      fill
                      sizes="38vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </Link>
            )}
          </div>

          {/* ── Testo ── */}
          <div className="flex-1 pl-16 xl:pl-24 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="flex flex-col"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -22 }}
                transition={{ duration: 0.52, ease: 'easeOut' }}
              >
                {/* Badge tipo */}
                <div className="flex items-center gap-2.5 mb-10">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                  <span className={`text-[10px] uppercase tracking-[0.25em] font-medium ${cfg.text}`}>
                    {current.label}
                  </span>
                </div>

                {/* Titolo — prima riga normale, seconda in corsivo */}
                <h3 className="font-serif text-[#1e1c18] leading-tight mb-8">
                  <span className="block text-5xl xl:text-6xl">{current.titolo}</span>
                  <em className={`italic font-normal block ${current.bigItalic ? 'text-6xl xl:text-8xl' : 'text-5xl xl:text-6xl'}`}>
                    {current.italic}
                  </em>
                </h3>

                <p className="text-[#4a4640] leading-relaxed mb-10 max-w-xs text-sm">
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

                {/* Progress bars */}
                <div className="flex gap-3 mt-14">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => advance(i)}
                      aria-label={`Vai a ${items[i].titolo} ${items[i].italic}`}
                      className="h-px flex-1 max-w-[36px] bg-[#1e1c18]/15 relative overflow-hidden"
                    >
                      {i === active && (
                        <motion.span
                          key={tick}
                          className="absolute inset-0 bg-[#1e1c18] origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: INTERVAL, ease: 'linear' }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="lg:hidden flex flex-col gap-7">

          {/* Collage mobile: card grande quadrata + card piccole quadrate dietro */}
          <div className="relative" style={{ paddingBottom: '80%' }}>

            {/* Card piccole (z-10, destra, dietro la grande) */}
            <div
              className="absolute top-0 right-0 bottom-0 z-10 flex flex-col gap-2"
              style={{ width: '28%' }}
            >
              <motion.div
                key={tick}
                className="flex flex-col gap-2 h-full"
                initial={{ y: 0 }}
                animate={{ y: -12 }}
                transition={{ duration: INTERVAL, ease: 'linear' }}
              >
                {others.map(({ item, idx }) => (
                  <motion.button
                    key={item.italic}
                    onClick={() => advance(idx)}
                    className="flex-1 relative overflow-hidden cursor-pointer"
                    style={{ opacity: 0.58 }}
                    whileHover={{ opacity: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image src={item.image} alt={item.titolo} fill sizes="28vw" className="object-cover" />
                    <div className="absolute inset-0 bg-black/10" />
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Card grande quadrata (z-20, copre le piccole) */}
            {current.external ? (
              <a
                href={current.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-0 left-0 bottom-0 z-20 overflow-hidden block"
                style={{ width: 'calc(100% - 10%)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Image src={current.image} alt={current.titolo} fill sizes="90vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </a>
            ) : (
              <Link
                href={current.href}
                className="absolute top-0 left-0 bottom-0 z-20 overflow-hidden block"
                style={{ width: 'calc(100% - 10%)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Image src={current.image} alt={current.titolo} fill sizes="90vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </Link>
            )}
          </div>

          {/* Testo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                <span className={`text-[10px] uppercase tracking-[0.25em] font-medium ${cfg.text}`}>
                  {current.label}
                </span>
              </div>

              <h3 className="font-serif text-[#1e1c18] leading-tight mb-4">
                <span className="block text-3xl">{current.titolo}</span>
                <em className={`italic font-normal block ${current.bigItalic ? 'text-4xl' : 'text-3xl'}`}>
                  {current.italic}
                </em>
              </h3>

              <p className="text-[#4a4640] text-sm leading-relaxed mb-6">{current.testo}</p>

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

              <div className="flex gap-3 mt-8">
                {items.map((_, i) => (
                  <button key={i} onClick={() => advance(i)}
                    className="h-px flex-1 max-w-[36px] bg-[#1e1c18]/15 relative overflow-hidden">
                    {i === active && (
                      <motion.span key={tick} className="absolute inset-0 bg-[#1e1c18] origin-left"
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ duration: INTERVAL, ease: 'linear' }} />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
