import type { Condition, FoilType } from './card'

export type OrderStatus = 'unpaid' | 'paid' | 'cancelled' | 'delivered'
export type PaymentMethod = 'Cash' | 'PromptPay' | 'Bank Transfer' | 'Credit Card'

export interface OrderItem {
  /** null when the card has since been removed from stock. */
  cardId: string | null
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
