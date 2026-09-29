import type { FoilType, Rarity } from './card'

export type WatchPriority = 'high' | 'normal' | 'low'

export interface PricePoint {
  date: string
  price: number
}

export interface WatchItem {
  id: string
  cardName: string
  setCode: string
  rarity: Rarity
  foil: FoilType
  targetPct?: number
  targetPrice: number
  acceptedPrice?: number
  priceHistory: PricePoint[]
  note: string
  priority: WatchPriority
}
