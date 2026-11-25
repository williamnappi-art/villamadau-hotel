import { getTranslations } from 'next-intl/server'
import { HeroNav } from './HeroNav'
import { HeroVideo } from '@/components/ui/HeroVideo'
import { HeroParallax } from '@/components/ui/HeroParallax'

export async function HeroSection() {
  const t = await getTranslations('common')

  return (
    <section
      id="home"
      className="relative h-screen min-h-[560px] overflow-hidden"
      aria-label={t('hero.ariaLabelBenvenuti')}
    >
      {/* Video di sfondo — temporaneamente quello di Sant'Efisio.
          Per ripristinare il video originale: poster="/images/hero.webp" e source "/images/hotel_pula.mp4" */}
      <HeroParallax>
        <HeroVideo src="/images/sant-efisio.mp4" poster="/images/camera-1.webp" />
      </HeroParallax>

      {/* Overlay scuro */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <HeroNav />

      {/* Titolo principale della home: visivamente lo "dice" il logo, ma Google e gli screen reader hanno bisogno di un H1 */}
      <h1 className="sr-only">{t('hero.titoloHome')}</h1>
    </section>
  )
}
