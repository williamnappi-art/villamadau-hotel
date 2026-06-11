import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { SettimanaMareHero } from '@/components/sections/SettimanaMareHero'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { HOTEL } from '@/lib/hotel.config'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const url = locale === 'it' ? `${HOTEL.url}/settimana-al-mare` : `${HOTEL.url}/en/settimana-al-mare`
  return {
    title: t('metadata.settimanaMare.title'),
    description: t('metadata.settimanaMare.description'),
    alternates: {
      canonical: url,
      languages: { 'it': `${HOTEL.url}/settimana-al-mare`, 'en': `${HOTEL.url}/en/settimana-al-mare` },
    },
    openGraph: {
      title: t('metadata.settimanaMare.ogTitle'),
      description: t('metadata.settimanaMare.ogDescription'),
      url,
      siteName: HOTEL.name,
      type: 'website',
      locale: locale === 'it' ? 'it_IT' : 'en_US',
      images: [{ url: '/images/stabilimento-mare.jpg', width: 1200, height: 630, alt: t('metadata.settimanaMare.ogAlt') }],
    },
  }
}

// Contatti per richiedere l'offerta "Una settimana al mare"
const WHATSAPP_NUMBER = '393518508606'
const RICHIESTA = 'Ciao! Vorrei richiedere l’offerta “Una settimana al mare” al Villa Madau. Potete darmi disponibilità e dettagli?'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(RICHIESTA)}`
const PHONE_HREF = `tel:${HOTEL.contact.phone.replace(/\s/g, '')}`
const EMAIL_HREF = `mailto:${HOTEL.contact.email}?subject=${encodeURIComponent('Richiesta offerta “Una settimana al mare”')}&body=${encodeURIComponent(RICHIESTA)}`

// Cosa comprende l'offerta — lista editoriale alternata
const inclusi = [
  {
    numero: '01',
    eyebrow: 'Dormire',
    titolo: 'Camera matrimoniale\ncon colazione',
    testo:
      "Una camera matrimoniale nel cuore del centro storico di Pula, tra le vie silenziose del nostro Boutique Hotel. Ogni mattina la colazione vi aspetta — il modo più dolce per iniziare una giornata di mare.",
    image: '/images/camera-via-nora.webp',
    alt: 'Camera matrimoniale – Villa Madau Boutique Hotel Pula',
  },
  {
    numero: '02',
    eyebrow: 'Pranzo al mare',
    titolo: 'Lunch box termico\nsempre diverso',
    testo:
      "Niente rientri sotto il sole: il pranzo lo portate voi, in spiaggia. Un lunch box termico, ogni giorno diverso e scelto da voi, per gustare il sapore della Sardegna con i piedi nella sabbia e il mare davanti.",
    image: '/images/lettino-mare.jpg',
    alt: 'Lunch box da portare al mare – Su Guventeddu, Pula',
  },
  {
    numero: '03',
    eyebrow: 'Cena romantica',
    titolo: 'A cena da\nFederico’s',
    testo:
      "Quando il sole tramonta, la sera è vostra. Una cena romantica in terrazza o sulla piazza, sotto l’albero, al Federico’s Restaurant: la cucina del territorio in una delle cornici più suggestive di Pula.",
    image: '/images/ristorante.webp',
    alt: 'Cena romantica al Federico’s Restaurant – Pula',
  },
  {
    numero: '04',
    eyebrow: 'Frontemare',
    titolo: 'Lettino e ombrellone\na Su Guventeddu',
    testo:
      "Lettino e ombrellone in prima fila, frontemare, nella bellissima spiaggia di Su Guventeddu, al centro velico Way Sailing. Parcheggio comodissimo e doccia: il mare, senza il minimo pensiero.",
    image: '/images/stabilimento-mare.jpg',
    alt: 'Lettino e ombrellone frontemare a Su Guventeddu – Way Sailing',
  },
  {
    numero: '05',
    eyebrow: 'Completo relax',
    titolo: 'Solo relax,\nnessun pensiero',
    testo:
      "Parcheggio, lettino, ombrellone, pranzo già pronto: è tutto compreso, e questo vuol dire una cosa sola — non dovete pensare a niente. Solo rilassarvi, godervi il momento e lasciare che le giornate scorrano lente, tra il sole e il mare. E se vi va, allo stabilimento ci sono anche attività sul mare, windsurf e vela: un extra, del tutto facoltativo.",
    image: '/images/prato-mare-vela.jpg',
    alt: 'Relax frontemare allo stabilimento di Su Guventeddu, Pula',
  },
]

export default async function SettimanaMarePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: HOTEL.url },
    { name: 'Una settimana al mare', url: `${HOTEL.url}/settimana-al-mare` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <SettimanaMareHero />

      {/* ── INTRO ── */}
      <section className="bg-cream py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] mb-8" style={{ color: '#8a9e82' }}>
            Offerta per due persone &middot; 7 giorni
          </p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-10" style={{ color: '#1e1c18' }}>
            Sette giorni di mare,<br />sole e <em className="italic font-normal">dolce vita</em>
          </h2>
          <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#4a4640' }}>
            <p>
              Immaginate una settimana intera nel Sud della Sardegna, dove ogni giornata profuma
              di mare e finisce con una cena sotto le stelle. Una vacanza pensata per due,
              dal primo caffè del mattino all’ultimo brindisi della sera.
            </p>
            <p>
              Dormite nel cuore del centro storico di Pula, al <strong style={{ color: '#1e1c18' }}>Villa
              Madau Boutique Hotel</strong>, e vivete il mare in tutta comodità — con lettino,
              ombrellone e perfino il pranzo già pronto da portare in spiaggia.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOTO PANORAMICA ── */}
      <section className="bg-cream pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 7' }}>
            <Image
              src="/images/stabilimento-prato.jpg"
              alt="Lo stabilimento Way Sailing frontemare a Su Guventeddu, Pula"
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── COSA COMPRENDE — intestazione ── */}
      <section className="bg-cream pt-20 pb-4 px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] mb-4" style={{ color: '#c4b99a' }}>
          Tutto compreso
        </p>
        <h2 className="font-serif text-5xl md:text-7xl" style={{ color: '#1e1c18' }}>
          Cosa vi <em className="italic font-normal">aspetta</em>
        </h2>
      </section>

      {/* ── COSA COMPRENDE — lista editoriale ── */}
      <section className="bg-cream py-10 px-6">
        <div className="max-w-6xl mx-auto">
          {inclusi.map((item, i) => {
            const isEven = i % 2 === 0
            return (
              <div
                key={item.numero}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 border-t"
                style={{ borderColor: '#dcd3bf' }}
              >
                {/* Foto */}
                <div
                  className={`relative w-full overflow-hidden ${!isEven ? 'lg:order-2' : ''}`}
                  style={{ aspectRatio: '4 / 3' }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Testo */}
                <div className={!isEven ? 'lg:order-1' : ''}>
                  <span
                    className="font-serif text-8xl md:text-9xl leading-none select-none block mb-2"
                    style={{ color: '#dcd3bf' }}
                  >
                    {item.numero}
                  </span>
                  <p className="text-[11px] uppercase tracking-[0.3em] mb-3" style={{ color: '#8a9e82' }}>
                    {item.eyebrow}
                  </p>
                  <h3 className="font-serif text-3xl md:text-4xl mb-5 whitespace-pre-line" style={{ color: '#1e1c18' }}>
                    {item.titolo}
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#4a4640' }}>
                    {item.testo}
                  </p>
                </div>
              </div>
            )
          })}
          <div className="border-t" style={{ borderColor: '#dcd3bf' }} />
        </div>
      </section>

      {/* ── LA COMODITÀ DEL VILLA MADAU ── */}
      <section style={{ backgroundColor: '#8a9e82' }} className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full overflow-hidden order-2 lg:order-1" style={{ aspectRatio: '4 / 5' }}>
            <Image
              src="/images/giardino-mare.jpg"
              alt="Il giardino dello stabilimento frontemare a Su Guventeddu, Pula"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-[11px] uppercase tracking-[0.35em] mb-6 text-white/80">
              Il Sud Sardegna in comodità
            </p>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-snug text-white">
              Tutta la bellezza,<br />nessun pensiero
            </h2>
            <div className="space-y-4 leading-relaxed text-white/90">
              <p>
                Dal nostro hotel raggiungete facilmente le spiagge più belle del Sud Sardegna:
                <strong className="text-white"> Chia</strong> e <strong className="text-white">Tuerredda</strong> sono
                a soli 20 minuti d’auto, paradisi di sabbia bianca e acqua turchese.
              </p>
              <p>
                E quando tornate, vi aspetta il silenzio elegante del centro storico di Pula,
                i suoi vicoli, la piazza, il profumo della cena che arriva dal Federico’s.
              </p>
              <p>
                Una settimana alla scoperta del Sud Sardegna — ma in tutta comodità, con la
                cura di un Boutique Hotel che pensa a ogni dettaglio per voi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PREZZO + CTA ── */}
      <section style={{ backgroundColor: '#1e1c18' }} className="py-28 text-center px-6">
        <p className="text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: '#c4b99a' }}>
          7 giorni &middot; per due persone
        </p>
        <h2 className="font-serif text-5xl md:text-7xl text-white mb-4 leading-none">
          <em className="italic font-normal">2.300 €</em>
        </h2>
        <p className="text-sm uppercase tracking-[0.25em] mb-12" style={{ color: 'rgba(255,255,255,0.55)' }}>
          a coppia &middot; 1.150 € a persona
        </p>
        <p className="max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Camera con colazione, pranzo al mare, cena romantica, lettino e ombrellone frontemare,
          parcheggio e doccia. Tutto compreso, per una settimana indimenticabile.
          <br />
          <strong className="text-white">Contattateci e richiedete l&apos;offerta &ldquo;Una settimana al mare&rdquo;</strong> —
          vi risponderemo con disponibilit&agrave; e tutti i dettagli.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#25D366', color: '#fff' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
          {/* Telefono */}
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-white text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 transition-opacity hover:opacity-90"
            style={{ color: '#1e1c18' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Telefono
          </a>
          {/* Email */}
          <a
            href={EMAIL_HREF}
            className="inline-flex items-center gap-3 border border-white/40 text-white text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-white/10 transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Email
          </a>
        </div>
      </section>
    </>
  )
}
