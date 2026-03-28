import type { MetadataRoute } from 'next'
import { camere } from '@/content/camere'
import { HOTEL } from '@/lib/hotel.config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = HOTEL.url
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/hotel`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/ristorante`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/servizi`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/da-non-perdere`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/sant-efisio`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/domus-antigas`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/pasqua-a-pula`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/gutturu-mannu`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/galleria`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contatti`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ]

  const cameraRoutes: MetadataRoute.Sitemap = camere.map((camera) => ({
    url: `${base}/camere/${camera.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...cameraRoutes]
}
