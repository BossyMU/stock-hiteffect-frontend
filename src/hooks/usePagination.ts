import { useState } from 'react'
import { PAGE_SIZE } from '@/constants/pagination'

/** Client-side pagination. Call `setPage(1)` whenever the filters change. */
export function usePagination<T>(items: T[], pageSize = PAGE_SIZE) {
  const [page, setPage] = useState(1)
  const paged = items.slice((page - 1) * pageSize, page * pageSize)
  return { page, setPage, paged, pageSize, total: items.length }
}
