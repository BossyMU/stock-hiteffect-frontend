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
  targetPct?: number | null
  targetPrice: number
  acceptedPrice?: number | null
  priceHistory: PricePoint[]
  note: string
  priority: WatchPriority
}

/** A watch item to create; the server assigns the id. */
export type NewWatchItem = Omit<WatchItem, 'id'>
