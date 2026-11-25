import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { HeroMobileMenu } from './HeroMobileMenu'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { HOTEL, whatsappUrl } from '@/lib/hotel.config'
import { NAV_LINKS } from '@/lib/nav'

/**
 * Navigazione trasparente sopra gli hero a tutto schermo (desktop + mobile).
 * Unica versione per tutte le pagine: prima era copiata in 10 componenti.
 * - "Reservation" porta sempre a Slope (HOTEL.bookingUrl); sul ristorante al tavolo.
 * - Accanto c'è sempre WhatsApp.
 */
export async function HeroNav({ variant = 'hotel' }: { variant?: 'hotel' | 'ristorante' }) {
  const t = await getTranslations('common')
  const isRistorante = variant === 'ristorante'
  const bookingUrl = isRistorante ? HOTEL.restaurant.bookingUrl : HOTEL.bookingUrl
  const bookingLabel = isRistorante ? t('cta.prenotaTavolo') : t('cta.reservation')

  const logoDesktop = isRistorante ? (
    <Image
      src="/images/logo-federicos.gif"
      alt={HOTEL.restaurant.name}
      width={480}
      height={240}
      priority
      className="h-72 w-auto object-contain block"
      style={{ filter: 'brightness(0) invert(1)' }}
    />
  ) : (
    <Image
      src="/images/logo.png"
      alt={t('hero.logoAlt')}
      width={280}
      height={198}
      priority
      className="h-56 w-auto object-contain drop-shadow-md block"
    />
  )

  const logoMobile = isRistorante ? (
    <Image
      src="/images/logo-federicos.gif"
      alt={HOTEL.restaurant.name}
      width={300}
      height={150}
      className="h-40 w-auto object-contain block"
      style={{ filter: 'brightness(0) invert(1)' }}
    />
  ) : (
    <Image
      src="/images/logo.png"
      alt={t('hero.logoAlt')}
      width={140}
      height={99}
      className="h-40 w-auto object-contain drop-shadow-md block"
    />
  )

  return (
    <>
      {/* DESKTOP NAV */}
      <div className="absolute top-0 left-0 right-0 z-20 hidden md:flex flex-col items-center pt-7">
        <div className="w-[92%] flex items-end justify-between pb-0">
          <div className="flex-1" />
          <Link href="/" aria-label={t('hero.homeAriaLabel')}>
            {logoDesktop}
          </Link>
          <div className="flex-1 flex items-end justify-end gap-4 mb-2">
            <LanguageSwitcher />
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('cta.scriviciWhatsapp')}
              title={t('cta.scriviciWhatsapp')}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/80 text-white hover:bg-white hover:text-[#1e1c18] transition-colors duration-200"
            >
              <WhatsAppIcon size={17} />
            </a>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white text-xs font-medium tracking-[0.2em] uppercase px-6 py-2.5 hover:bg-white hover:text-gray-900 transition-colors duration-200"
            >
              {bookingLabel}
            </a>
          </div>
        </div>
        <div className="w-[92%] h-px bg-white/80" />
        <nav className="flex gap-10 py-4" aria-label={t('nav.ariaLabel')}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium text-white hover:text-white/60 transition-colors duration-200 tracking-[0.2em] uppercase"
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
        </nav>
      </div>

      {/* MOBILE NAV */}
      <div className="absolute top-0 left-0 right-0 z-20 md:hidden">
        <div className="flex items-center justify-between px-5 pt-6">
          <div className="w-10" />
          <div className="flex flex-col items-center gap-0">
            <Link href="/" aria-label={t('hero.homeAriaLabel')}>
              {logoMobile}
            </Link>
            {!isRistorante && (
              <p className="text-white text-[10px] tracking-[0.25em] uppercase font-light -mt-6">
                {t('hero.mobileSubtitle')}
              </p>
            )}
          </div>
          <HeroMobileMenu bookingUrl={bookingUrl} bookingLabel={isRistorante ? bookingLabel : undefined} />
        </div>
      </div>
    </>
  )
}
