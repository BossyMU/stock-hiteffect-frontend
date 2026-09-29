import { Link, NavLink } from 'react-router'
import { PATHS } from '@/routes/paths'
import { cn } from '@/utils/cn'
import { BrandMark } from './BrandMark'
import { NAV_ITEMS } from './navItems'

/** Fixed-width left navigation. `onNavigate` lets the mobile drawer close itself. */
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full w-[220px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <Link
        to={PATHS.home}
        onClick={onNavigate}
        className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5 transition-opacity hover:opacity-80"
      >
        <BrandMark />
        <div className="text-left">
          <p className="text-sm font-bold leading-tight">CardVault</p>
          <p className="text-xs text-muted-foreground">TCG Shop POS</p>
        </div>
      </Link>

      <nav className="flex-1 space-y-1 px-3 pt-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === PATHS.home}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-primary/12 text-primary' : 'text-muted-foreground hover:text-foreground',
              )
            }
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-5 py-4">
        <p className="font-mono text-xs text-muted-foreground">v1.0 · CardVault</p>
      </div>
    </aside>
  )
}
