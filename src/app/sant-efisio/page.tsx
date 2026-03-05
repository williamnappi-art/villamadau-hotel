import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SantEfisioHero } from '@/components/sections/SantEfisioHero'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { HOTEL } from '@/lib/hotel.config'

export const metadata: Metadata = {
  title: "Sant\u2019Efisio a Pula \u2013 Vivi la processione da Villa Madau",
  description:
    "La processione di Sant\u2019Efisio parte da Cagliari il 1 Maggio e arriva a Pula il 2 Maggio, esattamente sotto il Boutique Hotel Villa Madau nel centro storico, davanti alla chiesa di San Giovanni.",
  alternates: { canonical: `${HOTEL.url}/sant-efisio` },
  openGraph: {
    title: "Sant\u2019Efisio a Pula | Villa Madau Boutique Hotel",
    description: "La processione pi\u00f9 importante della Sardegna passa davanti al tuo hotel. Prenota una delle sei camere con vista.",
    images: [{ url: '/images/camera-1.png', width: 1200, height: 630, alt: "Villa Madau \u2013 camera con vista sulla processione di Sant\u2019Efisio" }],
  },
}

const rooms = [
  {
    numero: '01',
    nome: 'La Stanza del Vescovo',
    sottotitolo: 'Vista Chiesa \u2013 Unica e privilegiata',
    descrizione: "La camera del vescovo, la numero uno dell\u2019Hotel Villa Madau di Pula \u00e8 la camera con la vista migliore di tutto il percorso del Santo. Nel cuore della processione, sul balcone privato.",
    image: '/images/camera-1.png',
    alt: 'La Stanza del Vescovo \u2013 Villa Madau Pula',
  },
  {
    numero: '02',
    nome: 'La Stanza del Priore',
    sottotitolo: 'Una finestra sulla Processione',
    descrizione: "La finestra sulla chiesa di San Giovanni nel cuore di Pula, unica nel suo genere. Dall\u2019hotel Villa Madau la Processione ha un punto di vista unico.",
    image: '/images/camera-3.jpg',
    alt: 'La Stanza del Priore \u2013 Villa Madau Pula',
  },
  {
    numero: '03',
    nome: 'Dolce Dormire',
    sottotitolo: 'Spaziosa e dal design Mediterraneo',
    descrizione: "Se cerchi una camera spaziosa, romantica, nel cuore della processione, eccola qui.",
    image: '/images/camera-hotel-pula.png',
    alt: 'Dolce Dormire \u2013 Villa Madau Pula',
  },
  {
    numero: '04',
    nome: 'Movida',
    sottotitolo: "La stanza e l\u2019olivastro",
    descrizione: "La stanza avvolta dall\u2019olivastro del centro storico accoglie l\u2019arrivo della processione. Dal suo balcone si pu\u00f2 godere dello spettacolo unico de sa Ramadura \u2014 il lancio dei petali sul Santo.",
    image: '/images/camera-1.png',
    alt: 'Movida \u2013 Villa Madau Pula',
  },
  {
    numero: '05',
    nome: 'Le Torri',
    sottotitolo: 'Il Balcone sulla Processione',
    descrizione: "Affacciata sulla via Nora, su cui si sviluppa tutto l\u2019hotel Villa Madau e via principale di Pula, ha una vista unica sulla Processione di Sant\u2019Efisio.",
    image: '/images/camera-3.jpg',
    alt: 'Le Torri \u2013 Villa Madau Pula',
  },
  {
    numero: '06',
    nome: 'La Piazzetta',
    sottotitolo: 'La camera sulla Piazza',
    descrizione: "Esattamente sulla facciata principale dell\u2019Hotel Villa Madau, due balconi completamente affacciati sulla piazza adiacente alla chiesa di San Giovanni per godersi uno spettacolo unico.",
    image: '/images/camera-via-nora.png',
    alt: 'La Piazzetta \u2013 Villa Madau Pula',
  },
]

const BOOKING_URL = 'https://booking.slope.it/f0fc79cb-30b8-401d-a334-210174b387a8'

export default function SantEfisioPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: HOTEL.url },
    { name: "Sant\u2019Efisio a Pula", url: `${HOTEL.url}/sant-efisio` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <SantEfisioHero />

      {/* ── INTRO PROCESSIONE ── */}
      <section style={{ backgroundColor: '#F9ECE8' }} className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] mb-8" style={{ color: '#939685' }}>
            1 \u2013 4 Maggio &middot; Pula, Sardegna
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-10" style={{ color: '#1e1c18' }}>
            La processione pi&ugrave; grande<br />della Sardegna
          </h1>
          <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#4a4640' }}>
            <p>
              La processione per Sant&apos;Efisio martire &egrave; una delle pi&ugrave; importanti
              e partecipate feste della Sardegna.
            </p>
            <p>
              Dal primo al quattro Maggio si assiste ad una delle processioni che riunisce tutta la Sardegna
              e le sue tradizioni come in pochissime altre occasioni.
            </p>
            <p>
              Parte da Cagliari il primo Maggio e arriva il 2 Maggio a Pula, esattamente sotto il nostro
              Boutique Hotel nel centro storico, davanti alla chiesa di San Giovanni, per continuare con una
              processione mozzafiato sulla spiaggia di Nora, in una cornice spettacolare tra mare e laguna.
            </p>
          </div>
          <a
            href="https://www.festadisantefisio.it"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 text-xs uppercase tracking-[0.25em] border-b pb-px transition-opacity hover:opacity-60"
            style={{ color: '#D0634C', borderColor: '#D0634C' }}
          >
            Per approfondire &rarr;
          </a>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ backgroundColor: '#F4C2AE' }} className="h-px" />

      {/* ── PERCHÉ VILLA MADAU ── */}
      <section style={{ backgroundColor: '#D3DCD7' }} className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
            <Image
              src="/images/sant-efisio-hotel.png"
              alt="Sant\u2019Efisio \u2013 Villa Madau Hotel Pula"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: '#939685' }}>
              Il posto giusto
            </p>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-snug" style={{ color: '#1e1c18' }}>
              Dentro la Festa
            </h2>
            <div className="space-y-4 leading-relaxed" style={{ color: '#4a4640' }}>
              <p>
                Villa Madau si trova nel cuore del centro storico di Pula, esattamente sul percorso
                della processione &mdash; davanti alla chiesa di San Giovanni.
              </p>
              <p>
                Sei delle nostre camere si affacciano direttamente sul tragitto. Puoi svegliarti
                con il suono delle launeddas, scendere in strada quando vuoi, rientrare quando
                hai bisogno di riposo.
              </p>
              <p>
                La colazione &egrave; servita in giardino o in piazzetta, mentre il paese si prepara
                alla festa. Non sarai un turista che guarda &mdash; sarai parte di Pula per quattro giorni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LE SEI CAMERE — intestazione ── */}
      <section style={{ backgroundColor: '#F9ECE8' }} className="pt-28 pb-0 px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] mb-4" style={{ color: '#939685' }}>
          Vista sulla processione
        </p>
        <h2 className="font-serif text-5xl md:text-7xl" style={{ color: '#1e1c18' }}>
          Le sei camere
        </h2>
        <p className="mt-5 leading-relaxed" style={{ color: '#939685' }}>
          Ognuna affacciata sul percorso del Santo. Ognuna con la sua storia.
        </p>
      </section>

      {/* ── CAMERE — lista editoriale ── */}
      <section style={{ backgroundColor: '#F9ECE8' }} className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {rooms.map((room, i) => {
            const isEven = i % 2 === 0
            return (
              <div
                key={room.nome}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 border-t"
                style={{ borderColor: '#F4C2AE' }}
              >
                {/* Foto */}
                <div
                  className={`relative w-full overflow-hidden ${!isEven ? 'lg:order-2' : ''}`}
                  style={{ aspectRatio: '4 / 3' }}
                >
                  <Image
                    src={room.image}
                    alt={room.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Testo */}
                <div className={!isEven ? 'lg:order-1' : ''}>
                  <span
                    className="font-serif text-8xl md:text-9xl leading-none select-none block mb-2"
                    style={{ color: '#F4C2AE' }}
                  >
                    {room.numero}
                  </span>
                  <p className="text-[11px] uppercase tracking-[0.3em] mb-3" style={{ color: '#D0634C' }}>
                    {room.sottotitolo}
                  </p>
                  <h3 className="font-serif text-3xl md:text-4xl mb-5" style={{ color: '#1e1c18' }}>
                    {room.nome}
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#4a4640' }}>
                    {room.descrizione}
                  </p>
                </div>
              </div>
            )
          })}
          <div className="border-t" style={{ borderColor: '#F4C2AE' }} />
        </div>
      </section>

      {/* ── INFO PRATICHE ── */}
      <section style={{ backgroundColor: '#F9ECE8' }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] mb-4" style={{ color: '#D0634C' }}>
              Quando
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#4a4640' }}>
              Dal <strong style={{ color: '#1e1c18' }}>1 al 4 maggio</strong> ogni anno.
              La processione arriva a Pula il 2 maggio in andata verso Nora
              e rientra verso Cagliari il 4 maggio.
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] mb-4" style={{ color: '#D0634C' }}>
              Dove siamo
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#4a4640' }}>
              Villa Madau Boutique Hotel<br />
              Centro storico di Pula (CA)<br />
              Davanti alla chiesa di San Giovanni
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] mb-4" style={{ color: '#D0634C' }}>
              Disponibilit&agrave;
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#4a4640' }}>
              I posti per Sant&apos;Efisio si esauriscono con mesi di anticipo.
              Prenotare prima possibile &egrave; fondamentale per assicurarsi
              una delle sei camere con vista.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: '#D0634C' }} className="py-28 text-center px-6">
        <p className="text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: '#F4C2AE' }}>
          Posti limitati
        </p>
        <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
          Prenota la tua camera<br />con vista su Sant&apos;Efisio
        </h2>
        <p className="max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Sei camere, una processione, quattro giorni indimenticabili.
          Scriveteci subito: vi risponderemo entro 24 ore con disponibilit&agrave; e tariffe.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-xs font-medium tracking-[0.2em] uppercase px-10 py-4 transition-opacity hover:opacity-90"
            style={{ color: '#D0634C' }}
          >
            Prenota ora
          </a>
          <Link
            href="/contatti"
            className="inline-block border border-white/50 text-white text-xs font-medium tracking-[0.2em] uppercase px-10 py-4 hover:bg-white/10 transition-colors duration-200"
          >
            Chiedi disponibilit&agrave;
          </Link>
        </div>
      </section>
    </>
  )
}
