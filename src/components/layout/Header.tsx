import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { MobileNav } from './MobileNav'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

const navLinks = [
  { href: '/hotel' as const, key: 'hotel' },
  { href: '/ristorante' as const, key: 'ristorante' },
  { href: '/servizi' as const, key: 'servizi' },
  { href: '/da-non-perdere' as const, key: 'daNonPerdere' },
  { href: '/contatti' as const, key: 'contatti' },
]

export async function Header() {
  const t = await getTranslations('common')

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo — overflow verso il basso sul video */}
          <Link href="/" className="flex-shrink-0 relative z-10" aria-label={t('hero.homeAriaLabel')}>
            <Image
              src="/images/logo.png"
              alt={t('hero.logoAlt')}
              width={280}
              height={198}
              priority
              className="h-24 md:h-32 w-auto object-contain drop-shadow-md"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label={t('nav.ariaLabel')}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors tracking-wide"
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </nav>

          {/* CTA desktop + hamburger mobile */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/contatti"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-primary text-[#1e1c18] text-sm font-semibold rounded hover:bg-primary-600 transition-colors"
            >
              {t('cta.prenotaOra')}
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
