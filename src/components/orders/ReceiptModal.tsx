import { Modal } from '@/components/ui'
import type { Order } from '@/types'
import { OrderDetailCard } from './OrderDetailCard'

export function ReceiptModal({ order, onClose }: { order: Order; onClose: () => void }) {
  return (
    <Modal onClose={onClose} className="max-h-[90vh] max-w-lg overflow-hidden overflow-y-auto bg-card">
      <OrderDetailCard order={order} />
    </Modal>
  )
}
