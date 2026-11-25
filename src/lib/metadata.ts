import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { HOTEL } from './hotel.config'

/** URL assoluto di una pagina in una lingua ('' = home) */
export function localeUrl(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  return `${HOTEL.url}${prefix}${path}` || HOTEL.url
}

type Options = {
  locale: string
  /** percorso senza lingua, es. '/hotel' ('' per la home) */
  path: string
  /** chiave in messages/{it,en}/metadata.json → metadata.<key>.title, description, ogTitle, ogDescription, ogAlt */
  key: string
  /** immagine per anteprime social; width/height solo se è davvero 1200×630 (file og-*.jpg) */
  image?: { url: string; width?: number; height?: number }
  noindex?: boolean
}

const DEFAULT_IMAGE = { url: '/images/hotel-primavera.webp' }

/**
 * Metadati di pagina, uguali per struttura in tutto il sito:
 * canonical + hreflang (it, en, x-default), Open Graph e Twitter nella lingua della pagina.
 * Se il titolo contiene già "Villa Madau" non viene aggiunto il suffisso del layout (niente marchio doppio).
 */
export async function buildMetadata({ locale, path, key, image = DEFAULT_IMAGE, noindex }: Options): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const values = {
    address: HOTEL.address.full,
    email: HOTEL.contact.email,
    hotelName: HOTEL.name,
    shortName: HOTEL.shortName,
  }
  const k = (field: string) => `metadata.${key}.${field}`
  const get = (field: string, fallback: string) => (t.has(k(field)) ? t(k(field), values) : fallback)

  const title = t(k('title'), values)
  const description = t(k('description'), values)
  const ogTitle = get('ogTitle', title)
  const ogDescription = get('ogDescription', description)
  const ogAlt = get('ogAlt', ogTitle)
  const url = localeUrl(locale, path)
  const images = [{ ...image, alt: ogAlt }]

  return {
    title: title.includes('Villa Madau') ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        it: localeUrl('it', path),
        en: localeUrl('en', path),
        'x-default': localeUrl(routing.defaultLocale, path),
      },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: HOTEL.name,
      type: 'website',
      locale: locale === 'it' ? 'it_IT' : 'en_US',
      alternateLocale: locale === 'it' ? ['en_US'] : ['it_IT'],
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [image.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
