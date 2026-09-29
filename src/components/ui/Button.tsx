import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'soft' | 'destructive'
type Size = 'sm' | 'md'

const VARIANTS: Record<Variant, string> = {
  /** Main call to action (amber). */
  primary: 'bg-primary text-primary-foreground font-semibold',
  /** Cancel / close. */
  secondary: 'bg-muted text-muted-foreground',
  /** Inline row actions like "Edit" or "Price". */
  soft: 'bg-primary/10 text-primary',
  /** Red call to action ("+ Add Set"). */
  destructive: 'bg-destructive text-white font-semibold',
}

const SIZES: Record<Size, string> = {
  sm: 'px-2 py-1 text-xs rounded',
  md: 'px-4 py-2 text-sm rounded',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        SIZES[size],
        VARIANTS[variant],
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
