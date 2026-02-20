import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HOTEL } from '@/lib/hotel.config'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Parco di Gutturu Mannu',
  description:
    'Scopri il Parco Naturale Regionale di Gutturu Mannu a Pula: la più grande foresta a sclerofille del Mediterraneo, home del cervo sardo, percorsi, cascate e natura incontaminata.',
  alternates: { canonical: `${HOTEL.url}/gutturu-mannu` },
}

const percorsi = [
  {
    codice: 'D 212A',
    nome: 'Is Cannoneris – Su Paganu',
    lunghezza: '6,9 km',
    durata: '2 ore',
    difficolta: 'E',
    descrizione: 'Sentiero adatto a tutti, nel cuore della foresta di Is Cannoneris. Zona privilegiata per avvistare il cervo sardo.',
  },
  {
    codice: 'D 215',
    nome: 'Pantaleo – Sorgente Is Arrus',
    lunghezza: '5,2 km',
    durata: '2 ore 30',
    difficolta: 'E',
    descrizione: 'Dal centro visita di Pantaleo verso la sorgente naturale, tra lecci secolari e macchia mediterranea.',
  },
  {
    codice: 'D 204',
    nome: 'Sa Canna – Perdu Melis',
    lunghezza: '12 km',
    durata: '4 ore 15',
    difficolta: 'E',
    descrizione: 'Percorso panoramico con vista sulle gole del Rio Gutturu Mannu. Possibilità di raggiungere le pozze naturali.',
  },
  {
    codice: 'D 200',
    nome: 'Pixinamanna – Foresta di Pantaleo',
    lunghezza: '16,3 km',
    durata: '5 ore',
    difficolta: 'EE',
    descrizione: 'Il percorso principale del parco. Segue in parte un'antica ferrovia carbonaria attraverso gole, fiumi e boschi di lecci.',
  },
]

const attivita = [
  {
    icona: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
    titolo: 'Trekking',
    testo: 'Oltre 100 km di sentieri classificati CAI, per tutti i livelli.',
  },
  {
    icona: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    titolo: 'Avvistamento cervi',
    testo: 'Circa 2.500 cervi sardi liberi nel parco. Settembre è il mese del bramito.',
  },
  {
    icona: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636" />
      </svg>
    ),
    titolo: 'Birdwatching',
    testo: 'Astore sardo, aquila reale, falco pellegrino e oltre 100 specie di uccelli.',
  },
  {
    icona: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    titolo: 'Cascate e pozze',
    testo: 'Il Rio Gutturu Mannu crea piscine naturali e cascate raggiungibili a piedi.',
  },
  {
    icona: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.522 4.82 3.889 6.204L6 21l4.5-2.25a9.7 9.7 0 001.5.115c4.97 0 9-3.186 9-7.115C21 7.185 16.97 3 12 3z" />
      </svg>
    ),
    titolo: 'Mountain bike',
    testo: 'Percorsi ciclabili dedicati tra boschi e macchia mediterranea.',
  },
  {
    icona: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    titolo: 'Ecomuseo digitale',
    testo: '55 siti archeologici mappati: nuraghi, tombe dei giganti, villaggi antichi.',
  },
]

export default function GutturuMannuPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: HOTEL.url },
    { name: 'Gutturu Mannu', url: `${HOTEL.url}/gutturu-mannu` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* ── HERO ── */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <Image
          src="/images/gutturu-mannu-cervo.jpg"
          alt="Cervo sardo nel Parco di Gutturu Mannu"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4 text-center text-white">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70 mb-3">
            Comune di Pula · Sardegna
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4 drop-shadow-md">
            Parco di Gutturu Mannu
          </h1>
          <p className="max-w-xl text-white/80 text-base md:text-lg leading-relaxed">
            La più grande foresta a sclerofille del Mediterraneo,<br className="hidden md:block" />
            rifugio del cervo sardo e oasi di natura incontaminata.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { valore: '19.750', unità: 'ettari', etichetta: 'Area protetta' },
            { valore: '~2.500', unità: 'esemplari', etichetta: 'Cervi sardi nel parco' },
            { valore: '1.116', unità: 'metri', etichetta: 'Vetta Monte Is Caravius' },
            { valore: '100+', unità: 'km', etichetta: 'Sentieri classificati' },
          ].map((s) => (
            <div key={s.etichetta}>
              <p className="font-serif text-3xl md:text-4xl">{s.valore}</p>
              <p className="text-xs text-primary-200 uppercase tracking-wider mt-0.5">{s.unità}</p>
              <p className="text-sm text-white/70 mt-1">{s.etichetta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTRODUZIONE ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">
            Il polmone verde del Sud Sardegna
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-8 text-center">
            Una foresta millenaria alle porte di Pula
          </h2>
          <div className="space-y-5 text-gray-600 leading-relaxed text-[15px]">
            <p>
              Il <strong className="text-gray-800">Parco Naturale Regionale di Gutturu Mannu</strong> — il cui nome in sardo campidanese significa <em>"grande gola"</em> — è istituito dalla Regione Sardegna nel 2014 e comprende i territori di dieci comuni, con Pula che ne è oggi il Comune capofila e il cui sindaco presiede la Comunità del Parco.
            </p>
            <p>
              La foresta si estende per oltre <strong className="text-gray-800">35.000 ettari</strong> di copertura boschiva continua, dominata dal leccio, dalla sughera e dall&apos;olivastro selvatico, ed è considerata la più grande foresta a sclerofille dell&apos;intero bacino del Mediterraneo. Oltre 600 specie vegetali, 50 delle quali endemiche, convivono in questo straordinario ecosistema.
            </p>
            <p>
              Cuore pulsante del parco è il <strong className="text-gray-800">cervo sardo</strong> (<em>Cervus elaphus corsicanus</em>), sottospecie endemica di Sardegna e Corsica ridottasi a meno di 100 esemplari nel XX secolo e oggi rinata: il parco ospita la <strong className="text-gray-800">più grande colonia mondiale</strong> di cervo sardo, con circa 2.500 esemplari liberi nel territorio.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOTO PAESAGGIO ── */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src="/images/gutturu-mannu-paesaggio.jpg"
          alt="Paesaggio del Parco di Gutturu Mannu"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-serif text-white text-2xl md:text-3xl italic text-center px-4 drop-shadow">
            &ldquo;La natura che non si aspetta di essere scoperta.&rdquo;
          </p>
        </div>
      </section>

      {/* ── ATTIVITÀ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">
            Cosa fare
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-12 text-center">
            Attività nel parco
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attivita.map((a) => (
              <div key={a.titolo} className="flex gap-4 p-6 rounded-xl bg-cream hover:shadow-sm transition-shadow">
                <div className="shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                  {a.icona}
                </div>
                <div>
                  <h3 className="font-serif text-lg text-gray-900 mb-1">{a.titolo}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{a.testo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERCORSI ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">
            Escursionismo
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 text-center">
            I percorsi principali
          </h2>
          <p className="text-center text-sm text-gray-500 mb-12">
            <span className="inline-flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">E</span> Escursionistico
            </span>
            <span className="mx-3 text-gray-300">·</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-xs font-medium">EE</span> Escursionista Esperto
            </span>
          </p>
          <div className="space-y-4">
            {percorsi.map((p) => (
              <div key={p.codice} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs text-gray-400 font-mono">{p.codice}</span>
                    <h3 className="font-serif text-lg text-gray-900 mt-0.5">{p.nome}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{p.lunghezza}</span>
                    <span className="text-gray-200">·</span>
                    <span>{p.durata}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        p.difficolta === 'EE'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {p.difficolta}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{p.descrizione}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            Mappe e tracce GPX scaricabili su{' '}
            <a href="https://www.sardegnasentieri.it/carte/gutturu-mannu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              sardegnasentieri.it
            </a>
          </p>
        </div>
      </section>

      {/* ── COME ARRIVARE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">
            Come raggiungerci
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-12 text-center">
            Dal nostro hotel al parco
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6 text-[15px] text-gray-600 leading-relaxed">
              <div>
                <h3 className="font-serif text-lg text-gray-900 mb-2">Porta di Pula · Pixinamanna</h3>
                <p>
                  L&apos;accesso più vicino a Villa Madau, inaugurato nel 2024. Da Pula si percorre la SS195 verso nord, si prende l&apos;uscita per Polaris/Is Molas e si seguono le indicazioni per <strong>Pixinamanna</strong>, sede del Centro di Cultura Ambientale e punto di partenza dei principali sentieri.
                </p>
                <p className="mt-2 text-sm text-primary font-medium">~ 15–20 minuti in auto dall&apos;hotel</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-gray-900 mb-2">Sede principale · Pantaleo</h3>
                <p>
                  La sede storica del parco è a Pantaleo (Santadi), raggiungibile in circa 40 minuti. Qui si trovano aree picnic, centro visitatori e il punto di partenza del percorso D 200.
                </p>
              </div>
              <p className="text-sm text-gray-400">
                Il personale di Villa Madau è a disposizione per fornire indicazioni dettagliate e suggerire guide ambientali certificate.
              </p>
            </div>

            {/* Mappa OpenStreetMap */}
            <div className="rounded-xl overflow-hidden shadow-md aspect-[4/3]">
              <iframe
                title="Mappa Parco di Gutturu Mannu"
                src="https://www.openstreetmap.org/export/embed.html?bbox=8.65%2C39.38%2C8.87%2C39.55&layer=mapnik&marker=39.46%2C8.76"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-cream text-center px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          Scopri il parco da Villa Madau
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
          A pochi minuti dall&apos;hotel, un mondo tutto da esplorare
        </h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">
          Partiamo insieme: il nostro staff ti aiuta a organizzare la visita, scegliere il percorso giusto e prenotare guide locali.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/contatti">Contattaci</Button>
          <Button href="https://www.parcogutturumannu.it" variant="outline" external>
            Sito ufficiale del Parco
          </Button>
        </div>
      </section>
    </>
  )
}
