import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

/** Small red "✕" square used to delete a table row. */
export function RemoveButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label="Remove"
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded border border-danger/20 bg-danger/8 text-sm font-bold text-danger',
        className,
      )}
      {...props}
    >
      ✕
    </button>
  )
}
