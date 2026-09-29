import { FOIL_FIELDS } from '@/constants/card'
import type { Card, FoilType } from '@/types'

export const totalStock = (c: Card) => (c.stockNF ?? 0) + (c.stockCF ?? 0) + (c.stockRF ?? 0)

export const foilStock = (c: Card, foil: FoilType) => (c[FOIL_FIELDS[foil].stock] as number) ?? 0

export const foilSellPrice = (c: Card, foil: FoilType) => (c[FOIL_FIELDS[foil].price] as number) ?? 0

/** Sell price averaged across foils, weighted by stock (plain average when out of stock). */
export const avgSellPrice = (c: Card): number => {
  const total = totalStock(c)
  const nf = c.sellPriceNF ?? 0
  const cf = c.sellPriceCF ?? 0
  const rf = c.sellPriceRF ?? 0
  if (total === 0) return Math.round((nf + cf + rf) / 3)
  return Math.round((nf * c.stockNF + cf * c.stockCF + rf * c.stockRF) / total)
}

/** Text color for a stock quantity: red when empty, amber when low (≤ 2). */
export const stockLevelClass = (qty: number) =>
  qty === 0 ? 'text-danger' : qty <= 2 ? 'text-primary' : 'text-foreground'
