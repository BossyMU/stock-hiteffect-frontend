import { StatusBadge } from '@/components/ui'
import type { Order } from '@/types'
import { formatBaht } from '@/utils/format'

const COLUMNS = ['Receipt', 'Date', 'Payment', 'Total', 'Status']
const GRID = 'grid grid-cols-[1fr_100px_110px_90px_90px]'

interface RecentOrdersListProps {
  orders: Order[]
  onSelect: (order: Order) => void
}

export function RecentOrdersList({ orders, onSelect }: RecentOrdersListProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px] overflow-hidden rounded-lg border border-border">
        <div className={`${GRID} border-b border-border bg-muted px-5 py-3`}>
          {COLUMNS.map((h) => (
            <span key={h} className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {h}
            </span>
          ))}
        </div>
        {orders.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onSelect(o)}
            className={`${GRID} w-full items-center border-b border-border px-5 py-3.5 text-left odd:bg-card even:bg-secondary hover:bg-muted`}
          >
            <span className="font-mono text-sm font-semibold text-primary">{o.receiptId}</span>
            <span className="font-mono text-xs text-muted-foreground">{o.date}</span>
            <span className="text-xs text-muted-foreground">{o.paymentMethod}</span>
            <span className="font-mono text-sm font-semibold">{formatBaht(o.total)}</span>
            <span>
              <StatusBadge status={o.status} />
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
