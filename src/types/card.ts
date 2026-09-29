export type Condition = 'NM' | 'LP' | 'MP' | 'HP' | 'DMG'
export type FoilType = 'Non-Foil' | 'Cold Foil' | 'Rainbow Foil'
export type Rarity =
  | 'Fabled'
  | 'Legendary'
  | 'Majestic'
  | 'Super Rare'
  | 'Rare'
  | 'Common'
  | 'Token'
  | 'Basic'
  | 'Marvel'
  | 'Promo'

/** A card SKU held in stock, with quantities and sell prices per foil finish. */
export interface Card {
  id: string
  name: string
  set: string
  setCode: string
  condition: Condition
  /** Master data collector number (e.g. "WTR001") when added from the catalog. */
  catalogCardId?: string | null
  stockNF: number
  stockCF: number
  stockRF: number
  buyPrice: number
  sellPriceNF: number
  sellPriceCF: number
  sellPriceRF: number
  rarity: Rarity
}

/** A card to create; the server assigns the id. */
export type NewCard = Omit<Card, 'id'>

/** A card from the master data catalog, used for search and "Add Set". */
export interface CatalogCard {
  /** Collector number, e.g. "WTR001". */
  cardId: string
  /** Includes the pitch color when the card has one, e.g. "Head Jab (Red)". */
  name: string
  set: string
  setCode: string
  rarity: Rarity
  imageUrl?: string | null
}

export interface CatalogSet {
  name: string
  setCode: string
  releaseDate: string | null
  cardCount: number
}
