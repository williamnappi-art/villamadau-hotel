// Piccola stella a quattro punte — tocco natalizio discreto (offerta "Una settimana al mare")
export function Stella({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 1c0 6.5 4.5 11 11 11-6.5 0-11 4.5-11 11 0-6.5-4.5-11-11-11 6.5 0 11-4.5 11-11z" />
    </svg>
  )
}
