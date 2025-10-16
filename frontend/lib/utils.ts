import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Ref, MutableRefObject } from "react"

/**
 * Merge Tailwind classes intelligently while supporting conditional classnames.
 * Usage: cn('p-2', condition && 'bg-primary')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Sleep for a number of milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Clamp a number between min and max.
 */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max)
}

/**
 * Truncate a string to a maximum length, appending an ellipsis (or custom suffix).
 */
export function truncate(str: string, max = 140, suffix = "…"): string {
  if (str.length <= max) return str
  return str.slice(0, Math.max(0, max - suffix.length)) + suffix
}

/**
 * Capitalize the first character of a string.
 */
export function capitalize(s: string): string {
  if (!s) return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/**
 * Convert a string to Title Case.
 */
export function titleCase(s: string): string {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ")
}

/**
 * Format a date using Intl.DateTimeFormat.
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "2-digit" },
  locale = undefined as unknown as string | undefined
): string {
  const d = date instanceof Date ? date : new Date(date)
  try {
    return new Intl.DateTimeFormat(locale, options).format(d)
  } catch {
    return d.toISOString()
  }
}

/**
 * Format a number using Intl.NumberFormat.
 */
export function formatNumber(
  n: number,
  options: Intl.NumberFormatOptions = { notation: "standard" },
  locale = undefined as unknown as string | undefined
): string {
  try {
    return new Intl.NumberFormat(locale, options).format(n)
  } catch {
    return String(n)
  }
}

/**
 * Debounce a function. Subsequent calls reset the timer.
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, wait = 300) {
  let timeout: ReturnType<typeof setTimeout> | null = null
  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      // @ts-expect-error - preserve context when called as method
      fn.apply(null, args)
    }, wait)
  }
  debounced.cancel = () => {
    if (timeout) clearTimeout(timeout)
    timeout = null
  }
  debounced.flush = (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    // @ts-expect-error - preserve context when called as method
    return fn.apply(null, args) as ReturnType<T>
  }
  return debounced as T & { cancel: () => void; flush: (...args: Parameters<T>) => ReturnType<T> }
}

/**
 * Throttle a function. Ensures it is called at most once in the given interval.
 */
export function throttle<T extends (...args: any[]) => any>(fn: T, wait = 300) {
  let last = 0
  let pending: ReturnType<typeof setTimeout> | null = null
  const throttled = (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = wait - (now - last)
    if (remaining <= 0) {
      last = now
      // @ts-expect-error - preserve context when called as method
      return fn.apply(null, args) as ReturnType<T>
    }
    if (!pending) {
      pending = setTimeout(() => {
        pending = null
        last = Date.now()
        // @ts-expect-error - preserve context when called as method
        fn.apply(null, args)
      }, remaining)
    }
  }
  throttled.cancel = () => {
    if (pending) clearTimeout(pending)
    pending = null
  }
  return throttled as T & { cancel: () => void }
}

/**
 * Safely parse JSON. Returns fallback on error.
 */
export function safeParseJSON<T = unknown>(value: string, fallback: T | null = null): T | null {
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

/**
 * Get a public (NEXT_PUBLIC_) env var with an optional fallback.
 */
export function getPublicEnv(name: string, fallback?: string): string | undefined {
  const key = name.startsWith("NEXT_PUBLIC_") ? name : `NEXT_PUBLIC_${name}`
  return process.env[key] ?? fallback
}

/**
 * Create an array range [start, start+count).
 */
export function range(count: number, start = 0): number[] {
  return Array.from({ length: Math.max(0, count) }, (_, i) => start + i)
}

/**
 * Generate a simple unique id.
 */
let __uid = 0
export function uniqueId(prefix = "id_"): string {
  __uid += 1
  return `${prefix}${__uid}`
}

/**
 * Merge multiple refs into a single ref callback.
 */
export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): (value: T | null) => void {
  return (value: T | null) => {
    for (const ref of refs) {
      if (!ref) continue
      if (typeof ref === "function") {
        ref(value)
      } else {
        ;(ref as MutableRefObject<T | null>).current = value
      }
    }
  }
}

/** Environment flags */
export const isBrowser = typeof window !== "undefined"
export const isDev = process.env.NODE_ENV !== "production"

/** No-op logger for optional debugging */
export const log = {
  info: (...args: unknown[]) => {
    if (isDev) console.info("[info]", ...args)
  },
  warn: (...args: unknown[]) => {
    if (isDev) console.warn("[warn]", ...args)
  },
  error: (...args: unknown[]) => {
    if (isDev) console.error("[error]", ...args)
  },
}

/** Nullable / Maybe utility types */
export type Nullable<T> = T | null
export type Maybe<T> = T | null | undefined

