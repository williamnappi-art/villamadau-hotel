import { Link } from '@/i18n/navigation'
import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'outline' | 'white'

type ButtonProps = {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: ButtonVariant
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  external?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-[#1e1c18] hover:bg-primary-600 focus-visible:outline-primary',
  outline:
    'border-2 border-primary text-primary hover:bg-primary hover:text-[#1e1c18] focus-visible:outline-primary',
  white:
    'bg-white text-[#1e1c18] hover:bg-cream focus-visible:outline-white',
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  type = 'button',
  disabled = false,
  external = false,
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center px-8 py-3 rounded text-sm font-semibold tracking-wide uppercase transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'

  const classes = clsx(baseClasses, variantClasses[variant], className)

  if (href) {
    // Link esterni, mailto: e tel: → <a> normale; link interni → Link di next-intl (mantiene la lingua: /en/...)
    const isExternal = external || /^(https?:|mailto:|tel:)/.test(href)
    if (isExternal) {
      return (
        <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
