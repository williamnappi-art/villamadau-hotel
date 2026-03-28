import { Link } from '@/i18n/navigation'
import { HOTEL } from '@/lib/hotel.config'
import { generateLocalBusinessSchema } from '@/lib/schema'
import { CookieSettingsButton } from '@/components/ui/CookieBanner'
import { getTranslations } from 'next-intl/server'

const links = [
  { href: '/hotel' as const, key: 'hotel' },
  { href: '/ristorante' as const, key: 'ristorante' },
  { href: '/servizi' as const, key: 'servizi' },
  { href: '/da-non-perdere' as const, key: 'daNonPerdere' },
  { href: '/contatti' as const, key: 'contatti' },
]

export async function Footer() {
  const t = await getTranslations('common')
  const schema = generateLocalBusinessSchema()

  return (
    <footer className="text-white/75" style={{ backgroundColor: '#c96148' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl text-white mb-2">{HOTEL.shortName}</p>
            <p className="text-sm leading-relaxed">{HOTEL.tagline}</p>
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
              {links.map((link) => (
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
              href={HOTEL.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm hover:text-white transition-colors"
            >
              {t('footer.vediSuGoogleMaps')}
            </a>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 text-xs text-white/40 text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <span aria-hidden>·</span>
            <CookieSettingsButton className="text-xs text-white/40 hover:text-white transition-colors cursor-pointer" />
          </div>
          <p>
            {t('footer.copyright', { year: new Date().getFullYear().toString(), hotelName: HOTEL.name, address: HOTEL.address.full })}
          </p>
        </div>
      </div>
    </footer>
  )
}
