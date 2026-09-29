import { Modal, ModalCancelButton } from '@/components/ui'
import { FOIL_STYLES, FOIL_TYPES } from '@/constants/card'
import type { Card } from '@/types'
import { foilStock, stockLevelClass, totalStock } from '@/utils/card'
import { cn } from '@/utils/cn'

/** Read-only per-foil stock breakdown, opened by clicking a stock row. */
export function FoilBreakdownModal({ card, onClose }: { card: Card; onClose: () => void }) {
  return (
    <Modal onClose={onClose} className="max-w-xs p-6" labelledBy="foil-breakdown-title">
      <h2 id="foil-breakdown-title" className="mb-1 text-lg font-semibold">
        {card.name}
      </h2>
      <p className="mb-5 font-mono text-xs text-muted-foreground">
        {card.setCode} · {card.rarity}
      </p>

      <div className="space-y-2">
        {FOIL_TYPES.map((foil) => {
          const style = FOIL_STYLES[foil]
          const stock = foilStock(card, foil)
          return (
            <div
              key={foil}
              className={cn(
                'flex items-center justify-between rounded-lg border px-4 py-3',
                stock > 0 ? style.highlightSubtle : 'border-border bg-muted',
              )}
            >
              <div className="flex items-center gap-2">
                <span className={cn('w-6 font-mono text-xs font-bold', style.text)}>{style.short}</span>
                <span className="text-sm text-muted-foreground">{foil}</span>
              </div>
              <span className={cn('font-mono text-lg font-bold', stockLevelClass(stock))}>{stock}</span>
            </div>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="font-mono text-xs text-muted-foreground">
          Total: <span className="font-bold text-foreground">{totalStock(card)}</span>
        </span>
        <ModalCancelButton onClick={onClose} label="Close" />
      </div>
    </Modal>
  )
}
