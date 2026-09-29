import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { SEED_CARDS } from '@/data/seedCards'
import { SEED_ORDERS } from '@/data/seedOrders'
import { SEED_WATCHLIST } from '@/data/seedWatchlist'
import type { Card, Order, OrderStatus, WatchItem } from '@/types'

/**
 * In-memory shop data (stock, orders, watchlist) shared across pages.
 * Seeded with mock data; swap the state setters for API calls when a backend exists.
 */
interface ShopData {
  cards: Card[]
  orders: Order[]
  watchlist: WatchItem[]

  addCard: (card: Card) => void
  addCards: (cards: Card[]) => void
  updateCard: (card: Card) => void
  removeCard: (id: string) => void

  updateOrderStatus: (id: string, status: OrderStatus) => void

  addWatchItem: (item: WatchItem) => void
  updateWatchItem: (item: WatchItem) => void
  removeWatchItem: (id: string) => void
}

const ShopDataContext = createContext<ShopData | null>(null)

export function ShopDataProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>(SEED_CARDS)
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS)
  const [watchlist, setWatchlist] = useState<WatchItem[]>(SEED_WATCHLIST)

  const value = useMemo<ShopData>(
    () => ({
      cards,
      orders,
      watchlist,

      addCard: (card) => setCards((prev) => [...prev, card]),
      addCards: (newCards) => setCards((prev) => [...prev, ...newCards]),
      updateCard: (card) => setCards((prev) => prev.map((c) => (c.id === card.id ? card : c))),
      removeCard: (id) => setCards((prev) => prev.filter((c) => c.id !== id)),

      updateOrderStatus: (id, status) =>
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o))),

      addWatchItem: (item) => setWatchlist((prev) => [...prev, item]),
      updateWatchItem: (item) => setWatchlist((prev) => prev.map((w) => (w.id === item.id ? item : w))),
      removeWatchItem: (id) => setWatchlist((prev) => prev.filter((w) => w.id !== id)),
    }),
    [cards, orders, watchlist],
  )

  return <ShopDataContext.Provider value={value}>{children}</ShopDataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShopData() {
  const ctx = useContext(ShopDataContext)
  if (!ctx) throw new Error('useShopData must be used inside <ShopDataProvider>')
  return ctx
}
