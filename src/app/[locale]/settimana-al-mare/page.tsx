import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { SettimanaMareHero } from '@/components/sections/SettimanaMareHero'
import { Stella } from '@/components/ui/Stella'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { HOTEL, PHONE_HREF, whatsappUrl } from '@/lib/hotel.config'

// ─────────────────────────────────────────────────────────────
// Offerta di Natale "Una settimana al mare" — Estate 2027
// Prezzo bloccato (2.300 € a coppia, luglio e agosto) per chi prenota
// e salda entro il 6 gennaio 2027. Dal 7 gennaio: 3.300 €, esclusi
// giugno/luglio/agosto → aggiornare testi in messages/*/settimanaMare.json
// e la data di scadenza qui sotto.
// ─────────────────────────────────────────────────────────────
const SCADENZA = '2027-01-06T23:59:59+01:00'
const PREZZO = '2300'

const pageUrl = (locale: string) =>
  locale === 'it' ? `${HOTEL.url}/settimana-al-mare` : `${HOTEL.url}/en/settimana-al-mare`

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const url = pageUrl(locale)
  return {
    title: { absolute: t('metadata.settimanaMare.title') },
    description: t('metadata.settimanaMare.description'),
    alternates: {
      canonical: url,
      languages: { 'it': `${HOTEL.url}/settimana-al-mare`, 'en': `${HOTEL.url}/en/settimana-al-mare` },
    },
    openGraph: {
      title: t('metadata.settimanaMare.ogTitle'),
      description: t('metadata.settimanaMare.ogDescription'),
      url,
      siteName: HOTEL.name,
      type: 'website',
      locale: locale === 'it' ? 'it_IT' : 'en_US',
      images: [{ url: '/images/og-settimana-mare.jpg', width: 1200, height: 630, alt: t('metadata.settimanaMare.ogAlt') }],
    },
  }
}

// Foto della lista "Cosa vi aspetta" — i testi sono in messages/*/settimanaMare.json (stesso ordine)
const inclusiImages = [
  '/images/camera-via-nora.webp',
  '/images/lettino-mare.jpg',
  '/images/ristorante.webp',
  '/images/stabilimento-mare.jpg',
  '/images/prato-mare-vela.jpg',
]

type Incluso = { eyebrow: string; titolo: string; testo: string; alt: string }
type Condizione = { term: string; def: string }
type Faq = { q: string; a: string }


export default async function SettimanaMarePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('settimanaMare')

  const bold = (chunks: ReactNode) => <strong style={{ color: 'inherit', fontWeight: 600 }}>{chunks}</strong>
  const inclusi = t.raw('inclusi.items') as Incluso[]
  const condizioni = t.raw('condizioni.items') as Condizione[]
  const faq = t.raw('faq.items') as Faq[]

  // Contatti per richiedere l'offerta
  const messaggio = t('prezzo.messaggio')
  const WHATSAPP_URL = whatsappUrl(messaggio)
  const EMAIL_HREF = `mailto:${HOTEL.contact.email}?subject=${encodeURIComponent(t('prezzo.oggettoEmail'))}&body=${encodeURIComponent(messaggio)}`

  const url = pageUrl(locale)
  const homeUrl = locale === 'it' ? HOTEL.url : `${HOTEL.url}/en`

  // ── Dati strutturati (Google) ──
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: homeUrl },
    { name: t('breadcrumb'), url },
  ])

  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: t('offerSchema.name'),
    description: t('offerSchema.description'),
    url,
    image: `${HOTEL.url}/images/og-settimana-mare.jpg`,
    price: PREZZO,
    priceCurrency: 'EUR',
    validFrom: '2026-11-19',
    validThrough: SCADENZA,
    availabilityStarts: '2027-07-01',
    availabilityEnds: '2027-08-31',
    availability: 'https://schema.org/LimitedAvailability',
    offeredBy: {
      '@type': 'Hotel',
      name: HOTEL.name,
      url: HOTEL.url,
      telephone: HOTEL.contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: HOTEL.address.street,
        addressLocality: HOTEL.address.city,
        addressRegion: HOTEL.address.region,
        postalCode: HOTEL.address.postalCode,
        addressCountry: HOTEL.address.countryCode,
      },
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SettimanaMareHero />

      {/* ── INTRO ── */}
      <section className="bg-cream py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] mb-8" style={{ color: '#8a9e82' }}>
            {t('intro.label')}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-10" style={{ color: '#1e1c18' }}>
            {t('intro.title')}<br /><em className="italic font-normal">{t('intro.titleItalic')}</em>
          </h2>
          <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#4a4640' }}>
            <p>{t('intro.p1')}</p>
            <p>{t.rich('intro.p2', { b: bold })}</p>
          </div>
          <Stella className="w-4 h-4 mx-auto mt-12 text-[#c4b99a]" />
        </div>
      </section>

      {/* ── FOTO PANORAMICA ── */}
      <section className="bg-cream pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 7' }}>
            <Image
              src="/images/stabilimento-prato.jpg"
              alt={t('intro.panoramaAlt')}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── COSA COMPRENDE — intestazione ── */}
      <section className="bg-cream pt-20 pb-4 px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] mb-4" style={{ color: '#c4b99a' }}>
          {t('inclusi.label')}
        </p>
        <h2 className="font-serif text-5xl md:text-7xl" style={{ color: '#1e1c18' }}>
          {t('inclusi.title')} <em className="italic font-normal">{t('inclusi.titleItalic')}</em>
        </h2>
      </section>

      {/* ── COSA COMPRENDE — lista editoriale ── */}
      <section className="bg-cream py-10 px-6">
        <div className="max-w-6xl mx-auto">
          {inclusi.map((item, i) => {
            const isEven = i % 2 === 0
            const numero = String(i + 1).padStart(2, '0')
            return (
              <div
                key={numero}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 border-t"
                style={{ borderColor: '#dcd3bf' }}
              >
                {/* Foto */}
                <div
                  className={`relative w-full overflow-hidden ${!isEven ? 'lg:order-2' : ''}`}
                  style={{ aspectRatio: '4 / 3' }}
                >
                  <Image
                    src={inclusiImages[i]}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Testo */}
                <div className={!isEven ? 'lg:order-1' : ''}>
                  <span
                    className="font-serif text-8xl md:text-9xl leading-none select-none block mb-2"
                    style={{ color: '#dcd3bf' }}
                    aria-hidden="true"
                  >
                    {numero}
                  </span>
                  <p className="text-[11px] uppercase tracking-[0.3em] mb-3" style={{ color: '#8a9e82' }}>
                    {item.eyebrow}
                  </p>
                  <h3 className="font-serif text-3xl md:text-4xl mb-5 whitespace-pre-line" style={{ color: '#1e1c18' }}>
                    {item.titolo}
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#4a4640' }}>
                    {item.testo}
                  </p>
                </div>
              </div>
            )
          })}
          <div className="border-t" style={{ borderColor: '#dcd3bf' }} />
        </div>
      </section>

      {/* ── TRA LE VIE DI PULA E IL MARE ── */}
      <section style={{ backgroundColor: '#8a9e82' }} className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full overflow-hidden order-2 lg:order-1" style={{ aspectRatio: '4 / 5' }}>
            <Image
              src="/images/giardino-mare.jpg"
              alt={t('centro.imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-[11px] uppercase tracking-[0.35em] mb-6 text-white/80">
              {t('centro.label')}
            </p>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-snug text-white whitespace-pre-line">
              {t('centro.title')}
            </h2>
            <div className="space-y-4 leading-relaxed text-white/90">
              <p>{t.rich('centro.p1', { b: (c) => <strong className="text-white">{c}</strong> })}</p>
              <p>{t('centro.p2')}</p>
              <p>{t('centro.p3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IL REGALO DI NATALE — voucher ── */}
      <section style={{ backgroundColor: '#24342b' }} className="py-28 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: '#c4b99a' }}>
              <Stella className="w-3 h-3" />
              {t('regalo.label')}
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-10" style={{ color: '#f0ebe0' }}>
              {t('regalo.title')}<br /><em className="italic font-normal" style={{ color: '#c4b99a' }}>{t('regalo.titleItalic')}</em>
            </h2>
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: 'rgba(240,235,224,0.82)' }}>
              <p>{t('regalo.p1')}</p>
              <p>{t('regalo.p2')}</p>
            </div>
          </div>

          {/* Voucher stilizzato */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-md p-3 rotate-[-2deg] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]"
              style={{ backgroundColor: '#f0ebe0' }}
              aria-hidden="true"
            >
              <div className="border px-8 py-12 text-center" style={{ borderColor: '#c4b99a' }}>
                <div className="border px-6 py-10" style={{ borderColor: '#dcd3bf' }}>
                  <Stella className="w-5 h-5 mx-auto mb-6 text-[#b0975f]" />
                  <p className="text-[10px] uppercase tracking-[0.4em] mb-6" style={{ color: '#7a5c3a' }}>
                    {t('regalo.voucherLabel')}
                  </p>
                  <p className="font-serif text-4xl md:text-5xl leading-none mb-2" style={{ color: '#1e1c18' }}>
                    {t('regalo.voucherTitle1')}
                  </p>
                  <p className="font-serif italic text-4xl md:text-5xl leading-none mb-8" style={{ color: '#1e1c18' }}>
                    {t('regalo.voucherTitle2')}
                  </p>
                  <div className="w-12 h-px mx-auto mb-6" style={{ backgroundColor: '#c4b99a' }} />
                  <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: '#4a4640' }}>
                    {t('regalo.voucherSub')}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: '#8a9e82' }}>
                    {t('regalo.voucherFirma')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COME FUNZIONA ── */}
      <section className="bg-cream py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.35em] mb-4" style={{ color: '#c4b99a' }}>
              {t('condizioni.label')}
            </p>
            <h2 className="font-serif text-4xl md:text-6xl" style={{ color: '#1e1c18' }}>
              {t('condizioni.title')} <em className="italic font-normal">{t('condizioni.titleItalic')}</em>
            </h2>
          </div>
          <dl>
            {condizioni.map((c) => (
              <div
                key={c.term}
                className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 md:gap-10 py-6 border-t"
                style={{ borderColor: '#dcd3bf' }}
              >
                <dt className="text-[11px] uppercase tracking-[0.3em] md:pt-2" style={{ color: '#8a9e82' }}>
                  {c.term}
                </dt>
                <dd className="font-serif text-xl md:text-2xl leading-snug" style={{ color: '#1e1c18' }}>
                  {c.def}
                </dd>
              </div>
            ))}
            <div className="border-t" style={{ borderColor: '#dcd3bf' }} />
          </dl>
        </div>
      </section>

      {/* ── PREZZO + CTA ── */}
      <section id="prenota" style={{ backgroundColor: '#1e1c18' }} className="py-28 text-center px-6">
        <p className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: '#c4b99a' }}>
          <Stella className="w-3 h-3" />
          {t('prezzo.label')}
          <Stella className="w-3 h-3" />
        </p>
        <p className="font-serif text-5xl md:text-7xl text-white mb-4 leading-none">
          <em className="italic font-normal">{t('prezzo.price')}</em>
        </p>
        <p className="text-sm uppercase tracking-[0.25em] mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {t('prezzo.sub')}
        </p>
        <p className="text-[11px] uppercase tracking-[0.3em] mb-12" style={{ color: '#d4a882' }}>
          {t('prezzo.deadline')}
        </p>
        <p className="max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {t('prezzo.testo')}
          <br />
          <span className="text-white">{t.rich('prezzo.cta', { b: bold })}</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#25D366', color: '#fff' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t('prezzo.whatsapp')}
          </a>
          {/* Telefono */}
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-white text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 transition-opacity hover:opacity-90"
            style={{ color: '#1e1c18' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {t('prezzo.telefono')}
          </a>
          {/* Email */}
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

      {/* ── DOMANDE FREQUENTI ── */}
      <section className="bg-cream py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.35em] mb-4" style={{ color: '#c4b99a' }}>
              {t('faq.label')}
            </p>
            <h2 className="font-serif text-4xl md:text-6xl" style={{ color: '#1e1c18' }}>
              {t('faq.title')} <em className="italic font-normal">{t('faq.titleItalic')}</em>
            </h2>
          </div>
          {faq.map((f) => (
            <details key={f.q} className="group border-t py-6" style={{ borderColor: '#dcd3bf' }}>
              <summary className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="font-serif text-xl md:text-2xl leading-snug" style={{ color: '#1e1c18' }}>
                  {f.q}
                </h3>
                <span
                  className="text-2xl leading-none transition-transform duration-200 group-open:rotate-45 shrink-0 mt-1"
                  style={{ color: '#8a9e82' }}
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 leading-relaxed" style={{ color: '#4a4640' }}>
                {f.a}
              </p>
            </details>
          ))}
          <div className="border-t" style={{ borderColor: '#dcd3bf' }} />
        </div>
      </section>
    </>
  )
}
