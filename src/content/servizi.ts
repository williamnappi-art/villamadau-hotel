// Titoli e descrizioni sono in messages/{it,en}/servizi.json → serviziGrid.items.<icona>
export type Servizio = {
  icona: 'wifi' | 'parking' | 'snowflake' | 'car' | 'coffee' | 'map'
}

export const servizi: Servizio[] = [
  { icona: 'wifi' },
  { icona: 'parking' },
  { icona: 'snowflake' },
  { icona: 'car' },
  { icona: 'coffee' },
  { icona: 'map' },
]
