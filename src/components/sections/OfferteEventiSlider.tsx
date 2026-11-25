import { getTranslations } from 'next-intl/server'
import { offerteData, OFFERTE_EVENTI_ID, type OffertaData } from '@/content/offerte'
import CardOpenSlider, { type CardSlide } from './CardOpenSlider/CardOpenSlider'

// Sezione "Offerte & eventi" della homepage, a tutto schermo.
// Nessun contenuto nuovo: usa gli stessi dati (src/content/offerte.ts), le stesse foto
// e gli stessi testi IT/EN (messages/*/home.json → home.offerte) della sezione precedente.
// La vecchia versione è in OfferteSection.tsx (non importata).

type Translator = (key: string) => string

/** Trasforma un elemento esistente nel formato CardSlide del componente */
export function toCardSlide(d: OffertaData, t: Translator): CardSlide {
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
    // link interni senza lingua: il Link di next-intl nel componente aggiunge /en quando serve
    href: d.href,
    ctaLabel: `${t(`items.${d.id}.cta`)} →`,
  }
}

export async function OfferteEventiSlider() {
  const t = await getTranslations('home.offerte')
  const items = offerteData.map((d) => toCardSlide(d, t))
  const labels = {
    carousel: t('a11y.carosello'),
    show: t('a11y.mostra', { title: '{title}' }),
    previous: t('a11y.precedente'),
    next: t('a11y.successivo'),
    more: t('a11y.scopri'),
  }

  return <CardOpenSlider id={OFFERTE_EVENTI_ID} heading={t('label')} items={items} labels={labels} />
}
