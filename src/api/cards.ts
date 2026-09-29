import type { Card, NewCard } from '@/types'
import { request } from './client'

export const cardsApi = {
  list: () => request<Card[]>('/cards'),
  create: (card: NewCard) => request<Card>('/cards', { method: 'POST', body: card }),
  createMany: (cards: NewCard[]) => request<Card[]>('/cards/bulk', { method: 'POST', body: cards }),
  update: (card: Card) => request<Card>(`/cards/${card.id}`, { method: 'PUT', body: card }),
  remove: (id: string) => request<void>(`/cards/${id}`, { method: 'DELETE' }),
}
