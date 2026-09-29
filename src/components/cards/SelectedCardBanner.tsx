import type { Rarity } from '@/types'

interface SelectedCardBannerProps {
  name: string
  setCode: string
  rarity: Rarity
}

/** Confirmation strip shown after picking a card from the catalog search. */
export function SelectedCardBanner({ name, setCode, rarity }: SelectedCardBannerProps) {
  return (
    <div className="mt-3 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/8 px-3 py-2 text-sm">
      <span className="text-primary">✓</span>
      <span className="font-medium">{name}</span>
      <span className="ml-1 font-mono text-xs text-muted-foreground">
        {setCode} · {rarity}
      </span>
    </div>
  )
}
