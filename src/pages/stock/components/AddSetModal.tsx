import { useCallback, useEffect, useRef, useState } from 'react'
import { catalogApi, errorMessage, isAbort } from '@/api'
import { Button, ModalCancelButton, Modal, SuggestionItem, SuggestionMenu } from '@/components/ui'
import { FOIL_STYLES, rarityTextClass } from '@/constants/card'
import { useClickOutside } from '@/hooks/useClickOutside'
import type { CatalogCard, CatalogSet, NewCard } from '@/types'
import { cn } from '@/utils/cn'

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

const toCard = (e: SetCardEntry): NewCard => ({
  name: e.catalog.name,
  set: e.catalog.set,
  setCode: e.catalog.setCode,
  rarity: e.catalog.rarity,
  catalogCardId: e.catalog.cardId,
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
  onSave: (cards: NewCard[]) => Promise<boolean>
  onClose: () => void
}

/** Bulk-add cards from a whole set, choosing which cards and their per-foil stock. */
export function AddSetModal({ onSave, onClose }: AddSetModalProps) {
  const [sets, setSets] = useState<CatalogSet[]>([])
  const [setQuery, setSetQuery] = useState('')
  const [chosenSet, setChosenSet] = useState<CatalogSet | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [entries, setEntries] = useState<SetCardEntry[]>([])
  const [loadingCards, setLoadingCards] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const cardsRequest = useRef<AbortController | null>(null)
  useClickOutside(
    searchRef,
    useCallback(() => setShowSuggestions(false), []),
  )

  useEffect(() => {
    const controller = new AbortController()
    catalogApi
      .sets(controller.signal)
      .then(setSets)
      .catch((err) => {
        if (!isAbort(err)) setLoadError(errorMessage(err))
      })
    return () => {
      controller.abort()
      cardsRequest.current?.abort()
    }
  }, [])

  const q = setQuery.toLowerCase()
  const filteredSets = sets.filter(
    (s) => !q || s.name.toLowerCase().includes(q) || s.setCode.toLowerCase().includes(q),
  )
  const selectedCount = entries.filter((e) => e.selected).length

  const selectSet = async (set: CatalogSet) => {
    setChosenSet(set)
    setSetQuery(set.name)
    setShowSuggestions(false)
    setEntries([])
    setLoadError(null)
    setLoadingCards(true)

    cardsRequest.current?.abort()
    const controller = new AbortController()
    cardsRequest.current = controller
    try {
      const cards = await catalogApi.setCards(set.setCode, controller.signal)
      setEntries(cards.map((c) => ({ catalog: c, selected: true, stockNF: 0, stockCF: 0, stockRF: 0 })))
      setLoadingCards(false)
    } catch (err) {
      if (isAbort(err)) return
      setLoadError(errorMessage(err))
      setLoadingCards(false)
    }
  }

  const updateEntry = (idx: number, patch: Partial<SetCardEntry>) =>
    setEntries((prev) => prev.map((e, i) => (i === idx ? { ...e, ...patch } : e)))

  const toggleAll = (selected: boolean) => setEntries((prev) => prev.map((e) => ({ ...e, selected })))

  const handleSave = async () => {
    const newCards = entries.filter((e) => e.selected).map(toCard)
    if (newCards.length === 0) return
    setSaving(true)
    const ok = await onSave(newCards)
    setSaving(false)
    if (ok) onClose()
  }

  const canSave = selectedCount > 0 && !saving

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
                  key={s.setCode}
                  className="px-4 py-2.5 text-sm text-foreground"
                  onSelect={() => void selectSet(s)}
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    {s.setCode} · {s.cardCount} cards
                  </span>
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
                    key={`${entry.catalog.cardId}-${entry.catalog.name}`}
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
                      <span className={cn('text-xs', rarityTextClass(entry.catalog.rarity))}>
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

      {chosenSet && loadingCards && (
        <div className="flex flex-1 items-center justify-center py-12 text-sm text-muted-foreground">
          Loading cards…
        </div>
      )}

      {loadError && (
        <div className="flex flex-1 items-center justify-center py-12 text-sm text-danger">{loadError}</div>
      )}

      {chosenSet && !loadingCards && !loadError && entries.length === 0 && (
        <div className="flex flex-1 items-center justify-center py-12 text-sm text-muted-foreground">
          No cards found for this set in the catalog.
        </div>
      )}

      {!chosenSet && !loadError && (
        <div className="flex flex-1 items-center justify-center py-16 text-sm text-muted-foreground">
          Select a set above to see its cards.
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t border-border px-6 py-4">
        <ModalCancelButton onClick={onClose} />
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={!canSave}
          className={cn(
            'rounded px-5 py-2 text-sm font-semibold',
            canSave
              ? 'bg-primary text-primary-foreground'
              : 'cursor-not-allowed bg-muted text-muted-foreground',
          )}
        >
          {saving
            ? 'Adding…'
            : `Add ${selectedCount > 0 ? `${selectedCount} Card${selectedCount > 1 ? 's' : ''}` : 'Cards'}`}
        </button>
      </div>
    </Modal>
  )
}
