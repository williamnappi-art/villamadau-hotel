import { getTranslations } from 'next-intl/server'
import { HeroNav } from './HeroNav'
import { HeroVideo } from '@/components/ui/HeroVideo'
import { HeroParallax } from '@/components/ui/HeroParallax'

export async function SantEfisioHero() {
  const tEventi = await getTranslations('eventi')

  return (
    <section className="relative h-screen min-h-[560px] overflow-hidden">
      <HeroParallax>
        <HeroVideo src="/images/sant-efisio.mp4" poster="/images/camera-1.webp" />
      </HeroParallax>
      <div className="absolute inset-0 bg-black/45" />

      <HeroNav />

      {/* Titolo centrato */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70 mb-4">
          {tEventi('santEfisio.hero.subtitle')}
        </p>
        <h1 className="font-serif text-5xl md:text-7xl leading-tight">
          {tEventi('santEfisio.hero.title1')}<br /><em className="italic font-normal">{tEventi('santEfisio.hero.title2')}</em>
        </h1>
      </div>
    </section>
  )
}
