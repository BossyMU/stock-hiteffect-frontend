import { useState } from 'react'
import {
  Button,
  CheckboxToggle,
  PageHeader,
  Pagination,
  SearchInput,
  StatCard,
  StatGrid,
} from '@/components/ui'
import { useShopData } from '@/context/ShopDataContext'
import { usePagination } from '@/hooks/usePagination'
import type { Card } from '@/types'
import { avgSellPrice, totalStock } from '@/utils/card'
import { formatBaht, signed } from '@/utils/format'
import { AddCardModal } from './components/AddCardModal'
import { AddSetModal } from './components/AddSetModal'
import { EditStockModal } from './components/EditStockModal'
import { FoilBreakdownModal } from './components/FoilBreakdownModal'
import { StockTable } from './components/StockTable'

const matchesSearch = (c: Card, q: string) =>
  c.name.toLowerCase().includes(q) || c.set.toLowerCase().includes(q) || c.setCode.toLowerCase().includes(q)

export default function StockPage() {
  const { cards, addCard, addCards, updateCard, removeCard } = useShopData()
  const [search, setSearch] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [viewCard, setViewCard] = useState<Card | null>(null)
  const [editCard, setEditCard] = useState<Card | null>(null)
  const [addingCard, setAddingCard] = useState(false)
  const [addingSet, setAddingSet] = useState(false)

  const q = search.toLowerCase()
  const filtered = cards.filter((c) => matchesSearch(c, q) && (!inStockOnly || totalStock(c) > 0))
  const { page, setPage, paged, pageSize, total } = usePagination(filtered)

  const totalCards = cards.reduce((s, c) => s + totalStock(c), 0)
  const marketValue = cards.reduce((s, c) => s + avgSellPrice(c) * totalStock(c), 0)
  const gain = cards.reduce((s, c) => s + (avgSellPrice(c) - c.buyPrice) * totalStock(c), 0)

  return (
    <div className="space-y-5">
      {viewCard && <FoilBreakdownModal card={viewCard} onClose={() => setViewCard(null)} />}
      {editCard && <EditStockModal card={editCard} onSave={updateCard} onClose={() => setEditCard(null)} />}
      {addingCard && <AddCardModal onSave={addCard} onClose={() => setAddingCard(false)} />}
      {addingSet && <AddSetModal onSave={addCards} onClose={() => setAddingSet(false)} />}
      <PageHeader
        title="Stock"
        subtitle={`${cards.length} SKUs`}
        actions={
          <>
            <Button className="rounded-lg" onClick={() => setAddingCard(true)}>
              + Add Card
            </Button>
            <Button variant="destructive" className="rounded-lg" onClick={() => setAddingSet(true)}>
              + Add Set
            </Button>
          </>
        }
      />

      <StatGrid>
        <StatCard label="Total Cards" value={String(totalCards)} sub={`${cards.length} SKUs`} />
        <StatCard
          label="Total Market Price"
          value={formatBaht(marketValue)}
          sub="Based on stock qty"
          accent
        />
        <StatCard
          label="Total Gain / Loss"
          value={signed(gain) + formatBaht(gain)}
          sub="vs. buy price"
          accent={gain >= 0}
        />
      </StatGrid>

      <div className="flex flex-wrap items-center gap-2">
        <SearchInput
          aria-label="Search stock"
          placeholder="Search by name, set, or set code…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />
        <CheckboxToggle
          label="In stock only"
          checked={inStockOnly}
          onChange={(v) => {
            setInStockOnly(v)
            setPage(1)
          }}
        />
      </div>

      <StockTable
        cards={paged}
        isEmpty={filtered.length === 0}
        onView={setViewCard}
        onEdit={setEditCard}
        onRemove={removeCard}
      />
      <Pagination page={page} total={total} pageSize={pageSize} onChange={setPage} />
    </div>
  )
}
