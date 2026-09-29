import type { InputHTMLAttributes, LabelHTMLAttributes, SelectHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export function FieldLabel({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        'mb-1 block font-mono text-xs uppercase tracking-widest text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

const FIELD_BASE = 'rounded border border-border bg-muted px-3 py-2 text-sm text-foreground'

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(FIELD_BASE, className)} {...props} />
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(FIELD_BASE, className)} {...props} />
}

/** Wide search box shown above tables. */
export function SearchInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'min-w-0 flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground',
        className,
      )}
      {...props}
    />
  )
}
