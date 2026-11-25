'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { useTranslations } from 'next-intl'
import { CONSENT_EVENT, getSavedConsent } from './CookieBanner'

/**
 * Iframe di terze parti (Google Maps, menù leggimenu) caricato SOLO dopo il consenso:
 * - se il visitatore ha accettato i cookie di marketing → si carica subito;
 * - altrimenti un riquadro con "Mostra" (carica su richiesta) e il link per aprirlo fuori dal sito.
 * Prima questi iframe si caricavano prima di qualsiasi scelta sui cookie (GDPR).
 */
export function ConsentIframe({
  src,
  title,
  provider,
  externalUrl,
  kind = 'mappa',
  className,
  style,
}: {
  src: string
  title: string
  /** es. "Google Maps", "leggimenu" */
  provider: string
  /** link alternativo da aprire in una nuova scheda */
  externalUrl: string
  kind?: 'mappa' | 'menu'
  className?: string
  style?: CSSProperties
}) {
  const t = useTranslations('common.contenutoEsterno')
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (getSavedConsent()?.marketing) setLoad(true)
    const onConsent = (e: Event) => {
      if ((e as CustomEvent<{ marketing?: boolean }>).detail?.marketing) setLoad(true)
    }
    window.addEventListener(CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])

  if (load) {
    return (
      <iframe
        src={src}
        title={title}
        className={className}
        style={{ border: 0, ...style }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    )
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 text-center p-8 ${className ?? ''}`}
      style={{ backgroundColor: '#e8e1d2', ...style }}
    >
      <p className="max-w-sm text-sm leading-relaxed" style={{ color: '#4a4640' }}>
        {t('nota', { provider })}
      </p>
      <button
        type="button"
        onClick={() => setLoad(true)}
        className="px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#1e1c18', color: '#f0ebe0' }}
      >
        {kind === 'menu' ? t('mostraMenu') : t('mostraMappa')}
      </button>
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs underline underline-offset-4"
        style={{ color: '#4a4640' }}
      >
        {t('apriEsterno', { provider })}
      </a>
    </div>
  )
}
