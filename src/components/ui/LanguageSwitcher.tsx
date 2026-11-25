'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

export function LanguageSwitcher({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
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
      className={`text-sm font-medium tracking-[0.2em] uppercase transition-colors duration-200 cursor-pointer ${tone === 'dark' ? 'text-[#1e1c18] hover:text-[#1e1c18]/60' : 'text-white hover:text-white/60'}`}
    >
      {label}
    </button>
  )
}
