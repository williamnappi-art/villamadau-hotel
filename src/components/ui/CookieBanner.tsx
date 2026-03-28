'use client'

import { useState, useEffect, useCallback } from 'react'
import { Link } from '@/i18n/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ConsentPreferences {
  analytics_storage: 'granted' | 'denied'
  ad_storage: 'granted' | 'denied'
  ad_user_data: 'granted' | 'denied'
  ad_personalization: 'granted' | 'denied'
  timestamp: number
}

const STORAGE_KEY = 'cookie_consent'
const MAX_AGE_DAYS = 180

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getSavedConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed: ConsentPreferences = JSON.parse(raw)
    const age = Date.now() - parsed.timestamp
    if (age > MAX_AGE_DAYS * 24 * 60 * 60 * 1000) return null
    return parsed
  } catch {
    return null
  }
}

function pushConsent(prefs: Omit<ConsentPreferences, 'timestamp'>) {
  const full: ConsentPreferences = { ...prefs, timestamp: Date.now() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(full))

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: prefs.analytics_storage,
      ad_storage: prefs.ad_storage,
      ad_user_data: prefs.ad_user_data,
      ad_personalization: prefs.ad_personalization,
    })
  }
}

/* ------------------------------------------------------------------ */
/*  Toggle component                                                   */
/* ------------------------------------------------------------------ */

function Toggle({
  label,
  enabled,
  locked,
  onToggle,
}: {
  label: string
  enabled: boolean
  locked?: boolean
  onToggle?: () => void
}) {
  return (
    <button
      type="button"
      onClick={locked ? undefined : onToggle}
      className={`flex items-center justify-between w-full py-2 ${locked ? 'opacity-60 cursor-default' : 'cursor-pointer'}`}
      aria-pressed={enabled}
      disabled={locked}
    >
      <span className="text-sm text-white/80">{label}</span>
      <span
        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
          enabled ? 'bg-[#c4b99a]' : 'bg-white/20'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5 ${
            enabled ? 'translate-x-[18px]' : 'translate-x-0.5'
          }`}
        />
      </span>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  CookieBanner                                                       */
/* ------------------------------------------------------------------ */

export default function CookieBanner() {
  const t = useTranslations('common')
  const [visible, setVisible] = useState(false)
  const [showCustomise, setShowCustomise] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    if (!getSavedConsent()) setVisible(true)
  }, [])

  const accept = useCallback(
    (prefs: Omit<ConsentPreferences, 'timestamp'>) => {
      pushConsent(prefs)
      setVisible(false)
    },
    [],
  )

  const acceptAll = () =>
    accept({
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    })

  const acceptNecessary = () =>
    accept({
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })

  const acceptCustom = () =>
    accept({
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
      ad_user_data: marketing ? 'granted' : 'denied',
      ad_personalization: marketing ? 'granted' : 'denied',
    })

  /* Allow external re-open */
  useEffect(() => {
    const handler = () => {
      const saved = getSavedConsent()
      if (saved) {
        setAnalytics(saved.analytics_storage === 'granted')
        setMarketing(saved.ad_storage === 'granted')
      }
      setShowCustomise(false)
      setVisible(true)
    }
    window.addEventListener('open-cookie-banner', handler)
    return () => window.removeEventListener('open-cookie-banner', handler)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed bottom-0 inset-x-0 z-50"
        >
          <div className="bg-[#1e1c18] border-t border-white/10 px-4 sm:px-6 py-5 sm:py-6 max-w-4xl mx-auto sm:mb-4 sm:rounded-xl shadow-2xl">
            {/* Main text */}
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              {t('cookieBanner.testo')}{' '}
              <Link href="/privacy" className="underline text-[#c4b99a] hover:text-white transition-colors">
                {t('cookieBanner.informativaPrivacy')}
              </Link>
            </p>

            {/* Customisation panel */}
            <AnimatePresence>
              {showCustomise && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/10 pt-3 pb-4 space-y-1">
                    <Toggle label={t('cookieBanner.cookieNecessari')} enabled locked />
                    <Toggle
                      label={t('cookieBanner.cookieAnalitici')}
                      enabled={analytics}
                      onToggle={() => setAnalytics((v) => !v)}
                    />
                    <Toggle
                      label={t('cookieBanner.cookieMarketing')}
                      enabled={marketing}
                      onToggle={() => setMarketing((v) => !v)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={acceptAll}
                className="px-5 py-2.5 rounded-lg bg-[#c4b99a] text-[#1e1c18] text-sm font-semibold hover:brightness-110 transition-all cursor-pointer"
              >
                {t('cookieBanner.accettaTutti')}
              </button>
              <button
                onClick={acceptNecessary}
                className="px-5 py-2.5 rounded-lg border border-white/25 text-white/80 text-sm hover:border-white/50 hover:text-white transition-all cursor-pointer"
              >
                {t('cookieBanner.soloNecessari')}
              </button>
              {showCustomise ? (
                <button
                  onClick={acceptCustom}
                  className="px-5 py-2.5 rounded-lg bg-[#c4b99a] text-[#1e1c18] text-sm font-semibold hover:brightness-110 transition-all cursor-pointer"
                >
                  {t('cookieBanner.salvaPreferenze')}
                </button>
              ) : (
                <button
                  onClick={() => setShowCustomise(true)}
                  className="px-5 py-2.5 rounded-lg border border-white/25 text-white/80 text-sm hover:border-white/50 hover:text-white transition-all cursor-pointer"
                >
                  {t('cookieBanner.personalizza')}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ */
/*  CookieSettingsButton – use in footer or anywhere                   */
/* ------------------------------------------------------------------ */

export function CookieSettingsButton({ className }: { className?: string }) {
  const t = useTranslations('common')
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('open-cookie-banner'))}
      className={className ?? 'text-sm text-gray-400 hover:text-white transition-colors cursor-pointer'}
    >
      {t('footer.gestisciCookie')}
    </button>
  )
}
