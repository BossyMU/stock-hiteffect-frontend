/** Short random uppercase ID for client-side records. */
export const uid = () => Math.random().toString(36).slice(2, 9).toUpperCase()
