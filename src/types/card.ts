export type Condition = 'NM' | 'LP' | 'MP' | 'HP' | 'DMG'
export type FoilType = 'Non-Foil' | 'Cold Foil' | 'Rainbow Foil'
export type Rarity = 'Legendary' | 'Majestic' | 'Rare' | 'Common' | 'Token' | 'Basic'

/** A card SKU held in stock, with quantities and sell prices per foil finish. */
export interface Card {
  id: string
  name: string
  set: string
  setCode: string
  condition: Condition
  stockNF: number
  stockCF: number
  stockRF: number
  buyPrice: number
  sellPriceNF: number
  sellPriceCF: number
  sellPriceRF: number
  rarity: Rarity
}

/** An entry in the reference card catalog used for search / autocomplete. */
export interface CatalogCard {
  name: string
  set: string
  setCode: string
  rarity: Rarity
}
