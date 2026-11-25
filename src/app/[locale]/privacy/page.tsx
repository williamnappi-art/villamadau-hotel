import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { HOTEL, PHONE_HREF } from '@/lib/hotel.config'
import { pageBreadcrumb } from '@/lib/schema'
import type { ReactNode } from 'react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ locale, path: '/privacy', key: 'privacy' })
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('privacy')
  const diritti = t.raw('dirittiUtente.diritti') as { title: string; desc: string }[]
  const strong = (chunks: ReactNode) => <strong className="text-[#1e1c18]">{chunks}</strong>
  const extLink = (href: string) =>
    function ExtLink(chunks: ReactNode) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1e1c18] underline underline-offset-2 hover:text-[#675c3c] transition-colors"
        >
          {chunks}
        </a>
      )
    }

  const breadcrumb = pageBreadcrumb(locale, '/privacy')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* ── Hero ── */}
      <section className="bg-[#1e1c18] pt-36 pb-20 px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#c4b99a] mb-6">
          {t('hero.label')}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
          {t.rich('hero.title', { em: (chunks) => <em className="italic font-normal">{chunks}</em> })}
        </h1>
        <p className="text-white/50 text-sm mt-6 max-w-xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>
        <p className="text-white/30 text-xs mt-4">
          {t('hero.ultimoAggiornamento')}
        </p>
      </section>

      {/* ── Titolare del trattamento ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#675c3c] mb-4">
            {t('titolare.articolo')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-8">
            {t('titolare.title')}
          </h2>
          <div className="text-[#4a4640] text-sm leading-relaxed space-y-3">
            <p>
              {t.rich('titolare.intro', { url: HOTEL.url, strong })}
            </p>
            <div className="border-l-2 border-[#c4b99a]/40 pl-6 py-2 space-y-1">
              <p className="text-[#1e1c18] font-medium">{HOTEL.name}</p>
              <p>{HOTEL.address.full}</p>
              <p>
                {t('titolare.emailLabel')}{' '}
                <a href={`mailto:${HOTEL.contact.email}`} className="text-[#1e1c18] hover:text-[#675c3c] transition-colors">
                  {HOTEL.contact.email}
                </a>
              </p>
              <p>
                {t('titolare.telefonoLabel')}{' '}
                <a href={PHONE_HREF} className="text-[#1e1c18] hover:text-[#675c3c] transition-colors">
                  {HOTEL.contact.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dati raccolti ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#675c3c] mb-4">
            {t('datiRaccolti.articolo')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-8">
            {t('datiRaccolti.title')}
          </h2>
          <div className="text-[#4a4640] text-sm leading-relaxed space-y-6">
            <div>
              <h3 className="font-serif text-xl text-[#1e1c18] mb-3">{t('datiRaccolti.volontari.title')}</h3>
              <p>
                {t('datiRaccolti.volontari.testo')}
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#1e1c18] mb-3">{t('datiRaccolti.navigazione.title')}</h3>
              <p>
                {t('datiRaccolti.navigazione.testo')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Google Analytics ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#675c3c] mb-4">
            {t('googleAnalytics.label')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-8">
            {t('googleAnalytics.title')}
          </h2>
          <div className="text-[#4a4640] text-sm leading-relaxed space-y-4">
            <p>
              {t.rich('googleAnalytics.paragrafo1', { strong })}
            </p>
            <p>
              {t.rich('googleAnalytics.paragrafo2', { link: extLink('https://policies.google.com/privacy') })}
            </p>
            <p>
              {t.rich('googleAnalytics.paragrafo3', { link: extLink('https://tools.google.com/dlpage/gaoptout') })}
            </p>
          </div>
        </div>
      </section>

      {/* ── Google Ads ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#675c3c] mb-4">
            {t('googleAds.label')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-8">
            {t('googleAds.title')}
          </h2>
          <div className="text-[#4a4640] text-sm leading-relaxed space-y-4">
            <p>
              {t.rich('googleAds.paragrafo1', { strong })}
            </p>
            <p>
              {t.rich('googleAds.paragrafo2', { link: extLink('https://adssettings.google.com/') })}
            </p>
          </div>
        </div>
      </section>

      {/* ── Cookie utilizzati ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#675c3c] mb-4">
            {t('cookieUtilizzati.label')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-8">
            {t('cookieUtilizzati.title')}
          </h2>
          <div className="text-[#4a4640] text-sm leading-relaxed space-y-8">

            {/* Necessari */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[#c4b99a]" />
                <h3 className="font-serif text-xl text-[#1e1c18]">{t('cookieUtilizzati.necessari.title')}</h3>
              </div>
              <p>
                {t('cookieUtilizzati.necessari.testo')}
              </p>
            </div>

            {/* Analitici */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[#c4b99a]" />
                <h3 className="font-serif text-xl text-[#1e1c18]">{t('cookieUtilizzati.analitici.title')}</h3>
              </div>
              <p>
                {t('cookieUtilizzati.analitici.testo')}
              </p>
              <div className="mt-3 bg-white/60 border border-[#c4b99a]/20 px-5 py-3 text-xs space-y-1">
                <p>{t.rich('cookieUtilizzati.analitici.ga', { strong })}</p>
                <p>{t.rich('cookieUtilizzati.analitici.gaStar', { strong })}</p>
              </div>
            </div>

            {/* Marketing */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[#c4b99a]" />
                <h3 className="font-serif text-xl text-[#1e1c18]">{t('cookieUtilizzati.marketing.title')}</h3>
              </div>
              <p>
                {t('cookieUtilizzati.marketing.testo')}
              </p>
              <div className="mt-3 bg-white/60 border border-[#c4b99a]/20 px-5 py-3 text-xs space-y-1">
                <p>{t.rich('cookieUtilizzati.marketing.gclAu', { strong })}</p>
                <p>{t.rich('cookieUtilizzati.marketing.ide', { strong })}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Diritti dell'utente ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#675c3c] mb-4">
            {t('dirittiUtente.articolo')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-8">
            {t('dirittiUtente.title')}
          </h2>
          <div className="text-[#4a4640] text-sm leading-relaxed space-y-4">
            <p>
              {t('dirittiUtente.intro')}
            </p>
            <ul className="space-y-4 pl-0">
              {diritti.map((right) => (
                <li key={right.title} className="flex gap-4">
                  <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-[#c4b99a]" />
                  <div>
                    <p className="text-[#1e1c18] font-medium mb-1">{right.title}</p>
                    <p>{right.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              {t.rich('dirittiUtente.reclamo', { strong, link: extLink('https://www.garanteprivacy.it') })}
            </p>
          </div>
        </div>
      </section>

      {/* ── Come modificare le preferenze cookie ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#675c3c] mb-4">
            {t('gestioneCookie.label')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-8">
            {t('gestioneCookie.title')}
          </h2>
          <div className="text-[#4a4640] text-sm leading-relaxed space-y-4">
            <p>
              {t('gestioneCookie.intro')}
            </p>
            <ul className="space-y-2">
              {[
                { key: 'chrome', url: 'https://support.google.com/chrome/answer/95647' },
                { key: 'firefox', url: 'https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop' },
                { key: 'safari', url: 'https://support.apple.com/it-it/guide/safari/sfri11471/mac' },
                { key: 'edge', url: 'https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
              ].map((browser) => (
                <li key={browser.key}>
                  <a
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1e1c18] underline underline-offset-2 hover:text-[#675c3c] transition-colors"
                  >
                    {t(`gestioneCookie.browser.${browser.key}`)}
                  </a>
                </li>
              ))}
            </ul>
            <p>
              {t('gestioneCookie.nota')}
            </p>
          </div>
        </div>
      </section>

      {/* ── Contatti per richieste privacy ── */}
      <section className="py-20 bg-[#1e1c18] text-center">
        <div className="max-w-2xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#c4b99a] mb-6">
            {t('contattiPrivacy.label')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
            {t.rich('contattiPrivacy.title', {
              br: () => <br />,
              em: (chunks) => <em className="italic font-normal">{chunks}</em>,
            })}
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8 leading-relaxed text-sm">
            {t('contattiPrivacy.paragrafo')}
          </p>
          <a
            href={`mailto:${HOTEL.contact.email}?subject=${encodeURIComponent(t('contattiPrivacy.emailSubject'))}`}
            className="group inline-flex items-center gap-3 border border-white/20 text-white text-xs font-semibold tracking-[0.2em] uppercase px-10 py-5 hover:bg-white hover:text-[#1e1c18] transition-all duration-300"
          >
            {t('contattiPrivacy.cta', { email: HOTEL.contact.email })}
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <p className="text-white/30 text-xs mt-6">
            {t('contattiPrivacy.infoFooter', { address: HOTEL.address.full, phone: HOTEL.contact.phone })}
          </p>
        </div>
      </section>
    </>
  )
}
