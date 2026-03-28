import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/Button'

const listaKeys = ['colazione', 'cucina', 'vini', 'prenotazioni'] as const

export async function RistoranteSection() {
  const t = await getTranslations('home.ristorante')

  return (
    <section id="ristorante" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Immagine */}
          <div className="relative h-80 lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/ristorante.webp"
              alt={t('imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Testo */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">
              {t('label')}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t('paragrafo1')}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {t('paragrafo2')}
            </p>

            <ul className="space-y-3 mb-8">
              {listaKeys.map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 text-primary flex items-center justify-center text-xs">✓</span>
                  {t(`lista.${key}`)}
                </li>
              ))}
            </ul>

            <Button href="/ristorante">{t('cta')}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
