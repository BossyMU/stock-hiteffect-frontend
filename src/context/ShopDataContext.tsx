import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { cardsApi, errorMessage, ordersApi, watchlistApi } from '@/api'
import type { Card, NewCard, NewWatchItem, Order, OrderStatus, WatchItem } from '@/types'

export type LoadStatus = 'loading' | 'ready' | 'error'

/**
 * Shop data (stock, orders, watchlist) loaded from stock-hiteffect-backend and shared across pages.
 *
 * Every action calls the API first and then stores what the server returned, so state always
 * matches the database. Actions resolve to `true` on success; on failure they resolve to `false`
 * and set `actionError`, which the layout shows as a toast.
 */
interface ShopData {
  cards: Card[]
  orders: Order[]
  watchlist: WatchItem[]

  status: LoadStatus
  loadError: string | null
  reload: () => Promise<void>

  actionError: string | null
  dismissActionError: () => void

  addCard: (card: NewCard) => Promise<boolean>
  addCards: (cards: NewCard[]) => Promise<boolean>
  updateCard: (card: Card) => Promise<boolean>
  removeCard: (id: string) => Promise<boolean>

  updateOrderStatus: (id: string, status: OrderStatus) => Promise<boolean>

  addWatchItem: (item: NewWatchItem) => Promise<boolean>
  updateWatchItem: (item: WatchItem) => Promise<boolean>
  removeWatchItem: (id: string) => Promise<boolean>
}

const ShopDataContext = createContext<ShopData | null>(null)

const replaceById = <T extends { id: string }>(list: T[], item: T) =>
  list.map((x) => (x.id === item.id ? item : x))

export function ShopDataProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [watchlist, setWatchlist] = useState<WatchItem[]>([])
  const [status, setStatus] = useState<LoadStatus>('loading')
  const [loadError, setLoadError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setStatus('loading')
    try {
      const [c, o, w] = await Promise.all([cardsApi.list(), ordersApi.list(), watchlistApi.list()])
      setCards(c)
      setOrders(o)
      setWatchlist(w)
      setLoadError(null)
      setStatus('ready')
    } catch (err) {
      setLoadError(errorMessage(err))
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    // Initial load; reload() only sets state after its requests settle.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload()
  }, [reload])

  const value = useMemo<ShopData>(() => {
    /** Run an API action; report failures through `actionError`. */
    const run = async (action: () => Promise<unknown>) => {
      try {
        await action()
        setActionError(null)
        return true
      } catch (err) {
        setActionError(errorMessage(err))
        return false
      }
    }

    return {
      cards,
      orders,
      watchlist,
      status,
      loadError,
      reload,
      actionError,
      dismissActionError: () => setActionError(null),

      addCard: (card) =>
        run(async () => {
          const created = await cardsApi.create(card)
          setCards((prev) => [...prev, created])
        }),
      addCards: (newCards) =>
        run(async () => {
          const created = await cardsApi.createMany(newCards)
          setCards((prev) => [...prev, ...created])
        }),
      updateCard: (card) =>
        run(async () => {
          const saved = await cardsApi.update(card)
          setCards((prev) => replaceById(prev, saved))
        }),
      removeCard: (id) =>
        run(async () => {
          await cardsApi.remove(id)
          setCards((prev) => prev.filter((c) => c.id !== id))
        }),

      updateOrderStatus: (id, newStatus) =>
        run(async () => {
          const saved = await ordersApi.updateStatus(id, newStatus)
          setOrders((prev) => replaceById(prev, saved))
          // Cancelling returns cards to stock (and un-cancelling takes them out), so refresh stock.
          setCards(await cardsApi.list())
        }),

      addWatchItem: (item) =>
        run(async () => {
          const created = await watchlistApi.create(item)
          setWatchlist((prev) => [...prev, created])
        }),
      updateWatchItem: (item) =>
        run(async () => {
          const saved = await watchlistApi.update(item)
          setWatchlist((prev) => replaceById(prev, saved))
        }),
      removeWatchItem: (id) =>
        run(async () => {
          await watchlistApi.remove(id)
          setWatchlist((prev) => prev.filter((w) => w.id !== id))
        }),
    }
  }, [cards, orders, watchlist, status, loadError, reload, actionError])

  return <ShopDataContext.Provider value={value}>{children}</ShopDataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShopData() {
  const ctx = useContext(ShopDataContext)
  if (!ctx) throw new Error('useShopData must be used inside <ShopDataProvider>')
  return ctx
}
