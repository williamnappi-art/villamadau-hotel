import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { buildMetadata, localeUrl } from '@/lib/metadata'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { CapodannoHero } from '@/components/sections/CapodannoHero'
import { Stella } from '@/components/ui/Stella'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { pageBreadcrumb, HOTEL_SCHEMA_ID } from '@/lib/schema'
import { HOTEL, PHONE_HREF, whatsappUrl } from '@/lib/hotel.config'

// ─────────────────────────────────────────────────────────────
// Capodanno 2027 "Il lusso della calma" — 31/12/2026 → 1/1/2027
// Soggiorno: 209 € a coppia, camera matrimoniale + colazione del 1° gennaio.
// Cena del 31: facoltativa, à la carte al Federico's, NON inclusa.
// Late check-out 16:00 per prenotazioni entro il 15 dicembre (camere limitate).
// Testi in messages/*/capodanno.json — dopo il 1° gennaio togliere la pagina
// dalla home/Da non perdere e dalla sitemap.
// ─────────────────────────────────────────────────────────────
const PREZZO = '209'
const PATH = '/capodanno-a-pula'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ locale, path: PATH, key: 'capodanno', image: { url: '/images/og-capodanno.jpg', width: 1200, height: 630 } })
}

type Faq = { q: string; a: string }
type Luogo = { nome: string; testo: string }

const ink = '#1e1c18'
const muted = '#4a4640'
const sand = '#c4b99a' // solo su fondo scuro
const sandDark = '#675c3c' // etichette su fondo chiaro (contrasto leggibile)
const sage = '#8a9e82'
const sageDark = '#52624c'
const line = '#dcd3bf'

export default async function CapodannoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('capodanno')

  const inclusi = t.raw('inclusi.items') as string[]
  const luoghi = t.raw('esplora.luoghi') as Luogo[]
  const faq = t.raw('faq.items') as Faq[]

  const messaggio = t('prezzo.messaggio')
  const WHATSAPP_URL = whatsappUrl(messaggio)
  const EMAIL_HREF = `mailto:${HOTEL.contact.email}?subject=${encodeURIComponent(t('prezzo.oggettoEmail'))}&body=${encodeURIComponent(messaggio)}`

  const url = localeUrl(locale, PATH)

  // ── Dati strutturati (Google) ──
  const breadcrumb = pageBreadcrumb(locale, PATH, t('breadcrumb'))

  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: t('offerSchema.name'),
    description: t('offerSchema.description'),
    url,
    image: `${HOTEL.url}/images/og-capodanno.jpg`,
    price: PREZZO,
    priceCurrency: 'EUR',
    validFrom: '2026-11-25',
    validThrough: '2026-12-31T18:00:00+01:00',
    availabilityStarts: '2026-12-31',
    availabilityEnds: '2027-01-01',
    availability: 'https://schema.org/LimitedAvailability',
    offeredBy: {
      '@type': 'Hotel',
      '@id': HOTEL_SCHEMA_ID,
      name: HOTEL.name,
      url: HOTEL.url,
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const Label = ({ children, color = sageDark }: { children: ReactNode; color?: string }) => (
    <p className="text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color }}>
      {children}
    </p>
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <CapodannoHero />

      {/* ── INTRO ── */}
      <section className="bg-cream py-24 md:py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <Label>{t('intro.label')}</Label>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-10" style={{ color: ink }}>
              {t('intro.title')} <em className="italic font-normal">{t('intro.titleItalic')}</em>
            </h2>
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: muted }}>
              <p>{t('intro.p1')}</p>
              <p>{t('intro.p2')}</p>
              <p>{t('intro.p3')}</p>
            </div>
          </div>
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
            <Image
              src="/images/camera-via-nora.webp"
              alt={t('intro.imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── CENA À LA CARTE (sera, toni scuri) ── */}
      <section style={{ backgroundColor: ink }} className="py-24 md:py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="relative w-full overflow-hidden order-2 lg:order-1" style={{ aspectRatio: '4 / 5' }}>
            <Image
              src="/images/piatto-federicos-pula.webp"
              alt={t('cena.imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <Label color={sand}>{t('cena.label')}</Label>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-10 text-white">
              {t('cena.title')}<br /><em className="italic font-normal" style={{ color: sand }}>{t('cena.titleItalic')}</em>
            </h2>
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
              <p>{t('cena.p1')}</p>
              <p>{t('cena.p2')}</p>
            </div>
            <a
              href={HOTEL.restaurant.menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-10 text-xs uppercase tracking-[0.25em] border-b pb-1 transition-opacity hover:opacity-70"
              style={{ color: sand, borderColor: sand }}
            >
              {t('cena.menu')} →
            </a>
          </div>
        </div>
      </section>

      {/* ── PRIMO GENNAIO ── */}
      <section className="bg-cream py-24 md:py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <Label>{t('primoGennaio.label')}</Label>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-10" style={{ color: ink }}>
              {t('primoGennaio.title')}<br /><em className="italic font-normal">{t('primoGennaio.titleItalic')}</em>
            </h2>
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: muted }}>
              <p>{t('primoGennaio.p1')}</p>
              <p>{t('primoGennaio.p2')}</p>
            </div>
          </div>
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
            <Image
              src="/images/colazione.webp"
              alt={t('primoGennaio.imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── PRENOTAZIONE ANTICIPATA ── */}
      <section style={{ backgroundColor: sageDark }} className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.35em] mb-6 text-white/85">{t('anticipo.label')}</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8 text-white">
            {t('anticipo.title')} <em className="italic font-normal">{t('anticipo.titleItalic')}</em>
          </h2>
          <p className="text-lg leading-relaxed text-white/90 mb-10">{t('anticipo.p1')}</p>
          <span className="inline-block border border-white/70 text-white text-[11px] uppercase tracking-[0.3em] px-6 py-3">
            {t('anticipo.badge')}
          </span>
        </div>
      </section>

      {/* ── INCLUSO / NON INCLUSO ── */}
      <section className="bg-cream py-24 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Label color={sandDark}>{t('inclusi.label')}</Label>
            <h2 className="font-serif text-4xl md:text-6xl" style={{ color: ink }}>
              {t('inclusi.title')} <em className="italic font-normal">{t('inclusi.titleItalic')}</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
            {/* Soggiorno incluso */}
            <div className="p-8 md:p-10" style={{ backgroundColor: '#e8e1d2' }}>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-medium mb-8" style={{ color: ink }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                {t('inclusi.inclusoTag')}
              </p>
              <ul className="space-y-5">
                {inclusi.map((item) => (
                  <li key={item} className="flex gap-4 leading-relaxed" style={{ color: ink }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: sage }} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Cena NON inclusa */}
            <div className="p-8 md:p-10 border-2 border-dashed" style={{ borderColor: '#b9ab8a' }}>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-medium mb-8" style={{ color: '#7a5c3a' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
                {t('inclusi.esclusoTag')}
              </p>
              <h3 className="font-serif text-2xl md:text-3xl mb-4" style={{ color: ink }}>{t('inclusi.esclusoTitle')}</h3>
              <p className="leading-relaxed" style={{ color: muted }}>{t('inclusi.esclusoTesto')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PREZZO + CTA ── */}
      <section id="prenota" style={{ backgroundColor: ink }} className="py-28 text-center px-6">
        <p className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: sand }}>
          <Stella className="w-3 h-3" />
          {t('prezzo.label')}
          <Stella className="w-3 h-3" />
        </p>
        <p className="font-serif text-6xl md:text-8xl text-white mb-4 leading-none">
          <em className="italic font-normal">{t('prezzo.price')}</em>
        </p>
        <p className="text-sm uppercase tracking-[0.25em] mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {t('prezzo.sub')}
        </p>
        <p className="max-w-xl mx-auto mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {t('prezzo.nota')}
        </p>
        <p className="max-w-xl mx-auto mb-12 font-serif italic text-2xl text-white">
          {t('prezzo.invito')}
        </p>
        <p className="text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: sand }}>{t('prezzo.cta')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#1f7a44', color: '#fff' }}
          >
            <WhatsAppIcon />
            {t('prezzo.whatsapp')}
          </a>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-white text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 transition-opacity hover:opacity-90"
            style={{ color: ink }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {t('prezzo.telefono')}
          </a>
          <a
            href={EMAIL_HREF}
            className="inline-flex items-center gap-3 border border-white/40 text-white text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-white/10 transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {t('prezzo.email')}
          </a>
        </div>
      </section>

      {/* ── IDEE PER IL 1° GENNAIO ── */}
      <section className="bg-cream py-24 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-14">
            <Label>{t('esplora.label')}</Label>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8" style={{ color: ink }}>
              {t('esplora.title')} <em className="italic font-normal">{t('esplora.titleItalic')}</em>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: muted }}>{t('esplora.intro')}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3 / 2' }}>
              <Image
                src="/images/nora-villa-madau.webp"
                alt={t('esplora.imageAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <ol>
              {luoghi.map((l, i) => (
                <li key={l.nome} className="grid grid-cols-[3rem_1fr] gap-4 py-5 border-t" style={{ borderColor: line }}>
                  <span className="font-serif text-3xl leading-none" style={{ color: sandDark }} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl mb-1" style={{ color: ink }}>{l.nome}</h3>
                    <p className="leading-relaxed" style={{ color: muted }}>{l.testo}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── FAQ / CONDIZIONI ── */}
      <section className="py-24 md:py-28 px-6" style={{ backgroundColor: '#e8e1d2' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <Label color={'#7a5c3a'}>{t('faq.label')}</Label>
            <h2 className="font-serif text-4xl md:text-6xl" style={{ color: ink }}>
              {t('faq.title')} <em className="italic font-normal">{t('faq.titleItalic')}</em>
            </h2>
          </div>
          {faq.map((f) => (
            <details key={f.q} className="group border-t py-6" style={{ borderColor: '#cfc4ab' }}>
              <summary className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="font-serif text-xl md:text-2xl leading-snug" style={{ color: ink }}>{f.q}</h3>
                <span className="text-2xl leading-none transition-transform duration-200 group-open:rotate-45 shrink-0 mt-1" style={{ color: '#7a5c3a' }} aria-hidden="true">+</span>
              </summary>
              <p className="mt-4 leading-relaxed" style={{ color: muted }}>{f.a}</p>
            </details>
          ))}
          <div className="border-t" style={{ borderColor: '#cfc4ab' }} />
          <div className="text-center mt-14">
            <a
              href="#prenota"
              className="inline-block text-xs font-medium tracking-[0.2em] uppercase px-10 py-4 transition-opacity hover:opacity-90"
              style={{ backgroundColor: ink, color: '#f0ebe0' }}
            >
              {t('prezzo.cta')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
