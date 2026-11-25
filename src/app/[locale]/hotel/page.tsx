import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { HotelHero } from '@/components/sections/HotelHero'
import { pageBreadcrumb } from '@/lib/schema'
import { HOTEL } from '@/lib/hotel.config'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ locale, path: '/hotel', key: 'hotel', image: { url: '/images/hotel-primavera.webp' } })
}

export default async function HotelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('hotel')
  const br = () => <br />

  const breadcrumb = pageBreadcrumb(locale, '/hotel')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <HotelHero />

      {/* ── INTRO ── */}
      <section className="bg-cream py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a4640] mb-6">
            {t('intro.label')}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1e1c18] leading-tight mb-8">
            {t.rich('intro.title', { br })}
          </h2>
          <p className="text-[#4a4640] leading-relaxed text-lg max-w-2xl mx-auto">
            {t('intro.paragrafo')}
          </p>
        </div>
      </section>

      {/* ── SEZIONE 1: L'HOTEL ── */}
      <section className="bg-cream pb-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Foto */}
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/hotel-primavera.webp"
              alt={t('sezione1.imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Testo */}
          <div>
            <span className="font-serif text-7xl text-[#675c3c] leading-none select-none">{t('sezione1.numero')}</span>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a4640] mt-2 mb-6">
              {t('sezione1.label')}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-6 leading-snug">
              {t.rich('sezione1.title', { br })}
            </h2>
            <div className="space-y-4 text-[#4a4640] leading-relaxed">
              <p>{t('sezione1.paragrafo1')}</p>
              <p>{t('sezione1.paragrafo2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEZIONE 2: VITA DEL PAESE ── */}
      <section className="bg-[#1e1c18] py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Testo */}
          <div className="order-2 lg:order-1">
            <span className="font-serif text-7xl text-[#c4b99a] leading-none select-none">{t('sezione2.numero')}</span>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#c4b99a] mt-2 mb-6">
              {t('sezione2.label')}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-snug">
              {t.rich('sezione2.title', { br })}
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>{t('sezione2.paragrafo1')}</p>
              <p>{t('sezione2.paragrafo2')}</p>
            </div>
          </div>
          {/* Foto */}
          <div className="order-1 lg:order-2 relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/foto-pula-hotel.webp"
              alt={t('sezione2.imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ── SEZIONE 3: COLAZIONE IN PIAZZA ── */}
      <section className="bg-cream py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Foto */}
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/colazione.webp"
              alt={t('sezione3.imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover scale-110"
            />
          </div>
          {/* Testo */}
          <div>
            <span className="font-serif text-7xl text-[#675c3c] leading-none select-none">{t('sezione3.numero')}</span>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a4640] mt-2 mb-6">
              {t('sezione3.label')}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-6 leading-snug">
              {t.rich('sezione3.title', { br })}
            </h2>
            <div className="space-y-4 text-[#4a4640] leading-relaxed">
              <p>{t('sezione3.paragrafo1')}</p>
              <p>{t('sezione3.paragrafo2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEZIONE 4: LE DIECI SUITE ── */}
      <section className="bg-cream pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a4640] mb-4">
              {t('suite.label')}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1e1c18]">
              {t('suite.title')}
            </h2>
          </div>

          {/* Griglia camere */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Camera 1 */}
            <div>
              <div className="relative aspect-[3/2] w-full overflow-hidden mb-6">
                <Image
                  src="/images/camera-1.webp"
                  alt={t('suite.camera1.imageAlt')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl text-[#1e1c18] mb-3">
                {t('suite.camera1.title')}
              </h3>
              <p className="text-[#4a4640] leading-relaxed text-sm">
                {t('suite.camera1.paragrafo')}
              </p>
            </div>

            {/* Camera 2 */}
            <div className="lg:mt-24">
              <div className="relative aspect-[3/2] w-full overflow-hidden mb-6">
                <Image
                  src="/images/camera-3.webp"
                  alt={t('suite.camera2.imageAlt')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl text-[#1e1c18] mb-3">
                {t('suite.camera2.title')}
              </h3>
              <p className="text-[#4a4640] leading-relaxed text-sm">
                {t('suite.camera2.paragrafo')}
              </p>
            </div>

            {/* Camera 3 */}
            <div>
              <div className="relative aspect-[3/2] w-full overflow-hidden mb-6">
                <Image
                  src="/images/camera-via-nora.webp"
                  alt={t('suite.camera3.imageAlt')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl text-[#1e1c18] mb-3">
                {t('suite.camera3.title')}
              </h3>
              <p className="text-[#4a4640] leading-relaxed text-sm">
                {t('suite.camera3.paragrafo')}
              </p>
            </div>

            {/* Camera 4 */}
            <div className="lg:mt-24">
              <div className="relative aspect-[3/2] w-full overflow-hidden mb-6">
                <Image
                  src="/images/camera-hotel-pula.webp"
                  alt={t('suite.camera4.imageAlt')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl text-[#1e1c18] mb-3">
                {t('suite.camera4.title')}
              </h3>
              <p className="text-[#4a4640] leading-relaxed text-sm">
                {t('suite.camera4.paragrafo')}
              </p>
            </div>

          </div>

          <div className="text-center mt-16">
            <a
              href={HOTEL.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#1e1c18] text-[#c4b99a] text-xs font-medium tracking-[0.25em] uppercase px-12 py-5 hover:bg-[#c4b99a] hover:text-[#1e1c18] transition-colors duration-500"
            >
              {t('suite.ctaPrenota')}
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1e1c18] py-24 text-center px-6">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#c4b99a] mb-6">
          {t('ctaFinale.label')}
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
          {t.rich('ctaFinale.title', { br })}
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
          {t('ctaFinale.paragrafo')}
        </p>
        <Link
          href="/contatti"
          className="inline-block border border-white text-white text-xs font-medium tracking-[0.2em] uppercase px-10 py-4 hover:bg-white hover:text-[#1e1c18] transition-colors duration-300"
        >
          {t('ctaFinale.cta')}
        </Link>
      </section>
    </>
  )
}
