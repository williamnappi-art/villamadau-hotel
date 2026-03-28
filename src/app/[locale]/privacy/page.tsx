import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { HOTEL } from '@/lib/hotel.config'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    `Informativa sulla privacy e cookie policy di ${HOTEL.name}. Scopri come trattiamo i tuoi dati personali ai sensi del GDPR (Regolamento UE 2016/679).`,
  alternates: { canonical: `${HOTEL.url}/privacy` },
  openGraph: {
    title: `Privacy Policy | ${HOTEL.shortName} – Pula, Sardegna`,
    description: `Informativa sulla privacy e cookie policy di ${HOTEL.name}. Trattamento dati ai sensi del GDPR.`,
  },
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: HOTEL.url },
    { name: 'Privacy Policy', url: `${HOTEL.url}/privacy` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* ── Hero ── */}
      <section className="bg-[#1e1c18] pt-36 pb-20 px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#c4b99a] mb-6">
          Regolamento UE 2016/679
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
          Privacy <em className="italic font-normal">Policy</em>
        </h1>
        <p className="text-white/50 text-sm mt-6 max-w-xl mx-auto leading-relaxed">
          Informativa sul trattamento dei dati personali ai sensi degli artt. 13 e 14
          del Regolamento (UE) 2016/679 (GDPR)
        </p>
        <p className="text-white/30 text-xs mt-4">
          Ultimo aggiornamento: marzo 2026
        </p>
      </section>

      {/* ── Titolare del trattamento ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4b99a] mb-4">
            Art. 13, comma 1, lett. a)
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-8">
            Titolare del trattamento
          </h2>
          <div className="text-[#4a4640] text-sm leading-relaxed space-y-3">
            <p>
              Il Titolare del trattamento dei dati personali raccolti tramite il sito{' '}
              <strong className="text-[#1e1c18]">{HOTEL.url}</strong> è:
            </p>
            <div className="border-l-2 border-[#c4b99a]/40 pl-6 py-2 space-y-1">
              <p className="text-[#1e1c18] font-medium">{HOTEL.name}</p>
              <p>{HOTEL.address.full}</p>
              <p>
                Email:{' '}
                <a href={`mailto:${HOTEL.contact.email}`} className="text-[#1e1c18] hover:text-[#c4b99a] transition-colors">
                  {HOTEL.contact.email}
                </a>
              </p>
              <p>
                Telefono:{' '}
                <a href="tel:+390709249033" className="text-[#1e1c18] hover:text-[#c4b99a] transition-colors">
                  {HOTEL.contact.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dati raccolti ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4b99a] mb-4">
            Art. 13, comma 1, lett. c)
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-8">
            Dati raccolti
          </h2>
          <div className="text-[#4a4640] text-sm leading-relaxed space-y-6">
            <div>
              <h3 className="font-serif text-xl text-[#1e1c18] mb-3">Dati forniti volontariamente</h3>
              <p>
                Quando compili il modulo di contatto o ci invii un&apos;email, raccogliamo i dati che
                ci fornisci direttamente: nome, indirizzo email, numero di telefono e il contenuto
                del messaggio. Questi dati sono trattati esclusivamente per rispondere alla tua richiesta
                e, previo tuo consenso, per inviarti comunicazioni relative ai servizi dell&apos;hotel.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#1e1c18] mb-3">Dati di navigazione</h3>
              <p>
                I sistemi informatici e le procedure software preposte al funzionamento del sito
                acquisiscono, nel corso del loro normale esercizio, alcuni dati personali la cui
                trasmissione è implicita nell&apos;uso dei protocolli di comunicazione Internet
                (es. indirizzi IP, tipo di browser, sistema operativo, pagine visitate, orari di accesso).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Google Analytics ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4b99a] mb-4">
            Cookie analitici
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-8">
            Google Analytics
          </h2>
          <div className="text-[#4a4640] text-sm leading-relaxed space-y-4">
            <p>
              Questo sito utilizza <strong className="text-[#1e1c18]">Google Analytics 4 (GA4)</strong>,
              un servizio di analisi web fornito da Google LLC. GA4 utilizza cookie per raccogliere
              informazioni anonime e aggregate sull&apos;utilizzo del sito, tra cui: numero di visitatori,
              provenienza, pagine visualizzate, durata delle sessioni e interazioni con i contenuti.
            </p>
            <p>
              I dati sono trattati da Google in forma aggregata e anonimizzata. L&apos;indirizzo IP
              dell&apos;utente non viene memorizzato per intero. Per maggiori informazioni consulta la{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e1c18] underline underline-offset-2 hover:text-[#c4b99a] transition-colors"
              >
                privacy policy di Google
              </a>.
            </p>
            <p>
              Puoi disattivare Google Analytics installando il{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e1c18] underline underline-offset-2 hover:text-[#c4b99a] transition-colors"
              >
                componente aggiuntivo del browser per la disattivazione
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Google Ads ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4b99a] mb-4">
            Cookie pubblicitari
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-8">
            Google Ads
          </h2>
          <div className="text-[#4a4640] text-sm leading-relaxed space-y-4">
            <p>
              Questo sito utilizza i servizi di <strong className="text-[#1e1c18]">Google Ads</strong> e
              il relativo sistema di monitoraggio delle conversioni. Quando un utente interagisce con un
              annuncio Google, viene installato un cookie di conversione sul suo dispositivo. Questo cookie
              non serve per l&apos;identificazione personale e viene utilizzato esclusivamente per
              misurare l&apos;efficacia delle campagne pubblicitarie.
            </p>
            <p>
              I dati raccolti tramite Google Ads possono includere: interazione con gli annunci,
              pagine di destinazione visitate e azioni completate (es. richiesta di prenotazione).
              Per maggiori informazioni e per la gestione delle preferenze pubblicitarie, visita la pagina{' '}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e1c18] underline underline-offset-2 hover:text-[#c4b99a] transition-colors"
              >
                Impostazioni annunci di Google
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cookie utilizzati ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4b99a] mb-4">
            Tipologie di cookie
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-8">
            Cookie utilizzati
          </h2>
          <div className="text-[#4a4640] text-sm leading-relaxed space-y-8">

            {/* Necessari */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[#c4b99a]" />
                <h3 className="font-serif text-xl text-[#1e1c18]">Cookie necessari</h3>
              </div>
              <p>
                Essenziali per il funzionamento del sito. Includono cookie tecnici per la gestione
                della sessione e delle preferenze di consenso. Non richiedono il consenso dell&apos;utente
                e non possono essere disattivati.
              </p>
            </div>

            {/* Analitici */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[#c4b99a]" />
                <h3 className="font-serif text-xl text-[#1e1c18]">Cookie analitici</h3>
              </div>
              <p>
                Utilizzati da Google Analytics 4 per raccogliere dati statistici anonimi sulla
                navigazione. Ci aiutano a capire come i visitatori interagiscono con il sito,
                quali pagine sono più visitate e come migliorare l&apos;esperienza utente.
              </p>
              <div className="mt-3 bg-white/60 border border-[#c4b99a]/20 px-5 py-3 text-xs space-y-1">
                <p><strong className="text-[#1e1c18]">_ga</strong> — Identificativo utente anonimo · Durata: 2 anni</p>
                <p><strong className="text-[#1e1c18]">_ga_*</strong> — Persistenza sessione GA4 · Durata: 2 anni</p>
              </div>
            </div>

            {/* Marketing */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[#c4b99a]" />
                <h3 className="font-serif text-xl text-[#1e1c18]">Cookie di marketing</h3>
              </div>
              <p>
                Installati da Google Ads per tracciare le conversioni pubblicitarie e mostrare
                annunci pertinenti. Questi cookie possono essere utilizzati per creare un profilo
                dei tuoi interessi e mostrarti pubblicità rilevanti su altri siti.
              </p>
              <div className="mt-3 bg-white/60 border border-[#c4b99a]/20 px-5 py-3 text-xs space-y-1">
                <p><strong className="text-[#1e1c18]">_gcl_au</strong> — Monitoraggio conversioni Google Ads · Durata: 90 giorni</p>
                <p><strong className="text-[#1e1c18]">IDE</strong> — Remarketing e conversioni DoubleClick · Durata: 13 mesi</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Diritti dell'utente ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4b99a] mb-4">
            GDPR — Artt. 15–22
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-8">
            Diritti dell&apos;utente
          </h2>
          <div className="text-[#4a4640] text-sm leading-relaxed space-y-4">
            <p>
              In qualità di interessato, ai sensi degli articoli 15-22 del Regolamento (UE) 2016/679,
              hai il diritto di:
            </p>
            <ul className="space-y-4 pl-0">
              {[
                { title: 'Diritto di accesso (art. 15)', desc: 'Ottenere conferma che sia o meno in corso un trattamento di dati personali che ti riguardano e, in tal caso, ottenerne copia.' },
                { title: 'Diritto di rettifica (art. 16)', desc: 'Ottenere la rettifica dei dati personali inesatti che ti riguardano senza ingiustificato ritardo.' },
                { title: 'Diritto alla cancellazione (art. 17)', desc: 'Ottenere la cancellazione dei dati personali che ti riguardano, quando non siano più necessari rispetto alle finalità per le quali sono stati raccolti.' },
                { title: 'Diritto di limitazione (art. 18)', desc: 'Ottenere la limitazione del trattamento quando contesti l\'esattezza dei dati o il trattamento sia illecito.' },
                { title: 'Diritto alla portabilità (art. 20)', desc: 'Ricevere i dati personali che ti riguardano in un formato strutturato, di uso comune e leggibile da dispositivo automatico.' },
                { title: 'Diritto di opposizione (art. 21)', desc: 'Opporsi in qualsiasi momento al trattamento dei dati personali che ti riguardano, compresa la profilazione.' },
              ].map((right) => (
                <li key={right.title} className="flex gap-4">
                  <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-[#c4b99a]" />
                  <div>
                    <p className="text-[#1e1c18] font-medium mb-1">{right.title}</p>
                    <p>{right.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Hai inoltre il diritto di proporre reclamo all&apos;autorità di controllo competente
              (<strong className="text-[#1e1c18]">Garante per la Protezione dei Dati Personali</strong> —{' '}
              <a
                href="https://www.garanteprivacy.it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e1c18] underline underline-offset-2 hover:text-[#c4b99a] transition-colors"
              >
                www.garanteprivacy.it
              </a>).
            </p>
          </div>
        </div>
      </section>

      {/* ── Come modificare le preferenze cookie ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4b99a] mb-4">
            Gestione dei cookie
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1c18] mb-8">
            Come modificare le preferenze cookie
          </h2>
          <div className="text-[#4a4640] text-sm leading-relaxed space-y-4">
            <p>
              Puoi modificare le tue preferenze sui cookie in qualsiasi momento attraverso
              le impostazioni del tuo browser. Di seguito le istruzioni per i browser più diffusi:
            </p>
            <ul className="space-y-2">
              {[
                { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop' },
                { name: 'Apple Safari', url: 'https://support.apple.com/it-it/guide/safari/sfri11471/mac' },
                { name: 'Microsoft Edge', url: 'https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
              ].map((browser) => (
                <li key={browser.name}>
                  <a
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1e1c18] underline underline-offset-2 hover:text-[#c4b99a] transition-colors"
                  >
                    {browser.name}
                  </a>
                </li>
              ))}
            </ul>
            <p>
              Tieni presente che la disattivazione di alcuni cookie potrebbe limitare la funzionalità
              del sito web.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contatti per richieste privacy ── */}
      <section className="py-20 bg-[#1e1c18] text-center">
        <div className="max-w-2xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#c4b99a] mb-6">
            Richieste privacy
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
            Hai domande sul trattamento<br />
            <em className="italic font-normal">dei tuoi dati?</em>
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8 leading-relaxed text-sm">
            Per esercitare i tuoi diritti o per qualsiasi richiesta relativa al trattamento
            dei tuoi dati personali, puoi contattarci direttamente.
          </p>
          <a
            href={`mailto:${HOTEL.contact.email}?subject=Richiesta%20Privacy`}
            className="group inline-flex items-center gap-3 border border-white/20 text-white text-xs font-semibold tracking-[0.2em] uppercase px-10 py-5 hover:bg-white hover:text-[#1e1c18] transition-all duration-300"
          >
            Scrivi a {HOTEL.contact.email}
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <p className="text-white/30 text-xs mt-6">
            {HOTEL.address.full} · Tel. {HOTEL.contact.phone}
          </p>
        </div>
      </section>
    </>
  )
}
