import { useState } from 'react'
import { OrderDetailCard } from '@/components/orders'
import { PageHeader } from '@/components/ui'
import { useShopData } from '@/context/ShopDataContext'

const QUICK_PICK_COUNT = 4

/** Look up an order by receipt ID, e.g. when a customer comes to collect. */
export default function ReceiptPage() {
  const { orders } = useShopData()
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)

  const found = orders.find((o) => o.receiptId.toLowerCase() === query.trim().toLowerCase())

  const handleSearch = () => {
    if (query.trim()) setSearched(true)
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
            setSearched(false)
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          type="button"
          onClick={handleSearch}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Look Up
        </button>
      </div>

      {searched && !found && (
        <div className="rounded-lg border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No receipt found for <span className="font-mono">{query}</span>
          </p>
        </div>
      )}

      {found && <OrderDetailCard order={found} />}

      {!searched && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {orders.slice(0, QUICK_PICK_COUNT).map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => {
                setQuery(o.receiptId)
                setSearched(false)
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
