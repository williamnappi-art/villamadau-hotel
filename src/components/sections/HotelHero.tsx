import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { HeroNav } from './HeroNav'

export async function HotelHero() {
  const tHotel = await getTranslations('hotel')

  return (
    <section className="relative h-screen min-h-[560px] overflow-hidden">
      <Image
        src="/images/hotel-primavera.webp"
        alt={tHotel('hero.imageAlt')}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40" />

      <HeroNav />

      {/* Titolo centrato */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70 mb-4">
          {tHotel('hero.subtitle')}
        </p>
        <h1 className="font-serif text-5xl md:text-7xl">{tHotel('hero.title')}</h1>
      </div>
    </section>
  )
}
