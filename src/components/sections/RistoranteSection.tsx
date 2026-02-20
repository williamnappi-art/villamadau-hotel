import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export function RistoranteSection() {
  return (
    <section id="ristorante" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Immagine */}
          <div className="relative h-80 lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/ristorante.jpg"
              alt="Ristorante Villa Madau Pula - cucina tipica sarda"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Testo */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">
              Il nostro ristorante
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
              I sapori autentici della Sardegna
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Il ristorante di Villa Madau è un viaggio nella tradizione gastronomica sarda.
              Ogni piatto è preparato con ingredienti locali di stagione, scelti tra i migliori
              produttori del Sulcis e della Sardegna meridionale.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Dai <em>malloreddus alla campidanese</em> al prelibato bottarga di Cabras, dalle
              grigliate di pesce fresco del Golfo di Cagliari ai dolci tradizionali come le
              <em> seadas</em> al miele di corbezzolo: ogni pasto è un&apos;esperienza indimenticabile.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Colazione tipica sarda ogni mattina',
                'Cucina a base di prodotti locali e di stagione',
                'Selezione di vini sardi DOC e DOCG',
                'Disponibile anche per prenotazioni esterne',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 text-primary flex items-center justify-center text-xs">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <Button href="/ristorante">Scopri il menù</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
