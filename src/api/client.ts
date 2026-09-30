/** Thin fetch wrapper for stock-hiteffect-backend. */

// Backend URL, including the /api prefix. VITE_API_BASE_URL (in .env or CI) overrides it when set.

// Hosted backend on Vercel.
const DEFAULT_API_BASE_URL = 'https://stock-hiteffect-backend.vercel.app/api'

// Local backend (`npm run dev` in stock-hiteffect-backend): to develop against it,
// comment out the Vercel line above and uncomment this one.
// const DEFAULT_API_BASE_URL = 'http://localhost:3000/api'

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '')

interface ApiErrorDetail {
  path: string
  message: string
}

/** A failed API call. `status` is 0 when the server could not be reached. */
export class ApiError extends Error {
  readonly status: number
  readonly details: ApiErrorDetail[]

  constructor(message: string, status: number, details: ApiErrorDetail[] = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

type Query = Record<string, string | number | boolean | undefined>

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  query?: Query
  signal?: AbortSignal
}

function buildUrl(path: string, query?: Query) {
  const url = new URL(API_BASE_URL + path)
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== '') url.searchParams.set(key, String(value))
  }
  return url
}

export async function request<T>(path: string, { method = 'GET', body, query, signal }: RequestOptions = {}) {
  let res: Response
  try {
    res = await fetch(buildUrl(path, query), {
      method,
      signal,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err
    throw new ApiError(`Cannot reach the server at ${API_BASE_URL}`, 0)
  }

  if (res.status === 204) return undefined as T

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const error = data?.error
    throw new ApiError(error?.message ?? `Request failed (${res.status})`, res.status, error?.details)
  }
  return data as T
}

/** A readable message for any error thrown by an API call. */
export function errorMessage(err: unknown) {
  if (err instanceof ApiError && err.details.length > 0) {
    return `${err.message}: ${err.details.map((d) => (d.path ? `${d.path} ${d.message}` : d.message)).join(', ')}`
  }
  return err instanceof Error ? err.message : 'Something went wrong'
}

export const isAbort = (err: unknown) => err instanceof DOMException && err.name === 'AbortError'
