import Image from 'next/image'
import Link from 'next/link'
import { camere } from '@/content/camere'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'

export function CamerePreview() {
  return (
    <section id="camere" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Le nostre camere"
          title="Comfort e charme sardo"
          subtitle="Ogni camera è pensata per offrirvi il massimo relax dopo una giornata alla scoperta della Sardegna meridionale."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {camere.map((camera) => (
            <Link
              key={camera.slug}
              href={`/camere/${camera.slug}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={camera.immagine}
                  alt={camera.immagineAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">
                  {camera.mq} mq · fino a {camera.occupazione} ospiti
                </p>
                <h3 className="font-serif text-xl text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {camera.nome}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {camera.descrizioneBreve}
                </p>
                <span className="inline-block mt-4 text-sm font-semibold text-primary group-hover:underline">
                  Scopri di più →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button href="/camere" variant="outline">
            Tutte le camere
          </Button>
        </div>
      </div>
    </section>
  )
}
