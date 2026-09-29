import { useEffect, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ModalProps {
  onClose: () => void
  children: ReactNode
  /** Classes for the panel, e.g. width (`max-w-lg`) and padding. */
  className?: string
  labelledBy?: string
}

/** Centered dialog over a dimmed backdrop. Closes on backdrop click or Escape. */
export function Modal({ onClose, children, className, labelledBy }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cn('mx-4 w-full rounded-xl border border-border bg-secondary', className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

interface ModalActionsProps {
  onCancel: () => void
  onConfirm: () => void
  confirmLabel: ReactNode
  confirmDisabled?: boolean
  className?: string
}

/** Right-aligned "Cancel" + primary action pair used at the bottom of modals. */
export function ModalActions({
  onCancel,
  onConfirm,
  confirmLabel,
  confirmDisabled,
  className,
}: ModalActionsProps) {
  return (
    <div className={cn('flex justify-end gap-3', className)}>
      <ModalCancelButton onClick={onCancel} />
      <ModalConfirmButton onClick={onConfirm} disabled={confirmDisabled}>
        {confirmLabel}
      </ModalConfirmButton>
    </div>
  )
}

export function ModalCancelButton({ onClick, label = 'Cancel' }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded bg-muted px-4 py-2 text-sm text-muted-foreground"
    >
      {label}
    </button>
  )
}

export function ModalConfirmButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
    >
      {children}
    </button>
  )
}
