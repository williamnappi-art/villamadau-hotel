import { HOTEL } from './hotel.config'
import type { Camera } from '@/content/camere'

export function generateHotelSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: HOTEL.name,
    description: HOTEL.description,
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
    url: HOTEL.url,
    image: `${HOTEL.url}/images/hero.png`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: HOTEL.coordinates.lat,
      longitude: HOTEL.coordinates.lng,
    },
    priceRange: '€€',
    checkinTime: HOTEL.checkinTime,
    checkoutTime: HOTEL.checkoutTime,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'WiFi Gratuito', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parcheggio Gratuito', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Aria Condizionata', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Ristorante', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Noleggio Auto', value: true },
    ],
    sameAs: [HOTEL.socialMedia.facebook, HOTEL.socialMedia.instagram],
  }
}

export function generateRoomSchema(camera: Camera) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: camera.nome,
    description: camera.descrizione,
    image: `${HOTEL.url}${camera.immagine}`,
    occupancy: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: camera.occupazione,
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: camera.mq,
      unitCode: 'MTK',
    },
    amenityFeature: camera.dotazioni.map((d) => ({
      '@type': 'LocationFeatureSpecification',
      name: d,
      value: true,
    })),
    containedInPlace: {
      '@type': 'Hotel',
      name: HOTEL.name,
      url: HOTEL.url,
    },
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

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: HOTEL.name,
    image: `${HOTEL.url}/images/hero.png`,
    url: HOTEL.url,
    telephone: HOTEL.contact.phone,
    email: HOTEL.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: HOTEL.address.street,
      addressLocality: HOTEL.address.city,
      addressRegion: HOTEL.address.province,
      postalCode: HOTEL.address.postalCode,
      addressCountry: HOTEL.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: HOTEL.coordinates.lat,
      longitude: HOTEL.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
  }
}
