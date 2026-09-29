import { PATHS } from '@/routes/paths'

export interface NavItem {
  to: string
  label: string
  icon: string
}

/** Primary navigation, in display order (sidebar and mobile bottom bar). */
export const NAV_ITEMS: NavItem[] = [
  { to: PATHS.home, label: 'Home', icon: '⌂' },
  { to: PATHS.receipt, label: 'Receipt', icon: '◻' },
  { to: PATHS.stock, label: 'Stock', icon: '◈' },
  { to: PATHS.sales, label: 'Sales', icon: '⊕' },
  { to: PATHS.watchlist, label: 'Watchlist', icon: '◎' },
]
