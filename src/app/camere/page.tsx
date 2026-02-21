import type { Metadata } from 'next'
import Image from 'next/image'
import { camere } from '@/content/camere'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { HOTEL } from '@/lib/hotel.config'

export const metadata: Metadata = {
  title: 'Camere',
  description:
    'Scopri le camere di Villa Madau Hotel a Pula: Camera Standard, Camera Superior e Suite. Tutte con aria condizionata, bagno privato e balcone. Hotel 3 stelle nel centro storico di Pula, Sardegna.',
  alternates: { canonical: `${HOTEL.url}/camere` },
  openGraph: {
    title: 'Camere | Villa Madau Hotel Pula Sardegna',
    description: 'Camera Standard, Superior e Suite con balcone a Pula, Sardegna.',
    images: [{ url: '/images/hotel-1.jpg', width: 1200, height: 630, alt: 'Camere Villa Madau Pula' }],
  },
}

export default function CamerePage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: HOTEL.url },
    { name: 'Camere', url: `${HOTEL.url}/camere` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero pagina */}
      <div className="bg-cream py-20 px-4 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-gray-500">Le dieci suite nel cuore del Mediterraneo</h1>
      </div>

      {/* Lista camere */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {camere.map((camera, i) => (
            <div
              key={camera.slug}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                i % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Immagine */}
              <div className={`relative h-72 lg:h-[420px] rounded-xl overflow-hidden shadow-lg ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <Image
                  src={camera.immagine}
                  alt={camera.immagineAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className={i % 2 !== 0 ? 'lg:order-1' : ''}>
                <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-2">
                  {camera.mq} mq · fino a {camera.occupazione} ospiti
                </p>
                <h2 className="font-serif text-3xl text-gray-900 mb-4">{camera.nome}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{camera.descrizione}</p>

                {/* Dotazioni principali */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  {camera.dotazioni.slice(0, 6).map((d) => (
                    <div key={d} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-4 h-4 rounded-full bg-primary-100 text-primary flex items-center justify-center text-xs flex-shrink-0">✓</span>
                      {d}
                    </div>
                  ))}
                </div>

                <Button href={`/camere/${camera.slug}`}>Dettagli e prenotazione</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-16 text-center px-4">
        <SectionTitle
          title="Hai domande sulle camere?"
          subtitle="Contattaci per informazioni su disponibilità, tariffe e pacchetti speciali."
        />
        <Button href="/contatti">Scrivi a Villa Madau</Button>
      </section>
    </>
  )
}
