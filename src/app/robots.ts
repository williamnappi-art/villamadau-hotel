import type { MetadataRoute } from 'next'
import { HOTEL } from '@/lib/hotel.config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${HOTEL.url}/sitemap.xml`,
  }
}
