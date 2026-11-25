import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { HeroNav } from './HeroNav'
import { HeroParallax } from '@/components/ui/HeroParallax'

export async function ServiziHero() {
  const tServizi = await getTranslations('servizi')

  return (
    <section className="relative h-screen min-h-[560px] overflow-hidden">
      <HeroParallax>
        <Image
          src="/images/villa-madau-pula-hotel.webp"
          alt={tServizi('hero.imageAlt')}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </HeroParallax>
      <div className="absolute inset-0 bg-black/40" />

      <HeroNav />

      {/* Titolo centrato */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70 mb-4">
          {tServizi('hero.subtitle')}
        </p>
        <h1 className="font-serif leading-tight">
          <span className="block text-4xl md:text-5xl font-normal">{tServizi('hero.title1')}</span>
          <em className="block italic font-normal text-6xl md:text-8xl">{tServizi('hero.title2')}</em>
        </h1>
      </div>
    </section>
  )
}
