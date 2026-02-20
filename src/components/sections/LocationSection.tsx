import Image from 'next/image'
import { HOTEL } from '@/lib/hotel.config'

export function LocationSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Testo */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-300 mb-4">
              Dove siamo
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
              Il cuore della Sardegna del Sud
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Villa Madau si trova nel centro storico di <strong className="text-white">Pula</strong>,
              borgo medievale della Sardegna meridionale ricco di storia e tradizioni.
              La posizione privilegiata vi permette di esplorare a piedi il centro storico
              e raggiungere facilmente le meraviglie del territorio.
            </p>

            <ul className="space-y-4 mb-8">
              {HOTEL.nearbyAttractions.map((attr) => (
                <li key={attr.name} className="flex items-center gap-4">
                  <span className="flex-shrink-0 w-16 text-right text-sm font-semibold text-primary-300">
                    {attr.distance}
                  </span>
                  <span className="flex-1 h-px bg-gray-700" aria-hidden="true" />
                  <span className="text-sm text-gray-300">{attr.name}</span>
                </li>
              ))}
            </ul>

            <a
              href={HOTEL.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded font-semibold text-sm hover:bg-primary-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Indicazioni stradali
            </a>
          </div>

          {/* Immagine */}
          <div className="relative h-72 lg:h-[450px] rounded-xl overflow-hidden">
            <Image
              src="/images/sardegna-chia.jpg"
              alt="Sardegna meridionale - spiagge di Chia vicino a Pula"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-serif text-lg">Spiagge di Chia</p>
              <p className="text-gray-300 text-sm">a soli 25 km dall&apos;hotel</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
