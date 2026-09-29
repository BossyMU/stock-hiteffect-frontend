import { NavLink } from 'react-router'
import { PATHS } from '@/routes/paths'
import { cn } from '@/utils/cn'
import { NAV_ITEMS } from './navItems'

export function MobileBottomNav() {
  return (
    <nav className="flex shrink-0 border-t border-sidebar-border bg-sidebar md:hidden">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === PATHS.home}
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-medium',
              isActive ? 'text-primary' : 'text-muted-foreground',
            )
          }
        >
          <span className="text-lg leading-none">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
