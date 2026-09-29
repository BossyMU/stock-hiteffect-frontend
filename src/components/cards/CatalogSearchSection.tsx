import { Overline } from '@/components/ui'
import type { CatalogCard } from '@/types'
import { CardSearchField } from './CardSearchField'
import { SelectedCardBanner } from './SelectedCardBanner'

interface CatalogSearchSectionProps {
  selected: Pick<CatalogCard, 'name' | 'setCode' | 'rarity'> | null
  onSelect: (card: CatalogCard) => void
}

/** "Search Card Catalog" block used at the top of the add-card style modals. */
export function CatalogSearchSection({ selected, onSelect }: CatalogSearchSectionProps) {
  return (
    <div className="mb-4 border-b border-border pb-4">
      <Overline className="mb-3">Search Card Catalog</Overline>
      <CardSearchField onSelect={onSelect} />
      {selected && <SelectedCardBanner {...selected} />}
    </div>
  )
}
