// Offerte & eventi della homepage — unica fonte dei dati (id, link, foto di copertina).
// I testi IT/EN stanno in messages/{it,en}/home.json → home.offerte.items.<id>
// Usato da: OfferteEventiSlider (sezione attuale) e OfferteSection (vecchia versione, non importata).

/** id/anchor della sezione Offerte & eventi in homepage (usato anche dall'aggancio dello scroll) */
export const OFFERTE_EVENTI_ID = 'offerte-eventi'

export type Tipo = 'offerta' | 'evento' | 'stagione'

export interface OffertaData {
  id: string
  tipo: Tipo
  bigItalic?: boolean
  href: string
  external?: boolean
  /** Foto di copertina */
  image: string
}

export const offerteData: OffertaData[] = [
  {
    id: 'settimanaMare',
    tipo: 'offerta',
    bigItalic: true,
    href: '/settimana-al-mare',
    image: '/images/mare-vista-aerea.webp',
  },
  // Sant'Efisio — nascosto (nov 2026), riattivare per maggio 2027
  // {
  //   id: 'santEfisio',
  //   tipo: 'evento',
  //   bigItalic: true,
  //   href: '/sant-efisio',
  //   image: '/images/piazza-chiesa-pula.webp',
  // },
  // Autunno — scaduto, riattivare per l'autunno 2027 aggiornando l'etichetta in home.json
  // {
  //   id: 'autunno',
  //   tipo: 'offerta',
  //   href: 'https://booking.slope.it/f0fc79cb-30b8-401d-a334-210174b387a8',
  //   external: true,
  //   image: '/images/ristorante.webp',
  // },
  {
    id: 'primavera',
    tipo: 'stagione',
    href: '/hotel',
    image: '/images/hotel-primavera.webp',
  },
  // Pasqua — riattivare a gennaio 2027
  // {
  //   id: 'pasqua',
  //   tipo: 'stagione',
  //   bigItalic: true,
  //   href: '/pasqua-a-pula',
  //   image: '/images/villa-madau-primavera.webp',
  // },
  // Domus Antigas — riattivare per l'edizione 2027
  // {
  //   id: 'domusAntigas',
  //   tipo: 'evento',
  //   bigItalic: true,
  //   href: '/domus-antigas',
  //   image: '/images/piazza-chiesa-pula.webp',
  // },
]
