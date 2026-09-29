import { useCallback, useId, useRef, useState } from 'react'
import { FieldLabel, SuggestionItem, SuggestionMenu, TextInput } from '@/components/ui'
import { RARITY_TEXT } from '@/constants/card'
import { CARD_CATALOG } from '@/data/cardCatalog'
import { useClickOutside } from '@/hooks/useClickOutside'
import type { CatalogCard } from '@/types'

const MAX_RESULTS = 10

/** Autocomplete over the card catalog, matching on card name or set code. */
export function CardSearchField({ onSelect }: { onSelect: (card: CatalogCard) => void }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inputId = useId()
  useClickOutside(
    ref,
    useCallback(() => setOpen(false), []),
  )

  const q = query.trim().toLowerCase()
  const results = q
    ? CARD_CATALOG.filter(
        (c) => c.name.toLowerCase().includes(q) || c.setCode.toLowerCase().includes(q),
      ).slice(0, MAX_RESULTS)
    : []

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
      {open && results.length > 0 && (
        <SuggestionMenu>
          {results.map((c) => (
            <SuggestionItem key={`${c.setCode}-${c.name}`} className="px-3 py-2.5" onSelect={() => select(c)}>
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="mt-0.5 text-xs">
                <span className="font-mono font-semibold text-primary">{c.setCode}</span>
                <span className="ml-1.5 text-muted-foreground">{c.set}</span>
                <span className={`ml-2 ${RARITY_TEXT[c.rarity]}`}>· {c.rarity}</span>
              </p>
            </SuggestionItem>
          ))}
        </SuggestionMenu>
      )}
    </div>
  )
}
