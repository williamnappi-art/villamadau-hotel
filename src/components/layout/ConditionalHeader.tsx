'use client'

import { usePathname } from '@/i18n/navigation'

const HERO_PAGES = ['/', '/ristorante', '/hotel', '/sant-efisio', '/domus-antigas', '/servizi', '/pasqua-a-pula', '/da-non-perdere', '/contatti', '/settimana-al-mare']

export function ConditionalHeader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (HERO_PAGES.includes(pathname)) return null
  return <>{children}</>
}
