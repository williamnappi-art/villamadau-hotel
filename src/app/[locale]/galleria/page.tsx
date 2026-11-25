import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { GalleriaClient, type Categoria } from './GalleriaClient'
import { pageBreadcrumb } from '@/lib/schema'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ locale, path: '/galleria', key: 'galleria', image: { url: '/images/hotel-primavera.webp' } })
}

// Foto della galleria: testi alternativi in messages/*/galleria.json → immagini.<id>
// (niente doppioni: in public/images alcune foto esistono con più nomi)
const foto: { id: string; src: string; categoria: Categoria }[] = [
  { id: 'facciata', src: '/images/hotel-primavera.webp', categoria: 'hotel' },
  { id: 'vescovo', src: '/images/camera-1.webp', categoria: 'hotel' },
  { id: 'viaNora', src: '/images/camera-via-nora.webp', categoria: 'hotel' },
  { id: 'camera', src: '/images/camera-hotel-pula.webp', categoria: 'hotel' },
  { id: 'colazione', src: '/images/colazione.webp', categoria: 'hotel' },
  { id: 'ristorante', src: '/images/ristorante.webp', categoria: 'ristorante' },
  { id: 'nora', src: '/images/nora-villa-madau.webp', categoria: 'dintorni' },
  { id: 'chia', src: '/images/chia-villamadau.webp', categoria: 'dintorni' },
  { id: 'mare', src: '/images/mare-vista-aerea.webp', categoria: 'dintorni' },
  { id: 'cervo', src: '/images/gutturu-mannu-cervo.webp', categoria: 'dintorni' },
]

export default async function GalleriaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('galleria')
  const breadcrumb = pageBreadcrumb(locale, '/galleria')

  const immagini = foto.map((f) => ({ src: f.src, alt: t(`immagini.${f.id}`), categoria: f.categoria }))
  const labels = {
    filtri: {
      tutte: t('filtri.tutte'),
      hotel: t('filtri.hotel'),
      ristorante: t('filtri.ristorante'),
      dintorni: t('filtri.dintorni'),
    },
    apriFoto: t('lightbox.apriFoto', { alt: '{alt}' }),
    chiudi: t('lightbox.chiudi'),
    precedente: t('lightbox.precedente'),
    successiva: t('lightbox.successiva'),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <div className="bg-gray-900 py-16 px-4 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-300 mb-3">
          {t('hero.label')}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl">{t('hero.title')}</h1>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">{t('hero.subtitle')}</p>
      </div>

      <GalleriaClient immagini={immagini} labels={labels} />
    </>
  )
}
