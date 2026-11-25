import { Link } from '@/i18n/navigation'
import { HOTEL, PHONE_HREF, whatsappUrl } from '@/lib/hotel.config'
import { NAV_LINKS } from '@/lib/nav'
import { CookieSettingsButton } from '@/components/ui/CookieBanner'
import { getTranslations } from 'next-intl/server'


export async function Footer() {
  const t = await getTranslations('common')
  return (
    <footer className="text-white" style={{ backgroundColor: '#b5533b' }}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl text-white mb-2">{HOTEL.shortName}</p>
            <p className="text-sm leading-relaxed">{t('footer.tagline')}</p>
            <div className="flex gap-4 mt-4">
              <a
                href={HOTEL.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.facebookAriaLabel')}
                className="hover:text-white transition-colors"
              >
                {t('footer.facebook')}
              </a>
              <a
                href={HOTEL.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.instagramAriaLabel')}
                className="hover:text-white transition-colors"
              >
                {t('footer.instagram')}
              </a>
            </div>
          </div>

          {/* Navigazione */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              {t('footer.navigazione')}
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              {t('footer.doveSiamo')}
            </p>
            <address className="not-italic text-sm space-y-2">
              <p>{HOTEL.address.full}</p>
              <p>
                {t('footer.telefono')}:{' '}
                <a href={PHONE_HREF} className="underline-offset-2 hover:underline">
                  {HOTEL.contact.phone}
                </a>
              </p>
              <p>
                {t('footer.whatsapp')}:{' '}
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                  {HOTEL.contact.whatsapp}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${HOTEL.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {HOTEL.contact.email}
                </a>
              </p>
              <p>{t('footer.checkinCheckout', { checkin: HOTEL.checkinTime, checkout: HOTEL.checkoutTime })}</p>
            </address>
            <a
              href={HOTEL.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 mr-6 border border-white px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-[#b5533b] transition-colors"
            >
              {t('footer.prenota')}
            </a>
            <a
              href={HOTEL.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm hover:text-white transition-colors"
            >
              {t('footer.vediSuGoogleMaps')}
            </a>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 text-xs text-white/90 text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <span aria-hidden>·</span>
            <CookieSettingsButton className="text-xs text-white/90 hover:text-white transition-colors cursor-pointer" />
          </div>
          <p>
            {t('footer.copyright', { year: new Date().getFullYear().toString(), hotelName: HOTEL.name, address: HOTEL.address.full, vat: HOTEL.vatNumber })}
          </p>
        </div>
      </div>
    </footer>
  )
}
