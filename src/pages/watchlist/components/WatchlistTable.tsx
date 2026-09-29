import {
  Button,
  DataTable,
  FoilBadge,
  PriorityBadge,
  RemoveButton,
  TableCell,
  TableRow,
} from '@/components/ui'
import type { WatchItem } from '@/types'
import { formatBaht } from '@/utils/format'
import { latestPrice, previousPrice } from '@/utils/watchlist'

const HEADERS = ['Card', 'Set', 'Foil', 'Market Price', 'Change', 'Accept Price', 'Priority', 'Action', '']

interface WatchlistTableProps {
  items: WatchItem[]
  emptyMessage: string
  onUpdatePrice: (item: WatchItem) => void
  onRemove: (id: string) => void
}

export function WatchlistTable({ items, emptyMessage, onUpdatePrice, onRemove }: WatchlistTableProps) {
  return (
    <DataTable headers={HEADERS} isEmpty={items.length === 0} emptyMessage={emptyMessage}>
      {items.map((w) => (
        <TableRow key={w.id}>
          <TableCell className="font-medium">{w.cardName}</TableCell>
          <TableCell className="font-mono text-xs font-semibold text-muted-foreground">{w.setCode}</TableCell>
          <TableCell>
            <FoilBadge foil={w.foil} />
          </TableCell>
          <TableCell className="font-mono font-bold">{formatBaht(latestPrice(w))}</TableCell>
          <TableCell>
            <PriceChange current={latestPrice(w)} previous={previousPrice(w)} />
          </TableCell>
          <TableCell>
            {w.acceptedPrice != null ? (
              <span className="font-mono text-sm font-semibold text-success">
                {formatBaht(w.acceptedPrice)}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">—</span>
            )}
          </TableCell>
          <TableCell>
            <PriorityBadge priority={w.priority} />
          </TableCell>
          <TableCell>
            <Button variant="soft" size="sm" onClick={() => onUpdatePrice(w)}>
              Price
            </Button>
          </TableCell>
          <TableCell className="px-3">
            <RemoveButton aria-label={`Remove ${w.cardName}`} onClick={() => onRemove(w.id)} />
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  )
}

/**
 * Change since the previous price point. Colors are from a buyer's view:
 * a price drop is good (green), a rise is bad (red).
 */
function PriceChange({ current, previous }: { current: number; previous: number }) {
  const delta = current - previous
  if (delta === 0) return <span className="font-mono text-xs text-muted-foreground">—</span>

  const up = delta > 0
  const pct = previous > 0 ? Math.round((delta / previous) * 100) : 0
  return (
    <span className={`font-mono text-xs font-semibold ${up ? 'text-danger' : 'text-success'}`}>
      {up ? '▲' : '▼'}
      <span className="ml-0.5 opacity-70">
        {up ? '+' : ''}
        {pct}%
      </span>{' '}
      {formatBaht(Math.abs(delta))}
    </span>
  )
}
