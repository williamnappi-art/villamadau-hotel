export type Camera = {
  slug: string
  nome: string
  sottotitolo: string
  descrizione: string
  descrizioneBreve: string
  mq: number
  occupazione: number
  dotazioni: string[]
  immagine: string
  immagineAlt: string
}

export const camere: Camera[] = [
  {
    slug: 'standard',
    nome: 'Camera Standard',
    sottotitolo: 'Comfort nel centro storico',
    descrizione:
      'La Camera Standard di Villa Madau è il punto di partenza perfetto per scoprire Pula e la Sardegna meridionale. Accogliente e funzionale, offre tutto il necessario per un soggiorno confortevole. Il balcone privato invita a godersi la tranquillità del centro storico, mentre l\'arredo curato richiama le tradizioni dell\'isola.',
    descrizioneBreve: 'Accogliente con balcone privato, aria condizionata e tutti i comfort essenziali.',
    mq: 20,
    occupazione: 2,
    dotazioni: [
      'Letto matrimoniale o twin (su richiesta)',
      'Bagno privato con doccia',
      'Aria condizionata',
      'Balcone privato',
      'TV LED',
      'WiFi gratuito',
      'Cassaforte',
      'Asciugacapelli',
      'Set cortesia',
    ],
    immagine: '/images/hotel-1.jpg',
    immagineAlt: 'Camera Standard Villa Madau Hotel Pula',
  },
  {
    slug: 'superior',
    nome: 'Camera Superior',
    sottotitolo: 'Vista panoramica sul centro storico',
    descrizione:
      'La Camera Superior offre uno spazio più generoso rispetto alla Standard, impreziosito da una vista panoramica sul suggestivo centro storico di Pula. L\'ampio balcone è il posto ideale per gustare un caffè al mattino ammirando i tetti e i vicoli del borgo antico. Arredata con cura nei dettagli, è perfetta per chi desidera un soggiorno speciale.',
    descrizioneBreve: 'Spaziosa con balcone panoramico e vista sul centro storico di Pula.',
    mq: 25,
    occupazione: 3,
    dotazioni: [
      'Letto matrimoniale o twin (su richiesta)',
      'Bagno privato con doccia',
      'Aria condizionata',
      'Balcone panoramico',
      'Vista centro storico',
      'TV LED 40"',
      'WiFi gratuito',
      'Cassaforte',
      'Frigorifero',
      'Asciugacapelli',
      'Set cortesia',
    ],
    immagine: '/images/hotel-2.jpg',
    immagineAlt: 'Camera Superior Villa Madau Hotel Pula - vista centro storico',
  },
  {
    slug: 'suite',
    nome: 'Suite',
    sottotitolo: 'Il massimo del comfort con terrazza privata',
    descrizione:
      'La nostra Suite è la soluzione più esclusiva: ampia, luminosa, con terrazza privata da cui ammirare i tetti del centro storico di Pula e il verde della campagna sarda. L\'area salotto separata la rende ideale per coppie in cerca di romanticismo o famiglie. Ogni dettaglio è pensato per regalarvi un\'esperienza indimenticabile in Sardegna.',
    descrizioneBreve: 'Spaziosa con terrazza privata, area salotto e vista panoramica. La scelta esclusiva.',
    mq: 35,
    occupazione: 3,
    dotazioni: [
      'Letto king size',
      'Bagno privato con vasca e doccia',
      'Aria condizionata',
      'Terrazza privata',
      'Vista panoramica',
      'Area salotto',
      'TV LED 50"',
      'WiFi gratuito',
      'Cassaforte',
      'Minibar',
      'Asciugacapelli',
      'Set cortesia premium',
      'Accappatoio e pantofole',
    ],
    immagine: '/images/mare-sardegna.jpg',
    immagineAlt: 'Suite Villa Madau Hotel Pula - terrazza privata',
  },
]

export function getCameraBySlug(slug: string): Camera | undefined {
  return camere.find((c) => c.slug === slug)
}
