import type { Condition, FoilType } from './card'

export type OrderStatus = 'unpaid' | 'paid' | 'cancelled' | 'delivered'
export type PaymentMethod = 'Cash' | 'PromptPay' | 'Bank Transfer' | 'Credit Card'

export interface OrderItem {
  cardId: string
  cardName: string
  condition: Condition
  foil: FoilType
  qty: number
  unitPrice: number
}

export interface Order {
  id: string
  receiptId: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  paymentMethod: PaymentMethod
  date: string
  note: string
}
