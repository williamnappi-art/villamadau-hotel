import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { HeroNav } from './HeroNav'
import { Stella } from '@/components/ui/Stella'

export async function CapodannoHero() {
  const tOfferta = await getTranslations('capodanno')

  return (
    <section className="relative h-screen min-h-[560px] overflow-hidden">
      {/* Il mare d'inverno vicino a Pula, con la torre sul promontorio (su mobile inquadrata a sinistra per non tagliarla) */}
      <Image
        src="/images/villa-madau-pula-hotel.webp"
        alt={tOfferta('hero.imageAlt')}
        fill
        priority
        sizes="100vw"
        quality={70}
        className="object-cover object-[30%_50%] md:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

      <HeroNav />

      {/* Titolo */}
      <div className="absolute inset-0 flex flex-col items-center justify-end text-white text-center px-4 pb-16 md:pb-20">
        <h1 className="font-serif leading-tight drop-shadow-lg">
          <span className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 max-w-[88vw] mx-auto font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] md:tracking-[0.3em] mb-5" style={{ color: '#e6dcc4' }}>
            <Stella className="w-3 h-3" />
            {tOfferta('hero.kicker')}
            <Stella className="w-3 h-3" />
          </span>
          <span className="block text-5xl md:text-7xl">{tOfferta('hero.title1')}</span>
          <em className="block italic font-normal text-5xl md:text-7xl">{tOfferta('hero.title2')}</em>
        </h1>
        <p className="mt-6 font-serif italic text-xl md:text-2xl text-white/90 max-w-xl">
          {tOfferta('hero.sub')}
        </p>
        <a
          href="#prenota"
          className="mt-8 text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-white/80 border-b border-white/40 pb-1 hover:text-white transition-colors"
        >
          {tOfferta('prezzo.cta')}
        </a>
      </div>
    </section>
  )
}
