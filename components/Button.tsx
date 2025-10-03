"use client"

import { ReactNode } from 'react'
import { cn } from '../lib/utils'

export default function Button({
  children,
  onClick,
  variant = 'primary',
  className,
  href,
  target,
  rel,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  href?: string
  target?: string
  rel?: string
}) {
  const base = 'inline-flex items-center gap-2 px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants: Record<string, string> = {
    primary: 'bg-primary text-primary-foreground hover:opacity-95',
    secondary: 'border bg-transparent hover:bg-muted/50 text-foreground',
  }

  const classes = cn(base, variants[variant], className || '')

  if (href) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
