import { useCallback, useRef, useState } from 'react'
import { Button, ModalCancelButton, Modal, SuggestionItem, SuggestionMenu } from '@/components/ui'
import { FOIL_STYLES, RARITY_TEXT } from '@/constants/card'
import { CARD_CATALOG, CATALOG_SETS } from '@/data/cardCatalog'
import { useClickOutside } from '@/hooks/useClickOutside'
import type { Card, CatalogCard } from '@/types'
import { cn } from '@/utils/cn'
import { uid } from '@/utils/id'

interface SetCardEntry {
  catalog: CatalogCard
  selected: boolean
  stockNF: number
  stockCF: number
  stockRF: number
}

type StockField = 'stockNF' | 'stockCF' | 'stockRF'

const STOCK_COLUMNS: { field: StockField; style: (typeof FOIL_STYLES)[keyof typeof FOIL_STYLES] }[] = [
  { field: 'stockNF', style: FOIL_STYLES['Non-Foil'] },
  { field: 'stockCF', style: FOIL_STYLES['Cold Foil'] },
  { field: 'stockRF', style: FOIL_STYLES['Rainbow Foil'] },
]

const setSummary = (set: string) => {
  const cards = CARD_CATALOG.filter((c) => c.set === set)
  return `${cards[0]?.setCode} · ${cards.length} cards`
}

const toCard = (e: SetCardEntry): Card => ({
  id: uid(),
  name: e.catalog.name,
  set: e.catalog.set,
  setCode: e.catalog.setCode,
  rarity: e.catalog.rarity,
  condition: 'NM',
  stockNF: e.stockNF,
  stockCF: e.stockCF,
  stockRF: e.stockRF,
  buyPrice: 0,
  sellPriceNF: 0,
  sellPriceCF: 0,
  sellPriceRF: 0,
})

interface AddSetModalProps {
  onSave: (cards: Card[]) => void
  onClose: () => void
}

/** Bulk-add cards from a whole set, choosing which cards and their per-foil stock. */
export function AddSetModal({ onSave, onClose }: AddSetModalProps) {
  const [setQuery, setSetQuery] = useState('')
  const [chosenSet, setChosenSet] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [entries, setEntries] = useState<SetCardEntry[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  useClickOutside(
    searchRef,
    useCallback(() => setShowSuggestions(false), []),
  )

  const q = setQuery.toLowerCase()
  const filteredSets = CATALOG_SETS.filter((s) => !q || s.toLowerCase().includes(q))
  const selectedCount = entries.filter((e) => e.selected).length

  const selectSet = (set: string) => {
    setChosenSet(set)
    setSetQuery(set)
    setShowSuggestions(false)
    setEntries(
      CARD_CATALOG.filter((c) => c.set === set).map((c) => ({
        catalog: c,
        selected: true,
        stockNF: 0,
        stockCF: 0,
        stockRF: 0,
      })),
    )
  }

  const updateEntry = (idx: number, patch: Partial<SetCardEntry>) =>
    setEntries((prev) => prev.map((e, i) => (i === idx ? { ...e, ...patch } : e)))

  const toggleAll = (selected: boolean) => setEntries((prev) => prev.map((e) => ({ ...e, selected })))

  const handleSave = () => {
    const newCards = entries.filter((e) => e.selected).map(toCard)
    if (newCards.length === 0) return
    onSave(newCards)
    onClose()
  }

  return (
    <Modal onClose={onClose} className="flex max-h-[90vh] max-w-3xl flex-col" labelledBy="add-set-title">
      {/* Header */}
      <div className="border-b border-border px-6 py-5">
        <h2 id="add-set-title" className="mb-4 text-lg font-semibold">
          Add Set
        </h2>
        <div ref={searchRef} className="relative">
          <input
            aria-label="Search sets"
            autoComplete="off"
            className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground"
            placeholder="Search and select a set…"
            value={setQuery}
            onChange={(e) => {
              setSetQuery(e.target.value)
              setChosenSet(null)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
          />
          {showSuggestions && filteredSets.length > 0 && (
            <SuggestionMenu className="max-h-52 bg-card">
              {filteredSets.map((s) => (
                <SuggestionItem
                  key={s}
                  className="px-4 py-2.5 text-sm text-foreground"
                  onSelect={() => selectSet(s)}
                >
                  <span className="font-medium">{s}</span>
                  <span className="ml-2 font-mono text-xs text-muted-foreground">{setSummary(s)}</span>
                </SuggestionItem>
              ))}
            </SuggestionMenu>
          )}
        </div>
      </div>

      {/* Card list */}
      {chosenSet && entries.length > 0 && (
        <>
          <div className="flex items-center justify-between border-b border-border bg-muted px-6 py-3">
            <div className="flex items-center gap-3">
              <Button variant="soft" size="sm" onClick={() => toggleAll(true)}>
                Select all
              </Button>
              <Button variant="secondary" size="sm" className="bg-card" onClick={() => toggleAll(false)}>
                Deselect all
              </Button>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {selectedCount} / {entries.length} selected
            </span>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-[1]">
                <tr className="border-b border-border bg-muted">
                  {['', 'Card', 'Rarity', 'NF', 'CF', 'RF'].map((h, i) => (
                    <th
                      key={`${h}-${i}`}
                      className="px-3 py-2.5 text-left font-mono text-xs uppercase tracking-widest text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, idx) => (
                  <tr
                    key={entry.catalog.name}
                    className={cn(
                      'border-b border-border',
                      entry.selected ? 'bg-card' : 'bg-secondary opacity-45',
                    )}
                  >
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        aria-label={`Include ${entry.catalog.name}`}
                        checked={entry.selected}
                        onChange={(e) => updateEntry(idx, { selected: e.target.checked })}
                        className="cursor-pointer accent-primary"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs font-medium leading-tight">{entry.catalog.name}</p>
                    </td>
                    <td className="px-3 py-2">
                      <span className={cn('text-xs', RARITY_TEXT[entry.catalog.rarity])}>
                        {entry.catalog.rarity}
                      </span>
                    </td>
                    {STOCK_COLUMNS.map(({ field, style }) => (
                      <td key={field} className="px-3 py-2">
                        <input
                          type="number"
                          min={0}
                          aria-label={`${entry.catalog.name} ${style.short} stock`}
                          className={cn(
                            'w-14 rounded border border-border bg-muted px-2 py-1 text-center font-mono text-xs',
                            style.text,
                          )}
                          value={entry[field]}
                          onChange={(e) => updateEntry(idx, { [field]: +e.target.value })}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {chosenSet && entries.length === 0 && (
        <div className="flex flex-1 items-center justify-center py-12 text-sm text-muted-foreground">
          No cards found for this set in the catalog.
        </div>
      )}

      {!chosenSet && (
        <div className="flex flex-1 items-center justify-center py-16 text-sm text-muted-foreground">
          Select a set above to see its cards.
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t border-border px-6 py-4">
        <ModalCancelButton onClick={onClose} />
        <button
          type="button"
          onClick={handleSave}
          disabled={selectedCount === 0}
          className={cn(
            'rounded px-5 py-2 text-sm font-semibold',
            selectedCount > 0
              ? 'bg-primary text-primary-foreground'
              : 'cursor-not-allowed bg-muted text-muted-foreground',
          )}
        >
          Add {selectedCount > 0 ? `${selectedCount} Card${selectedCount > 1 ? 's' : ''}` : 'Cards'}
        </button>
      </div>
    </Modal>
  )
}
