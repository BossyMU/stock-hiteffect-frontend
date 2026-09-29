import { useState } from 'react'
import { ReceiptModal } from '@/components/orders'
import { PageHeader, StatCard, StatGrid } from '@/components/ui'
import { useShopData } from '@/context/ShopDataContext'
import type { Order } from '@/types'
import { today } from '@/utils/date'
import { formatBaht } from '@/utils/format'
import { RecentOrdersList } from './components/RecentOrdersList'

const RECENT_ORDER_COUNT = 8

export default function DashboardPage() {
  const { orders } = useShopData()
  const [viewOrder, setViewOrder] = useState<Order | null>(null)

  const todayStr = today()
  const delivered = orders.filter((o) => o.status === 'delivered')
  const deliveredTotal = delivered.reduce((s, o) => s + o.total, 0)
  const openOrders = orders.filter((o) => o.status === 'unpaid' || o.status === 'paid')
  const openTotal = openOrders.reduce((s, o) => s + o.total, 0)
  const recentOrders = [...orders].sort((a, b) => b.date.localeCompare(a.date)).slice(0, RECENT_ORDER_COUNT)

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle={`Overview · ${todayStr}`} />

      <StatGrid className="gap-4">
        <StatCard label="Revenue" value={formatBaht(deliveredTotal)} sub="All time" accent />
        <StatCard
          label="Open Orders"
          value={String(openOrders.length)}
          sub={`${formatBaht(openTotal)} outstanding`}
        />
        <StatCard
          label="Done Orders"
          value={String(delivered.length)}
          sub={`${delivered.filter((o) => o.date === todayStr).length} today · ${formatBaht(deliveredTotal)}`}
        />
      </StatGrid>

      <RecentOrdersList orders={recentOrders} onSelect={setViewOrder} />

      {viewOrder && <ReceiptModal order={viewOrder} onClose={() => setViewOrder(null)} />}
    </div>
  )
}
