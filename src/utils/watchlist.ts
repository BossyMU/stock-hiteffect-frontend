import type { WatchItem } from '@/types'

export const latestPrice = (w: WatchItem) => w.priceHistory[w.priceHistory.length - 1]?.price ?? 0

export const previousPrice = (w: WatchItem) =>
  w.priceHistory[w.priceHistory.length - 2]?.price ?? latestPrice(w)

/** Average % change from first to latest price across items with at least two data points. */
export const averagePriceChangePct = (items: WatchItem[]): { pct: number | null; count: number } => {
  const withHistory = items.filter((w) => w.priceHistory.length >= 2)
  if (withHistory.length === 0) return { pct: null, count: 0 }
  const sum = withHistory.reduce((s, w) => {
    const first = w.priceHistory[0].price
    const last = latestPrice(w)
    return s + (first > 0 ? ((last - first) / first) * 100 : 0)
  }, 0)
  return { pct: sum / withHistory.length, count: withHistory.length }
}
