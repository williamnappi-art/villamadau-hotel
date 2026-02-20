'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const cards = [
  {
    id: 'hotel',
    image: '/images/hotel-primavera.png',
    title: "L'Hotel",
    description:
      'tra le vie del centro storico di Pula, una vera sorpresa, un piccolo Boutique Hotel tutto da scoprire nei suoi dettagli',
    href: '/hotel',
  },
  {
    id: 'camere',
    image: '/images/hotel-1.jpg',
    title: 'Le Camere',
    description: '',
    href: '/camere',
  },
  {
    id: 'ristorante',
    image: '/images/ristorante.jpg',
    title: 'Il Ristorante',
    description: '',
    href: '/ristorante',
  },
  {
    id: 'chia',
    image: '/images/chia-villamadau.jpg',
    title: 'Il Mare',
    description: '',
    href: '/servizi',
  },
  {
    id: 'mare',
    image: '/images/mare-vista-aerea.jpg',
    title: 'La Sardegna',
    description: '',
    href: '/galleria',
  },
]

const N = cards.length

function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

// Card centrale: entra da dir*-55°, esce verso dir*55° — simmetrico e opposto
const centerVariants = {
  enter: (d: number) => ({ opacity: 0, scale: 0.82, rotateY: d * -55, z: -120 }),
  visible: { opacity: 1, scale: 1, rotateY: 0, z: 0 },
  exit: (d: number) => ({ opacity: 0, scale: 0.82, rotateY: d * 55, z: -120 }),
}

// Card sinistra: entra da +30°, esce verso -30°
const leftVariants = {
  enter: { opacity: 0, scale: 0.9, rotateY: 30 },
  visible: { opacity: 1, scale: 1, rotateY: 0 },
  exit: { opacity: 0, scale: 0.9, rotateY: -30 },
}

// Card destra: entra da -30°, esce verso +30°
const rightVariants = {
  enter: { opacity: 0, scale: 0.9, rotateY: -30 },
  visible: { opacity: 1, scale: 1, rotateY: 0 },
  exit: { opacity: 0, scale: 0.9, rotateY: 30 },
}

const tweenSide   = { type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 1.1 } as const
const tweenCenter = { type: 'tween', ease: [0.22, 0.61, 0.36, 1],    duration: 1.4 } as const

export function CardCarousel() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)

  const prev = mod(active - 1, N)
  const next = mod(active + 1, N)

  const goNext = useCallback(() => { setDir(1);  setActive((a) => mod(a + 1, N)) }, [])
  const goPrev = useCallback(() => { setDir(-1); setActive((a) => mod(a - 1, N)) }, [])

  useEffect(() => {
    const t = setTimeout(goNext, 4500)
    return () => clearTimeout(t)
  }, [active, goNext])

  const activeCard = cards[active]
  const leftCard   = cards[prev]
  const rightCard  = cards[next]

  return (
    <section className="py-16 overflow-hidden">
      <div className="relative mx-auto px-4 md:max-w-2xl">

        {/* prospettiva 3D sul contenitore */}
        <div
          className="relative flex items-start justify-center gap-0 select-none"
          style={{ perspective: '1100px', perspectiveOrigin: '50% 40%' }}
        >

          {/* ── Slot sinistra (larghezza fissa, card animata dentro) ── */}
          <div
            className="relative w-[22%] md:w-[30%] shrink-0"
            style={{ zIndex: 10, marginTop: '4rem' }}
          >
            <AnimatePresence custom={dir} mode="popLayout">
              <motion.div
                key={`left-${leftCard.id}`}
                className="cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                custom={dir}
                variants={leftVariants}
                initial="enter"
                animate="visible"
                exit="exit"
                transition={tweenSide}
                onClick={goPrev}
                whileHover={{ scale: 1.04, rotateY: 5 }}
              >
                <div className="relative aspect-[9/16] md:aspect-[3/4] w-full rounded overflow-hidden shadow-md opacity-75">
                  <Image src={leftCard.image} alt={leftCard.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Slot centrale ── */}
          <div className="relative w-[56%] md:w-[40%] shrink-0 z-30 -mx-[3%]">
            <AnimatePresence custom={dir} mode="popLayout">
              <motion.div
                key={`center-${activeCard.id}`}
                style={{ transformStyle: 'preserve-3d' }}
                custom={dir}
                variants={centerVariants}
                initial="enter"
                animate="visible"
                exit="exit"
                transition={tweenCenter}
              >
                <Link href={activeCard.href} className="block group">
                  <div className="relative aspect-[9/16] md:aspect-[3/4] w-full rounded overflow-hidden shadow-2xl">
                    <Image
                      src={activeCard.image}
                      alt={activeCard.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 text-center px-2"
              >
                <h3 className="font-serif text-2xl text-gray-900 mb-2">
                  {activeCard.title}
                </h3>
                {activeCard.description && (
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {activeCard.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Slot destra ── */}
          <div
            className="relative w-[22%] md:w-[30%] shrink-0"
            style={{ zIndex: 10, marginTop: '4rem' }}
          >
            <AnimatePresence custom={dir} mode="popLayout">
              <motion.div
                key={`right-${rightCard.id}`}
                className="cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                custom={dir}
                variants={rightVariants}
                initial="enter"
                animate="visible"
                exit="exit"
                transition={tweenSide}
                onClick={goNext}
                whileHover={{ scale: 1.04, rotateY: -5 }}
              >
                <div className="relative aspect-[9/16] md:aspect-[3/4] w-full rounded overflow-hidden shadow-md opacity-75">
                  <Image src={rightCard.image} alt={rightCard.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Frecce + dots */}
        <div className="flex justify-center gap-6 mt-8 items-center">
          <button
            onClick={goPrev}
            aria-label="Precedente"
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > active ? 1 : -1); setActive(i) }}
                aria-label={`Card ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? 'w-5 bg-primary' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Successivo"
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
