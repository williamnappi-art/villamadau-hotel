import Link from 'next/link'
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
    'bg-primary text-white hover:bg-primary-600 focus-visible:outline-primary',
  outline:
    'border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:outline-primary',
  white:
    'bg-white text-primary hover:bg-cream focus-visible:outline-white',
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
    const linkProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}
    return (
      <Link href={href} className={classes} {...linkProps}>
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
