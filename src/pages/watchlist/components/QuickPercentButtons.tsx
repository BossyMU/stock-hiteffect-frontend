import { QUICK_ACCEPT_PERCENTAGES } from '@/constants/watchlist'
import { cn } from '@/utils/cn'
import { formatBaht } from '@/utils/format'

interface QuickPercentButtonsProps {
  /** Market price the percentages are applied to. Buttons are disabled when 0. */
  marketPrice: number
  /** Current accept price input value (string, as typed). */
  value: string
  onPick: (price: string) => void
  /** `lg` shows the derived price under each percentage. */
  size?: 'sm' | 'lg'
  className?: string
}

/** Row of 20 / 50 / 80 / 100 % shortcuts that fill in an accept price. */
export function QuickPercentButtons({
  marketPrice,
  value,
  onPick,
  size = 'sm',
  className,
}: QuickPercentButtonsProps) {
  const enabled = marketPrice > 0
  return (
    <div className={cn('flex', size === 'lg' ? 'gap-2' : 'gap-1.5', className)}>
      {QUICK_ACCEPT_PERCENTAGES.map((pct) => {
        const derived = enabled ? Math.round((marketPrice * pct) / 100) : 0
        const active = enabled && value === String(derived)
        return (
          <button
            key={pct}
            type="button"
            disabled={!enabled}
            onClick={() => onPick(String(derived))}
            className={cn(
              'flex-1 rounded border font-mono font-semibold disabled:cursor-default disabled:opacity-40',
              size === 'lg' ? 'py-2 text-sm' : 'py-1.5 text-xs',
              active
                ? 'border-success/31 bg-success/15 text-success'
                : cn(
                    'border-border bg-muted',
                    size === 'lg' && enabled ? 'text-foreground' : 'text-muted-foreground',
                  ),
            )}
          >
            {pct}%
            {size === 'lg' && enabled && (
              <span className="block text-xs font-normal opacity-60">{formatBaht(derived)}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
