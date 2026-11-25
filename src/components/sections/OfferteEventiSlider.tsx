import { getLocale, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { offerteData, type OffertaData } from '@/content/offerte'
import CardOpenSlider, { type CardSlide } from './CardOpenSlider/CardOpenSlider'

// Sezione "Offerte & eventi" della homepage, a tutto schermo.
// Nessun contenuto nuovo: usa gli stessi dati (src/content/offerte.ts), le stesse foto
// e gli stessi testi IT/EN (messages/*/home.json → home.offerte) della sezione precedente.
// La vecchia versione è in OfferteSection.tsx (non importata).

export const OFFERTE_EVENTI_ID = 'offerte-eventi'

type Translator = (key: string) => string

/** Link nella lingua corrente: i link interni su /en diventano /en/... (come faceva il Link di next-intl) */
function localizedHref(href: string, external: boolean | undefined, locale: string) {
  if (external || /^https?:\/\//.test(href) || locale === routing.defaultLocale) return href
  return `/${locale}${href === '/' ? '' : href}`
}

/** Trasforma un elemento esistente nel formato CardSlide del componente */
export function toCardSlide(d: OffertaData, t: Translator, locale: string): CardSlide {
  const title = `${t(`items.${d.id}.titolo`)} ${t(`items.${d.id}.italic`)}`
  const label = t(`items.${d.id}.label`)
  return {
    id: d.id,
    kicker: `${t('sardegna')} · ${t('tuttoLanno')}`,
    title,
    subtitle: label,
    text: t(`items.${d.id}.testo`),
    cardKicker: label,
    image: d.image,
    alt: title,
    href: localizedHref(d.href, d.external, locale),
    ctaLabel: `${t(`items.${d.id}.cta`)} →`,
  }
}

export async function OfferteEventiSlider() {
  const locale = await getLocale()
  const t = await getTranslations('home.offerte')
  const items = offerteData.map((d) => toCardSlide(d, t, locale))

  return <CardOpenSlider id={OFFERTE_EVENTI_ID} heading={t('label')} items={items} />
}
