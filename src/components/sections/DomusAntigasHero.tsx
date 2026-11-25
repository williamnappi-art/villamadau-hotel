import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { HeroNav } from './HeroNav'
import { HeroParallax } from '@/components/ui/HeroParallax'

export async function DomusAntigasHero() {
  const tEventi = await getTranslations('eventi')

  return (
    <section className="relative h-screen min-h-[560px] overflow-hidden">
      <HeroParallax>
        <Image
          src="/images/piazzetta.webp"
          alt={tEventi('domusAntigas.hero.imageAlt')}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </HeroParallax>
      <div className="absolute inset-0 bg-black/45" />

      <HeroNav />

      {/* Titolo centrato */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70 mb-4">
          {tEventi('domusAntigas.hero.subtitle')}
        </p>
        <h1 className="font-serif leading-tight">
          <span className="block text-4xl md:text-5xl font-normal">{tEventi('domusAntigas.hero.title1')}</span>
          <em className="block italic font-normal text-6xl md:text-8xl">{tEventi('domusAntigas.hero.title2')}</em>
        </h1>
      </div>
    </section>
  )
}
