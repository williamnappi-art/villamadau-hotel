// Unica fonte per dati e contatti dell'hotel: NON riscrivere numeri, link o indirizzi nei componenti.
export const HOTEL = {
  name: 'Villa Madau Hotel',
  shortName: 'Villa Madau',
  tagline: 'Nel cuore del centro storico di Pula',
  description:
    'Hotel Boutique nel cuore del centro storico di Pula, in Sardegna. Camere con balcone, cucina tipica sarda autentica, WiFi e parcheggio gratuiti. A pochi passi dalle antiche rovine di Nora e dalle spiagge cristalline del Sulcis.',
  stars: 3,
  vatNumber: '03858130929',
  address: {
    street: 'Via Nora, 84',
    city: 'Pula',
    province: 'CA',
    postalCode: '09050', // CAP di Pula dal 2018 (prima 09010): deve coincidere con Google Business Profile e Slope
    region: 'Sardegna',
    country: 'Italia',
    countryCode: 'IT',
    full: 'Via Nora, 84 – 09050 Pula (CA), Sardegna',
  },
  contact: {
    email: 'info@villamadau.it',
    /** Telefono fisso: solo chiamate */
    phone: '+39 070 924 9033',
    /** WhatsApp: solo messaggi */
    whatsapp: '+39 351 850 8606',
  },
  /** Prenotazione camere (booking engine Slope): tutti i pulsanti "Prenota" */
  bookingUrl: 'https://booking.slope.it/f0fc79cb-30b8-401d-a334-210174b387a8',
  restaurant: {
    name: "Federico's",
    /** Prenotazione tavolo (CarbonaraApp) */
    bookingUrl: 'https://reservation.carbonaraapp.com/Italia/Pula/Federicos/',
    menuUrl: 'https://www.leggimenu.it/menu/federicos/210635',
  },
  // Coordinate GPS di Pula (CA) – verificare su Google Maps
  coordinates: {
    lat: 39.0114414,
    lng: 9.0021019,
  },
  checkinTime: '14:00',
  checkoutTime: '11:00',
  url: 'https://www.villamadau.it',
  socialMedia: {
    facebook: 'https://www.facebook.com/villamadau',
    instagram: 'https://www.instagram.com/villamadau',
  },
  nearbyAttractions: [
    { name: 'Sito Archeologico di Nora', distance: '2 km' },
    { name: 'Spiagge di Santa Margherita di Pula', distance: '5 km' },
    { name: 'Spiaggia di Chia', distance: '25 km' },
    { name: 'Aeroporto di Cagliari Elmas', distance: '40 km' },
    { name: 'Cagliari centro', distance: '40 km' },
  ],
  googleMapsUrl: 'https://maps.app.goo.gl/8p2bfkkvLgeQGnbf9',
} as const

/** Link tel: per il numero fisso */
export const PHONE_HREF = `tel:${HOTEL.contact.phone.replace(/\s/g, '')}`

/** Link WhatsApp (wa.me) con messaggio precompilato opzionale */
export function whatsappUrl(text?: string) {
  const number = HOTEL.contact.whatsapp.replace(/[^\d]/g, '')
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}
