import { HOTEL } from './hotel.config'
import { localeUrl } from './metadata'

export const HOTEL_SCHEMA_ID = `${HOTEL.url}/#hotel`

const HOTEL_TEXT = {
  it: {
    description: HOTEL.description,
    amenities: ['WiFi gratuito', 'Parcheggio gratuito', 'Aria condizionata', 'Ristorante', 'Noleggio auto'],
  },
  en: {
    description:
      "Boutique hotel in the heart of Pula's historic centre, in Sardinia. Rooms with balconies, authentic Sardinian cuisine, free WiFi and parking. A short walk from the ancient ruins of Nora and the crystal-clear beaches of the south coast.",
    amenities: ['Free WiFi', 'Free parking', 'Air conditioning', 'Restaurant', 'Car rental'],
  },
}

export function generateHotelSchema(locale: string = 'it') {
  const text = locale === 'en' ? HOTEL_TEXT.en : HOTEL_TEXT.it
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': HOTEL_SCHEMA_ID,
    name: HOTEL.name,
    description: text.description,
    url: locale === 'en' ? `${HOTEL.url}/en` : HOTEL.url,
    logo: `${HOTEL.url}/images/logo.png`,
    image: `${HOTEL.url}/images/hotel-primavera.webp`,
    starRating: {
      '@type': 'Rating',
      ratingValue: String(HOTEL.stars),
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: HOTEL.address.street,
      addressLocality: HOTEL.address.city,
      addressRegion: HOTEL.address.province,
      postalCode: HOTEL.address.postalCode,
      addressCountry: HOTEL.address.countryCode,
    },
    telephone: HOTEL.contact.phone,
    email: HOTEL.contact.email,
    vatID: `IT${HOTEL.vatNumber}`,
    hasMap: HOTEL.googleMapsUrl,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: HOTEL.coordinates.lat,
      longitude: HOTEL.coordinates.lng,
    },
    priceRange: '€€',
    checkinTime: HOTEL.checkinTime,
    checkoutTime: HOTEL.checkoutTime,
    amenityFeature: text.amenities.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    sameAs: [HOTEL.socialMedia.facebook, HOTEL.socialMedia.instagram],
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}


/** Nomi brevi delle pagine per le briciole di pane (BreadcrumbList), per lingua */
const BREADCRUMB_NAMES: Record<string, { it: string; en: string }> = {
  '/hotel': { it: "L'Hotel", en: 'The Hotel' },
  '/ristorante': { it: 'Ristorante', en: 'Restaurant' },
  '/servizi': { it: 'Servizi', en: 'Services' },
  '/contatti': { it: 'Contatti', en: 'Contact' },
  '/galleria': { it: 'Galleria', en: 'Gallery' },
  '/privacy': { it: 'Privacy Policy', en: 'Privacy Policy' },
  '/da-non-perdere': { it: 'Da non perdere', en: "Don't miss" },
  '/sant-efisio': { it: 'Sant’Efisio a Pula', en: 'Sant’Efisio in Pula' },
  '/pasqua-a-pula': { it: 'Pasqua a Pula', en: 'Easter in Pula' },
  '/domus-antigas': { it: 'Domus Antigas', en: 'Domus Antigas' },
  '/gutturu-mannu': { it: 'Parco di Gutturu Mannu', en: 'Gutturu Mannu Park' },
  '/capodanno-a-pula': { it: 'Capodanno 2027 a Pula', en: 'New Year 2027 in Pula' },
}

/** Briciole Home → pagina, con nomi e URL nella lingua della pagina */
export function pageBreadcrumb(locale: string, path: string, name?: string) {
  const names = BREADCRUMB_NAMES[path]
  const label = name ?? (names ? (locale === 'en' ? names.en : names.it) : path)
  return generateBreadcrumbSchema([
    { name: 'Home', url: localeUrl(locale, '') },
    { name: label, url: localeUrl(locale, path) },
  ])
}
