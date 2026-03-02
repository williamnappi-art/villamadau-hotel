import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HotelHero } from '@/components/sections/HotelHero'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { HOTEL } from '@/lib/hotel.config'

export const metadata: Metadata = {
  title: "L'Hotel",
  description:
    'Villa Madau è un piccolo boutique hotel nascosto tra le vie del centro storico di Pula, in Sardegna. Dieci suite, giardino interno, terrazza, colazione in piazza: la vita autentica del paese.',
  alternates: { canonical: `${HOTEL.url}/hotel` },
  openGraph: {
    title: "L'Hotel | Villa Madau – Pula, Sardegna",
    description: 'Boutique hotel nel centro storico di Pula. Dieci suite, giardino, terrazza e colazione in piazza.',
    images: [{ url: '/images/hotel-primavera.png', width: 1200, height: 630, alt: 'Villa Madau Hotel Pula primavera' }],
  },
}

export default function HotelPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: HOTEL.url },
    { name: "L'Hotel", url: `${HOTEL.url}/hotel` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <HotelHero />

      {/* ── INTRO ── */}
      <section className="bg-cream py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a4640] mb-6">
            Pula · Centro storico · Sardegna
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1e1c18] leading-tight mb-8">
            Una vera sorpresa,<br />tutta da scoprire
          </h1>
          <p className="text-[#4a4640] leading-relaxed text-lg max-w-2xl mx-auto">
            Villa Madau non si annuncia. Bisogna cercarlo, girare l&apos;angolo giusto, spingere il
            cancello tra i vicoli del centro storico di Pula. È lì che il paese si ferma,
            il tempo rallenta, e un piccolo mondo tutto da scoprire si apre davanti a voi.
          </p>
        </div>
      </section>

      {/* ── SEZIONE 1: L'HOTEL ── */}
      <section className="bg-cream pb-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Foto */}
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/hotel-primavera.png"
              alt="Villa Madau Hotel - facciata primavera"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Testo */}
          <div>
            <span className="font-serif text-7xl text-[#c4b99a] leading-none select-none">01</span>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a4640] mt-2 mb-6">
              La struttura
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-6 leading-snug">
              Il Boutique Hotel<br />tra le vie del centro
            </h2>
            <div className="space-y-4 text-[#4a4640] leading-relaxed">
              <p>
                Il Boutique Hotel Villa Madau si trova nel cuore del centro storico di Pula,
                tra le acque cristalline del mare della Sardegna del Sud e la montagna incontaminata
                costellata di percorsi naturalistici del parco di Gutturu Mannu.
              </p>
              <p>
                A pochi minuti dalla spiaggia di Nora e la sua città romana; dalle spiagge
                uniche al mondo di Chia e Tuerredda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEZIONE 2: VITA DEL PAESE ── */}
      <section className="bg-[#1e1c18] py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Testo */}
          <div className="order-2 lg:order-1">
            <span className="font-serif text-7xl text-[#c4b99a] leading-none select-none">02</span>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#c4b99a] mt-2 mb-6">
              La vita del paese
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-snug">
              I ritmi del<br />centro storico
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                L&apos;aria di festa paesana che porta l&apos;estate, quel senso di serenità
                che non si può descrivere — si può solo respirare.
              </p>
              <p>
                I profumi del pane, l&apos;aria fresca del mattino, il paese che si sveglia piano.
                Vivere i ritmi di Pula, al centro del Mediterraneo, significa ritrovare qualcosa
                di autentico. All&apos;ombra della chiesa di San Giovanni Battista si partecipa
                alle manifestazioni religiose, ci si ferma, ci si guarda intorno.
                Non sarete turisti — sarete abitanti di Pula.
              </p>
            </div>
          </div>
          {/* Foto */}
          <div className="order-1 lg:order-2 relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/foto-pula-hotel.jpg"
              alt="Villa Madau Hotel – Pula"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ── SEZIONE 3: COLAZIONE IN PIAZZA ── */}
      <section className="bg-cream py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Foto */}
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/colazione.png"
              alt="Colazione Villa Madau - prodotti locali sardi"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover scale-110"
            />
          </div>
          {/* Testo */}
          <div>
            <span className="font-serif text-7xl text-[#c4b99a] leading-none select-none">03</span>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a4640] mt-2 mb-6">
              La colazione
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-6 leading-snug">
              Nel giardino,<br />in piazza, a modo vostro
            </h2>
            <div className="space-y-4 text-[#4a4640] leading-relaxed">
              <p>
                La colazione a Villa Madau si fa dove si preferisce: nel giardino interno,
                tra le piante e il fresco del mattino, oppure fuori, nella piazzetta,
                all&apos;ombra della grande pianta al centro — mentre il paese si sveglia
                intorno a voi.
              </p>
              <p>
                È una colazione à la carte, con prodotti sardi scelti ogni giorno:
                formaggi freschi, salumi locali, dolci artigianali, marmellate di stagione
                e frutta fresca. Non è un buffet — è una tavola apparecchiata per voi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEZIONE 4: LE DIECI SUITE ── */}
      <section className="bg-cream pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a4640] mb-4">
              35 mq · tutte diverse
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1e1c18]">
              Le dieci suite
            </h2>
          </div>

          {/* Griglia camere */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Camera 1 */}
            <div>
              <div className="relative aspect-[3/2] w-full overflow-hidden mb-6">
                <Image
                  src="/images/camera-1.png"
                  alt="Suite Villa Madau – camera 1"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#c4b99a] mb-2">
                Suite · 35 mq
              </p>
              <h3 className="font-serif text-2xl text-[#1e1c18] mb-3">
                Cura nei dettagli
              </h3>
              <p className="text-[#4a4640] leading-relaxed text-sm">
                Ogni suite è un racconto a sé. Tessuti di lino locale, letti in ferro battuto o
                legno massello, terracotta sui pavimenti, ceramiche artigianali nel bagno. Il
                comfort è totale — aria condizionata, WiFi, ogni comodità — ma non si vede.
                È così che deve essere.
              </p>
            </div>

            {/* Camera 2 */}
            <div className="lg:mt-24">
              <div className="relative aspect-[3/2] w-full overflow-hidden mb-6">
                <Image
                  src="/images/camera-3.jpg"
                  alt="Suite Villa Madau – camera 3"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#c4b99a] mb-2">
                Suite · 35 mq
              </p>
              <h3 className="font-serif text-2xl text-[#1e1c18] mb-3">
                Tutte diverse, mai uguali
              </h3>
              <p className="text-[#4a4640] leading-relaxed text-sm">
                Nessuna delle dieci suite assomiglia all&apos;altra. C&apos;è quella con la vista
                sul giardino, quella con il soffitto a travi antiche, quella con il balcone che
                guarda i tetti di Pula. Ognuna ha la sua personalità, la sua luce, il suo modo
                di raccontare la Sardegna.
              </p>
            </div>

            {/* Camera 3 */}
            <div>
              <div className="relative aspect-[3/2] w-full overflow-hidden mb-6">
                <Image
                  src="/images/camera-via-nora.png"
                  alt="Suite Villa Madau – camera via Nora"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#c4b99a] mb-2">
                Suite · 35 mq
              </p>
              <h3 className="font-serif text-2xl text-[#1e1c18] mb-3">
                Il silenzio del centro storico
              </h3>
              <p className="text-[#4a4640] leading-relaxed text-sm">
                Le finestre si affacciano sui vicoli silenziosi del centro antico. La mattina entra
                piano, filtrata dalle persiane. Il letto è grande, le lenzuola sono di cotone pesante.
                Dormire a Villa Madau è un piacere che si ricorda.
              </p>
            </div>

            {/* Camera 4 */}
            <div className="lg:mt-24">
              <div className="relative aspect-[3/2] w-full overflow-hidden mb-6">
                <Image
                  src="/images/hotel-2.jpg"
                  alt="Suite Villa Madau – dettagli"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#c4b99a] mb-2">
                Suite · 35 mq
              </p>
              <h3 className="font-serif text-2xl text-[#1e1c18] mb-3">
                Ogni comfort, naturalmente
              </h3>
              <p className="text-[#4a4640] leading-relaxed text-sm">
                Aria condizionata silenziosa, bagno privato in pietra locale, WiFi, minibar,
                cassaforte, asciugamani di spugna densa. Il lusso di Villa Madau è fatto di
                qualità, non di ostentazione. Quello che serve, nel modo giusto.
              </p>
            </div>

          </div>

          <div className="text-center mt-16">
            <Link
              href="/camere"
              className="inline-block border border-[#1e1c18] text-[#1e1c18] text-xs font-medium tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#1e1c18] hover:text-white transition-colors duration-300"
            >
              Scopri tutte le suite
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1e1c18] py-24 text-center px-6">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#c4b99a] mb-6">
          Pula, Sardegna meridionale
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
          Venite a scoprire<br />Villa Madau
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
          Scriveteci per disponibilità e tariffe. Vi risponderemo entro 24 ore con tutto
          quello che vi serve per organizzare il vostro soggiorno.
        </p>
        <Link
          href="/contatti"
          className="inline-block border border-white text-white text-xs font-medium tracking-[0.2em] uppercase px-10 py-4 hover:bg-white hover:text-[#1e1c18] transition-colors duration-300"
        >
          Contattaci
        </Link>
      </section>
    </>
  )
}
