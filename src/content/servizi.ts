export type Servizio = {
  titolo: string
  descrizione: string
  icona: string
}

export const servizi: Servizio[] = [
  {
    titolo: 'WiFi Gratuito',
    descrizione:
      'Connessione internet ad alta velocità in tutte le aree dell\'hotel, dalla camera alle aree comuni. Sempre inclusa nel soggiorno.',
    icona: 'wifi',
  },
  {
    titolo: 'Parcheggio Gratuito',
    descrizione:
      'Parcheggio privato riservato agli ospiti dell\'hotel. Potete lasciare l\'auto in sicurezza per tutta la durata del soggiorno.',
    icona: 'parking',
  },
  {
    titolo: 'Aria Condizionata',
    descrizione:
      'Tutte le camere sono dotate di sistema di climatizzazione autonomo per garantire il massimo comfort in ogni stagione.',
    icona: 'snowflake',
  },
  {
    titolo: 'Noleggio Auto',
    descrizione:
      'Servizio di noleggio auto disponibile per esplorare le meraviglie della Sardegna meridionale: spiagge, nuraghi e borghi tipici.',
    icona: 'car',
  },
  {
    titolo: 'Colazione Sarda',
    descrizione:
      'Ogni mattina vi aspetta una colazione con prodotti locali e tipici sardi: formaggi, salumi, dolci tradizionali e pane carasau.',
    icona: 'coffee',
  },
  {
    titolo: 'Assistenza Turistica',
    descrizione:
      'Il nostro staff è a disposizione per consigliarvi escursioni, itinerari e i migliori ristoranti del territorio sulcitano.',
    icona: 'map',
  },
]
