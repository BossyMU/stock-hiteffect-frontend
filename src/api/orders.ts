import type { Order, OrderStatus } from '@/types'
import { request } from './client'

export const ordersApi = {
  list: () => request<Order[]>('/orders'),
  getByReceiptId: (receiptId: string, signal?: AbortSignal) =>
    request<Order>(`/orders/receipt/${encodeURIComponent(receiptId)}`, { signal }),
  updateStatus: (id: string, status: OrderStatus) =>
    request<Order>(`/orders/${id}/status`, { method: 'PATCH', body: { status } }),
}
