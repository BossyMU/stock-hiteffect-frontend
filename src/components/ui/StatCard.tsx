import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { Overline } from './Overline'

interface StatCardProps {
  label: string
  value: string
  sub?: string
  /** Highlight the value in the primary (amber) color. */
  accent?: boolean
}

export function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <Overline className="mb-2">{label}</Overline>
      <p
        className={accent ? 'text-2xl font-semibold text-primary' : 'text-2xl font-semibold text-foreground'}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

/** Responsive 1 → 3 column row of stat cards. */
export function StatGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('grid grid-cols-1 gap-3 sm:grid-cols-3', className)}>{children}</div>
}
