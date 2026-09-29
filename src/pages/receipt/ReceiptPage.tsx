import { useState } from 'react'
import { ApiError, errorMessage, ordersApi } from '@/api'
import { OrderDetailCard } from '@/components/orders'
import { PageHeader } from '@/components/ui'
import { useShopData } from '@/context/ShopDataContext'
import type { Order } from '@/types'

const QUICK_PICK_COUNT = 4

type Lookup =
  | { state: 'idle' }
  | { state: 'loading' }
  | { state: 'found'; order: Order }
  | { state: 'not-found' }
  | { state: 'error'; message: string }

/** Look up an order by receipt ID, e.g. when a customer comes to collect. */
export default function ReceiptPage() {
  const { orders } = useShopData()
  const [query, setQuery] = useState('')
  const [lookup, setLookup] = useState<Lookup>({ state: 'idle' })

  const handleSearch = async () => {
    const receiptId = query.trim()
    if (!receiptId) return
    setLookup({ state: 'loading' })
    try {
      setLookup({ state: 'found', order: await ordersApi.getByReceiptId(receiptId) })
    } catch (err) {
      setLookup(
        err instanceof ApiError && err.status === 404
          ? { state: 'not-found' }
          : { state: 'error', message: errorMessage(err) },
      )
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader title="Receipt Lookup" subtitle="Enter a receipt ID to retrieve the order for delivery" />

      <div className="flex gap-3">
        <input
          aria-label="Receipt ID"
          className="flex-1 rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground"
          placeholder="RCP-2024-0041"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setLookup({ state: 'idle' })
          }}
          onKeyDown={(e) => e.key === 'Enter' && void handleSearch()}
        />
        <button
          type="button"
          onClick={() => void handleSearch()}
          disabled={lookup.state === 'loading'}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          Look Up
        </button>
      </div>

      {(lookup.state === 'not-found' || lookup.state === 'error') && (
        <div className="rounded-lg border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            {lookup.state === 'error' ? (
              lookup.message
            ) : (
              <>
                No receipt found for <span className="font-mono">{query}</span>
              </>
            )}
          </p>
        </div>
      )}

      {lookup.state === 'found' && <OrderDetailCard order={lookup.order} />}

      {lookup.state === 'idle' && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {orders.slice(0, QUICK_PICK_COUNT).map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => {
                setQuery(o.receiptId)
                setLookup({ state: 'idle' })
              }}
              className="rounded-lg border border-border bg-muted px-4 py-3 text-left text-xs text-muted-foreground transition-colors hover:border-primary"
            >
              <span className="font-mono text-primary">{o.receiptId}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
