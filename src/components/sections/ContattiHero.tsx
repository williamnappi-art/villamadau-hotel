import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { HeroNav } from './HeroNav'

export async function ContattiHero() {
  const tContatti = await getTranslations('contatti')

  return (
    <section className="relative h-screen min-h-[560px] overflow-hidden">
      <Image
        src="/images/hotel-esterno.webp"
        alt={tContatti('hero.imageAlt')}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <HeroNav />

      {/* Titolo centrato */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70 mb-4">
          {tContatti('hero.subtitle')}
        </p>
        <h1 className="font-serif text-5xl md:text-7xl">{tContatti('hero.title')}</h1>
      </div>
    </section>
  )
}
