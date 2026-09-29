import { useState } from 'react'
import { Modal, ModalActions } from '@/components/ui'
import { FOIL_FIELDS, FOIL_STYLES, FOIL_TYPES } from '@/constants/card'
import type { Card, FoilType } from '@/types'
import { foilStock } from '@/utils/card'
import { cn } from '@/utils/cn'

interface EditStockModalProps {
  card: Card
  onSave: (card: Card) => Promise<boolean>
  onClose: () => void
}

/** Adjust per-foil stock quantities with −/+ steppers. */
export function EditStockModal({ card, onSave, onClose }: EditStockModalProps) {
  const [stock, setStock] = useState<Record<FoilType, number>>(() => ({
    'Non-Foil': foilStock(card, 'Non-Foil'),
    'Cold Foil': foilStock(card, 'Cold Foil'),
    'Rainbow Foil': foilStock(card, 'Rainbow Foil'),
  }))

  const [saving, setSaving] = useState(false)

  const setQty = (foil: FoilType, qty: number) => setStock((s) => ({ ...s, [foil]: Math.max(0, qty) }))

  const handleSave = async () => {
    const updated = { ...card }
    for (const foil of FOIL_TYPES) updated[FOIL_FIELDS[foil].stock] = stock[foil]
    setSaving(true)
    const ok = await onSave(updated)
    setSaving(false)
    if (ok) onClose()
  }

  return (
    <Modal onClose={onClose} className="max-w-sm p-6" labelledBy="edit-stock-title">
      <h2 id="edit-stock-title" className="mb-1 text-lg font-semibold">
        Edit Stock
      </h2>
      <p className="mb-5 text-sm text-muted-foreground">
        {card.name} · <span className="font-mono">{card.setCode}</span>
      </p>

      <div className="space-y-3">
        {FOIL_TYPES.map((foil) => (
          <StockStepperRow key={foil} foil={foil} value={stock[foil]} onChange={(v) => setQty(foil, v)} />
        ))}
      </div>

      <ModalActions
        className="mt-6"
        onCancel={onClose}
        onConfirm={() => void handleSave()}
        confirmDisabled={saving}
        confirmLabel="Update Stock"
      />
    </Modal>
  )
}

const STEP_BUTTON =
  'flex h-7 w-7 select-none items-center justify-center rounded border border-border bg-background text-base font-bold text-muted-foreground'

function StockStepperRow({
  foil,
  value,
  onChange,
}: {
  foil: FoilType
  value: number
  onChange: (value: number) => void
}) {
  const style = FOIL_STYLES[foil]
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border px-4 py-3',
        value > 0 ? style.highlight : 'border-border bg-muted',
      )}
    >
      <span className={cn('w-6 font-mono text-xs font-semibold', style.text)}>{style.short}</span>
      <span className="flex-1 text-sm text-muted-foreground">{foil}</span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label={`Decrease ${foil}`}
          className={STEP_BUTTON}
          onClick={() => onChange(value - 1)}
        >
          −
        </button>
        <input
          type="number"
          min={0}
          aria-label={`${foil} stock`}
          className={cn(
            'w-16 rounded border bg-background px-2 py-1.5 text-center font-mono text-sm font-bold text-foreground',
            style.border,
          )}
          value={value}
          onChange={(e) => {
            const n = parseInt(e.target.value)
            onChange(isNaN(n) ? 0 : n)
          }}
        />
        <button
          type="button"
          aria-label={`Increase ${foil}`}
          className={STEP_BUTTON}
          onClick={() => onChange(value + 1)}
        >
          +
        </button>
      </div>
    </div>
  )
}
