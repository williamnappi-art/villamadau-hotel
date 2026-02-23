'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'

export function ConditionalHeader() {
  const pathname = usePathname()
  if (pathname === '/' || pathname === '/ristorante' || pathname === '/hotel') return null
  return <Header />
}
