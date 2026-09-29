import { BrandMark } from './BrandMark'

export function MobileTopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 py-3 md:hidden">
      <button
        type="button"
        aria-label="Open menu"
        onClick={onOpenMenu}
        className="flex h-8 w-8 items-center justify-center rounded text-lg text-foreground"
      >
        ☰
      </button>
      <div className="flex items-center gap-2">
        <BrandMark className="h-6 w-6 rounded text-xs" />
        <span className="text-sm font-bold">CardVault</span>
      </div>
      <div className="w-8" />
    </div>
  )
}
