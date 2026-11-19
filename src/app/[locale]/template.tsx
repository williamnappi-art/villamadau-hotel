'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

// Il primo caricamento NON ha la dissolvenza: l'HTML arriva subito visibile
// (fondamentale per la velocità misurata da Google — FCP/LCP).
// La dissolvenza resta solo quando si naviga da una pagina all'altra.
let primoCaricamentoFatto = false

export default function Template({ children }: { children: React.ReactNode }) {
  const animaIngresso = primoCaricamentoFatto

  useEffect(() => {
    primoCaricamentoFatto = true
  }, [])

  return (
    <motion.div
      initial={animaIngresso ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
