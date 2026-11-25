import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { HeroNav } from './HeroNav'

export async function RistoranteHero() {
  const tRistorante = await getTranslations('ristorante')

  return (
    <section className="relative h-screen min-h-[560px] overflow-hidden">
      <Image
        src="/images/ristorante.webp"
        alt={tRistorante('hero.imageAlt')}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <HeroNav variant="ristorante" />

      {/* Titolo centrato */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70 mb-4">
          {tRistorante('hero.subtitle')}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl">{tRistorante('hero.title')}</h1>
      </div>
    </section>
  )
}
