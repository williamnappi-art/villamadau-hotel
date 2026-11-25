'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/**
 * Sfondo hero veloce per Google (LCP):
 * 1. subito un'immagine ottimizzata (AVIF/WebP, dimensionata per il dispositivo, precaricata)
 * 2. il video si scarica solo DOPO il caricamento completo della pagina e compare in dissolvenza
 *    quando parte davvero — così non ruba banda alla prima schermata.
 * Con "Risparmio dati" attivo il video non viene scaricato affatto.
 */
export function HeroVideo({
  src,
  poster,
  posterPosition = 'center',
  videoClassName = '',
}: {
  src: string
  poster: string
  /** punto da tenere a fuoco nel ritaglio dell'immagine (object-position), es. '25% 40%' */
  posterPosition?: string
  /** classi extra solo per il video (es. 'md:hidden' per mostrarlo solo su mobile) */
  videoClassName?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (connection?.saveData) return
    // Video nascosto da CSS (es. md:hidden su desktop) → non scaricarlo
    if (getComputedStyle(video).display === 'none') return

    const start = () => {
      video.src = src
      video.play().catch(() => {})
    }
    if (document.readyState === 'complete') {
      start()
      return
    }
    window.addEventListener('load', start, { once: true })
    return () => window.removeEventListener('load', start)
  }, [src])

  return (
    <>
      <Image
        src={poster}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={70}
        className="object-cover"
        style={{ objectPosition: posterPosition }}
        aria-hidden="true"
      />
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        onPlaying={() => setPlaying(true)}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${playing ? 'opacity-100' : 'opacity-0'} ${videoClassName}`}
        aria-hidden="true"
      />
    </>
  )
}
