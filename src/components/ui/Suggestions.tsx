import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

/** Floating dropdown panel for autocomplete suggestions. */
export function SuggestionMenu({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      role="listbox"
      className={cn(
        'absolute z-20 mt-1 max-h-64 w-full overflow-hidden overflow-y-auto rounded-lg border border-border bg-secondary shadow-xl',
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * A suggestion row. Selection fires on mousedown so it wins the race
 * against the input's blur / click-outside handler.
 */
export function SuggestionItem({
  onSelect,
  className,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onMouseDown'> & { onSelect: () => void }) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={false}
      onMouseDown={onSelect}
      className={cn('w-full border-b border-border text-left transition-colors hover:bg-muted', className)}
      {...props}
    />
  )
}
