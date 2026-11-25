'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Effetto parallasse per la foto/video degli hero a tutto schermo:
 * scorrendo, lo sfondo scende al `speed` (20%) della velocità della pagina,
 * quindi "resta indietro" rispetto al testo e ai contenuti.
 *
 * - Muove solo un livello già in GPU (translate3d): nessun ricalcolo del layout.
 * - Si aggiorna al massimo una volta per frame e solo finché l'hero è visibile.
 * - Disattivato con "riduci movimento" del sistema operativo.
 * Il genitore (la <section> dell'hero) deve essere relative + overflow-hidden.
 */
export function HeroParallax({ children, speed = 0.2 }: { children: ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const section = el.parentElement
      const y = window.scrollY
      // oltre l'hero non serve aggiornare (è fuori schermo)
      if (section && y > section.offsetTop + section.offsetHeight) return
      el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])

  return (
    <div ref={ref} className="absolute inset-0 will-change-transform">
      {children}
    </div>
  )
}
