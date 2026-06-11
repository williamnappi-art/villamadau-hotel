import type { MetadataRoute } from 'next'
import { HOTEL } from '@/lib/hotel.config'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = HOTEL.url
  const now = new Date()

  const staticPaths = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/hotel', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/ristorante', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/servizi', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/da-non-perdere', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/settimana-al-mare', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/sant-efisio', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/domus-antigas', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/pasqua-a-pula', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/gutturu-mannu', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/galleria', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/contatti', changeFrequency: 'yearly' as const, priority: 0.7 },
  ]

  return staticPaths.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${base}${locale === routing.defaultLocale ? '' : `/${locale}`}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  )
}
