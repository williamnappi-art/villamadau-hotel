import { HeroSection } from '@/components/sections/HeroSection'
import { CardCarousel } from '@/components/sections/CardCarousel'
import { CamerePreview } from '@/components/sections/CamerePreview'
import { ServiziSection } from '@/components/sections/ServiziSection'
import { RistoranteSection } from '@/components/sections/RistoranteSection'
import { LocationSection } from '@/components/sections/LocationSection'
import { Button } from '@/components/ui/Button'
import { HOTEL } from '@/lib/hotel.config'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CardCarousel />
      <CamerePreview />
      <ServiziSection />
      <RistoranteSection />
      <LocationSection />

      {/* CTA finale */}
      <section className="py-20 bg-cream text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Prenota il tuo soggiorno
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
            Vivi la Sardegna da Villa Madau
          </h2>
          <p className="text-gray-600 mb-8">
            Contattaci per disponibilità e tariffe. Risponderemo entro 24 ore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contatti">Richiedi disponibilità</Button>
            <Button href={`mailto:${HOTEL.contact.email}`} variant="outline" external>
              {HOTEL.contact.email}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
