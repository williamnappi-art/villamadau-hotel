'use client'

import { useEffect } from 'react'
import { OFFERTE_EVENTI_ID } from '@/content/offerte'

/**
 * Primo scroll dal video → aggancia la sezione Offerte & eventi, ferma a tutto schermo.
 *
 * Un gesto da trackpad (o un trascinamento col dito) genera decine di eventi per ~1 s:
 * durante l'aggancio vanno bloccati tutti, altrimenti si sommano allo scroll automatico
 * e la pagina "sfora" oltre la sezione. L'aggancio finisce solo quando siamo arrivati
 * E il gesto è terminato; alla fine c'è una correzione al pixel.
 */
const QUIET_MS = 250 // nessun input da questo tempo = gesto finito
const MAX_MS = 4000 // sicurezza: dopo 4 s si chiude comunque (una spinta forte sul trackpad può durare 2–3 s)

export function HomeScrollSnap() {
  useEffect(() => {
    let state: 'idle' | 'snapping' | 'done' = 'idle'
    let lastInput = 0
    let raf = 0
    let touchStartY = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const targetY = () => {
      const el = document.getElementById(OFFERTE_EVENTI_ID)
      return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null
    }

    const snap = () => {
      const first = targetY()
      if (first === null) return
      state = 'snapping'
      const start = performance.now()
      lastInput = start
      window.scrollTo({ top: first, behavior: reduced ? 'auto' : 'smooth' })

      const tick = () => {
        const now = performance.now()
        const y = targetY() ?? first
        const arrived = Math.abs(window.scrollY - y) < 2
        if ((arrived && now - lastInput > QUIET_MS) || now - start > MAX_MS) {
          window.scrollTo({ top: y, behavior: 'auto' }) // correzione finale al pixel
          state = 'done'
          return
        }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const handleWheel = (e: WheelEvent) => {
      if (state === 'snapping') {
        e.preventDefault()
        lastInput = performance.now()
        return
      }
      if (state === 'done' || window.scrollY > 80) return
      if (e.deltaY > 0) {
        e.preventDefault()
        snap()
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      if (state === 'snapping') lastInput = performance.now()
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (state === 'snapping') {
        e.preventDefault()
        lastInput = performance.now()
        return
      }
      if (state === 'done' || window.scrollY > 80) return
      if (touchStartY - e.touches[0].clientY > 8) {
        e.preventDefault()
        snap()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return null
}
