import Link from 'next/link'
import Image from 'next/image'
import { MobileNav } from './MobileNav'

const navLinks = [
  { href: '/hotel', label: 'Hotel' },
  { href: '/ristorante', label: 'Ristorante' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/da-non-perdere', label: 'Da non perdere' },
  { href: '/contatti', label: 'Contatti' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo — overflow verso il basso sul video */}
          <Link href="/" className="flex-shrink-0 relative z-10" aria-label="Villa Madau Hotel – torna alla home">
            <Image
              src="/images/logo.png"
              alt="Villa Madau Hotel"
              width={280}
              height={198}
              priority
              className="h-24 md:h-32 w-auto object-contain drop-shadow-md"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Navigazione principale"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop + hamburger mobile */}
          <div className="flex items-center gap-4">
            <Link
              href="/contatti"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded hover:bg-primary-600 transition-colors"
            >
              Prenota ora
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
