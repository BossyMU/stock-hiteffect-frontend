import type { CatalogCard, CatalogSet } from '@/types'
import { request } from './client'

export const catalogApi = {
  /** Autocomplete: match on card name or set code. */
  search: (q: string, limit: number, signal?: AbortSignal) =>
    request<CatalogCard[]>('/catalog/cards', { query: { q, limit }, signal }),
  sets: (signal?: AbortSignal) => request<CatalogSet[]>('/catalog/sets', { signal }),
  setCards: (setCode: string, signal?: AbortSignal) =>
    request<CatalogCard[]>(`/catalog/sets/${encodeURIComponent(setCode)}/cards`, { signal }),
}
