import { useState } from 'react'
import { FieldLabel, Modal, ModalActions, TextInput } from '@/components/ui'
import type { WatchItem } from '@/types'
import { today } from '@/utils/date'
import { formatBaht } from '@/utils/format'
import { latestPrice } from '@/utils/watchlist'
import { QuickPercentButtons } from './QuickPercentButtons'

interface UpdatePriceModalProps {
  item: WatchItem
  onSave: (item: WatchItem) => Promise<boolean>
  onClose: () => void
}

/** Record today's market price (appended to history) and set the accept price. */
export function UpdatePriceModal({ item, onSave, onClose }: UpdatePriceModalProps) {
  const [marketPrice, setMarketPrice] = useState(String(latestPrice(item) || ''))
  const [acceptPrice, setAcceptPrice] = useState(String(item.acceptedPrice ?? ''))
  const [saving, setSaving] = useState(false)

  const mp = parseFloat(marketPrice) || 0
  const derivedTarget = item.targetPct != null && mp > 0 ? Math.round((mp * item.targetPct) / 100) : null

  const handleSave = async () => {
    const date = today()
    const history = item.priceHistory
    const lastEntry = history[history.length - 1]
    // Overwrite today's entry if one exists, otherwise append a new point.
    const priceHistory =
      mp > 0
        ? lastEntry?.date === date
          ? [...history.slice(0, -1), { date, price: mp }]
          : [...history, { date, price: mp }]
        : history
    const ap = parseFloat(acceptPrice)
    setSaving(true)
    const ok = await onSave({
      ...item,
      priceHistory,
      targetPrice: derivedTarget ?? item.targetPrice,
      acceptedPrice: isNaN(ap) ? item.acceptedPrice : ap,
    })
    setSaving(false)
    if (ok) onClose()
  }

  return (
    <Modal onClose={onClose} className="max-w-xs space-y-4 p-6" labelledBy="update-price-title">
      <h2 id="update-price-title" className="text-base font-semibold">
        Update Price
      </h2>
      <p className="text-sm text-muted-foreground">
        {item.cardName} · <span className="font-mono">{item.setCode}</span>
      </p>

      <div>
        <FieldLabel htmlFor="update-market" className="normal-case tracking-normal">
          Market Price (฿)
        </FieldLabel>
        <TextInput
          id="update-market"
          type="number"
          min={0}
          autoFocus
          className="w-full rounded-lg bg-background font-mono"
          placeholder="Enter market price…"
          value={marketPrice}
          onChange={(e) => setMarketPrice(e.target.value)}
        />
        {derivedTarget != null && (
          <p className="mt-1.5 font-mono text-xs text-primary">
            Target → {formatBaht(derivedTarget)} ({item.targetPct}% of {formatBaht(mp)})
          </p>
        )}
      </div>

      <div>
        <FieldLabel htmlFor="update-accept" className="normal-case tracking-normal">
          Accept Price (฿)
        </FieldLabel>
        <TextInput
          id="update-accept"
          type="number"
          min={0}
          className="w-full rounded-lg border-success/31 bg-background font-mono"
          placeholder="Enter accepted price…"
          value={acceptPrice}
          onChange={(e) => setAcceptPrice(e.target.value)}
        />
        {mp > 0 && (
          <QuickPercentButtons
            className="mt-2"
            marketPrice={mp}
            value={acceptPrice}
            onPick={setAcceptPrice}
          />
        )}
      </div>

      <ModalActions
        onCancel={onClose}
        onConfirm={() => void handleSave()}
        confirmDisabled={saving}
        confirmLabel="Save"
      />
    </Modal>
  )
}
