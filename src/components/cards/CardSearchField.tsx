import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { catalogApi, isAbort } from '@/api'
import { FieldLabel, SuggestionItem, SuggestionMenu, TextInput } from '@/components/ui'
import { rarityTextClass } from '@/constants/card'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import type { CatalogCard } from '@/types'

const MAX_RESULTS = 10

/** Autocomplete over the master data card catalog, matching on card name or set code. */
export function CardSearchField({ onSelect }: { onSelect: (card: CatalogCard) => void }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<CatalogCard[]>([])
  const ref = useRef<HTMLDivElement>(null)
  const inputId = useId()
  useClickOutside(
    ref,
    useCallback(() => setOpen(false), []),
  )

  const q = useDebouncedValue(query.trim())

  useEffect(() => {
    if (!q) return
    const controller = new AbortController()
    catalogApi
      .search(q, MAX_RESULTS, controller.signal)
      .then(setResults)
      .catch((err) => {
        if (!isAbort(err)) setResults([])
      })
    return () => controller.abort()
  }, [q])

  const visible = query.trim() ? results : []

  const select = (card: CatalogCard) => {
    onSelect(card)
    setQuery(card.name)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <FieldLabel htmlFor={inputId}>Card Name or Set ID</FieldLabel>
      <TextInput
        id={inputId}
        className="w-full"
        placeholder="e.g. Snapdragon Scalers or WTR…"
        autoComplete="off"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
      />
      {open && visible.length > 0 && (
        <SuggestionMenu>
          {visible.map((c) => (
            <SuggestionItem
              key={`${c.setCode}-${c.cardId}-${c.name}`}
              className="px-3 py-2.5"
              onSelect={() => select(c)}
            >
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="mt-0.5 text-xs">
                <span className="font-mono font-semibold text-primary">{c.setCode}</span>
                <span className="ml-1.5 text-muted-foreground">{c.set}</span>
                <span className={`ml-2 ${rarityTextClass(c.rarity)}`}>· {c.rarity}</span>
              </p>
            </SuggestionItem>
          ))}
        </SuggestionMenu>
      )}
    </div>
  )
}
