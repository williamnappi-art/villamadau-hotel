import type { Metadata } from 'next'
import { ContactForm } from '@/components/forms/ContactForm'
import { HOTEL } from '@/lib/hotel.config'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contatti e Prenotazioni',
  description:
    `Contatta Villa Madau Hotel a Pula per prenotazioni e informazioni. ${HOTEL.address.full}. Email: ${HOTEL.contact.email}. Hotel 3 stelle nel centro storico di Pula, Sardegna.`,
  alternates: { canonical: `${HOTEL.url}/contatti` },
}

export default function ContattiPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: HOTEL.url },
    { name: 'Contatti', url: `${HOTEL.url}/contatti` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <div className="bg-gray-900 py-16 px-4 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-300 mb-3">
          Siamo qui per voi
        </p>
        <h1 className="font-serif text-4xl md:text-5xl">Contatti e prenotazioni</h1>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Scriveteci per disponibilità, tariffe o qualsiasi informazione. Risponderemo entro 24 ore.
        </p>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info contatto */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-gray-900 mb-6">Come raggiungerci</h2>

                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Indirizzo</p>
                    <address className="not-italic text-gray-700 text-sm leading-relaxed">
                      {HOTEL.address.full}
                    </address>
                    <a
                      href={HOTEL.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm text-primary hover:underline"
                    >
                      Vedi su Google Maps →
                    </a>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Email</p>
                    <a
                      href={`mailto:${HOTEL.contact.email}`}
                      className="text-sm text-gray-700 hover:text-primary transition-colors"
                    >
                      {HOTEL.contact.email}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Orari hotel</p>
                    <p className="text-sm text-gray-700">
                      Check-in: dalle {HOTEL.checkinTime}
                      <br />
                      Check-out: entro {HOTEL.checkoutTime}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Distanze</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {HOTEL.nearbyAttractions.map((a) => (
                        <li key={a.name} className="flex justify-between gap-4">
                          <span>{a.name}</span>
                          <span className="text-primary font-medium flex-shrink-0">{a.distance}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl text-gray-900 mb-6">Invia una richiesta</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
