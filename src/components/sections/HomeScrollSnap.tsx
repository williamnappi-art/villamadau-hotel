'use client'

import { useEffect, useRef } from 'react'
import { OFFERTE_EVENTI_ID } from '@/content/offerte'

export function HomeScrollSnap() {
  const snapped = useRef(false)

  useEffect(() => {
    snapped.current = false

    const snap = () => {
      if (snapped.current) return
      snapped.current = true
      // Primo scroll dal video → sezione Offerte & eventi, ferma a tutto schermo
      const target = document.getElementById(OFFERTE_EVENTI_ID)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (snapped.current) return
      if (window.scrollY > 80) return
      if (e.deltaY > 0) {
        e.preventDefault()
        snap()
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (snapped.current) return
      if (window.scrollY > 80) return
      const delta = touchStartY - e.touches[0].clientY
      if (delta > 8) {
        e.preventDefault()
        snap()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return null
}
