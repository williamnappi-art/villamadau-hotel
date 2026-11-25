'use client'

import { useEffect } from 'react'
import { OFFERTE_EVENTI_ID } from '@/content/offerte'

/**
 * Primo scroll dal video → porta la pagina esattamente sulla sezione Offerte & eventi.
 *
 * Come funziona:
 * 1. Al primo movimento verso il basso (rotella, trackpad, dito) parte un'animazione propria
 *    di ~0,7 s fino alla sezione: durante l'animazione gli eventi di scroll sono ignorati.
 * 2. Finita l'animazione, si ignora SOLO l'inerzia del trackpad (valori che calano, a intervalli
 *    fitti). Un nuovo gesto voluto passa subito: la pagina non resta mai "bloccata".
 * 3. Tastiera, click del mouse o zoom annullano tutto. Tornando in cima si riattiva.
 */
const DURATION = 700 // ms animazione
const MOMENTUM_GAP = 140 // ms: oltre questo intervallo tra due eventi il gesto è finito
const ABSORB_MAX = 3500 // ms massimi di inerzia assorbita (una spinta forte su trackpad Mac dura 2–3 s);
// un nuovo gesto voluto passa comunque subito, perché non ha la firma dell'inerzia

export function HomeScrollSnap() {
  useEffect(() => {
    type State = 'idle' | 'animating' | 'absorbing' | 'done'
    let state: State = 'idle'
    let raf = 0
    let lastEventTime = 0
    let lastAbsDelta = 0
    let absorbStart = 0
    let touchStartY = 0
    let touchLocked = false // il dito che ha fatto partire l'aggancio: bloccato finché non si stacca
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const targetY = () => {
      const el = document.getElementById(OFFERTE_EVENTI_ID)
      return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null
    }

    const finish = () => {
      cancelAnimationFrame(raf)
      state = 'done'
    }

    const animateTo = (to: number) => {
      const from = window.scrollY
      if (reduced) {
        window.scrollTo(0, to)
        state = 'absorbing'
        absorbStart = performance.now()
        return
      }
      state = 'animating'
      const start = performance.now()
      const ease = (t: number) => 1 - Math.pow(1 - t, 3) // easeOutCubic
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION)
        window.scrollTo(0, Math.round(from + (to - from) * ease(t)))
        if (t < 1) {
          raf = requestAnimationFrame(step)
        } else {
          state = 'absorbing'
          absorbStart = performance.now()
        }
      }
      raf = requestAnimationFrame(step)
    }

    const snap = () => {
      const to = targetY()
      if (to === null) return
      animateTo(to)
    }

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return // pinch-zoom del trackpad
      const now = performance.now()
      const abs = Math.abs(e.deltaY)
      const gap = now - lastEventTime
      lastEventTime = now

      if (state === 'animating') {
        e.preventDefault()
        lastAbsDelta = abs
        return
      }
      if (state === 'absorbing') {
        // Inerzia = eventi ravvicinati con valori che non crescono. Un nuovo gesto (pausa o
        // valore che risale) chiude l'assorbimento e scorre normalmente.
        const isMomentum = gap < MOMENTUM_GAP && abs <= lastAbsDelta * 1.15 + 1
        if (isMomentum && now - absorbStart < ABSORB_MAX) {
          e.preventDefault()
          lastAbsDelta = abs
          return
        }
        state = 'done'
        return
      }
      if (state === 'idle' && e.deltaY > 0 && window.scrollY < 80) {
        e.preventDefault()
        lastAbsDelta = abs
        snap()
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      if (state === 'absorbing') state = 'done' // nuovo tocco = nuovo gesto
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (touchLocked || state === 'animating') {
        if (e.cancelable) e.preventDefault()
        return
      }
      if (state !== 'idle' || window.scrollY >= 80) return
      // Si decide al PRIMO movimento verso il basso: dopo, il browser prende in carico il gesto
      // e non permette più di bloccarlo (scorrerebbe oltre la sezione)
      if (touchStartY - e.touches[0].clientY > 0) {
        if (!e.cancelable) return
        e.preventDefault()
        touchLocked = true
        snap()
      }
    }
    const handleTouchEnd = () => {
      touchLocked = false
    }

    // L'utente prende il controllo: tastiera di scorrimento o click del mouse (es. barra laterale)
    const SCROLL_KEYS = new Set([' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End'])
    const handleKey = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key) && (state === 'animating' || state === 'absorbing')) finish()
    }
    const handlePointer = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && (state === 'animating' || state === 'absorbing')) finish()
    }
    // Tornando in cima alla pagina l'aggancio si riattiva
    const handleScroll = () => {
      if (state === 'absorbing' && performance.now() - absorbStart > ABSORB_MAX) state = 'done'
      if (state === 'done' && window.scrollY <= 5) state = 'idle'
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKey)
    window.addEventListener('pointerdown', handlePointer)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('pointerdown', handlePointer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}
