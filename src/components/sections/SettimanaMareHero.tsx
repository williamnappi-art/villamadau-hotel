import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { HeroMobileMenu } from './HeroMobileMenu'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { Stella } from '@/components/ui/Stella'

const BOOKING_URL = 'https://booking.slope.it/f0fc79cb-30b8-401d-a334-210174b387a8'

export async function SettimanaMareHero() {
  const t = await getTranslations('common')
  const tOfferta = await getTranslations('settimanaMare')

  const navLinks = [
    { href: '/hotel', label: t('nav.hotel') },
    { href: '/ristorante', label: t('nav.ristorante') },
    { href: '/servizi', label: t('nav.servizi') },
    { href: '/da-non-perdere', label: t('nav.daNonPerdere') },
    { href: '/contatti', label: t('nav.contatti') },
  ]

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

      {/* DESKTOP NAV — scura per leggibilità sul video chiaro */}
      <div className="absolute top-0 left-0 right-0 z-20 hidden md:flex flex-col items-center pt-7">
        <div className="w-[92%] flex items-end justify-between pb-0">
          <div className="flex-1" />
          <Link href="/" aria-label={t('hero.homeAriaLabel')}>
            <Image
              src="/images/logo.png"
              alt={t('hero.logoAlt')}
              width={280}
              height={198}
              priority
              className="h-56 w-auto object-contain drop-shadow-md block"
            />
          </Link>
          <div className="flex-1 flex items-end justify-end gap-4 mb-2">
            <LanguageSwitcher />
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white text-xs font-medium tracking-[0.2em] uppercase px-6 py-2.5 hover:bg-white hover:text-gray-900 transition-colors duration-200"
            >
              {t('cta.reservation')}
            </a>
          </div>
        </div>
        <div className="w-[92%] h-px bg-white/80" />
        <nav className="flex gap-10 py-4" aria-label={t('nav.ariaLabel')}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium text-white hover:text-white/60 transition-colors duration-200 tracking-[0.2em] uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* MOBILE NAV */}
      <div className="absolute top-0 left-0 right-0 z-20 md:hidden">
        <div className="flex items-center justify-between px-5 pt-6">
          <div className="w-10" />
          <div className="flex flex-col items-center gap-0">
            <Link href="/" aria-label={t('hero.homeAriaLabel')}>
              <Image
                src="/images/logo.png"
                alt={t('hero.logoAlt')}
                width={140}
                height={99}
                priority
                className="h-40 w-auto object-contain drop-shadow-md block"
              />
            </Link>
            <p className="text-white text-[10px] tracking-[0.25em] uppercase font-light -mt-6">
              {t('hero.mobileSubtitle')}
            </p>
          </div>
          <HeroMobileMenu bookingUrl={BOOKING_URL} />
        </div>
      </div>

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
