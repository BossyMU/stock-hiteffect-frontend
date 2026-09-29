import { useState } from 'react'
import { Outlet } from 'react-router'
import { MobileBottomNav } from './MobileBottomNav'
import { MobileTopBar } from './MobileTopBar'
import { Sidebar } from './Sidebar'

/** App shell: sidebar on desktop; top bar, drawer and bottom nav on mobile. */
export function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={closeDrawer}>
          <div className="h-full w-[220px]" onClick={(e) => e.stopPropagation()}>
            <Sidebar onNavigate={closeDrawer} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <MobileTopBar onOpenMenu={() => setDrawerOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-background px-4 py-5 md:px-8 md:py-7">
          <Outlet />
        </main>
        <MobileBottomNav />
      </div>
    </div>
  )
}
