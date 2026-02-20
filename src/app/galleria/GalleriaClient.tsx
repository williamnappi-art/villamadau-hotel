'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

type Immagine = { src: string; alt: string; categoria: string }

export function GalleriaClient({ immagini }: { immagini: Immagine[] }) {
  const categorie = ['Tutte', ...Array.from(new Set(immagini.map((i) => i.categoria)))]
  const [filtro, setFiltro] = useState('Tutte')
  const [lightbox, setLightbox] = useState<Immagine | null>(null)

  const filtrate = filtro === 'Tutte' ? immagini : immagini.filter((i) => i.categoria === filtro)

  return (
    <>
      {/* Filtri */}
      <div className="bg-cream py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
          {categorie.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                filtro === cat
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtrate.map((img) => (
              <button
                key={img.src}
                onClick={() => setLightbox(img)}
                className="relative h-64 rounded-xl overflow-hidden group cursor-zoom-in shadow-md"
                aria-label={`Apri foto: ${img.alt}`}
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
                    {img.categoria}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
              aria-label="Chiudi"
              onClick={() => setLightbox(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl max-h-[85vh] aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm text-center px-4">
              {lightbox.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
