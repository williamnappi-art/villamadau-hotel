'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

export type Categoria = 'hotel' | 'ristorante' | 'dintorni'
type Filtro = 'tutte' | Categoria
type Immagine = { src: string; alt: string; categoria: Categoria }
type Labels = {
  filtri: Record<Filtro, string>
  /** contiene il segnaposto {alt} */
  apriFoto: string
  chiudi: string
  precedente: string
  successiva: string
}

export function GalleriaClient({ immagini, labels }: { immagini: Immagine[]; labels: Labels }) {
  const filtri: Filtro[] = ['tutte', ...Array.from(new Set(immagini.map((i) => i.categoria)))]
  const [filtro, setFiltro] = useState<Filtro>('tutte')
  const [aperta, setAperta] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastTrigger = useRef<HTMLElement | null>(null)

  const filtrate = filtro === 'tutte' ? immagini : immagini.filter((i) => i.categoria === filtro)
  const foto = aperta !== null ? filtrate[aperta] : null

  const chiudi = useCallback(() => {
    setAperta(null)
    lastTrigger.current?.focus() // il focus torna sulla foto da cui si era partiti
  }, [])
  const sposta = useCallback(
    (d: 1 | -1) => setAperta((i) => (i === null ? i : (i + d + filtrate.length) % filtrate.length)),
    [filtrate.length],
  )

  // Tastiera: Esc chiude, frecce scorrono; scroll della pagina bloccato mentre è aperta
  useEffect(() => {
    if (aperta === null) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') chiudi()
      if (e.key === 'ArrowRight') sposta(1)
      if (e.key === 'ArrowLeft') sposta(-1)
      if (e.key === 'Tab') {
        // focus trap minimo: resta sui controlli della finestra
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [aperta, chiudi, sposta])

  return (
    <>
      {/* Filtri */}
      <div className="bg-cream py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center" role="group">
          {filtri.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFiltro(f)}
              aria-pressed={filtro === f}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                filtro === f
                  ? 'bg-primary text-[#1e1c18]'
                  : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
              }`}
            >
              {labels.filtri[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Griglia */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtrate.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget
                  setAperta(i)
                }}
                className="relative h-64 rounded-xl overflow-hidden group cursor-zoom-in shadow-md"
                aria-label={labels.apriFoto.replace('{alt}', img.alt)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs bg-black/60 text-white px-2 py-1 rounded">
                    {labels.filtri[img.categoria]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {foto && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={foto.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={chiudi}
          >
            <button
              ref={closeRef}
              type="button"
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
              aria-label={labels.chiudi}
              onClick={chiudi}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {filtrate.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3"
                  aria-label={labels.precedente}
                  onClick={(e) => { e.stopPropagation(); sposta(-1) }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3"
                  aria-label={labels.successiva}
                  onClick={(e) => { e.stopPropagation(); sposta(1) }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
            <motion.div
              key={foto.src}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[85vh] aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={foto.src} alt={foto.alt} fill sizes="100vw" className="object-contain" priority />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm text-center px-4">
              {foto.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
