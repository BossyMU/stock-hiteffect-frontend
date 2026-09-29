import type { HTMLAttributes, ReactNode, TdHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface DataTableProps {
  headers: string[]
  children: ReactNode
  /** Shown under the header row when there are no rows. */
  emptyMessage?: ReactNode
  isEmpty?: boolean
}

/** Bordered, horizontally scrollable table with the standard header style. */
export function DataTable({ headers, children, emptyMessage, isEmpty }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted">
              {headers.map((h, i) => (
                <th
                  key={`${h}-${i}`}
                  className="px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
        {isEmpty && <EmptyState>{emptyMessage}</EmptyState>}
      </div>
    </div>
  )
}

/** Zebra-striped row that highlights on hover. */
export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn('border-b border-border odd:bg-card even:bg-secondary hover:bg-muted', className)}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('px-4 py-3', className)} {...props} />
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="bg-card py-12 text-center text-sm text-muted-foreground">{children}</div>
}
