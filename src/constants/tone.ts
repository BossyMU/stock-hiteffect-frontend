/**
 * A tone is a semantic color used by badges and filter chips.
 * Class strings are spelled out in full so Tailwind can detect them.
 */
export type Tone = 'primary' | 'success' | 'danger' | 'info' | 'neutral'

export const TONE_TEXT: Record<Tone, string> = {
  primary: 'text-primary',
  success: 'text-success',
  danger: 'text-danger',
  info: 'text-info',
  neutral: 'text-muted-foreground',
}

/** Status badge: light tint with a subtle border. */
export const TONE_BADGE: Record<Tone, string> = {
  primary: 'text-primary bg-primary/10 border-primary/19',
  success: 'text-success bg-success/10 border-success/19',
  danger: 'text-danger bg-danger/10 border-danger/19',
  info: 'text-info bg-info/10 border-info/19',
  neutral: 'text-muted-foreground bg-muted-foreground/10 border-muted-foreground/19',
}

/** Priority pill: lighter tint with a stronger border. */
export const TONE_PILL: Record<Tone, string> = {
  primary: 'text-primary bg-primary/9 border-primary/25',
  success: 'text-success bg-success/9 border-success/25',
  danger: 'text-danger bg-danger/9 border-danger/25',
  info: 'text-info bg-info/9 border-info/25',
  neutral: 'text-muted-foreground bg-muted-foreground/9 border-muted-foreground/25',
}

/** Active filter chip. */
export const TONE_CHIP_ACTIVE: Record<Tone, string> = {
  primary: 'text-primary bg-primary/9 border-primary/31',
  success: 'text-success bg-success/9 border-success/31',
  danger: 'text-danger bg-danger/9 border-danger/31',
  info: 'text-info bg-info/9 border-info/31',
  neutral: 'text-muted-foreground bg-muted-foreground/9 border-muted-foreground/31',
}
