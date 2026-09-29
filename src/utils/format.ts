/** Format a number as Thai Baht, e.g. 32000 → "฿32,000". */
export const formatBaht = (n: number) => `฿${n.toLocaleString()}`

/** Prefix non-negative values with "+". */
export const signed = (n: number) => (n >= 0 ? '+' : '')
