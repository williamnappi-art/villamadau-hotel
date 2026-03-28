'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const nextLocale = locale === 'it' ? 'en' : 'it'
  const label = locale === 'it' ? 'ENG' : 'ITA'

  function handleSwitch() {
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <button
      type="button"
      onClick={handleSwitch}
      aria-label={locale === 'it' ? 'Switch to English' : 'Passa all\'italiano'}
      className="text-sm font-medium tracking-[0.2em] uppercase text-white hover:text-white/60 transition-colors duration-200 cursor-pointer"
    >
      {label}
    </button>
  )
}
