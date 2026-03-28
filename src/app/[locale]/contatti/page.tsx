import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ContattiHero } from '@/components/sections/ContattiHero'
import { HOTEL } from '@/lib/hotel.config'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contatti e Prenotazioni',
  description:
    `Contatta Villa Madau Hotel a Pula per prenotazioni e informazioni. ${HOTEL.address.full}. Email: ${HOTEL.contact.email}. Hotel 3 stelle nel centro storico di Pula, Sardegna.`,
  alternates: { canonical: `${HOTEL.url}/contatti` },
  openGraph: {
    title: 'Contatti e Prenotazioni | Villa Madau Hotel – Pula',
    description: `Contatta Villa Madau Hotel a Pula per prenotazioni e informazioni. ${HOTEL.address.full}.`,
    url: `${HOTEL.url}/contatti`,
    siteName: HOTEL.name,
    type: 'website',
    locale: 'it_IT',
    images: [{ url: '/images/hotel-esterno.webp', width: 1200, height: 630, alt: 'Villa Madau Hotel Pula – esterno' }],
  },
}

const WHATSAPP_NUMBER = '390709249033'
const WHATSAPP_TEXT = encodeURIComponent('Ciao! Vorrei avere informazioni su Villa Madau Hotel.')

export default async function ContattiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: HOTEL.url },
    { name: 'Contatti', url: `${HOTEL.url}/contatti` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <ContattiHero />

      {/* ── WhatsApp CTA ── */}
      <section className="bg-[#1e1c18] py-20 px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#c4b99a] mb-6">
          Risposta in pochi minuti
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
          Scrivici su<br />
          <em className="italic font-normal">WhatsApp</em>
        </h2>
        <p className="text-white/60 max-w-lg mx-auto mb-3 leading-relaxed text-sm">
          Dall&apos;altra parte del telefono ci siamo noi — non un bot, non un risponditore automatico.
          Qualsiasi domanda: disponibilità, camere, ristorante, trasferimenti, esigenze particolari.
        </p>
        <p className="text-white/35 text-xs uppercase tracking-widest mb-10">
          Persone reali · Risposte vere · Nessun bot
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 bg-[#25D366] text-white text-xs font-semibold tracking-[0.2em] uppercase px-10 py-5 hover:bg-[#1ebe5a] transition-colors duration-300"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Scrivici su WhatsApp
          <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </section>

      {/* ── Contatti + Mappa ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Info contatti */}
            <div className="space-y-10">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a4640]">
                Dove siamo · Come contattarci
              </p>

              {/* Email — in evidenza */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4b99a] mb-3">Email</p>
                <a
                  href={`mailto:${HOTEL.contact.email}`}
                  className="font-serif text-3xl md:text-4xl text-[#1e1c18] hover:text-[#4a4640] transition-colors"
                >
                  {HOTEL.contact.email}
                </a>
              </div>

              {/* Telefono */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4b99a] mb-3">Telefono</p>
                <a
                  href={`tel:+390709249033`}
                  className="font-serif text-3xl md:text-4xl text-[#1e1c18] hover:text-[#4a4640] transition-colors"
                >
                  {HOTEL.contact.phone}
                </a>
              </div>

              {/* Indirizzo */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4b99a] mb-2">Indirizzo</p>
                <address className="not-italic text-[#1e1c18] text-sm leading-relaxed mb-2">
                  {HOTEL.address.full}
                </address>
                <a
                  href={HOTEL.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.15em] text-[#4a4640] hover:text-[#1e1c18] transition-colors"
                >
                  Apri in Google Maps →
                </a>
              </div>

              {/* Orari */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4b99a] mb-2">Orari</p>
                <p className="text-sm text-[#1e1c18] leading-relaxed">
                  Check-in: dalle {HOTEL.checkinTime}<br />
                  Check-out: entro {HOTEL.checkoutTime}
                </p>
              </div>

              {/* Distanze */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4b99a] mb-3">Distanze</p>
                <ul className="text-sm space-y-2">
                  {HOTEL.nearbyAttractions.map((a) => (
                    <li key={a.name} className="flex justify-between gap-4 border-b border-[#1e1c18]/8 pb-2">
                      <span className="text-[#4a4640]">{a.name}</span>
                      <span className="text-[#c4b99a] font-medium flex-shrink-0">{a.distance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mappa */}
            <div className="w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d792!2d9.0021019!3d39.0114414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e727d27f214f0d%3A0x2900f40f2c992db9!2sHotel%20VillaMadau%2C%20Boutique%20Hotel!5e0!3m2!1sit!2sit!4v1742900000000!5m2!1sit!2sit"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Villa Madau Hotel – Via Nora 84, Pula"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
