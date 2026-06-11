'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { usePathname } from '@/i18n/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

const navLinks = [
  { href: '/hotel' as const, key: 'hotel' },
  { href: '/ristorante' as const, key: 'ristorante' },
  { href: '/servizi' as const, key: 'servizi' },
  { href: '/da-non-perdere' as const, key: 'daNonPerdere' },
  { href: '/contatti' as const, key: 'contatti' },
]

interface HeroMobileMenuProps {
  bookingUrl: string
  /** Hamburger scuro: per hero con video/immagine chiari (default: bianco) */
  dark?: boolean
}

export function HeroMobileMenu({ bookingUrl, dark = false }: HeroMobileMenuProps) {
  const t = useTranslations('common')
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  // Quando il menu è aperto le linee sono sempre chiare (overlay scuro)
  const barColor = !open && dark ? 'bg-[#1e1c18]' : 'bg-white'

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Hamburger */}
      <button
        aria-label={open ? t('mobileNav.chiudiMenu') : t('mobileNav.apriMenu')}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative flex flex-col items-center justify-center w-10 h-10 gap-1.5 z-[110]"
      >
        <motion.span
          className={`block h-0.5 w-6 ${barColor} rounded-full`}
          animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.span
          className={`block h-0.5 w-6 ${barColor} rounded-full`}
          animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.span
          className={`block h-0.5 w-6 ${barColor} rounded-full`}
          animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
      </button>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ backgroundColor: '#1e1c18' }}
            initial={{ clipPath: 'circle(0% at calc(100% - 35px) 35px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 35px) 35px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 35px) 35px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Logo per tornare alla home */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-10"
            >
              <Link href="/" onClick={() => setOpen(false)} aria-label={t('mobileNav.tornaAllaHome')}>
                <Image
                  src="/images/logo.png"
                  alt={t('hero.logoAlt')}
                  width={180}
                  height={127}
                  className="h-28 w-auto object-contain"
                />
              </Link>
            </motion.div>

            <ul className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 font-serif text-4xl text-white/80 hover:text-primary transition-colors duration-200"
                    onClick={() => setOpen(false)}
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 border border-primary text-primary text-xs font-medium tracking-[0.2em] uppercase hover:bg-primary hover:text-[#1e1c18] transition-colors duration-300"
              >
                {t('cta.prenotaOra')}
              </a>
            </motion.div>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <LanguageSwitcher />
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
