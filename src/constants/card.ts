import type { Card, FoilType, Rarity } from '@/types'

export const FOIL_TYPES: FoilType[] = ['Non-Foil', 'Cold Foil', 'Rainbow Foil']

/** Maps each foil finish to the Card fields holding its stock and sell price. */
export const FOIL_FIELDS: Record<FoilType, { stock: keyof Card; price: keyof Card }> = {
  'Non-Foil': { stock: 'stockNF', price: 'sellPriceNF' },
  'Cold Foil': { stock: 'stockCF', price: 'sellPriceCF' },
  'Rainbow Foil': { stock: 'stockRF', price: 'sellPriceRF' },
}

interface FoilStyle {
  short: string
  text: string
  /** Badge / pill: tinted background + border. */
  badge: string
  /** Row highlight when the foil has stock. */
  highlight: string
  /** Softer row highlight (thinner border tint). */
  highlightSubtle: string
  border: string
}

export const FOIL_STYLES: Record<FoilType, FoilStyle> = {
  'Non-Foil': {
    short: 'NF',
    text: 'text-foil-nf',
    badge: 'text-foil-nf bg-foil-nf/10 border-foil-nf/25',
    highlight: 'bg-foil-nf/6 border-foil-nf/25',
    highlightSubtle: 'bg-foil-nf/6 border-foil-nf/19',
    border: 'border-foil-nf/25',
  },
  'Cold Foil': {
    short: 'CF',
    text: 'text-foil-cf',
    badge: 'text-foil-cf bg-foil-cf/10 border-foil-cf/25',
    highlight: 'bg-foil-cf/6 border-foil-cf/25',
    highlightSubtle: 'bg-foil-cf/6 border-foil-cf/19',
    border: 'border-foil-cf/25',
  },
  'Rainbow Foil': {
    short: 'RF',
    text: 'text-foil-rf',
    badge: 'text-foil-rf bg-foil-rf/10 border-foil-rf/25',
    highlight: 'bg-foil-rf/6 border-foil-rf/25',
    highlightSubtle: 'bg-foil-rf/6 border-foil-rf/19',
    border: 'border-foil-rf/25',
  },
}

export const RARITY_TEXT: Record<Rarity, string> = {
  Legendary: 'text-rarity-legendary',
  Majestic: 'text-rarity-majestic',
  Rare: 'text-rarity-rare',
  Common: 'text-rarity-common',
  Token: 'text-rarity-token',
  Basic: 'text-rarity-basic',
}
