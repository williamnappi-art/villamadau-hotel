import { clsx } from 'clsx'

type SectionTitleProps = {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionTitle({
  label,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionTitleProps) {
  return (
    <div className={clsx('mb-12', align === 'center' && 'text-center')}>
      {label && (
        <p
          className={clsx(
            'text-xs font-semibold uppercase tracking-widest mb-3',
            light ? 'text-primary-200' : 'text-primary'
          )}
        >
          {label}
        </p>
      )}
      <h2
        className={clsx(
          'font-serif text-3xl md:text-4xl leading-tight mb-4',
          light ? 'text-white' : 'text-gray-900'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            'text-base md:text-lg max-w-2xl leading-relaxed',
            align === 'center' && 'mx-auto',
            light ? 'text-gray-300' : 'text-gray-600'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
