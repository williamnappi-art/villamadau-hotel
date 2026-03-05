'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { clsx } from 'clsx'

const navLinks = [
  { href: '/camere', label: 'Camere' },
  { href: '/ristorante', label: 'Ristorante' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/galleria', label: 'Galleria' },
  { href: '/contatti', label: 'Contatti' },
]

const BOOKING_URL = 'https://booking.slope.it/f0fc79cb-30b8-401d-a334-210174b387a8'

export function DomusAntigasHero() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMobileOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <section className="relative h-screen min-h-[560px] overflow-hidden">
      <Image
        src="/images/piazzetta.jpg"
        alt="Domus Antigas \u2013 Piazzetta di Pula, Villa Madau Hotel"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/45" />

      {/* \u2500\u2500 DESKTOP NAV \u2500\u2500 */}
      <div className="absolute top-0 left-0 right-0 z-20 hidden md:flex flex-col items-center pt-7">
        <div className="w-[92%] flex items-center justify-between pb-0">
          <div className="flex-1" />
          <Link href="/" aria-label="Villa Madau Hotel \u2013 torna alla home">
            <Image
              src="/images/logo.png"
              alt="Villa Madau Hotel"
              width={280}
              height={198}
              priority
              className="h-56 w-auto object-contain drop-shadow-md block"
            />
          </Link>
          <div className="flex-1 flex justify-end self-end mb-2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white text-xs font-medium tracking-[0.2em] uppercase px-6 py-2.5 hover:bg-white hover:text-gray-900 transition-colors duration-200"
            >
              Reservation
            </a>
          </div>
        </div>
        <div className="w-[92%] h-px bg-white/80" />
        <nav className="flex gap-10 py-4" aria-label="Navigazione principale">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium text-white hover:text-white/60 transition-colors duration-200 tracking-[0.2em] uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* \u2500\u2500 MOBILE NAV \u2500\u2500 */}
      <div className="absolute top-0 left-0 right-0 z-20 md:hidden">
        <div className="flex items-center justify-between px-5 pt-6">
          <div className="w-10" />
          <div className="flex flex-col items-center gap-0">
            <Link href="/" aria-label="Villa Madau Hotel \u2013 torna alla home">
              <Image
                src="/images/logo.png"
                alt="Villa Madau Hotel"
                width={140}
                height={99}
                priority
                className="h-40 w-auto object-contain drop-shadow-md block"
              />
            </Link>
            <p className="text-white text-[10px] tracking-[0.25em] uppercase font-light -mt-6">
              Villamadau Boutique Hotel
            </p>
          </div>
          <button
            aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 relative z-50"
          >
            <span className={clsx('block h-0.5 w-6 bg-white transition-all duration-300', mobileOpen && 'rotate-45 translate-y-2')} />
            <span className={clsx('block h-0.5 w-6 bg-white transition-all duration-300', mobileOpen && 'opacity-0')} />
            <span className={clsx('block h-0.5 w-6 bg-white transition-all duration-300', mobileOpen && '-rotate-45 -translate-y-2')} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-8"
            style={{ backgroundColor: '#f0ebe0' }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Chiudi menu"
              className="absolute top-6 right-5 w-11 h-11 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M20 6L6 20M6 6l14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <nav aria-label="Menu mobile">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-4 text-2xl font-serif border-b border-gray-300 text-gray-800 hover:text-primary transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center text-white py-4 rounded font-semibold uppercase tracking-wide text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#c9621a' }}
              >
                Prenota ora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Titolo centrato */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70 mb-4">
          15 Marzo 2026 &middot; Pula, Sardegna
        </p>
        <h1 className="font-serif leading-tight">
          <span className="block text-4xl md:text-5xl font-normal">Arriva</span>
          <em className="block italic font-normal text-6xl md:text-8xl">Domus Antigas</em>
        </h1>
      </div>
    </section>
  )
}
