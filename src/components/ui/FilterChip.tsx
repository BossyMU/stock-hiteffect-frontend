import type { ReactNode } from 'react'
import { TONE_CHIP_ACTIVE, type Tone } from '@/constants/tone'
import { cn } from '@/utils/cn'

/** Untoned "All" chip: amber tint without a border when active, as in the design. */
const DEFAULT_ACTIVE = 'text-primary bg-primary/12 border-0'

interface FilterChipProps {
  active: boolean
  onClick: () => void
  /** Omit for the neutral "All" chip. */
  tone?: Tone
  className?: string
  children: ReactNode
}

/** Toggleable filter tab; tinted with its tone when active. */
export function FilterChip({ active, onClick, tone, className, children }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded border px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors',
        active
          ? tone
            ? TONE_CHIP_ACTIVE[tone]
            : DEFAULT_ACTIVE
          : 'border-border bg-muted text-muted-foreground',
        className,
      )}
    >
      {children}
    </button>
  )
}
