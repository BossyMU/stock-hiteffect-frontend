import { cn } from '@/utils/cn'

interface CheckboxToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}

/** Pill-shaped button with a checkbox, e.g. "In stock only". */
export function CheckboxToggle({ checked, onChange, label }: CheckboxToggleProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'flex items-center gap-2 whitespace-nowrap rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors',
        checked
          ? 'border-success/31 bg-success/12 text-success'
          : 'border-border bg-card text-muted-foreground',
      )}
    >
      <span
        className={cn(
          'flex h-3.5 w-3.5 items-center justify-center rounded-sm border-[1.5px] text-xs',
          checked ? 'border-success bg-success' : 'border-muted-foreground bg-transparent',
        )}
      >
        {checked && <span className="text-[9px] leading-none text-white">✓</span>}
      </span>
      {label}
    </button>
  )
}
