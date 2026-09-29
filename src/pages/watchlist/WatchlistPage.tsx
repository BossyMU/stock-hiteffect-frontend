import { useState } from 'react'
import { Button, FilterChip, PageHeader, SearchInput, StatCard, StatGrid } from '@/components/ui'
import { PRIORITY_CONFIG, WATCH_PRIORITIES } from '@/constants/watchlist'
import { useShopData } from '@/context/ShopDataContext'
import type { WatchItem, WatchPriority } from '@/types'
import { averagePriceChangePct } from '@/utils/watchlist'
import { AddWatchItemModal } from './components/AddWatchItemModal'
import { UpdatePriceModal } from './components/UpdatePriceModal'
import { WatchlistTable } from './components/WatchlistTable'

type PriorityFilter = 'all' | WatchPriority

export default function WatchlistPage() {
  const { cards, watchlist, addWatchItem, updateWatchItem, removeWatchItem } = useShopData()
  const [adding, setAdding] = useState(false)
  const [updatingItem, setUpdatingItem] = useState<WatchItem | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [search, setSearch] = useState('')

  const q = search.toLowerCase()
  const filtered = watchlist.filter(
    (w) =>
      (priorityFilter === 'all' || w.priority === priorityFilter) &&
      (!q || w.cardName.toLowerCase().includes(q) || w.setCode.toLowerCase().includes(q)),
  )

  const { pct: avgChange, count: withHistory } = averagePriceChangePct(watchlist)
  const avgUp = avgChange != null && avgChange >= 0

  return (
    <div className="space-y-5">
      {adding && <AddWatchItemModal cards={cards} onSave={addWatchItem} onClose={() => setAdding(false)} />}
      {updatingItem && (
        <UpdatePriceModal
          item={updatingItem}
          onSave={updateWatchItem}
          onClose={() => setUpdatingItem(null)}
        />
      )}
      <PageHeader
        title="Watchlist"
        subtitle={`${watchlist.length} cards tracked`}
        actions={
          <Button className="rounded-lg" onClick={() => setAdding(true)}>
            + Add Card
          </Button>
        }
      />

      <StatGrid>
        <StatCard label="Watching" value={String(watchlist.length)} sub="Total cards" />
        <StatCard
          label="Avg Price Change"
          value={avgChange == null ? '—' : `${avgUp ? '+' : ''}${avgChange.toFixed(1)}%`}
          sub={withHistory > 0 ? `across ${withHistory} cards` : 'No price history yet'}
          accent={avgUp}
        />
        <StatCard
          label="High Priority"
          value={String(watchlist.filter((w) => w.priority === 'high').length)}
          sub="Need attention"
        />
      </StatGrid>

      <div className="flex flex-wrap items-center gap-2">
        <SearchInput
          aria-label="Search watchlist"
          placeholder="Search by name or set code…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-1.5">
          <FilterChip
            className="py-2"
            active={priorityFilter === 'all'}
            onClick={() => setPriorityFilter('all')}
          >
            All
          </FilterChip>
          {WATCH_PRIORITIES.map((p) => (
            <FilterChip
              key={p}
              className="py-2"
              tone={PRIORITY_CONFIG[p].tone}
              active={priorityFilter === p}
              onClick={() => setPriorityFilter(p)}
            >
              {PRIORITY_CONFIG[p].label}
            </FilterChip>
          ))}
        </div>
      </div>

      <WatchlistTable
        items={filtered}
        emptyMessage={
          watchlist.length === 0
            ? 'No cards on watchlist yet. Add one to get started.'
            : 'No cards match this filter.'
        }
        onUpdatePrice={setUpdatingItem}
        onRemove={removeWatchItem}
      />
    </div>
  )
}
