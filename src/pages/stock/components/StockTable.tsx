import { Button, DataTable, RemoveButton, TableCell, TableRow } from '@/components/ui'
import { FOIL_STYLES, FOIL_TYPES, rarityTextClass } from '@/constants/card'
import type { Card } from '@/types'
import { avgSellPrice, foilSellPrice, stockLevelClass, totalStock } from '@/utils/card'
import { cn } from '@/utils/cn'
import { formatBaht, signed } from '@/utils/format'

const HEADERS = ['Card Name', 'Set ID', 'Rarity', 'Stock', 'Market Price', 'Gain / Loss', 'Edit', '']

interface StockTableProps {
  cards: Card[]
  isEmpty: boolean
  onView: (card: Card) => void
  onEdit: (card: Card) => void
  onRemove: (id: string) => void
}

export function StockTable({ cards, isEmpty, onView, onEdit, onRemove }: StockTableProps) {
  return (
    <DataTable headers={HEADERS} isEmpty={isEmpty} emptyMessage="No cards found.">
      {cards.map((c) => {
        const stock = totalStock(c)
        const gain = avgSellPrice(c) - c.buyPrice
        const pct = c.buyPrice > 0 ? Math.round((gain / c.buyPrice) * 100) : null
        const gainClass = gain >= 0 ? 'text-success' : 'text-danger'
        return (
          <TableRow key={c.id} className="cursor-pointer" onClick={() => onView(c)}>
            <TableCell className="font-medium">{c.name}</TableCell>
            <TableCell>
              <span className="font-mono text-xs font-semibold text-muted-foreground">{c.setCode}</span>
            </TableCell>
            <TableCell>
              <span className={cn('text-xs font-medium', rarityTextClass(c.rarity))}>{c.rarity}</span>
            </TableCell>
            <TableCell>
              <span className={cn('font-mono font-semibold', stockLevelClass(stock))}>{stock}</span>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 font-mono text-xs">
                {FOIL_TYPES.map((f) => (
                  <span key={f} className={FOIL_STYLES[f].text}>
                    {FOIL_STYLES[f].short} {formatBaht(foilSellPrice(c, f))}
                  </span>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <span className={cn('font-mono text-sm font-semibold', gainClass)}>
                {signed(gain)}
                {formatBaht(gain)}
              </span>
              {pct !== null && (
                <span className={cn('ml-1.5 font-mono text-xs', gainClass)}>
                  ({signed(gain)}
                  {pct}%)
                </span>
              )}
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <Button variant="soft" size="sm" onClick={() => onEdit(c)}>
                Edit
              </Button>
            </TableCell>
            <TableCell className="px-2" onClick={(e) => e.stopPropagation()}>
              <RemoveButton aria-label={`Remove ${c.name}`} onClick={() => onRemove(c.id)} />
            </TableCell>
          </TableRow>
        )
      })}
    </DataTable>
  )
}
