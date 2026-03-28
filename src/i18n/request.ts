import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as 'it' | 'en')) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: {
      common: (await import(`../../messages/${locale}/common.json`)).default,
      metadata: (await import(`../../messages/${locale}/metadata.json`)).default,
      home: (await import(`../../messages/${locale}/home.json`)).default,
      hotel: (await import(`../../messages/${locale}/hotel.json`)).default,
      ristorante: (await import(`../../messages/${locale}/ristorante.json`)).default,
      servizi: (await import(`../../messages/${locale}/servizi.json`)).default,
      camere: (await import(`../../messages/${locale}/camere.json`)).default,
      contatti: (await import(`../../messages/${locale}/contatti.json`)).default,
      eventi: (await import(`../../messages/${locale}/eventi.json`)).default,
      galleria: (await import(`../../messages/${locale}/galleria.json`)).default,
      privacy: (await import(`../../messages/${locale}/privacy.json`)).default,
    },
  }
})
