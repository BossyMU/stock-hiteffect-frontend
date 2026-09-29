import { useMemo, useState } from 'react'
import {
  DataTable,
  FilterChip,
  PageHeader,
  Pagination,
  Select,
  StatCard,
  StatGrid,
  StatusBadge,
  TableCell,
  TableRow,
} from '@/components/ui'
import { ORDER_STATUSES, STATUS_CONFIG } from '@/constants/order'
import type { Tone } from '@/constants/tone'
import { useShopData } from '@/context/ShopDataContext'
import { usePagination } from '@/hooks/usePagination'
import type { Order, OrderStatus } from '@/types'
import { formatBaht } from '@/utils/format'

type StatusFilter = OrderStatus | 'open' | 'all'

const isOpen = (o: Order) => o.status === 'unpaid' || o.status === 'paid'

const FILTER_TABS: { key: StatusFilter; label: string; tone?: Tone }[] = [
  { key: 'all', label: 'All' },
  { key: 'open', label: 'Open', tone: 'info' },
  ...(['unpaid', 'paid', 'delivered', 'cancelled'] as const).map((s) => ({
    key: s,
    label: STATUS_CONFIG[s].label,
    tone: STATUS_CONFIG[s].tone,
  })),
]

const matchesFilter = (o: Order, filter: StatusFilter) =>
  filter === 'all' ? true : filter === 'open' ? isOpen(o) : o.status === filter

const HEADERS = ['Receipt', 'Date', 'Items', 'Payment', 'Total', 'Status', '']

export default function SalesPage() {
  const { orders, updateOrderStatus } = useShopData()
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const filtered = useMemo(
    () => orders.filter((o) => matchesFilter(o, statusFilter)).sort((a, b) => b.date.localeCompare(a.date)),
    [orders, statusFilter],
  )
  const { page, setPage, paged, pageSize, total } = usePagination(filtered)

  const openOrders = orders.filter(isOpen)
  const deliveredRevenue = orders.filter((o) => o.status === 'delivered').reduce((s, o) => s + o.total, 0)
  const cancelledCount = orders.filter((o) => o.status === 'cancelled').length

  return (
    <div className="space-y-5">
      <PageHeader title="Sales" subtitle={`${orders.length} total orders`} />

      <StatGrid>
        <StatCard label="Revenue" value={formatBaht(deliveredRevenue)} accent />
        <StatCard
          label="Open Orders"
          value={String(openOrders.length)}
          sub={formatBaht(openOrders.reduce((s, o) => s + o.total, 0))}
        />
        <StatCard label="Cancelled" value={String(cancelledCount)} sub="This period" />
      </StatGrid>

      <div className="flex flex-nowrap gap-2 overflow-x-auto">
        {FILTER_TABS.map((tab) => (
          <FilterChip
            key={tab.key}
            tone={tab.tone}
            active={statusFilter === tab.key}
            onClick={() => {
              setStatusFilter(tab.key)
              setPage(1)
            }}
          >
            {tab.label}
            <span className="ml-1.5 opacity-60">
              {orders.filter((o) => matchesFilter(o, tab.key)).length}
            </span>
          </FilterChip>
        ))}
      </div>

      <DataTable
        headers={HEADERS}
        isEmpty={filtered.length === 0}
        emptyMessage="No orders match this filter."
      >
        {paged.map((o) => (
          <TableRow key={o.id}>
            <TableCell className="font-mono text-xs font-semibold text-primary">{o.receiptId}</TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">{o.date}</TableCell>
            <TableCell className="text-xs text-muted-foreground">
              {o.items.length} item{o.items.length > 1 ? 's' : ''}
            </TableCell>
            <TableCell className="text-xs text-muted-foreground">{o.paymentMethod}</TableCell>
            <TableCell className="font-mono font-semibold">{formatBaht(o.total)}</TableCell>
            <TableCell>
              <StatusBadge status={o.status} />
            </TableCell>
            <TableCell>
              <Select
                aria-label={`Change status of ${o.receiptId}`}
                className="px-2 py-1 text-xs text-muted-foreground"
                value={o.status}
                onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_CONFIG[s].label}
                  </option>
                ))}
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>

      <Pagination page={page} total={total} pageSize={pageSize} onChange={setPage} />
    </div>
  )
}
