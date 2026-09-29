import { FOIL_STYLES } from '@/constants/card'
import { STATUS_CONFIG } from '@/constants/order'
import { TONE_BADGE, TONE_PILL } from '@/constants/tone'
import { PRIORITY_CONFIG } from '@/constants/watchlist'
import type { FoilType, OrderStatus, WatchPriority } from '@/types'
import { cn } from '@/utils/cn'

export function StatusBadge({ status }: { status: OrderStatus }) {
  const { label, tone } = STATUS_CONFIG[status]
  return (
    <span
      className={cn(
        'rounded border px-2 py-0.5 font-mono text-xs font-medium uppercase tracking-widest',
        TONE_BADGE[tone],
      )}
    >
      {label}
    </span>
  )
}

export function FoilBadge({ foil }: { foil: FoilType }) {
  const style = FOIL_STYLES[foil] ?? FOIL_STYLES['Non-Foil']
  return (
    <span className={cn('rounded border px-2 py-0.5 font-mono text-xs font-medium', style.badge)}>
      {style.short}
    </span>
  )
}

export function PriorityBadge({ priority }: { priority: WatchPriority }) {
  const { label, tone } = PRIORITY_CONFIG[priority]
  return <span className={cn('rounded border px-2 py-0.5 font-mono text-xs', TONE_PILL[tone])}>{label}</span>
}
