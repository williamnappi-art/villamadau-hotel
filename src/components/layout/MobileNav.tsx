'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { usePathname } from '@/i18n/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

const navLinks = [
  { href: '/' as const, key: 'home' },
  { href: '/hotel' as const, key: 'hotel' },
  { href: '/ristorante' as const, key: 'ristorante' },
  { href: '/servizi' as const, key: 'servizi' },
  { href: '/da-non-perdere' as const, key: 'daNonPerdere' },
  { href: '/contatti' as const, key: 'contatti' },
]

export function MobileNav() {
  const t = useTranslations('common')
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

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
        className="md:hidden relative flex flex-col items-center justify-center w-10 h-10 gap-1.5 z-[110]"
      >
        <motion.span
          className="block h-0.5 w-6 rounded-full"
          style={{ backgroundColor: open ? '#fff' : '#1e1c18' }}
          animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.span
          className="block h-0.5 w-6 rounded-full"
          style={{ backgroundColor: open ? '#fff' : '#1e1c18' }}
          animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.span
          className="block h-0.5 w-6 rounded-full"
          style={{ backgroundColor: open ? '#fff' : '#1e1c18' }}
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
                    className="block py-3 font-serif text-4xl transition-colors duration-200"
                    style={{ color: pathname === link.href ? '#c4b99a' : 'rgba(255,255,255,0.8)' }}
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
              <Link
                href="/contatti"
                className="inline-block px-10 py-4 border border-primary text-primary text-xs font-medium tracking-[0.2em] uppercase hover:bg-primary hover:text-[#1e1c18] transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                {t('cta.prenotaOra')}
              </Link>
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
