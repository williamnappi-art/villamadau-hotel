'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'

export function ConditionalHeader() {
  const pathname = usePathname()
  if (pathname === '/' || pathname === '/ristorante' || pathname === '/hotel' || pathname === '/sant-efisio' || pathname === '/domus-antigas') return null
  return <Header />
}
