import type { OrderStatus, PaymentMethod } from '@/types'
import type { Tone } from './tone'

export const ORDER_STATUSES: OrderStatus[] = ['unpaid', 'paid', 'delivered', 'cancelled']
export const PAYMENT_METHODS: PaymentMethod[] = ['Cash', 'PromptPay', 'Bank Transfer', 'Credit Card']

export const STATUS_CONFIG: Record<OrderStatus, { label: string; tone: Tone }> = {
  unpaid: { label: 'Unpaid', tone: 'primary' },
  paid: { label: 'Paid', tone: 'success' },
  delivered: { label: 'Delivered', tone: 'neutral' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
}
