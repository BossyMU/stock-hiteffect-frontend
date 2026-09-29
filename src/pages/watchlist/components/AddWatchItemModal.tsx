import { useState } from 'react'
import { CatalogSearchSection } from '@/components/cards'
import { FieldLabel, FoilBadge, Modal, ModalActions, Overline, Select, TextInput } from '@/components/ui'
import { PRIORITY_CONFIG, WATCH_PRIORITIES } from '@/constants/watchlist'
import type { Card, CatalogCard, FoilType, WatchItem, WatchPriority } from '@/types'
import { foilSellPrice } from '@/utils/card'
import { today } from '@/utils/date'
import { formatBaht } from '@/utils/format'
import { uid } from '@/utils/id'
import { QuickPercentButtons } from './QuickPercentButtons'

/** Foil option order used by this form (matches the design). */
const FORM_FOILS: FoilType[] = ['Non-Foil', 'Rainbow Foil', 'Cold Foil']

interface AddWatchItemModalProps {
  cards: Card[]
  onSave: (item: WatchItem) => void
  onClose: () => void
}

export function AddWatchItemModal({ cards, onSave, onClose }: AddWatchItemModalProps) {
  const [selected, setSelected] = useState<CatalogCard | null>(null)
  const [foil, setFoil] = useState<FoilType>('Non-Foil')
  const [priority, setPriority] = useState<WatchPriority>('normal')
  const [acceptPrice, setAcceptPrice] = useState('')

  // Market price comes from our own stock listing of the same card, if any.
  const stockCard = selected
    ? cards.find((c) => c.name === selected.name && c.setCode === selected.setCode)
    : null
  const marketPrice = stockCard ? foilSellPrice(stockCard, foil) : 0

  const handleSave = () => {
    if (!selected) return
    onSave({
      id: uid(),
      cardName: selected.name,
      setCode: selected.setCode,
      rarity: selected.rarity,
      foil,
      targetPrice: 0,
      acceptedPrice: parseFloat(acceptPrice) || undefined,
      priceHistory: marketPrice > 0 ? [{ date: today(), price: marketPrice }] : [],
      note: '',
      priority,
    })
    onClose()
  }

  return (
    <Modal
      onClose={onClose}
      className="max-h-[92vh] max-w-lg overflow-y-auto p-6"
      labelledBy="add-watch-title"
    >
      <h2 id="add-watch-title" className="mb-5 text-lg font-semibold">
        Add to Watchlist
      </h2>

      <CatalogSearchSection selected={selected} onSelect={setSelected} />

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div>
          <FieldLabel htmlFor="watch-foil">Foil</FieldLabel>
          <Select
            id="watch-foil"
            className="w-full"
            value={foil}
            onChange={(e) => setFoil(e.target.value as FoilType)}
          >
            {FORM_FOILS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </Select>
        </div>
        <div>
          <FieldLabel htmlFor="watch-priority">Priority</FieldLabel>
          <Select
            id="watch-priority"
            className="w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value as WatchPriority)}
          >
            {WATCH_PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {PRIORITY_CONFIG[p].label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {selected && (
        <>
          <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
            <div className="flex-1">
              <Overline className="mb-0.5">Market Price</Overline>
              <p
                className={
                  marketPrice > 0
                    ? 'font-mono text-lg font-bold text-foreground'
                    : 'font-mono text-lg font-bold text-muted-foreground'
                }
              >
                {marketPrice > 0 ? formatBaht(marketPrice) : '—'}
              </p>
            </div>
            <FoilBadge foil={foil} />
          </div>

          <div className="mb-4">
            <FieldLabel htmlFor="watch-accept">Accept Price (฿)</FieldLabel>
            <TextInput
              id="watch-accept"
              type="number"
              min={0}
              className="w-full border-success/25 font-mono"
              placeholder="0"
              value={acceptPrice}
              onChange={(e) => setAcceptPrice(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Overline className="mb-2">Quick Accept %</Overline>
            <QuickPercentButtons
              size="lg"
              marketPrice={marketPrice}
              value={acceptPrice}
              onPick={setAcceptPrice}
            />
          </div>
        </>
      )}

      <ModalActions
        className="mt-6"
        onCancel={onClose}
        onConfirm={handleSave}
        confirmDisabled={!selected}
        confirmLabel="Add to Watchlist"
      />
    </Modal>
  )
}
