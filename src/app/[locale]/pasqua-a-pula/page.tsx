import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { PasquaHero } from '@/components/sections/PasquaHero'
import { whatsappUrl } from '@/lib/hotel.config'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ locale, path: '/pasqua-a-pula', key: 'pasqua', image: { url: '/images/chia-villamadau.webp' } })
}

// Palette: Almond #F5DFC5 · Cambridge Blue #A1B5A8 · Khaki #CBB093 · Fawn #DFA477 · Redwood #A4624D

function WhatsAppButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium transition-opacity hover:opacity-90"
      style={{ backgroundColor: '#25D366', color: '#fff' }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {label}
    </a>
  )
}

// Testi in messages/*/eventi.json → pasqua.cosaFare.links.<id>
const linkItems = [
  { id: 'gutturuMannu', href: '/gutturu-mannu', image: '/images/gutturu-mannu-paesaggio.webp' },
  { id: 'spiagge', href: '/servizi', image: '/images/chia-villamadau.webp' },
  { id: 'ristorante', href: '/ristorante', image: '/images/ristorante.webp' },
]

export default async function PasquaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('eventi')
  const WHATSAPP_URL = whatsappUrl(t('pasqua.testo.whatsappDefaultMessage'))

  return (
    <>
      <PasquaHero />

      {/* ── TESTO ── */}
      <section style={{ backgroundColor: '#F5DFC5' }} className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.35em] mb-8" style={{ color: '#A1B5A8' }}>
            {t('pasqua.testo.label')}
          </p>
          <div className="space-y-6 text-lg leading-relaxed" style={{ color: '#A4624D' }}>
            <p>{t('pasqua.testo.paragrafo1')}</p>
            <p>{t('pasqua.testo.paragrafo2')}</p>
            <p>{t('pasqua.testo.paragrafo3')}</p>
          </div>

          <div className="mt-12">
            <p className="text-sm mb-6" style={{ color: '#CBB093' }}>
              {t('pasqua.testo.whatsappNote')}
            </p>
            <WhatsAppButton href={WHATSAPP_URL} label={t('pasqua.testo.whatsappCta')} />
          </div>
        </div>
      </section>

      {/* ── COSA FARE A PULA ── */}
      <section style={{ backgroundColor: '#A1B5A8' }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Card foto */}
          <div className="relative w-full overflow-hidden mb-16" style={{ aspectRatio: '16 / 7' }}>
            <Image
              src="/images/piazza-chiesa-pula.webp"
              alt={t('pasqua.cosaFare.imageAlt')}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/70 mb-2">{t('pasqua.cosaFare.pulaSardegna')}</p>
              <h2 className="font-serif text-white leading-tight">
                <em className="block italic font-normal text-4xl md:text-6xl">{t('pasqua.cosaFare.title')}</em>
              </h2>
            </div>
          </div>

          {/* Link con immagini */}
          <div className="flex flex-col divide-y" style={{ borderColor: '#CBB093', borderTopWidth: '1px', borderTopStyle: 'solid' }}>
            {linkItems.map((item) => {
              const title = t(`pasqua.cosaFare.links.${item.id}.title`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-6 py-7 group transition-opacity hover:opacity-80"
                >
                  <div className="relative flex-shrink-0 overflow-hidden" style={{ width: '80px', height: '80px' }}>
                    <Image
                      src={item.image}
                      alt={title}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-xl mb-1 leading-tight" style={{ color: '#F5DFC5' }}>
                      {title}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,223,197,0.75)' }}>
                      {t(`pasqua.cosaFare.links.${item.id}.description`)}
                    </p>
                  </div>
                  <span className="text-2xl flex-shrink-0 ml-4 transition-transform duration-300 group-hover:translate-x-1" style={{ color: '#F5DFC5' }}>
                    →
                  </span>
                </Link>
              )
            })}
          </div>

          <div className="mt-14 pt-10 border-t" style={{ borderColor: '#CBB093' }}>
            <p className="text-sm mb-6" style={{ color: '#F5DFC5' }}>
              {t('pasqua.cosaFare.domande')}
            </p>
            <WhatsAppButton href={WHATSAPP_URL} label={t('pasqua.cosaFare.whatsappCta')} />
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section style={{ backgroundColor: '#A4624D' }} className="py-24 text-center px-6">
        <p className="text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: '#DFA477' }}>
          {t('pasqua.ctaFinale.label')}
        </p>
        <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight" style={{ color: '#F5DFC5' }}>
          {t('pasqua.ctaFinale.title1')}<br />
          <em className="italic font-normal">{t('pasqua.ctaFinale.title2')}</em>
        </h2>
        <p className="max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: 'rgba(245,223,197,0.8)' }}>
          {t('pasqua.ctaFinale.paragrafo')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <WhatsAppButton href={WHATSAPP_URL} label={t('pasqua.ctaFinale.whatsappCta')} />
          <Link
            href="/contatti"
            className="inline-block border text-sm font-medium tracking-[0.2em] uppercase px-10 py-4 hover:opacity-80 transition-opacity"
            style={{ borderColor: 'rgba(245,223,197,0.5)', color: '#F5DFC5' }}
          >
            {t('pasqua.ctaFinale.contattaci')}
          </Link>
        </div>
      </section>
    </>
  )
}
