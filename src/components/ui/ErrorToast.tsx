interface ErrorToastProps {
  message: string
  onDismiss: () => void
}

/** Dismissible error shown bottom-right, above modals. */
export function ErrorToast({ message, onDismiss }: ErrorToastProps) {
  return (
    <div
      role="alert"
      className="fixed right-4 bottom-20 z-[60] flex max-w-sm items-start gap-3 rounded-lg border border-danger/31 bg-secondary px-4 py-3 text-sm shadow-xl md:bottom-6"
    >
      <span className="text-danger">⚠</span>
      <p className="flex-1 text-foreground">{message}</p>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={onDismiss}
        className="text-muted-foreground hover:text-foreground"
      >
        ✕
      </button>
    </div>
  )
}
