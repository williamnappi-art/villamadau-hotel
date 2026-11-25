import { getTranslations } from 'next-intl/server'
import { HeroNav } from './HeroNav'
import { HeroVideo } from '@/components/ui/HeroVideo'
import { HeroParallax } from '@/components/ui/HeroParallax'

export async function DaNonPerdereHero() {
  const tEventi = await getTranslations('eventi')

  return (
    <section className="relative h-screen min-h-[560px] overflow-hidden">
      <HeroParallax>
        <HeroVideo src="/images/sant-efisio.mp4" poster="/images/sant-efisio-piazza.jpg" posterPosition="22% 15%" />
      </HeroParallax>
      <div className="absolute inset-0 bg-black/45" />

      <HeroNav />

      {/* Titolo centrato */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70 mb-5">
          {tEventi('daNonPerdere.hero.subtitle')}
        </p>
        <h1 className="font-serif leading-none">
          <em className="block italic font-normal text-6xl md:text-9xl">{tEventi('daNonPerdere.hero.title')}</em>
        </h1>
      </div>
    </section>
  )
}
