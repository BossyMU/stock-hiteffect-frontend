import { FoilBadge, Overline, StatusBadge } from '@/components/ui'
import type { Order } from '@/types'
import { formatBaht } from '@/utils/format'

/** Full receipt view: header, line items and total. */
export function OrderDetailCard({ order }: { order: Order }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border bg-secondary px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <Overline className="mb-1">Receipt</Overline>
            <p className="font-mono text-2xl font-bold text-primary">{order.receiptId}</p>
            <p className="mt-1 text-sm text-muted-foreground">{order.date}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <div className="mt-4 flex flex-wrap gap-6">
          <div>
            <Overline>Payment</Overline>
            <p className="mt-0.5 text-sm font-semibold">{order.paymentMethod}</p>
          </div>
          {order.note && (
            <div>
              <Overline>Note</Overline>
              <p className="mt-0.5 text-sm">{order.note}</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-4">
        <Overline className="mb-3">Items</Overline>
        {order.items.map((item, i) => (
          <div
            key={`${item.cardId}-${i}`}
            className="flex items-center justify-between border-b border-border py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/12 font-mono text-xs font-bold text-primary">
                ×{item.qty}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{item.cardName}</span>
                <FoilBadge foil={item.foil} />
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm font-semibold">{formatBaht(item.unitPrice * item.qty)}</p>
              {item.qty > 1 && (
                <p className="font-mono text-xs text-muted-foreground">{formatBaht(item.unitPrice)} ea.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-border bg-secondary px-6 py-4">
        <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Total</span>
        <span className="font-mono text-2xl font-bold text-primary">{formatBaht(order.total)}</span>
      </div>
    </div>
  )
}
