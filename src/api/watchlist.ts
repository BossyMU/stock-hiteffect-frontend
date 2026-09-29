import type { NewWatchItem, WatchItem } from '@/types'
import { request } from './client'

export const watchlistApi = {
  list: () => request<WatchItem[]>('/watchlist'),
  create: (item: NewWatchItem) => request<WatchItem>('/watchlist', { method: 'POST', body: item }),
  update: (item: WatchItem) => request<WatchItem>(`/watchlist/${item.id}`, { method: 'PUT', body: item }),
  remove: (id: string) => request<void>(`/watchlist/${id}`, { method: 'DELETE' }),
}
