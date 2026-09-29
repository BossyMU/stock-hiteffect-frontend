import type { WatchPriority } from '@/types'
import type { Tone } from './tone'

export const WATCH_PRIORITIES: WatchPriority[] = ['high', 'normal', 'low']

export const PRIORITY_CONFIG: Record<WatchPriority, { label: string; tone: Tone }> = {
  high: { label: 'High', tone: 'danger' },
  normal: { label: 'Normal', tone: 'primary' },
  low: { label: 'Low', tone: 'neutral' },
}

/** Preset percentages of market price offered as quick "accept price" choices. */
export const QUICK_ACCEPT_PERCENTAGES = [20, 50, 80, 100]
