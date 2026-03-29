export const HOTEL = {
  name: 'Villa Madau Hotel',
  shortName: 'Villa Madau',
  tagline: 'Nel cuore del centro storico di Pula',
  description:
    'Hotel Boutique nel cuore del centro storico di Pula, in Sardegna. Camere con balcone, cucina tipica sarda autentica, WiFi e parcheggio gratuiti. A pochi passi dalle antiche rovine di Nora e dalle spiagge cristalline del Sulcis.',
  stars: 3,
  address: {
    street: 'Via Nora, 84',
    city: 'Pula',
    province: 'CA',
    postalCode: '09010',
    region: 'Sardegna',
    country: 'Italia',
    countryCode: 'IT',
    full: 'Via Nora, 84 – 09010 Pula (CA), Sardegna',
  },
  contact: {
    email: 'info@villamadau.it',
    phone: '+39 070 924 9033',
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
