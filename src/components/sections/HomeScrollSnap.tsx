'use client'

import { useEffect, useRef } from 'react'

export function HomeScrollSnap() {
  const snapped = useRef(false)

  useEffect(() => {
    snapped.current = false

    const snap = () => {
      if (snapped.current) return
      snapped.current = true
      const carousel = document.getElementById('carousel')
      if (carousel) {
        carousel.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
