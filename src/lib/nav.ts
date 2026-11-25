// Voci del menu principale: unica definizione per header, hero, menu mobile e footer.
// `key` = chiave di traduzione in messages/*/common.json → nav.<key>
export const NAV_LINKS = [
  { href: '/hotel', key: 'hotel' },
  { href: '/ristorante', key: 'ristorante' },
  { href: '/servizi', key: 'servizi' },
  { href: '/da-non-perdere', key: 'daNonPerdere' },
  { href: '/contatti', key: 'contatti' },
] as const

export type NavLink = (typeof NAV_LINKS)[number]
