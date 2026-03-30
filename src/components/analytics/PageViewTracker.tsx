'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from '@/i18n/navigation'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

function sendPageView() {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'virtualPageview',
    virtualPageURL: window.location.pathname + window.location.search,
    virtualPageTitle: document.title,
  })
}

export default function PageViewTracker() {
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  // Send virtualPageview on every client-side navigation (SPA)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    // Delay to let <title> update after navigation
    const timeout = setTimeout(sendPageView, 150)
    return () => clearTimeout(timeout)
  }, [pathname])

  // After consent is granted, send the page_view that was blocked on initial load
  useEffect(() => {
    function onConsentUpdate() {
      try {
        const raw = localStorage.getItem('cookie_consent')
        if (!raw) return
        const prefs = JSON.parse(raw)
        if (prefs.analytics_storage === 'granted') {
          setTimeout(sendPageView, 300)
        }
      } catch { /* ignore */ }
    }

    const originalSetItem = localStorage.setItem
    localStorage.setItem = function (key: string, value: string) {
      originalSetItem.call(this, key, value)
      if (key === 'cookie_consent') {
        onConsentUpdate()
      }
    }

    return () => {
      localStorage.setItem = originalSetItem
    }
  }, [])

  return null
}
