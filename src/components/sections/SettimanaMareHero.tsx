import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { HeroNav } from './HeroNav'
import { Stella } from '@/components/ui/Stella'

export async function SettimanaMareHero() {
  const tOfferta = await getTranslations('settimanaMare')

  return (
    <section className="relative h-screen min-h-[560px] overflow-hidden">
      {/* Foto dell'offerta: vista aerea del mare (ottimizzata e precaricata, desktop e mobile) */}
      <Image
        src="/images/mare-vista-aerea.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={70}
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/40" />

      <HeroNav />

      {/* Titolo centrato */}
      <div className="absolute inset-0 flex flex-col items-center justify-end text-white text-center px-4 pb-16 md:pb-20">
        <p className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] mb-5 drop-shadow" style={{ color: '#e6dcc4' }}>
          <Stella className="w-3 h-3" />
          {tOfferta('hero.badge')}
          <Stella className="w-3 h-3" />
        </p>
        <h1 className="font-serif text-5xl md:text-7xl leading-tight drop-shadow-lg">
          {tOfferta('hero.title1')}<br /><em className="italic font-normal">{tOfferta('hero.title2')}</em>
          <span className="block italic font-normal text-2xl md:text-3xl mt-3 text-white/90">
            {tOfferta('hero.title3')}
          </span>
        </h1>
        <a
          href="#prenota"
          className="mt-8 text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-white/80 border-b border-white/40 pb-1 hover:text-white transition-colors"
        >
          {tOfferta('hero.deadline')}
        </a>
      </div>
    </section>
  )
}
