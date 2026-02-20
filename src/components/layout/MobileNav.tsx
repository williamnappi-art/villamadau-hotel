'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { clsx } from 'clsx'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/camere', label: 'Camere' },
  { href: '/ristorante', label: 'Ristorante' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/galleria', label: 'Galleria' },
  { href: '/contatti', label: 'Contatti' },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Chiudi menu al cambio di pagina
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Blocca scroll quando il menu è aperto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Hamburger button */}
      <button
        aria-label={open ? 'Chiudi menu' : 'Apri menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50 relative"
      >
        <span
          className={clsx(
            'block h-0.5 w-6 bg-current transition-all duration-300',
            open && 'rotate-45 translate-y-2'
          )}
        />
        <span
          className={clsx(
            'block h-0.5 w-6 bg-current transition-all duration-300',
            open && 'opacity-0'
          )}
        />
        <span
          className={clsx(
            'block h-0.5 w-6 bg-current transition-all duration-300',
            open && '-rotate-45 -translate-y-2'
          )}
        />
      </button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8"
          >
            <nav aria-label="Menu mobile">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={clsx(
                        'block py-4 text-2xl font-serif border-b border-gray-100 transition-colors',
                        pathname === link.href
                          ? 'text-primary font-semibold'
                          : 'text-gray-800 hover:text-primary'
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8">
              <Link
                href="/contatti"
                className="block w-full text-center bg-primary text-white py-4 rounded font-semibold uppercase tracking-wide text-sm"
              >
                Prenota ora
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
