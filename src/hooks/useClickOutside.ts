import { useEffect, useRef, type RefObject } from 'react'

/** Calls `handler` on any mousedown outside the referenced element. */
export function useClickOutside(ref: RefObject<HTMLElement | null>, handler: () => void) {
  const handlerRef = useRef(handler)
  useEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handlerRef.current()
    }
    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [ref])
}
