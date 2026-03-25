'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'

export function ConditionalHeader() {
  const pathname = usePathname()
  if (pathname === '/' || pathname === '/ristorante' || pathname === '/hotel' || pathname === '/sant-efisio' || pathname === '/domus-antigas' || pathname === '/servizi' || pathname === '/pasqua-a-pula' || pathname === '/da-non-perdere' || pathname === '/contatti') return null
  return <Header />
}
