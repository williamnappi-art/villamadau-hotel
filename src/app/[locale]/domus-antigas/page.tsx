import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { ReactNode } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { DomusAntigasHero } from '@/components/sections/DomusAntigasHero'
import { pageBreadcrumb } from '@/lib/schema'
import { whatsappUrl } from '@/lib/hotel.config'

// Edizione 2026 conclusa: noindex finché la pagina non viene aggiornata al 2027
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ locale, path: '/domus-antigas', key: 'domusAntigas', image: { url: '/images/piazzetta.webp' }, noindex: true })
}

export default async function DomusAntigasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('eventi')
  const WHATSAPP_URL = whatsappUrl(t('domusAntigas.whatsappMessage'))
  const strong = (chunks: ReactNode) => <strong style={{ color: '#1e1c18' }}>{chunks}</strong>

  const breadcrumb = pageBreadcrumb(locale, '/domus-antigas')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <DomusAntigasHero />

      {/* \u2500\u2500 INTRO \u2500\u2500 */}
      <section style={{ backgroundColor: '#F9ECE8' }} className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] mb-8" style={{ color: '#5c5f51' }}>
            {t('domusAntigas.intro.label')}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-10" style={{ color: '#1e1c18' }}>
            {t('domusAntigas.intro.title1')}<br />{t('domusAntigas.intro.title2')}
          </h2>
          <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#4a4640' }}>
            <p>{t.rich('domusAntigas.intro.paragrafo1', { b: strong })}</p>
            <p>{t('domusAntigas.intro.paragrafo2')}</p>
          </div>
          <a
            href="https://www.domusantigas.it/laboratori/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 text-xs uppercase tracking-[0.25em] border-b pb-px transition-opacity hover:opacity-60"
            style={{ color: '#D0634C', borderColor: '#D0634C' }}
          >
            {t('domusAntigas.intro.link')}
          </a>
        </div>
      </section>

      {/* \u2500\u2500 DIVIDER \u2500\u2500 */}
      <div style={{ backgroundColor: '#F4C2AE' }} className="h-px" />

      {/* \u2500\u2500 VILLA MADAU NEL CUORE \u2500\u2500 */}
      <section style={{ backgroundColor: '#D3DCD7' }} className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
            <Image
              src="/images/piazzetta.webp"
              alt={t('domusAntigas.cuore.imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: '#5c5f51' }}>
              {t('domusAntigas.cuore.label')}
            </p>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-snug" style={{ color: '#1e1c18' }}>
              {t('domusAntigas.cuore.title1')}<br />{t('domusAntigas.cuore.title2')}
            </h2>
            <div className="space-y-4 leading-relaxed" style={{ color: '#4a4640' }}>
              <p>{t('domusAntigas.cuore.paragrafo1')}</p>
              <p>{t('domusAntigas.cuore.paragrafo2')}</p>
              <p>{t('domusAntigas.cuore.paragrafo3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* \u2500\u2500 L'OFFERTA \u2500\u2500 */}
      <section style={{ backgroundColor: '#F9ECE8' }} className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.35em] mb-4" style={{ color: '#5c5f51' }}>
              {t('domusAntigas.offerta.label')}
            </p>
            <h2 className="font-serif leading-none" style={{ color: '#1e1c18' }}>
              <em className="block italic font-normal text-7xl md:text-9xl leading-none" style={{ color: '#D0634C' }}>{t('domusAntigas.offerta.prezzo')}</em>
              <span className="block text-2xl md:text-3xl mt-3">{t('domusAntigas.offerta.sottotitolo')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Cosa include */}
            <div className="border-t pt-8" style={{ borderColor: '#F4C2AE' }}>
              <p className="text-[11px] uppercase tracking-[0.25em] mb-6" style={{ color: '#D0634C' }}>
                {t('domusAntigas.offerta.cosaInclude.label')}
              </p>
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <span className="font-serif text-2xl leading-none mt-0.5" style={{ color: '#F4C2AE' }}>01</span>
                  <div>
                    <p className="font-medium mb-1" style={{ color: '#1e1c18' }}>{t('domusAntigas.offerta.cosaInclude.item1.titolo')}</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#4a4640' }}>
                      {t('domusAntigas.offerta.cosaInclude.item1.testo')}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-serif text-2xl leading-none mt-0.5" style={{ color: '#F4C2AE' }}>02</span>
                  <div>
                    <p className="font-medium mb-1" style={{ color: '#1e1c18' }}>{t('domusAntigas.offerta.cosaInclude.item2.titolo')}</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#4a4640' }}>
                      {t('domusAntigas.offerta.cosaInclude.item2.testo')}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Come prenotare */}
            <div className="border-t pt-8" style={{ borderColor: '#F4C2AE' }}>
              <p className="text-[11px] uppercase tracking-[0.25em] mb-6" style={{ color: '#D0634C' }}>
                {t('domusAntigas.offerta.comePrenotare.label')}
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#4a4640' }}>
                {t('domusAntigas.offerta.comePrenotare.testo')}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#25D366' }}
              >
                {/* WhatsApp icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('domusAntigas.offerta.comePrenotare.cta')}
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* \u2500\u2500 INFO \u2500\u2500 */}
      <section style={{ backgroundColor: '#F9ECE8' }} className="pb-20 px-6">
        <div className="max-w-4xl mx-auto border-t pt-16" style={{ borderColor: '#F4C2AE' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] mb-3" style={{ color: '#D0634C' }}>
                {t('domusAntigas.info.quando.label')}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#4a4640' }}>
                <strong style={{ color: '#1e1c18' }}>{t('domusAntigas.info.quando.testo')}</strong><br />
                {t('domusAntigas.info.quando.dettaglio')}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] mb-3" style={{ color: '#D0634C' }}>
                {t('domusAntigas.info.dove.label')}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#4a4640' }}>
                {t('domusAntigas.info.dove.riga1')}<br />
                {t('domusAntigas.info.dove.riga2')}<br />
                {t('domusAntigas.info.dove.riga3')}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] mb-3" style={{ color: '#D0634C' }}>
                {t('domusAntigas.info.prezzo.label')}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#4a4640' }}>
                {t.rich('domusAntigas.info.prezzo.testo', { b: strong })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* \u2500\u2500 CTA \u2500\u2500 */}
      <section style={{ backgroundColor: '#D0634C' }} className="py-24 text-center px-6">
        <p className="text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: '#F4C2AE' }}>
          {t('domusAntigas.cta.label')}
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
          {t('domusAntigas.cta.title1')}<br />{t('domusAntigas.cta.title2')}
        </h2>
        <p className="max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {t('domusAntigas.cta.paragrafo')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white text-xs font-medium tracking-[0.2em] uppercase px-10 py-4 transition-opacity hover:opacity-90"
            style={{ color: '#D0634C' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t('domusAntigas.cta.whatsapp')}
          </a>
          <Link
            href="/contatti"
            className="inline-block border border-white/50 text-white text-xs font-medium tracking-[0.2em] uppercase px-10 py-4 hover:bg-white/10 transition-colors duration-200"
          >
            {t('domusAntigas.cta.contattaci')}
          </Link>
        </div>
      </section>
    </>
  )
}
