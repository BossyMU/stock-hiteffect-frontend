import { cn } from '@/utils/cn'

/** Amber diamond logo tile. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-md bg-primary text-base font-bold text-primary-foreground',
        className,
      )}
    >
      ◆
    </div>
  )
}
